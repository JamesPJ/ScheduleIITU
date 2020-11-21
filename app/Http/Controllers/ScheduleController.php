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
     * Timetable page of group
     *
     * @param  Request $id
     * @return view
     */
    public function group($id)
    {
        $data = $this->data();

        return view('schedule', $data);
    }

    /**
     * Timetable page of teacher
     *
     * @param  Request $id
     * @return view
     */
    public function teacher($id)
    {
        $data = $this->data();

        return view('schedule', $data);
    }

    /**
     * Timetable page of room
     *
     * @param  Request $id
     * @return view
     */
    public function room($id)
    {
        $data = $this->data();

        return view('schedule', $data);
    }
}
