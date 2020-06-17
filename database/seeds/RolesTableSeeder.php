<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();

        $committee_secretary = new Role();
        $committee_secretary->name = 'committee_secretary';
        $committee_secretary->display_name = 'Committee Secretary';
        $committee_secretary->save();

        $club_secretary = new Role();
        $club_secretary->name = 'club_secretary';
        $club_secretary->display_name = 'Club Secretary';
        $club_secretary->save();

        $player = new Role();
        $player->name = 'player';
        $player->display_name = 'Player';
        $player->save();


        $user = new User();

        $user->create([
            "name"=>"Committee Secretary",
            "username"=>"committee",
            "email"=>"committeesecretary@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);
        $user->whereName('Committee Secretary')
        ->first()->detachRole($committee_secretary);
        $user->whereName('Committee Secretary')
        ->first()->attachRole($committee_secretary);

        $user->create([
            "name"=>"Club Secretary",
            "username"=>"club",
            "email"=>"clubsecretary@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);
        $user->whereName('Club Secretary')
        ->first()->detachRole($club_secretary);
        $user->whereName('Club Secretary')
        ->first()->attachRole($club_secretary);

        $user->create([
            "name"=>"Player",
            "username"=>"player",
            "email"=>"player@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);

        $user->whereName('Player')
        ->first()->detachRole($player);
        $user->whereName('Player')
        ->first()->attachRole($player);
    }
}
