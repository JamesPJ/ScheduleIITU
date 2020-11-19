<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Graduation;
use App\Models\Speciality;
use App\Models\Group;

class SelectController extends Controller
{
    public function select()
    {
        $data = $this->data();

        if (!isset($data['user']))
            return redirect()->route('index');

        if (isset($data['user']->student) && $data['user']->student->hasGroup)
            return redirect()->route('profile.index');

        return view('select', $data);
    }

    public function graduations()
    {
        return response()->json(Graduation::all());
    }

    public function courses(Request $request)
    {
        $specialityId = $request->input('id');
        if (isset($specialityId)) {
            $grad = Graduation::find($specialityId);
            if (isset($grad)) {
                return response()->json(range(1, $grad->max_course));
            }
        }
    }

    public function specialities(Request $request)
    {
        $course = $request->input('course');
        if (isset($course)) {
            $courseYear = date('Y') - $course + 1;
            $allGroupsById = Group::select('speciality_id')->where('year', $courseYear)->orderBy('name')->get();
            if (isset($allGroupsById)) {
                $specialities = Speciality::find($allGroupsById);
                return response()->json($specialities);
            }
        }
    }

    public function groups(Request $request)
    {
        $specialityId = $request->input('id');
        $course = $request->input('course');
        if (isset($specialityId) && isset($course)) {
            $courseYear = date('Y') - $course + 1;
            $groups = Group::where('speciality_id', $specialityId)
                ->where('year', $courseYear)->orderBy('name')->get();
            return response()->json($groups);
        }
    }
}
