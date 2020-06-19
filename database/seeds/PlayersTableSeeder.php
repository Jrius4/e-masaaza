<?php

use App\Club;
// use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PlayersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('players')->delete();
        $clubs = new Club();
        // $faker = Factory::create();
        $date = new Carbon();

        // $startDateAge = $faker->dateTimeBetween('this week','-24 years')

        for($i=1;$i<=5;$i++){
            $date = $date->now();
            $date2 = $date->now();
            $dob = $date->modify('-'.((rand(18,28)*12)+rand(1,8)).' months')->format('Y-m-d');
            $clubs->where('id',rand(1,18))->first()->players()->create([
                'first_name'=>['James','Sulati','Kizito','Robert','Kenneth'][rand(0,4)],
                'last_name'=>['kazibwe','Magezi','kato','Jjuuko'][$i%4],
                'personal_number'=>strtoupper(substr(['kazibwe','Magezi','kato','Jjuuko'][$i%4],0,2).Str::random(3).$date->parse($dob)->format('y').Str::random(3)).$date->parse($date2)->format('y'),
                'positions'=>['','WF','CF','LB','LM'][rand(0,4)],
                'former_club'=>['','Buddu','Ssingo','Kyagwe','Bulemezi'][rand(0,4)],
                'years_played'=>rand(0,4),
                'biography'=>'hefdsakjdlasdsajfasfkrif sadjakradoeiasdkadspdadi',
                'date_of_birth'=>$dob,
            ]);
        }
    }
}
