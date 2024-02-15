<?php

use Illuminate\Http\Request;
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
Route::apiResource('sections', \App\Http\Controllers\API\Course\SectionController::class)
    ->except([
        'index',
    ]);
Route::apiResource('categories', \App\Http\Controllers\API\v1\CategoryController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
