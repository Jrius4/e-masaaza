<?php

namespace App\Http\Controllers;

use App\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clubs = Club::paginate(5);
        return response()->json(compact('clubs'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array(
            'logo'=>'required',
            'name'=>'unique:clubs',
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

        $club = new Club();
        $club->name = $request['name'];
        $club->slug = str_slug($request['name']);
        $club->slogan = $request['slogan'];

        $logo_file = Input::file('logo');
        $logo = null;

        if(isset($logo_file)){
            $filename = str_slug($request['name']).'_logo_'.time().'.'.$logo_file->getClientOriginalExtension();
            $path = 'clubs';
            if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($logo_file))) {
                $logo = $filename;
            }
        }
        $club->logo=$logo;

        if($club->save()){
            $success = true;
        }
        else{
            $success = false;
            $club = null;
        }
        return response()->json(compact('club','success'));


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function show(Club $club)
    {
        return response()->json(compact('club'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function edit(Club $club)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(Club::where('id',$id)->exists()){
            $club = Club::find($id);
            $club->name = is_null($request->name) ? $club->name : $request->name;
            $club->slogan = is_null($request->slogan) ? $club->slogan : $request->slogan;
            $club->slug = is_null($request->name) ? $club->slug : str_slug($request->name);

            $logo_file = Input::file('logo');
            $logo = null;

            if(isset($logo_file)){
                $logo_file = Input::file('logo');
                $file_path = 'clubs/'.$club->logo;
                Storage::disk('uploads')->delete($file_path);
                $filename = str_slug($club->name).'_logo_'.time().'.'.$logo_file->getClientOriginalExtension();
                $path = 'clubs';
                if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($logo_file))) {
                    $logo = $filename;
                }
            }

        $club->logo=$logo != null ?$logo:$club->logo;

        $club->save();
        return response()->json([
            "message" => "records updated successfully",
            'club' => $club
        ], 200);
        } else {
                return response()->json([
                    "message" => "club not found"
                ], 404);
            }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function destroy(Club $club)
    {
        if($club->logo !== null){
            $file_path = 'clubs/'.$club->logo;
            Storage::disk('uploads')->delete($file_path);
        }
        $success = null;
        if($club->delete()){
            $success = true;
        }
        return response()->json(compact('success'));
    }
}
