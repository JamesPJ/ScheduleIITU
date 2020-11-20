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

    /**
     * User - fullname, email
     *
     * @return User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Groups - in which group
     * participate this student
     *
     * @return collection of groups
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class)->orderBy('name');
    }

    /**
     * getHasGroupAttribute
     * defines has groups this student
     * 
     * @return boolean
     */
    public function getHasGroupAttribute()
    {
        return count($this->groups) > 0;
    }

    /**
     * getHasMaxGroupAttribute
     * define has maximum (4) groups
     *
     * @return boolean
     */
    public function getMaxGroupsAttribute()
    {
        return count($this->groups) < 4;
    }

    /**
     * getGroupmatesAttribute
     * gets students of groups 
     * in which participates this
     * student
     *
     * @return array of groups ['name']
     * @return subarray of groupmates ['students']
     */
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

    /**
     * getExamsAttribute
     * get all exams of groups 
     * in which participates this
     * student
     *
     * @return array of exams
     */
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
