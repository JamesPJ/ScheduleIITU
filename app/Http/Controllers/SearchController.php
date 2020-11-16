<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function filter(Request $request)
    {
        $data = $this->data();
        $data['word'] = $request->input('keyword');

        return view('search', $data);
    }
}
