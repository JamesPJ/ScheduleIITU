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

    /**
     * getTeachersAttribute
     * gets all teachers of current semester
     *
     * @return array of teachers
     */
    public function getTeachersAttribute()
    {
        $teachers = [];
        $addedTeacherIds = [];
        foreach ($this->groups as $group) {
            foreach ($group->currentTimetable->cells as $cell) {
                if (!in_array($cell->teacher->id, $addedTeacherIds)) {
                    $addedTeacherIds[] = $cell->teacher->id;
                    $teachers[$cell->subject->name][] = [
                        'fullname' => $cell->teacher->user->fullname,
                        'email' => $cell->teacher->user->email,
                        'degree' => $cell->teacher->stringDegrees,
                        'department' => $cell->teacher->department->name
                    ];
                }
            }
        }
        return $teachers;
    }

    /**
     * getCellsAttribute
     * returns all cells of 
     * the student groups
     *
     * @return array of cells
     */
    public function getCellsAttribute()
    {
        $cells = [];
        foreach ($this->groups as $group) {
            foreach ($group->currentTimetable->cells as $cell) {
                $cells[] = $cell;
            }
        }
        return $cells;
    }

    /**
     * getStringGroupsAttribute
     * implodes name of groups with
     * delimiter ", "
     *
     * @return String
     */
    public function getStringGroupsAttribute()
    {
        return $this->groups->implode('name', ', ');
    }
}
