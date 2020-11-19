<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class ProfileController extends Controller
{
    public function profile()
    {
        $data = $this->data();
        $data['footer'] = false;

        if (isset($data['user']->teacher))
            return redirect()->route('profile.exams');

        return view('profile.index', $data);
    }

    public function groupAdd(Request $request)
    {
        $user = session('user');
        if (isset($user) && isset($user->student)) {
            $groupId = $request->input('group_id');
            $group = Group::find($groupId);
            if (isset($group)) {
                if (!$user->student->groups->contains($group)) {
                    $user->student->groups()->attach($group);
                    return redirect()->route('profile.index')
                        ->with('success', 'Group added');
                }
                return redirect()->route('profile.index')
                    ->with('error', 'This group already in group list');
            }
            return redirect()->route('profile.index')
                ->with('error', 'This group doesn\'t exists');
        }
        return redirect()->route('index');
    }

    public function groupDelete(Request $request)
    {
        $user = session('user');
        if (isset($user) && isset($user->student)) {
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

    public function groupmates()
    {
        $data = $this->data();
        $data['footer'] = false;
        if (isset($data['user']->teacher))
            return redirect()->route('profile.exams');

        return view('profile.groupmates', $data);
    }

    public function exams()
    {
        $data = $this->data();
        $data['footer'] = false;

        return view('profile.exams', $data);
    }

    public function teachers()
    {
        $data = $this->data();
        $data['footer'] = false;
        if (isset($data['user']->teacher))
            return redirect()->route('profile.exams');

        return view('profile.teachers', $data);
    }

    public function departmentmates()
    {
        $data = $this->data();
        $data['footer'] = false;
        if (isset($data['user']->student))
            return redirect()->route('profile.index');

        return view('profile.departmentmates', $data);
    }
}
