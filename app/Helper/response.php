<?php

function jsonResponse(array $response, int $status): \Illuminate\Http\JsonResponse
{
    $contents = [
        'version' => env('version'),
        'content' => $response,
    ];

    return response()
        ->json($contents, $status);
}
