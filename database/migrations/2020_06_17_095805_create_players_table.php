<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('personal_number')->unique();
            $table->string('avatar')->nullable();
            $table->string('national_id')->nullable();
            $table->string('certificates')->nullable();
            $table->string('status')->nullable();
            $table->string('positions')->nullable();
            $table->string('former_club')->nullable();
            $table->string('years_played')->default(0);
            $table->text('biography')->nullable();
            $table->string('phone')->nullable();
            $table->string('date_of_birth');
            $table->timestamps();

            $table->unsignedBigInteger('club_id')->nullable();
            $table->foreign('club_id')->references('id')->on('clubs')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
