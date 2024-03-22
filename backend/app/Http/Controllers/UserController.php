<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;



public function index()
{
    $departamentos = DB::select("SELECT DISTINCT departamento AS departamento FROM users");
    $cargos = DB::select("SELECT DISTINCT cargo AS cargos FROM users");
    $user = User::orderBy('id','desc')->paginate(8);

    return response()->json(['departamentos' =>  $departamentos, 'cargos' => $cargos, 'user' => $user]);
}

public function store(Request $request)
{
    return User::create($request->all());
}

public function update(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $validatedData = $request->validate([
        'usuario' => 'required',
        'primernombre' => 'required',
        'segundonombre' => 'required',
        'primerapellido' => 'required',
        'segundoapellido' => 'required',
        'departamento' => 'required',
        'cargo' => 'required',
        'status' => 'required',
        'email' => 'required|email',
    ]);

    $user->update($validatedData);

    return response()->json(['message' => 'User updated successfully', 'user' => $user]);

}

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();
    return 204;
}
}
