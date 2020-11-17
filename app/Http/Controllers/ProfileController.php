<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function profile()
    {
        $data = $this->data();
        $data['footer'] = false;

        return view('profile', $data);
    }
}
