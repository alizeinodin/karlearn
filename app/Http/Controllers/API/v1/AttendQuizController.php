<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AttendQuiz\ResponseToExamRequest;
use App\Jobs\TerminateExam;
use App\Models\AttendQuiz;
use App\Models\Course;
use App\Models\Quiz;
use Carbon\Carbon;
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
        $notCompleteExam = $request->user()->attendQuizzes()->whereNull('end_time')->where('quiz_id', '=', $course->quiz->id)->exists();

        if ($notCompleteExam)
            return jsonResponse([
                'message' => __('quiz.forbidden')
            ], Response::HTTP_FORBIDDEN);

        $latestAttendQuizInThisCourse = $request->user()->attendQuizzes()->where('quiz_id', '=', $course->quiz->id)->latest()->first();

        $constraintTimeExam = Carbon::make($latestAttendQuizInThisCourse->end_time);

        if (now()->diff($constraintTimeExam)->i < Carbon::make($latestAttendQuizInThisCourse->quiz->constraint_time)->minute)
            return jsonResponse([
                'message' => __('quiz.constraint_time')
            ], Response::HTTP_FORBIDDEN);

        $questionSetsNumbers = $course->questionSets()->count();
        $limitNumber = $questionSetsNumbers < 5 ? $questionSetsNumbers : 5;
        $questionSet = $course->questionSets()->inRandomOrder()->limit($limitNumber)->get();

        $attendQuiz = new AttendQuiz();
        $attendQuiz->quiz()->associate($course->quiz);
        $attendQuiz->user()->associate($request->user());
        $attendQuiz->save();
        $attendQuiz->questionSets()->attach($questionSet->getQueueableIds());
        $attendQuiz->save();

        $minutes = Carbon::make($course->quiz->time)->minute;

        TerminateExam::dispatch($attendQuiz)
            ->delay(now()->addMinutes($minutes));

        $response = [
            'message' => __('quiz.started'),
            'content' => [
                'time' => now()->addMinutes($minutes)->toTimeString(),
                'exam' => $attendQuiz->load('questionSets'),
            ],
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function responseToExam(ResponseToExamRequest $request, AttendQuiz $attendQuiz)
    {
        $validatedData = $request->validated();

        $corrects = 0;
        $wrongs = 0;

        for ($i = 0; $i < count($attendQuiz->questionSets); $i++) {
            if ($attendQuiz->questionSets[$i]->answer->id == $validatedData['answer'][$i]) {
                $corrects++;
            } else {
                $wrongs++;
            }
        }

        $score = ($corrects / ($corrects + $wrongs)) * 100;

        $attendQuiz->update([
            'end_time' => now(),
            'score' => $score,
            'status' => $score > $attendQuiz->quiz->passing_score ? 'pass' : 'rejected',
        ]);
        $attendQuiz->refresh();

        $response = [
            'message' => __('exam.submit'),
            'exam' => $attendQuiz,
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }
}
