<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\QuestionSet;
use Symfony\Component\HttpFoundation\Response;

class QuestionSetController extends Controller
{
    public function get(Course $course)
    {
        return jsonResponse($course->load('questionSets'), Response::HTTP_OK);
    }

    public function show(QuestionSet $questionSet)
    {
        return jsonResponse($questionSet, Response::HTTP_OK);
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
