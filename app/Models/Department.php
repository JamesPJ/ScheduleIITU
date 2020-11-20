<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    /**
     * Teachers - collection of teachers
     * on this department
     *
     * @return collection of teachers
     */
    public function teachers()
    {
        return $this->hasMany(Teacher::class)
            ->join('users', 'teachers.user_id', 'users.id')
            ->orderBy('users.fullname');
    }
}
