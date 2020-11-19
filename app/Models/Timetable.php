<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'semester',
        'group_id'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
