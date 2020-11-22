<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Room;
use App\Models\Teacher;
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
        $group = Group::findOrFail($id);
        $data['timeRange'] = $group->currentTimetable->timeRange;

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
        $teacher = Teacher::findOrFail($id);
        $data['timeRange'] = $teacher->timeRange;

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
        $room = Room::findOrFail($id);
        $data['timeRange'] = $room->timeRange;

        return view('schedule', $data);
    }
}
