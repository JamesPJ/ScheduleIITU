<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_form_id');
            $table->foreignId('subject_id');
            $table->foreignId('teacher_id');
            $table->foreignId('room_id');
            $table->dateTime('date_time');
            $table->tinyInteger('duration')->unsigned();
            $table->tinyInteger('students_number')->unsigned();
            $table->tinyInteger('semester')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exams');
    }
}
