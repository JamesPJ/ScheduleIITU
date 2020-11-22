<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'location',
        'has_projector',
        'room_type_id'
    ];

    /**
     * Room type
     * Example: б - Байзак
     *          Computer class
     *          etc
     *
     * @return RoomType
     */
    public function room_type()
    {
        return $this->belongsTo(RoomType::class);
    }

    /**
     * Exams in this room
     *
     * @return collection of Exams
     */
    public function exams()
    {
        return $this->hasMany(Exam::class)->orderBy('date_time')
            ->whereDate('date_time', '>=', Carbon::today()->subDays(30));
    }

    /**
     * Cells - collection of cells
     * in this room
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
