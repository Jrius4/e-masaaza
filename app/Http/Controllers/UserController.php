<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Club;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Role;

class UserController extends Controller
{
    public function index(Request $request){
        // dump($request->all());


            $club_id = $request->club_id;
            $users = null;
            $query = $request->query('query');
            $rowsPerPage = $request->query('rowsPerPage')==-1?User::count():$request->query('rowsPerPage');

            $sortRowsBy = 'name';
            $sortDesc = false;

            if(isset($request['sortDesc']) && $request['sortDesc'] !== '' ){
                $sortDesc = $request['sortDesc'] == 'true'?true:false;
            }
            else{
                $sortDesc = false;
            }
            if(isset($request['sortRowsBy']) && $request['sortRowsBy']!==''){
                $sortRowsBy = $request['sortRowsBy'];
            }
            else{
                $sortRowsBy = 'name';
            }
            if(isset($club_id)){
                $club = new Club();
                $users = $club->find($club_id)->users()->with('club','roles')->orderBy($sortRowsBy,($sortDesc?'desc':'asc'))->where('name','like','%'.$query.'%')->orWhere('personal_number','like','%'.$query.'%')->paginate($rowsPerPage);

                // $users = $club->find($club_id)->users()->with('club')->paginate(4);
            }
            else if(!isset($club_id)){
                $users = User::with('club','roles')->orderBy($sortRowsBy,($sortDesc?'desc':'asc'))->where('name','like','%'.$query.'%')->orWhere('personal_number','like','%'.$query.'%')->paginate($rowsPerPage);

                // $users = User::with('club')->paginate(4);
            }
            $persons = $users;

            return response()->json(compact('persons'));
        // }
        // else{
        //     return response()->json('Unauthorized');
        // }
    }

    public function store(Request $request)
    {
        
        

        $rules = array(
            'name'=>'required',
            'username'=>'required|unique:users',
            'password'=>'required|confirmed|min:6',
        );
        if(isset($request->email)){
            $rules = array(
                'name'=>'required',
                'username'=>'required|unique:users',
                'email'=>'email|unique:users',
                'password'=>'required|confirmed|min:6',
            );
        }

        $input = $request->all();
        // return $input;

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'errorMessages'=>$validator->errors()
            ];

            return response()->json($response);
        }


        $user = new User();
        $date = new Carbon();
        $date2 = $date->now();
        $personal_number = null;
        for($i = 0;$i<=4;$i++)
        {
            $personal_number = strtoupper(substr($request['name'],0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));

            if(!$user->where('personal_number',$personal_number)->exists()){
                $personal_number = strtoupper(substr($request['name'],0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));
            }
            // else{
            //     $personal_number = strtoupper(substr($request['name'],0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));
            // }
        }

        $user->name=strtolower($request['name']);
        $user->username=strtolower($request['username']);
        $user->positions=strtolower($request['positions']);
        $user->biography=$request['biography'];
        $user->phone=$request['phone'];
        $user->email=$request['email'];
        $user->join_date=$request['join_date'];
        $user->password=bcrypt($request['password']);
        $user->personal_number=$personal_number;

        $avatar_file = Input::file('avatar');
        $avatar = null;

        if(isset($avatar_file)){
            $filename = str_slug($request['name']).'_avatar_'.time().'.'.$avatar_file->getClientOriginalExtension();
            $path = 'persons';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($avatar_file))) {
                $avatar = $filename;
            }
        }

        $national_id_file = Input::file('national_id');
        $national_id = null;

        if(isset($national_id_file)){
            $filename = str_slug($request['name']).'_national_id_'.time().'.'.$national_id_file->getClientOriginalExtension();
            $path = 'persons';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($national_id_file))) {
                $national_id = $filename;
            }
        }

        $certificates_file = Input::file('certificates');
        $certificates = null;

        if(isset($certificates_file)){
            $filename = str_slug($request['name']).'_certificates_'.time().'.'.$certificates_file->getClientOriginalExtension();
            $path = 'persons';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($certificates_file))) {
                $certificates = $filename;
            }
        }

        $user->avatar=$avatar;
        $user->national_id=$national_id;
        $user->certificates=$certificates;
        $success = '';

        //club_id start
            $club_id = null;
            if(isset($request->club_id)){
                $club_id = $request->club_id;
            }

            $user->club_id = $club_id;
        //club_id end

        //join_date start
        $join_date = null;
        if(isset($request->join_date)){
            $join_date = $request->join_date;
        }

        $user->join_date = $join_date;
    //join_date end

        if($user->save()){
            $user = $user->with('roles','club')->where('personal_number',$personal_number)->first();
            if(isset($request->roles)){
                // $user->roles->attach()
                $user->roles()->attach(explode(',',$request->roles));
            }
            $user = $user->with('roles','club')->where('personal_number',$personal_number)->first();
            $success = true;
        }
        else{
            $success = false;
            $user = null;
        }


        return response()->json(compact('user','success'));

    }

    public function show($id)
    {
        $person = new User();
        if($person->where('id',$id)->exists()){
            $person = $person->with('club','roles')->find($id);
            return response()->json(compact('person'));
        }
        else{
            return response()->json([
                "message" => "person not found"
            ], 404);
        }
    }

    public function update(Request $request,$id)
    {
        $input = $request->all();
        $rules =[];
        if(isset($request->password)){
            array_merge($rules,['password'=>'confirmed|min:6',]);
        }
        if(isset($request->email)){
            array_merge($rules,['email'=>'email|unique:users']);
        }
        

        $person = new User();
        if($person->where('id',$id)->exists()){
            $person = $person->find($id);
            if($person->username !== $request->username){
                array_merge($rules,['username'=>'unique:users']);
            }

        }
        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'errorMessages'=>$validator->errors()
            ];

            return response()->json($response);
        }

        // return $input;


        $person = new User();
        if($person->where('id',$id)->exists()){
            $person = $person->find($id);
            //name
                $name = null;
                if(isset($request->name)){
                    $name = $request->name;
                    $date = new Carbon();
                    $date2 = $date->now();
                    $name = strtolower($request->name);
                    $lname = array(
                        'name'=>$name
                    );
                    $person->update($lname);

                    $personal_number = null;
                    for($i = 0;$i<=4;$i++)
                    {
                        $personal_number = strtoupper(substr($person->name,0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));

                        if(!$person->where('personal_number',$personal_number)->exists()){
                            $personal_number = strtoupper(substr($person->name,0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));
                        }
                        // else{
                        //     $personal_number = strtoupper(substr($request['name'],0,2).Str::random(3).Str::random(3).$date->parse($date2)->format('y'));
                        // }
                    }

                    $data_2 = array(
                        'personal_number'=>$personal_number
                    );
                    $person->update($data_2);
                }
                else if($request->name == null){
                    $name = $person->name;
                }
                $Pname = array(
                    'name'=>$name
                );

                $person->update($Pname);
                $data_2 = [];
            //name

            //username
                $username = null;
                if(isset($request->username)){
                    $username = strtolower($request->username);
                }
                else if($request->username == null){
                    $username = $person->username;
                }
                $Pusername = array(
                    'username'=>$username
                );

                $person->update($Pusername);
                $data_2 = [];
            //username

            

            //club_id start
                $club_id = null;
                if(isset($request->club_id)){
                    $club_id = $request->club_id;
                }
                else if($request->club_id == null){
                    $club_id = $person->club_id;
                }

                $Pclub_id = array(
                    'club_id'=>$club_id
                );

                $person->update($Pclub_id);
            //club_id end

            //join_date start
                $join_date = null;
                if(isset($request->join_date)){
                    $join_date = $request->join_date;
                }
                else if($request->join_date == null){
                    $join_date = $person->join_date;
                }

                $Pjoin_date = array(
                    'join_date'=>$join_date
                );

                $person->update($Pjoin_date);
            //join_date end

            //password start
                $password = null;
                if(isset($request->password)){
                    $password = bcrypt($request->password);
                }
                else if($request->password == null){
                    $password = $person->password;
                }

                $Ppassword = array(
                    'password'=>$password
                );

                $person->update($Ppassword);
            //password end

            //email start
                $email = null;
                if(isset($request->email)){
                    $email = $request->email;
                }
                else if($request->email == null){
                    $email = $person->email;
                }

                $Pemail = array(
                    'email'=>$email
                );

                $person->update($Pemail);
            //email end

            //positions start
                $positions = null;
                if(isset($request->positions)){
                    $positions = $request->positions;
                }
                else if($request->positions == null){
                    $positions = $person->positions;
                }

                $Ppositions = array(
                    'positions'=>$positions
                );

                $person->update($Ppositions);
            //positions end



            //biography start
                $biography = null;
                if(isset($request->biography)){
                    $biography = $request->biography;
                }
                else if($request->biography == null){
                    $biography = $person->biography;
                }

                $Pbiography = array(
                    'biography'=>$biography
                );

                $person->update($Pbiography);
            //biography end





            //phone start
                $phone = null;
                if(isset($request->phone)){
                    $phone = $request->phone;
                }
                else if($request->phone == null){
                    $phone = $person->phone;
                }

                $Pphone = array(
                    'phone'=>$phone
                );

                $person->update($Pphone);
            //phone end




            // avatar start
                $avatar = null;
                if($request->hasFile('avatar')){
                    $avatar_file = $request->file('avatar');
                    if($person->avatar !== null || $person->avatar !== ''){
                        $file_path = 'persons/'.$person->avatar;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($person->name).'_avatar_'.time().'.'.$avatar_file->getClientOriginalExtension();
                    $path = 'persons';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($avatar_file))) {
                        $avatar = $filename;
                    }
                }
                else if(!$request->hasFile('avatar')){
                    $avatar = $person->avatar;
                }
            // avatar end


            // national_id start

                $national_id = null;
                if($request->hasFile('national_id')){
                    $national_id_file = $request->file('national_id');
                    if($person->national_id !== null || $person->national_id !== ''){
                        $file_path = 'persons/'.$person->national_id;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($person->name).'_national_id_'.time().'.'.$national_id_file->getClientOriginalExtension();
                    $path = 'persons';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($national_id_file))) {
                        $national_id = $filename;
                    }
                }
                else if(!$request->hasFile('national_id')){
                    $national_id = $person->national_id;
                }

            // national_id end



            // certificates start

                $certificates = null;
                if($request->hasFile('certificates')){
                    $certificates_file = $request->file('certificates');
                    if($person->certificates !== null || $person->certificates !== ''){
                        $file_path = 'persons/'.$person->certificates;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($person->name).'_certificates_'.time().'.'.$certificates_file->getClientOriginalExtension();
                    $path = 'persons';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($certificates_file))) {
                        $certificates = $filename;
                    }
                }
                else if(!$request->hasFile('certificates')){
                    $certificates = $person->certificates;
                }

            // certificates end






            // $data = array(
            //     'avatar'=>$avatar,
            // );
            $person->avatar = $avatar;
            $person->national_id = $national_id;
            $person->certificates = $certificates;
            $person->save();
            if(isset($request->roles)){
                $arrRoles = [];
                foreach($person->roles as $role){
                    array_push($arrRoles,$role->id);
                }
                $person->roles()->detach($arrRoles);
                $person->roles()->attach(explode(',',$request->roles));
            }
            $person = User::with('roles','club')->find($id);






            return response()->json(compact('person'));
        }
        else{
            return response()->json([
                "message" => "person not found"
            ], 404);
        }
    }

    public function destory($id)
    {
        if(User::where('id',$id)->exists())
            {
                $person = User::find($id);
                    if($person->avatar !== null){
                        $file_path = 'persons/'.$person->avatar;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    if($person->national_id !== null){
                        $file_path = 'persons/'.$person->national_id;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    if($person->certificates !== null){
                        $file_path = 'persons/'.$person->certificates;
                        Storage::disk('uploads')->delete($file_path);
                    }


                    // $person->delete();
                    $success = null;
                    if($person->delete()){
                        $success = true;
                    }
                    return response()->json(compact('success'));
                }
                else{
                    return response()->json([
                        "message" => "person not found"
                    ], 404);
                }
    }

    public function getRoles(){
        $roles = Role::where('id','<=',2)->get();
        return response()->json($roles);
    }
    public function searchUser(){
        $input = request()->all();

        $rules=[
            'username'=>'unique:users',
        ];

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'errorMessages'=>$validator->errors()
            ];

            return response()->json($response);
        }
    }

    public function passwordUser(){
        $input = request()->all();

        $rules=[
            'password'=>'confirmed|min:6',
        ];

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'errorMessages'=>$validator->errors()
            ];

            return response()->json($response);
        }
    }
}
