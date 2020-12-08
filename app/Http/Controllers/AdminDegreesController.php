<?php

namespace App\Http\Controllers;

use App\Models\Degree;

class AdminDegreesController extends Controller
{
   /**
    * Degrees API
    *
    * @return json array of degrees
    */
   public function degrees()
   {
      return response()->json(Degree::all());
   }
}
