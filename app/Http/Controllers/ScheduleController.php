<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    /**
     * Schedule page
     *
     * @param  Request $request
     * @return view
     */
    public function schedule(Request $request)
    {
        $data = $this->data();

        return view('schedule', $data);
    }

    /**
     * Timetable page
     *
     * @param  Request $id
     * @return view
     */
    public function timetable($id)
    {
        $data = $this->data();

        return view('schedule', $data);
    }
}
