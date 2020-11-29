<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * login - login page for 
     * admin panel
     *
     * @return view
     */
    public function login()
    {
        $data = $this->data();
        $logged = session('logged');
        if (isset($logged) && $logged)
            return redirect()->route('admin.dashboard');

        return view('admin.login', $data);
    }

    /**
     * ! Method: [POST ONLY]
     * auth - missmatching password
     * of the dean
     *
     * @param  Request $request
     * @return redirect
     */
    public function auth(Request $request)
    {
        $data = $this->data();
        $password = $request->input('password');
        if (Hash::check($password, $data['user']->dean->password)) {
            session(['logged' => true]);
            return redirect()->route('admin.dashboard');
        }
        return redirect()->back()
            ->with('error', 'Password is wrong!');
    }

    /**
     * dashboard - main page
     * of the admin panle
     *
     * @return view
     */
    public function dashboard()
    {
        $data = $this->data();

        return view('admin.dashboard', $data);
    }
}
