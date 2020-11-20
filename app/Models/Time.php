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
}
