<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SelectController extends Controller
{
    public function select(Request $request)
    {
        return view('select');
    }
}
