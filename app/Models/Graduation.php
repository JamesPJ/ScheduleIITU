<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model
{
    public $timestamps = false;

    /**
     * Specialities - collection of
     * specialities on this graduation
     *
     * @return collection
     */
    public function specialities()
    {
        return $this->hasMany(Speciality::class)->orderBy('abbr');
    }
}
