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

    public function exams()
    {
        return $this->hasMany(Exam::class)->orderBy('date_time')
            ->whereDate('date_time', '>=', Carbon::today()->subDays(30));
    }
}
