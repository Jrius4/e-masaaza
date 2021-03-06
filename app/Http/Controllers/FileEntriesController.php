<?php

namespace App\Http\Controllers;

use App\FileEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

class FileEntriesController extends Controller
{
    public function index() {
        $files = FileEntry::all();

        return view('files.index', compact('files'));
    }

    public function create() {
        return view('files.create');
    }

    public function uploadFile(Request $request) {
        // return request()->all();
        $this->validate($request, [
//            'file' => 'image|max:3000'
        ]);

        $file = Input::file('files');
        $filename = $file->getClientOriginalName();


        $path = hash( 'sha256', time());



        if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($file))) {
            // if(true){

            $input['filename'] = $filename;
            $input['mime'] = $file->getClientMimeType();
            $input['path'] = $path;
            $input['size'] = $file->getClientSize();
            // return compact('path','filename','input');
            $file = FileEntry::create($input);

            return response()->json([
                'success' => true,
                'id' => $file->id
            ], 200);
        }

        return response()->json([
            'success' => false
        ], 500);
    }
}
