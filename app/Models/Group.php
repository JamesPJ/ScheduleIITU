<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'speciality_id',
        'year',
        'group_type_id'
    ];

    /**
     * Students - collection of
     * students which participate 
     * in this group
     *
     * @return collection of students
     */
    public function students()
    {
        return $this->belongsToMany(Student::class)
            ->join('users', 'students.user_id', 'users.id')
            ->orderBy('users.fullname');
    }

    /**
     * Speciality of this group
     *
     * @return Speciality
     */
    public function speciality()
    {
        return $this->belongsTo(Speciality::class);
    }

    /**
     * Group Type 
     * Example: K - Kazakh Groups
     *          R - Russian Groups
     *          KCCO - Kazakh After College Groups
     *          RCCO - Russian After College Groups
     *          etc
     *
     * @return GroupType
     */
    public function group_type()
    {
        return $this->belongsTo(GroupType::class);
    }

    /**
     * Exams - collection of exams
     * gets only exams of this semester
     *
     * @return collection of Exams
     */
    public function exams()
    {
        $monthNow = date('m');
        $yearNow = date('Y');
        $semester = ($yearNow - $this->year) * 2;
        $semester += $monthNow >= 8 && $monthNow <= 12 ? 1 : 0;

        return $this->belongsToMany(Exam::class)->orderBy('date_time')->where('semester', $semester);
    }

    /**
     * Timetables - collection of timetables
     * of this group
     *
     * @return collection of Timetables
     */
    public function timetables()
    {
        return $this->hasMany(Timetable::class);
    }

    /**
     * getCurrentTimetableAttribute
     * gets timetable of current semester
     * 
     * @return Timetable
     */
    public function getCurrentTimetableAttribute()
    {
        $monthNow = date('m');
        $yearNow = date('Y');
        $semester = ($yearNow - $this->year) * 2;
        $semester += $monthNow >= 8 && $monthNow <= 12 ? 1 : 0;

        return $this->timetables->where('semester', 5)->first();
    }
}
