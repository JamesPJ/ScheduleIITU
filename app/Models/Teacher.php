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
        'department_id'
    ];

    /**
     * Degree of this teacher
     *
     * @return Degree
     */
    public function degrees()
    {
        return $this->belongsToMany(Degree::class);
    }

    /**
     * getStringDegreesAttribute
     * implodes name of degrees with
     * delimiter ", "
     *
     * @return String
     */
    public function getStringDegreesAttribute()
    {
        return $this->degrees->implode('name', ', ');
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
}
