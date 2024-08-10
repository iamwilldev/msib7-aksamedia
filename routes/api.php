<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('user', function(Request $request) {
        return $request->user();
    });
});
Route::post('login', [AuthController::class, 'login']);
// Route::post('register', [AuthController::class, 'register']);
