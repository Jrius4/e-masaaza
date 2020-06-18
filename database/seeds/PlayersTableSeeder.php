<?php

use App\Club;
use Faker\Factory;
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
        $faker = Factory::create();
        $date = new Carbon();

        // $startDateAge = $faker->dateTimeBetween('this week','-24 years')

        for($i=1;$i<=250;$i++){
            $date = $date->now();
            $date2 = $date->now();
            $dob = $date->modify('-'.[17,18,19,20,22,25,24,28][$i%7].' years');
            $clubs->where('id',$i%18 +1)->first()->players()->create([
                'first_name'=>$faker->firstname(),
                'last_name'=>['kazibwe','Magezi','kato','Jjuuko'][$i%4],
                'personal_number'=>strtoupper(substr(['kazibwe','Magezi','kato','Jjuuko'][$i%4],0,2).Str::random(3).$date->parse($dob)->format('y').Str::random(3)).$date->parse($date2)->format('y'),
                'positions'=>['','WF','CF','LB','LM'][$i%4],
                'former_club'=>['','Buddu','Ssingo','Kyagwe','Bulemezi'][$i%4],
                'years_played'=>[0,1,2,3,4][$i%4],
                'biography'=>$faker->paragraph(3),
                'date_of_birth'=>$dob,
            ]);
        }
    }
}
