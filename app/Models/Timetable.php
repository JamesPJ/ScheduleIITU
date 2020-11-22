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

    /**
     * Group of this
     * timetable
     *
     * @return Group
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Cells - collection of cells
     * of this timetable
     *
     * @return collection of Cells
     */
    public function cells()
    {
        return $this->hasMany(Cell::class);
    }
}
