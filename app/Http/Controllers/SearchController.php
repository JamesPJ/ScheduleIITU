<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Room;
use App\Models\User;
use App\Models\Teacher;

class SearchController extends Controller
{

    /**
     * Filter - search page
     *
     * @param  Request $request
     * @return view
     */
    public function search(Request $request)
    {
        $data = $this->data();
        $word = $request->input('keyword');
        $data['word'] = $word;
        $word = '%' . $word . '%';

        $groups = Group::where('name', 'like', $word)->get();
        $rooms = Room::where('location', 'like', $word)->get();
        $teachers = User::where('fullname', 'like', $word)
            ->join('teachers', 'users.id', '=', 'teachers.user_id')->get();

        $data['result'] = [];
        foreach ($groups as $group) {
            $data['result'][] = [
                'id' => $group->id,
                'type' => 'group',
                'name' => $group->name
            ];
        }
        foreach ($rooms as $room) {
            $data['result'][] = [
                'id' => $room->id,
                'type' => 'room',
                'name' => $room->location
            ];
        }
        foreach ($teachers as $teacher) {
            $user = User::find($teacher->user_id);
            $data['result'][] = [
                'id' => $teacher->id,
                'type' => 'teacher',
                'name' => $user->fullname
            ];
        }

        return view('search', $data);
    }
}
