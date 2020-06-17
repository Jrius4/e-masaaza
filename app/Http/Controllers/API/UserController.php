<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Token;
use Faker\Factory;
use Faker\Generator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public function register(Request $request){
        $rules = array(
            'name'=>'required',
            'email'=>'email|unique:users',
            'password'=>'required',
            'token_key'=>'required',
            'password_confirmation'=>'required|same:password',
        );

        $input = $request->all();

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'message'=>$validator->errors()
            ];

            return response()->json($response,403);
        }

        $input['password'] = bcrypt($input['password']);


        $token = new Token();
        if($token->where('token_key',$input['token_key'])->count()>0){
            $user = User::create([
                'name'=>$request('name'),
                'password'=>$request('password'),
            ]);
        }

        $success['access_token'] = $user->createToken('Laravel Passport Create Access Token')->accessToken;
        $success['name']=$user->name;

        $response = array(
            'success'=>true,
            'data'=>$success,
            'message'=>'User register Successfully',
        );

        return response()->json($response,200);


    }
    public function addMember(Request $request){

    }
    public function generateToken(Request $request){
        $output = null;
        $gen_token =  Str::random(8);
        $class_name = $request->class_name;
        $position = $request->position;
        $token_key = $gen_token;

        $token = new Token();
        $countGen = $token->where('class_name',$class_name)->count();
        if($countGen > 0){
            if($token->where('position',$position)->count()>0){
                $token->where('position',$position)->first()->update([
                    'token_key'=>$token_key,
                ]);
            }
        }
        else{
            $token->create([
                'class_name'=>$class_name,
                'position'=>$position,
                'token_key'=>$token_key,
            ]);
        }

        $output = $token->where('position',$position)->where('class_name',$class_name)->first();

        return $output;
    }

    public function login()
    {
        // return response()->json($request->all());
        /**
        $http = new Client();
        try {
            $response = $http->post(config('services.passport.login_endpoint'),[
                'form_params'=>[
                    'grant_type'=>'password',
                    'client_id'=>config('services.passport.client_id'),
                    'client_secret'=>config('services.passport.client_secret'),
                    'username'=>$request->email,
                    'password'=>$request->password,
                ]
            ]);

            return $response->getBody();
        } catch (BadResponseException $e) {
            if($e->getCode() === 400)
            {
                return response()->json('Invalid Request. Please Enter a username or a password.',$e->getCode());
            }
            else if($e->getCode() === 401){
                return response()->json('Your credentials are incorrect. Please try again',$e->getCode());
            }

            return response()->json('Something is wrong with the server',$e->getCode());

        }
        */
        // /**
        if(Auth::attempt(['username' => request('username'), 'password' => request('password')])){
            $user = Auth::user();

            $success['access_token'] = $user->createToken('Laravel Passport Create Access Token')->accessToken;
            $success['user'] = $user;

            return response()->json(['success'=>$success],200);

        }else{
            return response()->json(['error'=>'Unauthorised'],401);
        }

        // */

    }

    public function logout ()
    {
        auth()->user()->tokens->each(function($token,$key){
            $token->delete();
        });

        return response()->json('Logged out successfully',200);
        // $token = $request->user()->token();
        // $token->revoke();

        // $response = 'You have been successfully logged out!';
        // return response($response,200);
    }
}
