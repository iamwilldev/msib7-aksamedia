<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DivisionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
// Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::get('divisions', [DivisionController::class, 'show']);
    Route::get('user', function(Request $request) {
        return $request->user();
    });
});
