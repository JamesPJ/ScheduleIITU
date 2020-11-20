<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCellsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cells', function (Blueprint $table) {
            $table->id();
            $table->foreignId('timetable_id');
            $table->foreignId('subject_id');
            $table->foreignId('teacher_id');
            $table->foreignId('room_id');
            $table->foreignId('subject_type_id');
            $table->foreignId('time_id');
            $table->tinyInteger('day_index')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cells');
    }
}
