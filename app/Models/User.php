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

   public function student()
   {
      return $this->hasOne(Student::class);
   }

   public function teacher()
   {
      return $this->hasOne(Teacher::class);
   }

   public function getExamsAttribute()
   {
      if ($this->isStudent)
         return $this->student->exams;
      else if ($this->isTeacher)
         return $this->teacher->exams;
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

   public function getIsStudentAttribute()
   {
      return isset($this->student);
   }

   public function getIsTeacherAttribute()
   {
      return isset($this->teacher);
   }
}
