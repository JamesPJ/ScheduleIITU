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
    * Dean instance
    * if exists
    *
    * @return Dean
    */
   public function dean()
   {
      return $this->hasOne(Dean::class);
   }

   /**
    * getExamsAttribute
    * exams of teacher or student
    *
    * @return collection of exams
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
    * getIsAdminAttribute
    * user role is deans
    *
    * @return boolean
    */
   public function getIsAdminAttribute()
   {
      return isset($this->dean);
   }

   /**
    * getIsOnlyAdminAttribute
    * only dean is set?
    *
    * @return boolean
    */
   public function getIsOnlyAdminAttribute()
   {
      return !isset($this->teacher) && !isset($this->student) && isset($this->dean);
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

   /**
    * getScheduleTypeAttribute
    * schedule type of user
    * teacher | group
    *
    * @return string
    */
   public function getScheduleTypeAttribute()
   {
      if ($this->isStudent)
         return 'group';
      if ($this->isTeacher)
         return 'teacher';
   }

   /**
    * getScheduleNameAttribute
    * schedule name of user
    * teacher name | implode of group name list of student
    *
    * @return string
    */
   public function getScheduleNameAttribute()
   {
      if ($this->isStudent)
         return $this->student->stringGroups;
      if ($this->isTeacher)
         return $this->fullname;
   }

   /**
    * getShortFullnameAttribute
    * gets shorted fullname like Name F.K.
    *
    * @return string
    */
   public function getShortFullnameAttribute()
   {
      $indexOfLastnameLetter = strrpos($this->fullname, ' ') + 1;
      $substringOfLastname = substr($this->fullname, $indexOfLastnameLetter + 1);
      return str_replace($substringOfLastname, '.', $this->fullname);
   }
}
