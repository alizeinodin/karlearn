<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionSet\UpdateRequest;
use App\Models\Course;
use App\Models\QuestionSet;
use Symfony\Component\HttpFoundation\Response;

class QuestionSetController extends Controller
{
    public function get(Course $course)
    {
        $questionSet = $course->questionSets()->inRandomOrder()->first();
        return jsonResponse($questionSet, Response::HTTP_OK);
    }

    public function show(QuestionSet $questionSet)
    {
        return jsonResponse($questionSet, Response::HTTP_OK);
    }

    public function update(UpdateRequest $request, QuestionSet $questionSet)
    {
        $validatedData = $request->validated();

        $questionSet->update($validatedData);
        $questionSet->refresh();

        $message = [
            'message' => __('questionSets.updated'),
            'questionSet' => $questionSet,
        ];

        return jsonResponse($message, Response::HTTP_OK);
    }

    public function destroy(QuestionSet $questionSet)
    {
        $questionSet->delete();

        $response = [
            'message' => __('questionSet.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }
}
