<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Graduation;
use App\Models\Speciality;
use App\Models\Group;

class SelectController extends Controller
{
    /**
     * Select page
     *
     * @return void
     */
    public function select()
    {
        $data = $this->data();

        if ($data['user']->isStudent && $data['user']->student->hasGroup)
            return redirect()->route('profile.index');

        return view('select', $data);
    }

    /**
     * Graduations API
     *
     * @return json array of graduations
     */
    public function graduations()
    {
        return response()->json(Graduation::all());
    }

    /**
     * Courses API
     *
     * @param  Request $request
     * @return json array of courses in this speciality
     */
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

    /**
     * Specialities API
     *
     * @param  Request $request
     * @return json array of specialities of this course
     */
    public function specialities(Request $request)
    {
        $course = $request->input('course');
        if (isset($course)) {
            $courseYear = date('Y') - $course + 1;
            $groupsByYear = Group::select('speciality_id')->where('year', $courseYear)->orderBy('name')->get();
            if (isset($groupsByYear)) {
                $specialities = Speciality::find($groupsByYear);
                return response()->json($specialities);
            }
        }
    }

    /**
     * Groups API
     *
     * @param  Request $request
     * @return json array of groups of this course and specaility
     */
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
