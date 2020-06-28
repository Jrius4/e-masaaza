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
Route::middleware('auth:api')->get('/users',function(){
    return response()->json(['name'=>Auth::user()]);
});
Route::post('register', 'API\UserController@register');
Route::post('login', 'API\UserController@login')->name('login');
Route::middleware('auth:api')->group(function(){
    Route::post('logout', 'API\UserController@logout');
    Route::resource('files', 'API\FileController');
    //users
    Route::get('persons','UserController@index');
    Route::post('persons','UserController@store');
    Route::get('persons/{person}','UserController@show');
    Route::post('persons/{person}','UserController@update');
    Route::delete('persons/{person}','UserController@destory');
    Route::get('roles','UserController@getRoles');
    Route::get('search-user','UserController@searchUser');
    Route::get('password-user','UserController@passwordUser');

});
Route::post('/generate-token','API\UserController@generateToken');
Route::get('/players','PlayerController@index');
Route::post('/players','PlayerController@store');
Route::post('/players/{id}','PlayerController@update');
Route::delete('/players/{player}','PlayerController@destroy');
Route::get('/players/{player}','PlayerController@show');

Route::get('/clubs','ClubController@index');
Route::post('/clubs','ClubController@store');
Route::post('/clubs/{id}','ClubController@update');
Route::delete('/clubs/{id}','ClubController@destroy');
Route::get('/clubs/{id}','ClubController@show');


