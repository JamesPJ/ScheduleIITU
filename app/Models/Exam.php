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

    /**
     * Groups - collection of groups
     * participating in this exam
     *
     * @return collection of groups
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class)->orderBy('name');
    }

    /**
     * Exam form
     * Example: Project defence, 
     * written on DL and etc.
     *
     * @return ExamForm
     */
    public function exam_form()
    {
        return $this->belongsTo(ExamForm::class);
    }

    /**
     * Subject of exam
     *
     * @return Subject
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Teacher the lecturer of exam subject
     *
     * @return Teacher
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Room where will the exam take place
     *
     * @return Room
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * getStringGroupsAttribute
     * Implodes name of each group with ", " delimeter
     * 
     * @return String
     */
    public function getStringGroupsAttribute()
    {
        return $this->groups->implode('name', ', ');
    }
}
