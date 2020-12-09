<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NotUser
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
      if ($user->isOnlyAdmin)
         return redirect()->route('admin.login')
            ->with('error', 'You are not student or teacher!');

      return $next($request);
   }
}
