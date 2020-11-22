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

    /**
     * getTimeRangeAttribute
     * returns collection of ranged time when 
     * timetable starts and ends
     *
     * @return collection of time
     */
    public function getTimeRangeAttribute()
    {
        if (count($this->cells) > 0) {
            $minId = $this->cells[0]->time->id;
            $maxId = $this->cells[0]->time->id;
            foreach ($this->cells as $cell) {
                $curTimeId = $cell->time->id;
                if ($curTimeId > $maxId) {
                    $maxId = $curTimeId;
                }
                if ($curTimeId < $minId) {
                    $minId = $curTimeId;
                }
            }
            return Time::where('id', '>=', $minId)->where('id', '<=', $maxId)->get();
        }
        return [];
    }
}
