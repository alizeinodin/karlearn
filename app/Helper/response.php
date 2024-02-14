<?php

function jsonResponse(mixed $response, int $status): \Illuminate\Http\JsonResponse
{
    $contents = [
        'version' => env('version'),
        'content' => $response,
    ];

    return response()
        ->json($contents, $status);
}
