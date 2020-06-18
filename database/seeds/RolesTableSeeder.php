<?php

use App\Club;
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

        $super_admin = new Role();
        $super_admin->name = 'super_admin';
        $super_admin->display_name = 'Super Administrator';
        $super_admin->save();

        $admin = new Role();
        $admin->name = 'admin';
        $admin->display_name = 'Administrator';
        $admin->save();


        $user = new User();
        $club = new Club();

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

        $club->find(1)->users()->create([
            "name"=>"Club Secretary",
            "username"=>"club",
            "email"=>"clubsecretary@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);
        $club->find(2)->users()->create([
            "name"=>"Kazibwe Julius Junior",
            "username"=>"kazibwe",
            "email"=>"kazibwe@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);

        $club->find(3)->users()->create([
            "name"=>"Raymond",
            "username"=>"raymond",
            "email"=>"raymond@gmail.com",
            "password"=>bcrypt("12345678"),
        ]);


        $user->whereName('Club Secretary')
        ->first()->detachRole($club_secretary);
        $user->whereName('Club Secretary')
        ->first()->attachRole($club_secretary);

        $user->whereName('Raymond')
        ->first()->detachRole($club_secretary);
        $user->whereName('Raymond')
        ->first()->attachRole($club_secretary);

        $user->whereName('Kazibwe Julius Junior')
        ->first()->detachRole($club_secretary);
        $user->whereName('Kazibwe Julius Junior')
        ->first()->attachRole($club_secretary);

        $user->whereName('Kazibwe Julius Jr')
        ->first()->detachRole($super_admin);
        $user->whereName('Kazibwe Julius Jr')
        ->first()->attachRole($super_admin);

        $user->whereName('Raymond K')
        ->first()->detachRole($admin);
        $user->whereName('Raymond K')
        ->first()->attachRole($admin);
    }
}
