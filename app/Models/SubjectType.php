<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectType extends Model
{
    public $timestamps = false;

    /**
     * Cells - collection of cells
     * of this subject type
     *
     * @return collection of Cells
     */
    public function cells()
    {
        return $this->hasMany(Cell::class);
    }
}
