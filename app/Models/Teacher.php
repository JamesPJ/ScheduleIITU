<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'department_id',
        'degree_id'
    ];

    /**
     * Degree of this teacher
     *
     * @return Degree
     */
    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    /**
     * Department of this teacher
     *
     * @return Department
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

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
     * getDepmatesAttribute
     * get all teachers on department 
     * in which participate this
     * teacher
     *
     * @return array of teachers
     */
    public function getDepmatesAttribute()
    {
        $depmates = [];
        foreach ($this->department->teachers as $teacher) {
            if ($teacher->user != $this->user) {
                $depmates[] = $teacher;
            }
        }
        return $depmates;
    }

    /**
     * Exams - collection of exams
     *
     * @return collection
     */
    public function exams()
    {
        return $this->hasMany(Exam::class)->orderBy('date_time')
            ->whereDate('date_time', '>=', Carbon::today()->subDays(30));
    }

    /**
     * Cells - collection of cells
     * of this teacher
     *
     * @return collection of Cells
     */
    public function cells()
    {
        return $this->hasMany(Cell::class);
    }

    /**
     * getTimeRangeAttribute
     * returns collection of ranged time when 
     * timetable starts and ends
     *
     * @return collection of time
     */
    public function getTimeRangeAttribute()
    {
        if (count($this->cells) > 0) {
            $minId = $this->cells[0]->time->id;
            $maxId = $this->cells[0]->time->id;
            foreach ($this->cells as $cell) {
                $curTimeId = $cell->time->id;
                if ($curTimeId > $maxId) {
                    $maxId = $curTimeId;
                }
                if ($curTimeId < $minId) {
                    $minId = $curTimeId;
                }
            }
            return Time::where('id', '>=', $minId)->where('id', '<=', $maxId)->get();
        }
        return [];
    }
}
