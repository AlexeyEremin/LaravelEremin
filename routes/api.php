<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('/app')->group(function () {
    Route::prefix('/check')->group(function () {
        Route::get('/chechEmail', [UserController::class, 'chechUserEmail']);
        # Поле называем {user} как переменная, так как в нее будет помещена и получена модель
        Route::post('/checkPassword/{user}', [UserController::class, 'checkPassword']);
        Route::post('/user', [UserController::class, 'checkUser']);
    });
    # Тоже самое что и выше писал
    Route::get('/get/role/{user}', [UserController::class, 'getUserRole']);
});


# Ресурс должен иметь название, модели с которой он будет взаимодействовать.
# Так как apiResource реализует CRUD методы (Create Read Update Delete)
Route::apiResource("/app", UserController::class)->parameter('app', 'user');
