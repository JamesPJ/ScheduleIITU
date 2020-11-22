<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Room;
use App\Models\Teacher;
use App\Models\Time;
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
        $data['timeRange'] = $this->timeRange($data['user']->cells);
        $data['name'] = $data['user']->scheduleName;
        $data['type'] = $data['user']->scheduleType;

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
        $data['timeRange'] = $this->timeRange($group->currentTimetable->cells);
        $data['name'] = $group->name;
        $data['type'] = 'group';

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
        $data['timeRange'] = $this->timeRange($teacher->cells);
        $data['name'] = $teacher->user->fullname;
        $data['type'] = 'teacher';

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
        $data['timeRange'] = $this->timeRange($room->cells);
        $data['name'] = $room->location;
        $data['type'] = 'room';

        return view('schedule', $data);
    }

    /**
     * getTimeRangeAttribute
     * returns collection of ranged time when 
     * timetable starts and ends
     *
     * @return collection of time
     */
    public function timeRange($cells)
    {
        if (count($cells) > 0) {
            $minId = $cells[0]->time->id;
            $maxId = $cells[0]->time->id;
            foreach ($cells as $cell) {
                $curTimeId = $cell->time->id;
                if ($curTimeId > $maxId) {
                    $maxId = $curTimeId;
                }
                if ($curTimeId < $minId) {
                    $minId = $curTimeId;
                }
            }
            return Time::where('id', '>=', $minId)->where('id', '<=', $maxId)->get();
        }
        return [];
    }
}
