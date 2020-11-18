<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RefreshUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = session('user');
        if (isset($user)) {
            $user = $user->fresh();
            session(['user' => $user]);
        }
        return $next($request);
    }
}
