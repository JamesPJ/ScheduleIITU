<?php

use App\Http\Controllers\SelectController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
   Route::get('graduations', [SelectController::class, 'graduations'])->name('graduations');
   Route::get('courses', [SelectController::class, 'courses'])->name('courses');
   Route::get('specialities', [SelectController::class, 'specialities'])->name('specialities');
   Route::get('groups', [SelectController::class, 'groups'])->name('groups');
});
