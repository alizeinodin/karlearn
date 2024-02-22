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
}
