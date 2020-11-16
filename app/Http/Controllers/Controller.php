<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function data()
    {
        $data = [];

        // Flash Errors
        if (session('error')) {
            $data['error'] = session('error');
        }

        // Flash Success
        if (session('success')) {
            $data['success'] = session('success');
        }

        // If user logged in
        if (session('userName')) {
            $data['userFullname'] = session('userName');
            $data['userEmail'] = session('userEmail');
        }

        return $data;
    }
}
