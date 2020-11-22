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

   /**
    * roles of user
    *
    * @return collection of roles
    */
   public function roles()
   {
      return $this->belongsToMany(Role::class);
   }

   /**
    * Student instance
    * if exists
    *
    * @return Student
    */
   public function student()
   {
      return $this->hasOne(Student::class);
   }

   /**
    * Teacher instance
    * if exists
    *
    * @return Teacher
    */
   public function teacher()
   {
      return $this->hasOne(Teacher::class);
   }

   /**
    * getExamsAttribute
    * exams of teacher or student
    *
    * @return array|collection of exams
    */
   public function getExamsAttribute()
   {
      if ($this->isStudent)
         return $this->student->exams;
      else if ($this->isTeacher)
         return $this->teacher->exams;
   }

   /**
    * getStringRolesAttribute
    * implodes name of roles with
    * delimiter ", "
    *
    * @return String
    */
   public function getStringRolesAttribute()
   {
      return $this->roles->implode('name', ', ');
   }

   /**
    * getIsUserAttribute
    * user role is teacher or student
    *
    * @return boolean
    */
   public function getIsUserAttribute()
   {
      return isset($this->student) || isset($this->teacher);
   }

   /**
    * getIsAdminAttribute
    * user role is admin or deans
    *
    * @return boolean
    */
   public function getIsAdminAttribute()
   {
      return str_contains($this->stringRoles, 'deans') || str_contains($this->stringRoles, 'admin');
   }

   /**
    * getIsStudentAttribute
    * user is set?
    *
    * @return boolean
    */
   public function getIsStudentAttribute()
   {
      return isset($this->student);
   }

   /**
    * getIsTeacherAttribute
    * teacher is set?
    *
    * @return boolean
    */
   public function getIsTeacherAttribute()
   {
      return isset($this->teacher);
   }

   /**
    * getCellsAttribute
    * returns collection of cells 
    * depending on isTeacher of isStudent
    *
    * @return collection of cells
    */
   public function getCellsAttribute()
   {
      if ($this->isStudent)
         return $this->student->cells;
      if ($this->isTeacher)
         return $this->teacher->cells;
   }

   public function getScheduleTypeAttribute()
   {
      if ($this->isStudent)
         return 'group';
      if ($this->isTeacher)
         return 'teacher';
   }

   public function getScheduleNameAttribute()
   {
      if ($this->isStudent)
         return $this->student->stringGroups;
      if ($this->isTeacher)
         return $this->fullname;
   }
}
