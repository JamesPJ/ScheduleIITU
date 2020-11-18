<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{

  public function home()
  {
    $data = $this->data();
    if (isset($data['user']))
      return redirect()->route('schedule');

    return view('home', $data);
  }
}
