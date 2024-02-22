<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Score\StoreRequest;
use App\Http\Requests\Score\UpdateRequest;
use App\Models\Score;
use Symfony\Component\HttpFoundation\Response;

class ScoreController extends Controller
{
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $score = new Score();
        $score->amount = $validatedData['amount'];
        $score->course()
            ->associate($validatedData['course_id'])
            ->user()
            ->associate($request->user()->id)
            ->save();

        $response = [
            'message' => __('score.created'),
            'score' => $score,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function update(UpdateRequest $request, Score $score)
    {
        $validatedData = $request->validated();

        $score->update($validatedData);
        $score->refresh();

        $response = [
            'message' => __('score.updated'),
            'score' => $score,
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function destroy(Score $score)
    {
        $score->delete();

        $response = [
            'message' => __('score.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}
