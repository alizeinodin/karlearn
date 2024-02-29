<?php

namespace App\Http\Controllers\API\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $validatedData = $request->validated();

        if (Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']])) {
            $user = User::where(['email' => $validatedData['email']])->with('roles')->first();
            $token = $user->createToken($request->header('User-Agent'))->plainTextToken;
            $response = [
                'message' => __('login.success'),
                'user' => $user,
                'token' => $token
            ];
            return jsonResponse($response, Response::HTTP_OK);
        }

        $response = [
            'message' => __('login.error'),
        ];

        return jsonResponse($response, Response::HTTP_FORBIDDEN);
    }

    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();

        $user = User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'nickname' => $validatedData['nickname'] ?? $validatedData['username'],
            'password' => bcrypt($validatedData['password'])
        ]);

        $user->assignRole($validatedData['role'] ?? 'student');

        $token = $user->createToken($request->header('User-Agent'))->plainTextToken;
        $response = [
            'message' => __('register.success'),
            'token' => $token,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return jsonResponse([], Response::HTTP_NO_CONTENT);
    }
}
