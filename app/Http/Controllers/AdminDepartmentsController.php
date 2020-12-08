<?php

namespace App\Http\Controllers;

use App\Models\Department;

class AdminDepartmentsController extends Controller
{
   /**
    * Departments API
    *
    * @return json array of departments
    */
   public function departments()
   {
      return response()->json(Department::all());
   }
}
