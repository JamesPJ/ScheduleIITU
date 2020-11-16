<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function schedule(Request $request)
    {
        return view('schedule');
    }

    public function timetable($id)
    {
        return view('schedule');
    }
}
