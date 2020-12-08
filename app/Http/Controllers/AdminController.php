<?php

namespace App\Http\Controllers;

use App\Models\Dean;
use App\Models\Group;
use App\Models\Room;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * login - login page for 
     * admin panel
     *
     * @return view
     */
    public function login()
    {
        $data = $this->data();
        $logged = session('logged');
        if (isset($logged) && $logged)
            return redirect()->route('admin.dashboard');

        return view('admin.login', $data);
    }

    /**
     * ! Method: [POST ONLY]
     * auth - missmatching password
     * of the dean
     *
     * @param  Request $request
     * @return redirect
     */
    public function auth(Request $request)
    {
        $data = $this->data();
        $password = $request->input('password');
        if (Hash::check($password, $data['user']->dean->password)) {
            session(['logged' => true]);
            return redirect()->route('admin.dashboard');
        }
        return redirect()->back()
            ->with('error', 'Password is wrong!');
    }

    /**
     * dashboard - main page
     * of the admin panel
     *
     * @return view
     */
    public function dashboard()
    {
        $data = $this->data();
        $data['workload'] = $this->roomWorkload();
        $data['daysWorkloaded'] = $this->roomWorkloadPerDay();
        $data['maxWorkloadedTime'] = $this->maxWorkloadedTime();
        $data['maxWorkloadedRoom'] = $this->maxWorkloadedRoom();
        $data['totalStudents'] = $this->totalStudents();
        $data['totalTeachers'] = $this->totalTeachers();

        return view('admin.dashboard', $data);
    }

    /**
     * roomWorkload - percentage of workload
     * all rooms in week in current semester
     *
     * @return integer
     */
    public function roomWorkload()
    {
        $DAY_COUNT = 6;
        $TIMES_COUNT = count(Time::all());
        $ROOMS_COUNT = count(Room::all());
        $MAX_CELLS = $DAY_COUNT * $TIMES_COUNT * $ROOMS_COUNT;

        $allGroups = Group::all();
        $cellsCount = 0;
        $addedCellIds = [];

        foreach ($allGroups as $group) {
            $count = 0;
            foreach ($group->currentTimetable->cells as $cell) {
                if (!in_array($cell->id, $addedCellIds)) {
                    $addedCellIds[] = $cell->id;
                    $count++;
                }
            }
            $cellsCount += $count;
        }

        return round($cellsCount / $MAX_CELLS * 100);
    }

    /**
     * roomWorkload - percentage of workload
     * all rooms per day in current semester
     *
     * @return array of integer
     */
    public function roomWorkloadPerDay()
    {
        $DAY_COUNT = 6;
        $TIMES_COUNT = count(Time::all());
        $ROOMS_COUNT = count(Room::all());
        $MAX_CELLS_PER_DAY = $TIMES_COUNT * $ROOMS_COUNT;

        $daysName = [
            'Mod',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        $daysWorkload = [];
        $allGroups = Group::all();
        $addedCellIds = [];

        for ($i = 0; $i < $DAY_COUNT; $i++) {
            $currentDayCellsCount = 0;
            foreach ($allGroups as $group) {
                $count = 0;
                foreach ($group->currentTimetable->cells->where('day_index', $i) as $cell) {
                    if (!in_array($cell->id, $addedCellIds)) {
                        $addedCellIds[] = $cell->id;
                        $count++;
                    }
                }
                $currentDayCellsCount += $count;
            }
            $daysWorkload[$daysName[$i]] = round($currentDayCellsCount / $MAX_CELLS_PER_DAY * 100);
        }
        return $daysWorkload;
    }

    /**
     * maxWorkloadedTime - count of workload
     * all times in week in current semester
     *
     * @return array of count and time
     */
    public function maxWorkloadedTime()
    {
        $groups = Group::all();
        $times = Time::all();
        $ROOMS_COUNT = count(Room::all());

        $timeCounts = [];
        $addedCellIds = [];

        foreach ($times as $time) {
            $count = 0;
            foreach ($groups as $group) {
                foreach ($group->currentTimetable->cells->where('time_id', $time->id) as $cell) {
                    if (!in_array($cell->id, $addedCellIds)) {
                        $addedCellIds[] = $cell->id;
                        $count++;
                    }
                }
            }
            $timeCounts[] = [
                'time' => $time,
                'percentage' => round($count / $ROOMS_COUNT * 100)
            ];
        }
        return array_slice(collect($timeCounts)->sortBy('percentage')->toArray(), -5);
    }

    /**
     * maxWorkloadedRoom - count of workloaded
     * all rooms in week in current semester
     *
     * @return array of count and room
     */
    public function maxWorkloadedRoom()
    {
        $groups = Group::all();
        $rooms = Room::all();
        $TIMES_COUNT = count(Time::all());

        $roomCounts = [];
        $addedCellIds = [];

        foreach ($rooms as $room) {
            $count = 0;
            foreach ($groups as $group) {
                foreach ($group->currentTimetable->cells->where('room_id', $room->id) as $cell) {
                    if (!in_array($cell->id, $addedCellIds)) {
                        $addedCellIds[] = $cell->id;
                        $count++;
                    }
                }
            }
            $roomCounts[] = [
                'room' => $room,
                'percentage' => round($count / $TIMES_COUNT * 100)
            ];
        }
        return array_slice(collect($roomCounts)->sortBy('percentage')->toArray(), -5);
    }

    /**
     * totalStudents - count of total students
     *
     * @return integer
     */
    public function totalStudents()
    {
        return count(Student::all());
    }

    /**
     * totalStudents - count of total teachers
     *
     * @return integer
     */
    public function totalTeachers()
    {
        return count(Teacher::all());
    }

    /**
     * users - managing users (students, teacher, deans)
     *
     * @return view
     */
    public function users()
    {
        $data = $this->data();

        return view('admin.users', $data);
    }

    /**
     * groups - managing groups
     *
     * @return view
     */
    public function groups()
    {
        $data = $this->data();

        return view('admin.groups', $data);
    }

    /**
     * specialities - managing specialities
     *
     * @return view
     */
    public function specialities()
    {
        $data = $this->data();

        return view('admin.specialities', $data);
    }

    /**
     * departments - managing departments
     *
     * @return view
     */
    public function departments()
    {
        $data = $this->data();

        return view('admin.departments', $data);
    }

    /**
     * degrees - managing degrees
     *
     * @return view
     */
    public function degrees()
    {
        $data = $this->data();

        return view('admin.degrees', $data);
    }

    /**
     * timetables - managing timetables
     * of the admin panel
     *
     * @return view
     */
    public function timetables()
    {
        $data = $this->data();

        return view('admin.timetables', $data);
    }

    /**
     * exams - managing exams
     * of the admin panel
     *
     * @return view
     */
    public function exams()
    {
        $data = $this->data();

        return view('admin.exams', $data);
    }

    /**
     * settings - managing settings
     * of the admin panel
     *
     * @return view
     */
    public function settings()
    {
        $data = $this->data();

        return view('admin.settings', $data);
    }

    /**
     * ! Method : [POST ONLY]
     * changePassword - changes password
     * of dean
     *
     * @param  Request $request
     * @return redirect
     */
    public function changePassword(Request $request)
    {
        $user = session('user');
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');
        $newRepeatPassword = $request->input('new_repeat_password');
        if ($user != null) {
            if ($newPassword == $newRepeatPassword) {
                if (Hash::check($oldPassword, $user->dean->password)) {
                    $dean = Dean::find($user->dean->id);
                    $dean->password = Hash::make($newPassword);
                    $dean->save();
                    return redirect()->route('admin.settings')
                        ->with('success', 'Password changed');
                }
                return redirect()->route('admin.settings')
                    ->with('error', 'Incorrect old password');
            }
            return redirect()->route('admin.settings')
                ->with('error', 'Repeated password don\'t match.');
        }
        return redirect()->route('admin.login')
            ->with('error', 'Login firstly!');
    }
}
