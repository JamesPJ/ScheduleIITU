<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Student;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
   public $timestamps = false;

   protected $fillable = [
      'fullname',
      'email'
   ];

   public function roles()
   {
      return $this->belongsToMany(Role::class);
   }

   public function student()
   {
      return $this->hasOne(Student::class);
   }

   public function getStringRolesAttribute()
   {
      return $this->roles->implode('name', ', ');
   }

   public function getIsUserAttribute()
   {
      return isset($this->student) || str_contains($this->stringRoles, 'teacher');
   }

   public function getIsAdminAttribute()
   {
      return str_contains($this->stringRoles, 'deans') || str_contains($this->stringRoles, 'admin');
   }
}
