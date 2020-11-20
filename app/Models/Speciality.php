<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'abbr',
        'graduation_id'
    ];

    /**
     * Graduation of this
     * speciality
     *
     * @return Graduation
     */
    public function graduation()
    {
        return $this->belongsTo(Graduation::class);
    }

    /**
     * Groups - collection of groups
     * in this speciality
     *
     * @return collection
     */
    public function groups()
    {
        return $this->hasMany(Group::class)->orderBy('name');
    }
}
