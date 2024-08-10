<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\DefaultResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();

            if (!Auth::attempt($data)) {
                return response(new DefaultResource(false, 'Invalid credentials', []), 401);
            }

            $user = Auth::user();
            $accessToken = $user->createToken('authToken')->plainTextToken;

            return response(new DefaultResource(true, 'Successfully logged in', [
                'token' => $accessToken, 
                $user->username => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'phone' => $user->phone,
                    'email' => $user->email,
                ]
            ]), 200);
        } catch (\Throwable $e) {
            if ($request->expectsJson()) {
                return response(new DefaultResource(false, $e->getMessage(), []), 500);
            }
            abort(500, $e->getMessage());
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();

            $user = User::create([
                'name' => $data['name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'password' => bcrypt($data['password']),
            ]);

            $accessToken = $user->createToken('authToken')->plainTextToken;

            return response(new DefaultResource(true, 'Successfully registered', [
                'access_token' => $accessToken,
                $user->username => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'phone' => $user->phone,
                    'email' => $user->email,
                ]
            ]), 201);
        } catch (\Throwable $e) {
            if ($request->expectsJson()) {
                return response(new DefaultResource(false, $e->getMessage(), []), 500);
            }
            abort(500, $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out',
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
