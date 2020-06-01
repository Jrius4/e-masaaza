<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    return $request->user();
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
