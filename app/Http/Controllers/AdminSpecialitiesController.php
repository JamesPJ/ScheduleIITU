<?php

namespace App\Http\Controllers;

use App\Models\Speciality;

class AdminSpecialitiesController extends Controller
{
   /**
    * Specialities API
    *
    * @return json array of specialities
    */
   public function specialities()
   {
      return response()->json(Speciality::with('graduation')->get());
   }
}
