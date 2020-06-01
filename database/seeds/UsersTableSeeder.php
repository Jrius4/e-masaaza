<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();

        $user->create(array(
            "name"=>"Kazibwe Julius Junior",
            "email"=>"junior@gmail.com",
            "password"=>bcrypt("12345678")
        ));
        // $user->whereName('Kazibwe Julius Junior')->first()->createToken('KaxiApp')->accessToken;

        $user->create(array(
            "name"=>"Raymond",
            "email"=>"raymond@gmail.com",
            "password"=>bcrypt("12345678")
        ));
        // $user->whereName('Joy')->first()->createToken('KaxiApp')->accessToken;
    }
}
