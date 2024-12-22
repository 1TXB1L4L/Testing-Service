<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::orderByDesc('created_at')->get();
        return Inertia::render('User', [
            'users' => UserResource::collection($user),
        ]);
    }
}
