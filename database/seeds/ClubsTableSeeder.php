<?php

use App\Club;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClubsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clubs')->delete();

        $clubs = new Club();
        for($i = 1;$i<=18;$i++){
            $clubs->create([
                'name'=>['buddu','ssingo','kyagwe','bulemezi'][$i%4].'#  '.$i,
                'slug'=>str_slug(['buddu','ssingo','kyagwe','bulemezi'][$i%4].'#  '.$i),
                'slogan'=>['buddu','ssingo','kyagwe','bulemezi'][$i%4].'# '.$i.' we win!',
                'logo'=>'',
            ]);
        }
    }
}
