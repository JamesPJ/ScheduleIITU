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
}
