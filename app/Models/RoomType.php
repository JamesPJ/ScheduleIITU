<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    /**
     * Rooms with this
     * type of room
     *
     * @return collection of rooms
     */
    public function rooms()
    {
        return $this->hasMany(Room::class)->orderBy('location');
    }
}
