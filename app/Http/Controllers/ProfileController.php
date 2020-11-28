<?php

namespace App\Http\Controllers;

use App\Models\Cell;
use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Room;
use App\Models\Subject;
use App\Models\Time;
use Carbon\Carbon;

class ProfileController extends Controller
{
    /**
     * Profile - index page of profile module
     * is user role is teacher redirects to departmentmates
     * because teachers don't have a groups
     *
     * @return void
     */
    public function profile()
    {
        $data = $this->data();

        if ($data['user']->isTeacher)
            return redirect()->route('profile.departmentmates');

        return view('profile.index', $data);
    }


    /**
     * ! Method: [POST ONLY]
     * Attaching group to student
     *
     * @param  Request $request
     * @return redirect
     */
    public function groupAdd(Request $request)
    {
        $user = session('user');
        if (isset($user) && $user->isStudent) {
            $groupId = $request->input('group_id');
            $group = Group::find($groupId);
            if (isset($group)) {
                if (!$user->student->groups->contains($group)) {
                    if ($user->student->maxGroups) {
                        $user->student->groups()->attach($group);
                        return redirect()->route('profile.index')
                            ->with('success', 'Group added');
                    }
                    return redirect()->route('profile.index')
                        ->with('error', 'You have added maximum groups');
                }
                return redirect()->route('profile.index')
                    ->with('error', 'This group already in group list');
            }
            return redirect()->route('profile.index')
                ->with('error', 'This group doesn\'t exists');
        }
        return redirect()->route('index');
    }

    /**
     * ! Method: [POST ONLY]
     * Detaching group from student
     *
     * @param  Request $request
     * @return redirect
     */
    public function groupDelete(Request $request)
    {
        $user = session('user');
        if (isset($user) && $user->isStudent) {
            $groupId = $request->input('id');
            $group = Group::find($groupId);
            if ($user->student->groups->contains($group)) {
                $user->student->groups()->detach($group);
                return redirect()->route('profile.index')
                    ->with('success', 'Group deleted');
            }
            return redirect()->route('select')
                ->with('error', 'This group doesn\'t exists');
        }
        return redirect()->route('index');
    }

    /**
     * ! Method: [POST ONLY]
     * Attaching subject to blocked list of student
     *
     * @param  Request $request
     * @return redirect
     */
    public function subjectBlock(Request $request)
    {
        $user = session('user');
        if (isset($user) && $user->isStudent) {
            $subjectId = $request->input('subject_id');
            $subject = Subject::find($subjectId);
            if (isset($subject)) {
                if (!$user->student->subjects->contains($subject)) {
                    $user->student->subjects()->attach($subject);
                    return redirect()->route('profile.subjects')
                        ->with('success', 'Subject blocked');
                }
                return redirect()->route('profile.subjects')
                    ->with('error', 'This subject already in blocked list');
            }
            return redirect()->route('profile.subjects')
                ->with('error', 'This subject doesn\'t exists');
        }
        return redirect()->route('index');
    }

    /**
     * ! Method: [POST ONLY]
     * Detaching subject from blocked list of student
     *
     * @param  Request $request
     * @return redirect
     */
    public function subjectShow(Request $request)
    {
        $user = session('user');
        if (isset($user) && $user->isStudent) {
            $subjectId = $request->input('subject_id');
            $subject = Subject::find($subjectId);
            if ($user->student->subjects->contains($subject)) {
                $user->student->subjects()->detach($subject);
                return redirect()->route('profile.subjects')
                    ->with('success', 'Subject unblocked');
            }
            return redirect()->route('profile.subjects')
                ->with('error', 'This subject doesn\'t exists');
        }
        return redirect()->route('index');
    }

    /**
     * Groupmates - page of students
     * shows list of groupmates
     *
     * @return view
     */
    public function groupmates()
    {
        $data = $this->data();
        $data['footer'] = false;
        if ($data['user']->isTeacher)
            return redirect()->route('profile.exams');

        return view('profile.groupmates', $data);
    }

    /**
     * Exams - page of students and teachers
     * shows list of exams
     *
     * @return view
     */
    public function exams()
    {
        $data = $this->data();

        return view('profile.exams', $data);
    }

    /**
     * Free - page of students and teachers
     * shows list of free rooms at current time
     *
     * @return view
     */
    public function free()
    {
        $data = $this->data();
        $freeRooms = [];
        $data['text'] = "Have a blessed and beautiful Sunday";
        $weekDay = date('w') - 1;
        if ($weekDay >= 0 && $weekDay <= 5) {
            $data['text'] = "Nothing Found";
            $time = Time::where('start', '<=', Carbon::now())->where('end', '>=', Carbon::now())->first();
            if (isset($time)) {
                $cells = Cell::where('time_id', $time->id)->where('day_index', $weekDay)->get();
                $rooms = Room::all();
                foreach ($rooms as $room) {
                    $find = false;
                    foreach ($cells as $cell) {
                        if ($cell->room == $room) {
                            $find = true;
                            break;
                        }
                    }
                    if (!$find) {
                        $freeRooms[] = $room;
                    }
                }
            } else {
                $data['text'] = "Too late";
            }
        }
        $data['freeRooms'] = collect($freeRooms)->sortBy('location');

        return view('profile.free', $data);
    }

    /**
     * Teachers - page of students
     * shows list of teachers
     *
     * @return view
     */
    public function teachers()
    {
        $data = $this->data();
        if ($data['user']->isTeacher)
            return redirect()->route('profile.exams');

        return view('profile.teachers', $data);
    }

    /**
     * Subjects - page of students
     * shows list of subjects
     *
     * @return view
     */
    public function subjects()
    {
        $data = $this->data();
        if ($data['user']->isTeacher)
            return redirect()->route('profile.exams');
        return view('profile.subjects', $data);
    }

    /**
     * Departmentmates - page of teachers
     * shows list of departmentmates
     *
     * @return view
     */
    public function departmentmates()
    {
        $data = $this->data();
        if ($data['user']->isStudent)
            return redirect()->route('profile.index');

        return view('profile.depmates', $data);
    }
}
