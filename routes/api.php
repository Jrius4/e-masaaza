<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user_id = Auth()->user()->id;
    $user = User::with('roles')->find($user_id);
    // return $request->user();
    return $user;
});
Route::get('/users',function(){
    return response()->json(['name'=>Auth::user()]);
});
Route::post('register', 'API\UserController@register');
Route::post('login', 'API\UserController@login');
Route::middleware('auth:api')->group(function(){
    Route::post('logout', 'API\UserController@logout');
    Route::resource('files', 'API\FileController');

});
Route::post('/generate-token','API\UserController@generateToken');
