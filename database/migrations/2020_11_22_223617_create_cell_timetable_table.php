<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCellTimetableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cell_timetable', function (Blueprint $table) {
            $table->id();
            $table->foreignId('timetable_id');
            $table->foreignId('cell_id');
        });
        Schema::table('cells', function (Blueprint $table) {
            $table->dropColumn('timetable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cell_timetable');
        Schema::table('cells', function (Blueprint $table) {
            $table->foreignId('timetable_id');
        });
    }
}
