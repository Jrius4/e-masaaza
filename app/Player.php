<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['first_name','last_name','personal_number','slug','national_id',
        'certificates','positions','former_club','years_played',
        'biography','email','date_of_birth','club_id','status'
    ];


    public function club(){
        return $this->belongsTo(Club::class);
    }
}
