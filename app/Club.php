<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = ['logo','name','slug','slogan']
    public function users(){
        return $this->hasMany(User::class);
    }
}
