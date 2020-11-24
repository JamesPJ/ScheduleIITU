<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'subject_id',
        'teacher_id',
        'room_id',
        'subject_type_id',
        'time_id',
        'day_index'
    ];

    /**
     * Timetable to which
     * belongs to this cell
     *
     * @return Timetable
     */
    public function timetables()
    {
        return $this->belongsToMany(Timetable::class);
    }

    /**
     * Subject of this cell
     *
     * @return Subject
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Time of this cell
     *
     * @return Time
     */
    public function time()
    {
        return $this->belongsTo(Time::class);
    }

    /**
     * SubjectType of this cell
     *
     * @return SubjectType
     */
    public function subject_type()
    {
        return $this->belongsTo(SubjectType::class);
    }

    /**
     * Room in which 
     * is participates this cell
     *
     * @return Room
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Teacher of this cell
     *
     * @return Teacher
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * getGroupsAttribute
     *
     * @return collection of groups
     */
    public function getGroupsAttribute()
    {
        $groups = [];
        $addedGroupIds = [];
        foreach ($this->timetables as $timetable) {
            if ($this->id == 3) {
            }
            if (!in_array($timetable->group->id, $addedGroupIds)) {
                $addedGroupIds[] = $timetable->group->id;
                $groups[] = $timetable->group;
            }
        }
        return collect($groups)->sortBy('name');
    }
}
