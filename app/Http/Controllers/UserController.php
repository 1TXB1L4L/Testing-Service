<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderByDesc('created_at')->get();
        return Inertia::render('User', [
            'users' => UserResource::collection($users),
        ]);
    }

    public function updateStatus(User $user, Request $request)
    {
        $request->validate([
            'status' => 'required|lowercase|in:block,active',
        ]);

        $user->is_active = $request->status === 'active';
        $user->save();

        return back();
    }

    public function destroy(User $user)
    {
        if ($user->avatar && file_exists(public_path($user->avatar))) {
            unlink(public_path($user->avatar));
        }

        $user->delete();
        return back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'image' => 'nullable|file|mimes:png,jpg,jpeg,gif,svg|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = 'uploads/profiles/' . $filename;
            $file->move(public_path('uploads/profiles'), $filename);
        }

        $validated['avatar'] = $path;
        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        return back();
    }

    public function update(User $user, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'image' => 'nullable|file|mimes:png,jpg,jpeg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = 'uploads/profiles/' . $filename;

            // Delete old image if exists
            if ($user->avatar && file_exists(public_path($user->avatar))) {
                unlink(public_path($user->avatar));
            }

            $file->move(public_path('uploads/profiles'), $filename);
            $validated['avatar'] = $path;
        }

        $user->update($validated);

        return back();
    }
}
