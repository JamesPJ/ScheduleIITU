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
     * subjects
     * collection of subjects which user is blocked
     *
     * @return collection
     */
    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }

    /**
     * isBlocked
     * checks is this subject is blocked
     *
     * @param  Subject
     * @return boolean
     */
    public function isBlocked($subject)
    {
        if (isset($subject) && $this->subjects->contains($subject)) {
            return true;
        }
        return false;
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
     * @return collection of exams
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
        return collect($exams)->sortBy('date_time');
    }

    /**
     * getTeachersAttribute
     * gets all teachers of current semester
     *
     * @return collection of teachers
     */
    public function getTeachersAttribute()
    {
        $teachers = [];
        $addedTeacherIds = [];
        foreach ($this->groups as $group) {
            foreach ($group->currentTimetable->cells as $cell) {
                if (!in_array($cell->teacher->id, $addedTeacherIds) && !$this->isBlocked($cell->subject)) {
                    $addedTeacherIds[] = $cell->teacher->id;
                    $teachers[$cell->subject->name][] = [
                        'id' => $cell->teacher->id,
                        'fullname' => $cell->teacher->user->fullname,
                        'email' => $cell->teacher->user->email,
                        'degree' => $cell->teacher->stringDegrees,
                        'department' => $cell->teacher->department->name
                    ];
                }
            }
        }
        return collect($teachers);
    }

    /**
     * getSubjectsAttribute
     * gets all subjects of current semester
     *
     * @return collection of subjects
     */
    public function getAllSubjectsAttribute()
    {
        $subjects = [];
        $addedSubjectIds = [];
        foreach ($this->groups as $group) {
            foreach ($group->currentTimetable->cells as $cell) {
                if (!in_array($cell->subject->id, $addedSubjectIds)) {
                    $addedSubjectIds[] = $cell->subject->id;
                    $subjects[] = $cell->subject;
                }
            }
        }
        return collect($subjects)->sortBy('name');
    }

    /**
     * getCellsAttribute
     * returns all cells of 
     * the student groups
     *
     * @return collection of cells
     */
    public function getCellsAttribute()
    {
        $cells = [];
        $addedCellIds = [];
        foreach ($this->groups as $group) {
            foreach ($group->currentTimetable->cells as $cell) {
                if (!in_array($cell->id, $addedCellIds) && !$this->isBlocked($cell->subject)) {
                    $addedCellIds[] = $cell->id;
                    $cells[] = $cell;
                }
            }
        }
        return collect($cells);
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
