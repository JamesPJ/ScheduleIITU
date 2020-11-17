<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SelectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;

Route::get('/', [HomeController::class, 'home'])->name('index');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/oidc', [AuthController::class, 'openID'])->name('openID');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/search', [SearchController::class, 'filter'])->name('search');
Route::get('/profile', [ProfileController::class, 'profile'])->name('profile');
Route::get('/select', [SelectController::class, 'select'])->name('select');
Route::post('/select', [SelectController::class, 'select'])->name('group-select');
Route::get('/schedule', [ScheduleController::class, 'schedule'])->name('schedule');
Route::get('/timetable/{id}', [ScheduleController::class, 'timetable'])->name('timetable');
