<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    /**
     * Teachers - collection of teachers
     * with this degree
     *
     * @return collection of teachers
     */
    public function teachers()
    {
        return $this->belongsToMany(Teacher::class)
            ->join('users', 'teachers.user_id', 'users.id')
            ->orderBy('users.fullname');
    }
}
