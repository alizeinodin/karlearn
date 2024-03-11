<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Quiz\StoreRequest;
use App\Http\Requests\Quiz\UpdateRequest;
use App\Models\Course;
use App\Models\Quiz;
use Symfony\Component\HttpFoundation\Response;

class QuizController extends Controller
{
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $quiz = new Quiz();
        $quiz->title = $validatedData['title'];
        $quiz->description = $validatedData['description'];
        $quiz->time = $validatedData['time'];
        $quiz->constraint_time = $validatedData['constraint_time'];

        $quiz->course()
            ->associate($validatedData['course_id']);
        $quiz->save();

        $response = [
            'message' => __('quiz.created'),
            'quiz' => $quiz,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function show(Quiz $quiz)
    {
        return jsonResponse($quiz, Response::HTTP_OK);
    }

    public function update(UpdateRequest $request, Quiz $quiz)
    {
        $validatedData = $request->validated();

        $quiz->update($validatedData);
        $quiz->refresh();

        $response = [
            'message' => __('quiz.updated'),
            'quiz' => $quiz,
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        $response = [
            'message' => __('quiz.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}
