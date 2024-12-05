<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckPasswordRequest;
use App\Http\Requests\CheckUserEmailRequest;
use App\Http\Requests\CheckUserRequest;
use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        # Посомтри что такое COMPACT
        return response(compact('users'));
    }

    public function store(CreateUserRequest $request)
    {
        $user = User::create($request->validated());
        return response($user, 201);
    }

    public function show(User $user)
    {
        return response($user);
    }

    /**
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        # А здесь нет валидации?
        $user->update($request->all());
        return response(["status"=>200]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response(["status"=>200]);
    }

    public function chechUserEmail(CheckUserEmailRequest $request){
        return response(['exists' => false]);
    }

    public function checkPassword(CheckPasswordRequest $request, User $user)
    {
        # Ты же проверяешь, check при возврате присылает true или false, и в твоем случае если они не верные,
        # то это false и сюда он не зайдет, надо отрицания ставить
        if (!Hash::check($request->current_password, $user->password)) {
            return response(['message' => 'Текущий пароль неверен'], 400);
        }

        return response(['message' => 'Пароль успешно изменен']);
    }

    public function checkUser(CheckUserRequest $request)
    {
        # Проверяем через метод attempt данные есть пользовтель или нет
        # $request->validated() - возвратит только поля которые есть у тебя в Request в rules
        if (!auth()->attempt($request->validated())) {
            return response()->json(['message' => 'Неверный пароль'], 401);
        }

        $user = auth()->user();
        $role = $user->role;
        if (!$role) {
            return response()->json(['message' => 'Роль не найдена'], 404);
        }
        return response(['role' => $user->role->name, 'status' => 200]);
    }

    public function getUserRole(User $user){
        return response(['role'=> $user->role->name]);
    }

}

