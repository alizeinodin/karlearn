<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Buy\BuyRequest;
use Symfony\Component\HttpFoundation\Response;

class BuyController extends Controller
{
    public function buy(BuyRequest $request)
    {
        $validatedData = $request->validated();

        $request
            ->user
            ->courses()
            ->associate($validatedData['course_id'])
            ->save();

        $response = [
            'message' => __('course.bought'),
            'user' => $request->user->load('courses'),
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function check()
    {
        // checking

    }
}
