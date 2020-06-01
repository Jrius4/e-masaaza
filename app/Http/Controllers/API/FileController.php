<?php

namespace App\Http\Controllers\API;

use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $files = File::all();
        $data = $files->toArray();

        $response = [
            'success'=> true,
            'data' => $data,
            'message'=>'Files retrieved successfully'
        ];

        return response()->json($response,200);
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
        $input = $request->all();
        $rules = [
            'name'=>'required',
            'author'=>'required'
        ];

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'message'=>$validator->errors()
            ];

            return response()->json($response,403);
        }

        $file = File::create($input);
        $data = $file->toArray();

        $response = [
            'success'=>true,
            'data'=>$data,
            'message'=>'Book stored successfully'
        ];
        return response()->json($response,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        // $file = File::findOrFail($id);
        $data = $file->toArray();

        if(is_null($file)){
            $response=[
                'success'=>false,
                'success'=>'Empty',
                'message'=>'Book not Found',
            ];
            return response()->json($response,404);
        }

        $response = array(
            'success'=>true,
            'data'=>$data,
            'message'=>'Book retrieved Successfully',
        );

        return response()->json($response,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        $input = $request->all();
        $rules = [
            'name'=>'required',
            'author'=>'required'
        ];

        $validator = Validator::make($input,$rules);

        if($validator->fails()){
            $response=[
                'success'=>false,
                'data'=>'Validation Error.',
                'message'=>$validator->errors()
            ];

            return response()->json($response,403);
        }

        $file->name = $input['name'];
        $file->author = $input['author'];
        $file->save();

        $data = $file->toArray();


        $response = array(
            'success'=>true,
            'data'=>$data,
            'message'=>'Book updated Successfully',
        );

        return response()->json($response,200);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        $file->delete();
        $data = $file->toArray();
        $response = array(
            'success'=>true,
            'data'=>$data,
            'message'=>'Book deleted Successfully',
        );

        return response()->json($response,200);
    }
}
