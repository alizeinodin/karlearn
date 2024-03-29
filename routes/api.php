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
                Route::get('/sort/{category}/buy', 'sortByBuy')
                    ->name('sort.buy');
                Route::get('/sort/{category}/time', 'sortByTime')
                    ->name('sort.time');
                Route::post('/search', 'search')
                    ->name('search');
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
Route::controller(\App\Http\Controllers\API\v1\CommentController::class)->group(function () {
    Route::name('comments.')->group(function () {
        Route::prefix('/comments')->group(function () {
            Route::middleware([])->group(function () {
                Route::get('/get/{course}/', 'get')
                    ->name('get');
            });
        });
    });
});

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
                Route::get('/courses', 'courses')->name('courses');
            });
        });
    });
});

Route::controller(\App\Http\Controllers\API\v1\BuyController::class)->group(function () {
    Route::name('purchases.')->group(function () {
        Route::prefix('/buy')->group(function () {
            Route::middleware('auth:sanctum')->group(function () {
                Route::post('/', 'buy')->name('buy');
            });
        });
    });
});

Route::apiResource('questions', \App\Http\Controllers\API\v1\QuestionController::class)
    ->except([
        'index',
    ]);
Route::apiResource('question_sets', \App\Http\Controllers\API\v1\QuestionSetController::class)
    ->only([
        'show',
        'update',
        'destroy',
    ]);

Route::controller(\App\Http\Controllers\API\v1\QuestionSetController::class)->group(function () {
    Route::name('question_sets.')->group(function () {
        Route::prefix('/question_sets')->group(function () {
            Route::middleware('auth:sanctum')->group(function () {
                Route::get('/get/{course}', 'get')->name('get');
            });
        });
    });
});

Route::apiResource('quizzes', \App\Http\Controllers\API\v1\QuizController::class)
    ->except([
        'index',
    ]);

Route::controller(\App\Http\Controllers\API\v1\AttendQuizController::class)->group(function () {
    Route::name('exams.')->group(function () {
        Route::prefix('/exams')->group(function () {
            Route::middleware('auth:sanctum')->group(function () {
                Route::get('/', 'getQuizzesResult')->name('get-quizzes-result');
                Route::get('/latest', 'getLatestQuizzesResult')->name('get-latest-quizzes-result');
                Route::get('/start/{course}', 'startExam')->name('start-exam');
                Route::get('/report/{course}', 'report')->name('report');
                Route::post('/response/{attend_quiz}', 'responseToExam')->name('response');
            });
        });
    });
});
