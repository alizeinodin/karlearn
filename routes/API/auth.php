<?php

use App\Http\Controllers\API\v1\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::name('auth.')->group(function () {
        Route::post('/login', 'login')->name('login');
        Route::post('/register', 'register')->name('login');
        Route::post('/logout', 'logout')->name('logout');
    });
});
