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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function getHasGroupAttribute()
    {
        return count($this->groups) > 0;
    }

    public function getGroupmatesAttribute()
    {
        $groupmates = [];
        foreach ($this->groups as $group) {
            foreach ($group->students as $student) {
                if ($student->user != $this->user) {
                    $groupmates[] = $student;
                }
            }
        }
        return $groupmates;
    }
}
