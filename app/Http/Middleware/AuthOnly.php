<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthOnly
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
        if (!isset($user))
            return redirect()->route('index')
                ->with('error', 'You need to authorize');

        return $next($request);
    }
}
