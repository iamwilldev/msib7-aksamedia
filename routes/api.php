<?php

use App\Http\Controllers\NilaiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('nilaiRT', [NilaiController::class, 'nilaiRT']);
Route::get('nilaiST', [NilaiController::class, 'nilaiST']);
