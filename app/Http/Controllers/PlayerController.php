<?php

namespace App\Http\Controllers;

use App\Club;
use App\Player;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $uploadPath;

    public function __construct()
    {
        $this->uploadPath = public_path('files/uploads/players');
    }
    public function index(Request $request)
    {
        $query = $request->query('query');
        $rowsPerPage = $request->query('rowsPerPage')==-1?Player::count():$request->query('rowsPerPage');

        $sortRowsBy = 'last_name';
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
            $sortRowsBy = 'last_name';
        }

        if(isset($request['club_id'])){
            $clubs = new Club();
           $players = $clubs->find($request['club_id'])->players()->orderBy($sortRowsBy,($sortDesc?'desc':'asc'))->where('last_name','like','%'.$query.'%')->orWhere('first_name','like','%'.$query.'%')->orWhere('personal_number','like','%'.$query.'%')->orWhere('years_played','like','%'.$query.'%')->paginate($rowsPerPage);
           return response()->json(compact('players'));
        }else{
            $players = new Player();
            $players = $players->with('club')->orderBy($sortRowsBy,($sortDesc?'desc':'asc'))->where('last_name','like','%'.$query.'%')->orWhere('first_name','like','%'.$query.'%')->orWhere('personal_number','like','%'.$query.'%')->orWhere('years_played','like','%'.$query.'%')->paginate($rowsPerPage);
            return response()->json(compact('players'));
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array(
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'email|unique:users',
            'date_of_birth'=>'required',
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

        $date = new Carbon();
        $date2 = $date->now();
        $dob = $date->parse($request['date_of_birth']);
        $personal_number = strtoupper(substr($request['last_name'],0,2).Str::random(3).$date->parse($dob)->format('y').Str::random(3).$date->parse($date2)->format('y'));

        $player = new Player();

        $player->first_name=strtolower($request['first_name']);
        $player->last_name=strtolower($request['last_name']);
        $player->positions=strtolower($request['positions']);
        $player->former_club=strtolower($request['former_club']);
        $player->years_played=$request['years_played'];
        $player->biography=$request['biography'];
        $player->phone=$request['phone'];
        $player->status=strtolower($request['status']);
        $player->date_of_birth=$dob;
        $player->personal_number=$personal_number;

        $avatar_file = Input::file('avatar');
        $avatar = null;

        if(isset($avatar_file)){
            $filename = str_slug($request['first_name']).'_avatar_'.time().'.'.$avatar_file->getClientOriginalExtension();
            $path = 'players';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($avatar_file))) {
                $avatar = $filename;
            }
        }

        $national_id_file = Input::file('national_id');
        $national_id = null;

        if(isset($national_id_file)){
            $filename = str_slug($request['first_name']).'_national_id_'.time().'.'.$national_id_file->getClientOriginalExtension();
            $path = 'players';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($national_id_file))) {
                $national_id = $filename;
            }
        }

        $certificates_file = Input::file('certificates');
        $certificates = null;

        if(isset($certificates_file)){
            $filename = str_slug($request['first_name']).'_certificates_'.time().'.'.$certificates_file->getClientOriginalExtension();
            $path = 'players';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($certificates_file))) {
                $certificates = $filename;
            }
        }

        $player->avatar=$avatar;
        $player->national_id=$national_id;
        $player->certificates=$certificates;
        $success = '';

        //club_id start
            $club_id = null;
            if(isset($request->club_id)){
                $club_id = $request->club_id;
            }

            $player->club_id = $club_id;
        //club_id end

        if($player->save()){
            $player = $player->where('personal_number',$personal_number)->first();
            $success = true;
        }
        else{
            $success = false;
            $player = null;
        }


        return response()->json(compact('player','success'));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(Player::where('id',$id)->exists()){
            $player = Player::find($id);
            return response()->json(compact('player'));
        }
        else{
            return response()->json([
                "message" => "player not found"
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        if(Player::where('id', $id)->exists()){
            $player = Player::find($id);
            //first_name
                $first_name = null;
                if(isset($request->first_name)){
                    $first_name = strtolower($request->first_name);
                }
                else if($request->first_name == null){
                    $first_name = $player->first_name;
                }
                $Pfirst_name = array(
                    'first_name'=>$first_name
                );

                $player->update($Pfirst_name);
                $data_2 = [];
            //first_name


            if(isset($request->last_name) || isset($request->date_of_birth)){
                $date = new Carbon();
                $date2 = $date->now();
                $last_name = strtolower($request->last_name);
                $lname = array(
                    'last_name'=>$last_name
                );
                $player->update($lname);
                $personal_number = strtoupper(substr($player->last_name,0,2).Str::random(3).$date->parse($player->date_of_birth)->format('y').Str::random(3).$date->parse($date2)->format('y'));
                $data_2 = array(
                    'personal_number'=>$personal_number
                );
                $player->update($data_2);
            }

            //status start
                $status = null;
                if(isset($request->status)){
                    $status = strtolower($request->status);
                }
                else if($request->status == null){
                    $status = $player->status;
                }

                $Pstatus = array(
                    'status'=>$status
                );

                $player->update($Pstatus);
            //status end

            //club_id start
                $club_id = null;
                if(isset($request->club_id)){
                    $club_id = $request->club_id;
                }
                else if($request->club_id == null){
                    $club_id = $player->club_id;
                }

                $Pclub_id = array(
                    'club_id'=>$club_id
                );

                $player->update($Pclub_id);
            //club_id end



            //positions start
                $positions = null;
                if(isset($request->positions)){
                    $positions = strtolower($request->positions);
                }
                else if($request->positions == null){
                    $positions = $player->positions;
                }

                $Ppositions = array(
                    'positions'=>$positions
                );

                $player->update($Ppositions);
            //positions end



            //former_club start
                $former_club = null;
                if(isset($request->former_club)){
                    $former_club = strtolower($request->former_club);
                }
                else if($request->former_club == null){
                    $former_club = $player->former_club;
                }

                $Pformer_club = array(
                    'former_club'=>$former_club
                );

                $player->update($Pformer_club);
            //former_club end





            //years_played start
                $years_played = null;
                if(isset($request->years_played)){
                    $years_played = $request->years_played;
                }
                else if($request->years_played == null){
                    $years_played = $player->years_played;
                }

                $Pyears_played = array(
                    'years_played'=>$years_played
                );

                $player->update($Pyears_played);
            //years_played end





            //biography start
                $biography = null;
                if(isset($request->biography)){
                    $biography = $request->biography;
                }
                else if($request->biography == null){
                    $biography = $player->biography;
                }

                $Pbiography = array(
                    'biography'=>$biography
                );

                $player->update($Pbiography);
            //biography end





            //phone start
                $phone = null;
                if(isset($request->phone)){
                    $phone = $request->phone;
                }
                else if($request->phone == null){
                    $phone = $player->phone;
                }

                $Pphone = array(
                    'phone'=>$phone
                );

                $player->update($Pphone);
            //phone end






            //date_of_birth start
                $date_of_birth = null;
                if(isset($request->date_of_birth)){
                    $date_of_birth = $request->date_of_birth;
                }
                else if($request->date_of_birth == null){
                    $date_of_birth = $player->date_of_birth;
                }

                $Pdate_of_birth = array(
                    'date_of_birth'=>$date_of_birth
                );

                $player->update($Pdate_of_birth);
            //date_of_birth end




            // avatar start
                $avatar = null;
                if($request->hasFile('avatar')){
                    $avatar_file = $request->file('avatar');
                    if($player->avatar !== null || $player->avatar !== ''){
                        $file_path = 'players/'.$player->avatar;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($player->first_name).'_avatar_'.time().'.'.$avatar_file->getClientOriginalExtension();
                    $path = 'players';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($avatar_file))) {
                        $avatar = $filename;
                    }
                }
                else if(!$request->hasFile('avatar')){
                    $avatar = $player->avatar;
                }
            // avatar end


            // national_id start

                $national_id = null;
                if($request->hasFile('national_id')){
                    $national_id_file = $request->file('national_id');
                    if($player->national_id !== null || $player->national_id !== ''){
                        $file_path = 'players/'.$player->national_id;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($player->first_name).'_national_id_'.time().'.'.$national_id_file->getClientOriginalExtension();
                    $path = 'players';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($national_id_file))) {
                        $national_id = $filename;
                    }
                }
                else if(!$request->hasFile('national_id')){
                    $national_id = $player->national_id;
                }

            // national_id end



            // certificates start

                $certificates = null;
                if($request->hasFile('certificates')){
                    $certificates_file = $request->file('certificates');
                    if($player->certificates !== null || $player->certificates !== ''){
                        $file_path = 'players/'.$player->certificates;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    $filename = str_slug($player->first_name).'_certificates_'.time().'.'.$certificates_file->getClientOriginalExtension();
                    $path = 'players';
                    if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($certificates_file))) {
                        $certificates = $filename;
                    }
                }
                else if(!$request->hasFile('certificates')){
                    $certificates = $player->certificates;
                }

            // certificates end






            // $data = array(
            //     'avatar'=>$avatar,
            // );
            $player->avatar = $avatar;
            $player->national_id = $national_id;
            $player->certificates = $certificates;
            $player->save();
            $player = Player::find($id);



            return response()->json([
                "message" => "records updated successfully",
                'player' => $player
            ], 200);
        }
        else{
            return response()->json([
                "message" => "Player not found"
            ], 404);
        }
        /**
            if(Player::where('id', $id)->exists()){
                $player = Player::find($id);
                $player->first_name = is_null($request->first_name) ? $player->first_name : $request->first_name;
                $player->last_name = is_null($request->last_name) ? $player->last_name : $request->last_name;
                $player->positions = is_null($request->positions) ? $player->positions : $request->positions;
                $player->former_club = is_null($request->former_club) ? $player->former_club : $request->former_club;
                $player->years_played = is_null($request->years_played) ? $player->years_played : $request->years_played;
                $player->biography = is_null($request->biography) ? $player->biography : $request->biography;
                $player->email = is_null($request->email) ? $player->email : $request->email;
                $player->date_of_birth = is_null($request->date_of_birth) ? $player->date_of_birth : $request->date_of_birth;
                $player->club_id = is_null($request->club_id) ? $player->club_id : $request->club_id;

            $avatar_file = Input::file('avatar');
            $avatar = null;

            if(isset($avatar_file)){
                $avatar_file = Input::file('avatar');
                $file_path = 'players/'.$player->avatar;
                Storage::disk('uploads')->delete($file_path);
                $filename = str_slug($player->first_name).'_avatar_'.time().'.'.$avatar_file->getClientOriginalExtension();
                $path = 'players';
                if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($avatar_file))) {
                    $avatar = $filename;
                }
            }

            $national_id_file = Input::file('national_id');
            $national_id = null;

            if(isset($national_id_file)){
                $national_id_file = Input::file('national_id');
                $file_path = 'players/'.$player->national_id;
                Storage::disk('uploads')->delete($file_path);
                $filename = str_slug($player->first_name).'_national_id_'.time().'.'.$national_id_file->getClientOriginalExtension();
                $path = 'players';
                if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($national_id_file))) {
                    $national_id = $filename;
                }
            }

            $certificates_file = Input::file('certificates');
            $certificates = null;

            if(isset($certificates_file)){
                    $certificates_file = Input::file('certificates');
                    $file_path = 'players/'.$player->certificates;
                    Storage::disk('uploads')->delete($file_path);
                $filename = str_slug($player->first_name).'_certificates_'.time().'.'.$certificates_file->getClientOriginalExtension();
                $path = 'players';
                if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($certificates_file))) {
                    $certificates = $filename;
                }
            }

            $player->avatar=$avatar?$avatar:$player->avatar;
            $player->national_id=$national_id != null ?$national_id:$player->national_id;
            $player->certificates=$certificates != null ?$certificates:$player->certificates;


            $player->save();
            return response()->json([
                "message" => "records updated successfully",
                'player' => $player
            ], 200);
            } else {
                    return response()->json([
                        "message" => "Player not found"
                    ], 404);
                }
        */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Player::where('id',$id)->exists())
            {
                $player = Player::find($id);
                    if($player->avatar !== null){
                        $file_path = 'players/'.$player->avatar;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    if($player->national_id !== null){
                        $file_path = 'players/'.$player->national_id;
                        Storage::disk('uploads')->delete($file_path);
                    }

                    if($player->certificates !== null){
                        $file_path = 'players/'.$player->certificates;
                        Storage::disk('uploads')->delete($file_path);
                    }


                    // $player->delete();
                    $success = null;
                    if($player->delete()){
                        $success = true;
                    }
                    return response()->json(compact('success'));
                }
                else{
                    return response()->json([
                        "message" => "player not found"
                    ], 404);
                }
    }

    private function removeImage($image)
    {
        if ( ! empty($image) )
        {
            $imagePath     = $this->uploadPath . '/' . $image;
            $ext           = substr(strrchr($image, '.'), 1);
            $thumbnail     = str_replace(".{$ext}", "_thumb.{$ext}", $image);
            $thumbnailPath = $this->uploadPath . '/' . $thumbnail;

            if ( file_exists($imagePath) ) unlink($imagePath);
            if ( file_exists($thumbnailPath) ) unlink($thumbnailPath);
        }
    }
}
