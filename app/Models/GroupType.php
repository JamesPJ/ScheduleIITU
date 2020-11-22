<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupType extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'abbr'
    ];

    /**
     * Groups - collection of groups
     * with this type of group
     *
     * @return collection of groups
     */
    public function groups()
    {
        return $this->hasMany(Group::class)->orderBy('name');
    }
}
