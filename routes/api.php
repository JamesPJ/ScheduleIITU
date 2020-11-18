<?php

use App\Http\Controllers\SelectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')->group(function () {
   Route::get('graduations', [SelectController::class, 'graduations'])->name('graduations');
   Route::get('courses', [SelectController::class, 'courses'])->name('courses');
   Route::get('specialities', [SelectController::class, 'specialities'])->name('specialities');
   Route::get('groups', [SelectController::class, 'groups'])->name('groups');
});
