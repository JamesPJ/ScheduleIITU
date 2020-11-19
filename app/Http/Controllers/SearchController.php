<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{

    /**
     * Filter - search page
     *
     * @param  Request $request
     * @return view
     */
    public function filter(Request $request)
    {
        $data = $this->data();
        $data['word'] = $request->input('keyword');

        return view('search', $data);
    }
}
