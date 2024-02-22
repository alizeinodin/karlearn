<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

require_once 'API/auth.php';

Route::apiResource('courses', \App\Http\Controllers\CourseController::class);

Route::controller(\App\Http\Controllers\CourseController::class)->group(function () {
    Route::name('courses.')->group(function () {
        Route::prefix('/courses')->group(function () {
            Route::middleware([])->group(function () {
                Route::get('/{course}/quiz', 'showQuiz')
                    ->name('quiz');
            });
        });
    });
});


Route::apiResource('sections', \App\Http\Controllers\API\Course\SectionController::class)
    ->except([
        'index',
    ]);

Route::controller(\App\Http\Controllers\API\Course\SectionController::class)->group(function () {
    Route::name('sections.')->group(function () {
        Route::prefix('/sections')->group(function () {
            Route::middleware([])->group(function () {
                Route::get('/{section}/stream', 'streamVideo')
                    ->name('stream');
                Route::get('/{section}/download/video', 'downloadVideo')
                    ->name('download.video');
                Route::get('/{section}/download/resources', 'downloadResources')
                    ->name('download.resources');
            });
        });
    });
});

Route::apiResource('categories', \App\Http\Controllers\API\v1\CategoryController::class);
Route::apiResource('comments', \App\Http\Controllers\API\v1\CommentController::class)
    ->except([
        'index',
    ]);
Route::apiResource('scores', \App\Http\Controllers\API\v1\ScoreController::class)
    ->except([
        'index',
        'show',
    ]);
Route::controller(\App\Http\Controllers\API\v1\UserController::class)->group(function () {
    Route::name('users.')->group(function () {
        Route::prefix('/users')->group(function () {
            Route::middleware('auth:sanctum')->group(function () {
                Route::get('/get', 'get')->name('get');
            });
        });
    });
});
