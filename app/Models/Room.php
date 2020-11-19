<?php

namespace App\Models;

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

    public function room_type()
    {
        return $this->belongsTo(RoomType::class);
    }
}
