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

    public function students()
    {
        return $this->belongsToMany(Student::class)
            ->join('users', 'students.user_id', 'users.id')
            ->orderBy('users.fullname');
    }

    public function speciality()
    {
        return $this->belongsTo(Speciality::class);
    }

    public function group_type()
    {
        return $this->belongsTo(GroupType::class);
    }

    public function exams()
    {
        $monthNow = date('m');
        $yearNow = date('Y');
        $semester = ($yearNow - $this->year) * 2;
        $semester += $monthNow >= 8 && $monthNow <= 12 ? 1 : 0;

        return $this->belongsToMany(Exam::class)->orderBy('date_time')->where('semester', $semester);
    }

    public function timetables()
    {
        return $this->hasMany(Timetable::class);
    }
}
