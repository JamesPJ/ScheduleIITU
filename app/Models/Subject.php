<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    /**
     * Exams - exams of this
     * subject depending on groups
     *
     * @return Exam
     */
    public function exams()
    {
        return $this->hasMany(Exam::class)->orderBy('date_time')
            ->whereDate('date_time', '>=', Carbon::today()->subDays(30));
    }

    /**
     * Cells - collection of cells
     * of this subject
     *
     * @return collection of Cells
     */
    public function cells()
    {
        return $this->hasMany(Cell::class);
    }
}
