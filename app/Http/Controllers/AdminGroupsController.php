<?php

namespace App\Http\Controllers;

use App\Models\Group;

class AdminGroupsController extends Controller
{
   /**
    * Groups API
    *
    * @return json array of groups
    */
   public function groups()
   {
      return response()->json(Group::with('group_type')->with('speciality')->get());
   }
}
