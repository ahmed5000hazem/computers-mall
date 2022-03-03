<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\AuthTrait;
class AuthController extends Controller
{
    use AuthTrait;
    public function signUp(Request $request) {
        $validator = Validator::make($request->all(), [
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "confirmed"]
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->getResponse("something went wrong there are some invalid data !!!", $errors->all(), true);
        }
        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return $this->getResponse("signed up successfully", $user);
    }
    public function login(Request $request)
    {
        $data = $request->only(["email", "password"]);
        $validator = Validator::make($request->all(), [
            "email" => ["required", "email"],
            "password" => ["required"]
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->getResponse("something went wrong there are some invalid data !!!", $errors->all(), true);
        }

        if (auth()->attempt($data, true)) {
            $token = auth()->user()->createToken("AUTH_TOKEN");
            
            return $this->getResponse(
                "logged in successfully", [
                "user" => auth()->user(), 
                "token" => $token->plainTextToken
            ], false);
        }
        return $this->getResponse("login failed", "invalid email or password", true);
    }
}