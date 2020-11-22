<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'start',
        'end'
    ];

    /**
     * Cells - collection of cells
     * at this time
     *
     * @return collection of Cells
     */
    public function cells()
    {
        return $this->hasMany(Cell::class);
    }

    /**
     * getStartStrAttribute
     * returns only HH:MM
     * 
     * @return string
     */
    public function getStartStrAttribute()
    {
        return substr($this->start, 0, -3);
    }

    /**
     * getEndStrAttribute
     * returns only HH:MM
     *
     * @return string
     */
    public function getEndStrAttribute()
    {
        return substr($this->end, 0, -3);
    }
}
