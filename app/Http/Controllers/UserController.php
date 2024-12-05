<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role_id' => 'nullable|integer'
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'role_id' => $validatedData['role_id'],
            ]);

            return response()->json($user, 201);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        return response()->json(User::find($id));
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json(["status"=>200]);
    }

    public function destroy(string $id)
    {
        User::destroy($id);
        return response()->json(["status"=>200]);
    }

    public function chechUserEmail(Request $request){
        $request->validate([
            'email' => 'required|email:rfc,dns',
        ]);
        $exists = User::where(DB::raw('BINARY email'), $request->email)->exists();
        return response()->json(['exists' => $exists], 200);
    }

    public function checkPassword(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Пользователь не найден'], 404);
        }

        $request->validate([
            'current_password' => 'required|string|min:8',
        ]);
        if (Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Текущий пароль неверен'], 400);
        }

        return response()->json(['message' => 'Пароль успешно изменен'], 200);
    }

    public function checkUser(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:8'
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'Пользователь не найден'], 404);
        }

        $passwordExists = Hash::check($validatedData['password'], $user->password);
        if (!$passwordExists) {
            return response()->json(['message' => 'Неверный пароль'], 401);
        }

        $role = Role::where('id', $user->role_id)->first(['name']);
        if (!$role) {
            return response()->json(['message' => 'Роль не найдена'], 404);
        }
        return response()->json(['role' => $role->name, 'status' => 200]);
    }

    public function getUserRole(string $id){
        $user = User::where('id', $id)->first(['role_id']);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $role = Role::where('id', $user->role_id)->first(['name']);
        return response()->json(['role'=> $role->name]);
    }

}

