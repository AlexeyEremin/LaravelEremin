<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->group(function () {
    Route::prefix('/check')->group(function () {
        Route::get('/chechEmail', [UserController::class, 'chechUserEmail']);
        Route::post('/checkPassword/{id}', [UserController::class, 'checkPassword']);
        Route::post('/user', [UserController::class, 'checkUser']);
    });
    Route::get('/get/role/{id}', [UserController::class, 'getUserRole']);
});


Route::apiResource("/app", UserController::class);
