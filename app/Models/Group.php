<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'speciality_id',
        'year',
        'group_type_id'
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function speciality()
    {
        return $this->belongsTo(Speciality::class);
    }

    public function group_type()
    {
        return $this->belongsTo(GroupType::class);
    }
}
