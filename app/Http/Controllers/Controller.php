<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\HttpFoundation\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Data - loads flash messages and user if logged in
     *
     * @return void
     */
    public function data()
    {
        $data = [];
        if (session('error')) {
            $data['error'] = session('error');
        }
        if (session('success')) {
            $data['success'] = session('success');
        }
        if (session('user')) {
            $data['user'] = session('user');
        }
        if (strpos(request()->route()->getName(), 'profile') !== false) {
            $data['footer'] = false;
        }

        return $data;
    }
}
