<?php

namespace App\Http\Controllers;

use App\Models\Dean;
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
     * of the admin panel
     *
     * @return view
     */
    public function dashboard()
    {
        $data = $this->data();

        return view('admin.dashboard', $data);
    }

    /**
     * users - managing users (students, teacher)
     * of the admin panel
     *
     * @return view
     */
    public function users()
    {
        $data = $this->data();

        return view('admin.users', $data);
    }

    /**
     * groups - managing groups
     * of the admin panel
     *
     * @return view
     */
    public function groups()
    {
        $data = $this->data();

        return view('admin.groups', $data);
    }

    /**
     * departments - managing departments
     * of the admin panel
     *
     * @return view
     */
    public function departments()
    {
        $data = $this->data();

        return view('admin.departments', $data);
    }

    /**
     * timetables - managing timetables
     * of the admin panel
     *
     * @return view
     */
    public function timetables()
    {
        $data = $this->data();

        return view('admin.timetables', $data);
    }

    /**
     * exams - managing exams
     * of the admin panel
     *
     * @return view
     */
    public function exams()
    {
        $data = $this->data();

        return view('admin.exams', $data);
    }

    /**
     * settings - managing settings
     * of the admin panel
     *
     * @return view
     */
    public function settings()
    {
        $data = $this->data();

        return view('admin.settings', $data);
    }

    /**
     * ! Method : [POST ONLY]
     * changePassword - changes password
     * of dean
     *
     * @param  Request $request
     * @return redirect
     */
    public function changePassword(Request $request)
    {
        $user = session('user');
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');
        $newRepeatPassword = $request->input('new_repeat_password');
        if ($user != null) {
            if ($newPassword == $newRepeatPassword) {
                if (Hash::check($oldPassword, $user->dean->password)) {
                    $dean = Dean::find($user->dean->id);
                    $dean->password = Hash::make($newPassword);
                    $dean->save();
                    return redirect()->route('admin.settings')
                        ->with('success', 'Password changed');
                }
                return redirect()->route('admin.settings')
                    ->with('error', 'Incorrect old password');
            }
            return redirect()->route('admin.settings')
                ->with('error', 'Repeated password don\'t match.');
        }
        return redirect()->route('admin.login')
            ->with('error', 'Login firstly!');
    }
}
