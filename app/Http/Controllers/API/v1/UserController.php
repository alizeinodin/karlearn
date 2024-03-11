<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function get(Request $request)
    {
        return jsonResponse($request->user(), Response::HTTP_OK);
    }

    public function courses(Request $request)
    {
        $courses = $request
            ->user()
            ->courses()
            ->paginate();

        $response = [
            'courses' => $courses,
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }
}
