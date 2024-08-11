<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\UserResource;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::all();

            return response(new DefaultResource(true, 'Successfully fetched users', [
                'users' => UserResource::collection($users),
            ], $users), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            return response(new DefaultResource(true, 'Successfully fetched user', [
                'user' => new UserResource($user),
            ]), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $data = $request->validated();

            $user->update($data);

            return response(new DefaultResource(true, 'Successfully updated user', []), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
