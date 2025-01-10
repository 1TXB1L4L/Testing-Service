<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::resource('users', UserController::class)->except(['update']);
Route::post('/users/{user}', [UserController::class, 'updateStatus'])->name('users.status');
Route::post('/users/{user}/update', [UserController::class, 'update'])->name('users.update');