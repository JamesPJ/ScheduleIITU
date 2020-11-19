<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    public $timestamps = false;

    public function teachers()
    {
        return $this->hasMany(Teacher::class)
            ->join('users', 'teachers.user_id', 'users.id')
            ->orderBy('users.fullname');
    }
}
