<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SelectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Routing\RouteGroup;

Route::get('/', [HomeController::class, 'home'])->name('index');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/oidc', [AuthController::class, 'openID'])->name('openID');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/select', [SelectController::class, 'select'])->name('select');


Route::prefix('profile')->group(function () {
   Route::name('profile.')->group(function () {

      Route::get('', [ProfileController::class, 'profile'])->name('index');

      Route::prefix('group')->group(function () {
         Route::name('group.')->group(function () {
            Route::post('add', [ProfileController::class, 'groupAdd'])->name('add');
            Route::post('delete', [ProfileController::class, 'groupDelete'])->name('delete');
         });
      });
   });
});



Route::get('/search', [SearchController::class, 'filter'])->name('search');
Route::get('/schedule', [ScheduleController::class, 'schedule'])->name('schedule');
Route::get('/timetable/{id}', [ScheduleController::class, 'timetable'])->name('timetable');
