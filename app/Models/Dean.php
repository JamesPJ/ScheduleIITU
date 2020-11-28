<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dean extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'password'
    ];


    /**
     * User - fullname, email
     *
     * @return User
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
