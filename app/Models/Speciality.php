<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'abrr',
        'graduation_id'
    ];

    public function graduation()
    {
        return $this->belongsTo(Graduation::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }
}
