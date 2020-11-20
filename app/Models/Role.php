<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
   public $timestamps = false;

   /**
    * Users - collection of users 
    * with this role
    * 
    * @return collection of Users
    */
   public function users()
   {
      return $this->belongsToMany(User::class)->orderBy('fullname');
   }
}
