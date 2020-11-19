<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class)->orderBy('name');
    }

    public function getHasGroupAttribute()
    {
        return count($this->groups) > 0;
    }

    public function getGroupmatesAttribute()
    {
        $groups = [];
        foreach ($this->groups as $group) {
            $students = [];
            foreach ($group->students as $student) {
                if ($student->user != $this->user) {
                    $students[] = $student;
                }
            }
            $groups[] = array(
                'name' => $group->name,
                'students' => $students
            );
        }
        return $groups;
    }

    public function getExamsAttribute()
    {
        $exams = [];
        $addedExamIds = [];
        foreach ($this->groups as $group) {
            foreach ($group->exams as $exam) {
                if (!in_array($exam->id, $addedExamIds)) {
                    $exams[] = $exam;
                    $addedExamIds[] = $exam->id;
                }
            }
        }
        return $exams;
    }
}
