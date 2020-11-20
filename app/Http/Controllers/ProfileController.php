<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

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
     * Attachin group to student
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
