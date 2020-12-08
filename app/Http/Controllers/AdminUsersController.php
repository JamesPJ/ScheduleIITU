<?php

namespace App\Http\Controllers;

use App\Models\Dean;
use App\Models\Department;
use App\Models\Role;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUsersController extends Controller
{
   /**
    * Users API
    *
    * @return json array of users
    */
   public function users()
   {
      return response()->json(User::with('roles')->orderBy('id', 'desc')->get());
   }

   /**
    * Students API
    *
    * @return json array of students
    */
   public function students()
   {
      return response()->json(Student::with('user.roles', 'groups')->get());
   }

   /**
    * Teachers API
    *
    * @return json array of teachers
    */
   public function teachers()
   {
      return response()->json(Teacher::with('user.roles', 'department', 'degrees')->get());
   }

   /**
    * Deans API
    *
    * @return json array of deans
    */
   public function deans()
   {
      return response()->json(Dean::with('user.roles')->get());
   }


   /**
    * ! Method: [ POST ONLY ]
    * addUser - adding user
    *
    * @return redirect
    */
   public function addUser(Request $request)
   {
      $fullname = $request->input('fullname');
      $email = $request->input('email');
      $role = $request->input('role');
      $userCheck = User::where('email', $email)->get();
      if (count($userCheck) > 0)
         return redirect()->route('admin.users')
            ->with('error', 'User with this email already exists!');
      $user = User::create(['fullname' => $fullname, 'email' => $email]);
      if ($role == 'student') {
         $student = Student::create(['user_id' => $user->id]);
         $user->student()->save($student);
         $user->roles()->attach(Role::where('name', 'student')->first()->id);
         return redirect()->route('admin.users')
            ->with('success', 'Student added successfully!');
      } else if ($role == 'teacher') {
         $department_id = $request->input('department_id');
         $teacher = Teacher::create(['user_id' => $user->id, 'department_id' => $department_id]);
         $user->teacher()->save($teacher);
         $user->roles()->attach(Role::where('name', 'teacher')->first()->id);
         return redirect()->route('admin.users')
            ->with('success', 'Teacher added successfully!');
      } else if ($role == 'dean') {
         $password = Hash::make($request->input('password'));
         $dean = Dean::create(['user_id' => $user->id, 'password' => $password]);
         $user->dean()->save($dean);
         $user->roles()->attach(Role::where('name', 'deans')->first()->id);
         return redirect()->route('admin.users')
            ->with('success', 'Dean added successfully!');
      }
      return redirect()->route('admin.users')
         ->with('error', 'Something went wrong!');
   }


   /**
    * ! Method: [ POST ONLY ]
    * editUser - editing user
    *
    * @return redirect
    */
   public function editUser()
   {
   }


   /**
    * ! Method: [ POST ONLY ]
    * deleteUser - deleting user
    *
    * @return redirect
    */
   public function deleteUser()
   {
   }
}
