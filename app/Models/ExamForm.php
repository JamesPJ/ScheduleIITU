<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamForm extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    /**
     * Exams - collecion of exams
     * with this exam form
     *
     * @return collection of Exams
     */
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}
