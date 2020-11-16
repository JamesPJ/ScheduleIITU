<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function schedule(Request $request)
    {
        $data = $this->data();

        return view('schedule', $data);
    }

    public function timetable($id)
    {
        $data = $this->data();

        return view('schedule', $data);
    }
}
