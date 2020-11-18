<?php

namespace App\Models;

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

   public function groups()
   {
      return $this->belongsToMany(Group::class);
   }

   public function student()
   {
      return $this->hasOne(Student::class);
   }

   public function teacher()
   {
      return $this->hasOne(Teacher::class);
   }

   public function getStringRolesAttribute()
   {
      return $this->roles->implode('name', ', ');
   }

   public function getIsUserAttribute()
   {
      return isset($this->student) || isset($this->teacher);
   }

   public function getIsAdminAttribute()
   {
      return str_contains($this->stringRoles, 'deans') || str_contains($this->stringRoles, 'admin');
   }
}
