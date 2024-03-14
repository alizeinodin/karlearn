<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AttendQuiz\ResponseToExamRequest;
use App\Models\AttendQuiz;
use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

class AttendQuizController extends Controller
{
    public function getQuizzesResult(Request $request)
    {
        $attendQuizzes = $request->user()->attendQuizzes()->paginate();

        return jsonResponse($attendQuizzes, Response::HTTP_OK);
    }

    public function getLatestQuizzesResult(Request $request)
    {
        $latestAttendQuiz = $request->user()->attendQuizzes()->latest()->first();

        return jsonResponse($latestAttendQuiz, Response::HTTP_OK);
    }

    public function startExam(Request $request, Course $course)
    {
        # TODO Add validation for start an exam

        $questionSetsNumbers = $course->questionSets()->count();
        $limitNumber = $questionSetsNumbers < 5 ? $questionSetsNumbers : 5;
        $questionSet = $course->questionSets()->inRandomOrder()->limit($limitNumber)->get();

        $attendQuiz = new AttendQuiz();
        $attendQuiz->quiz()->associate($course->quiz);
        $attendQuiz->user()->associate($request->user());
        $attendQuiz->questionSet()->associate($questionSet);
        $attendQuiz->save();

        $response = [
            'message' => __('quiz.started'),
            'content' => [
                'time' => $course->quiz()->time,
                'quiz' => $attendQuiz,
            ],
        ];

        # TODO Add job for set end time after legal time of course

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function responseToExam(ResponseToExamRequest $request, AttendQuiz $attendQuiz)
    {
        # TODO validation for not exist score for quiz
        $validatedData = $request->validated();

        if ($validatedData['answer'] === $attendQuiz->questionSet()->answer->id) {
            $attendQuiz->update([
                'score' => 100,
                'status' => 'pass',
            ]);
        }

        $attendQuiz->update([
            'end_time' => now(),
        ]);
    }
}
