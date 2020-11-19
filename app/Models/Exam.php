<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'exam_form_id',
        'subject_id',
        'teacher_id',
        'room_id',
        'date_time',
        'duration',
        'students_number',
        'semester'
    ];

    public function groups()
    {
        return $this->belongsToMany(Group::class)->orderBy('name');
    }

    public function exam_form()
    {
        return $this->belongsTo(ExamForm::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function getStringGroupsAttribute()
    {
        return $this->groups->implode('name', ', ');
    }
}
