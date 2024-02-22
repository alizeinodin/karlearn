<?php

function jsonResponse(mixed $response, int $status): \Illuminate\Http\JsonResponse
{
    $contents = [
        'version' => env('APP_VERSION'),
        'content' => $response,
    ];

    return response()
        ->json($contents, $status);
}
