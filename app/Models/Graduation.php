<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'abrr'
    ];

    public function specialities()
    {
        return $this->hasMany(Speciality::class);
    }
}
