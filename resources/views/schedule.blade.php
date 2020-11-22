@extends('layouts.app')
@section('title', 'Schedule | Schedule IITU')
@section('nav-top', 'top=yes')

@section('content')

<main class="page">

   <schedule name='{{ $name }}' type='{{ $type }}'>
      <day-slider>
         <day-slider-btn title-lg="Monday" title-md="Mon" title-sm="M" day="0"></day-slider-btn>
         <day-slider-btn title-lg="Tuesday" title-md="Tue" title-sm="Tu" day="1"></day-slider-btn>
         <day-slider-btn title-lg="Wednesday" title-md="Wed" title-sm="W" day="2"></day-slider-btn>
         <day-slider-btn title-lg="Thursday" title-md="Thu" title-sm="Th" day="3"></day-slider-btn>
         <day-slider-btn title-lg="Friday" title-md="Fri" title-sm="F" day="4"></day-slider-btn>
         <day-slider-btn title-lg="Saturday" title-md="Sat" title-sm="St" day="5"></day-slider-btn>
      </day-slider>

      <div class="schedule__timetable">

         <div class="schedule__time">
            @foreach ($timeRange as $time)
                <timetable-time start='{{ $time->startStr }}' end='{{ $time->endStr }}'></timetable-time>
            @endforeach
         </div>

         <div class="schedule__list">

            <timetable-day day="0">

               <timetable-cell start='08:00' end='08:50' teacher='Sapakova S.Z' room='301'
                  subject='Operating Systems' type='Lecture' degree='Senior Lecturer'>
                  <timetable-group name='CSSE-1801K'></timetable-group>
                  <timetable-group name='CSSE-1802K'></timetable-group>
                  <timetable-group name='CSSE-1803K'></timetable-group>
                  <timetable-group name='CSSE-1804K'></timetable-group>
                  <timetable-group name='CSSE-1805K'></timetable-group>
                  <timetable-group name='CSSE-1806K'></timetable-group>
                  <timetable-group name='IT2CCO-2001'></timetable-group>
               </timetable-cell>

               <timetable-cell start='11:00' end='11:50'></timetable-cell>
            </timetable-day>


            <timetable-day day="1"></timetable-day>

            <timetable-day day="2"></timetable-day>

            <timetable-day day="3"></timetable-day>


            <timetable-day day="4">
               <timetable-folder count="3">

                  <timetable-cell start='08:00' end='08:50' teacher='Teacher' room='401'
                     subject='First Elective Example' type='Practice'>
                     <timetable-group name='CSSE-1803K'></timetable-group>
                  </timetable-cell>

                  <timetable-cell start='08:00' end='08:50' teacher='Teacher' room='405'
                     subject='Second Elective Example' type='Lab'>
                     <timetable-group name='CSSE-1803K'></timetable-group>
                  </timetable-cell>

                  <timetable-cell start='08:00' end='08:50' teacher='Teacher' room='406'
                     subject='Third Elective Example' type='Lab'>
                     <timetable-group name='CSSE-1803K'></timetable-group>
                  </timetable-cell>

               </timetable-folder>
            </timetable-day>


            <timetable-day day="5"></timetable-day>

         </div>

         <div class="schedule__modal" id="schedule-modal">
            <div class="schedule__modal_content modal-content">
               <button class="close-modal" onclick="subjModalClose()"><i class="fas fa-times"></i></button>
               <h1 class="modal-content__subj" id="modal-subj-name"></h1>
               <p class="modal-content__time" id="modal-time">
                  <span class="modal-content__time_start"></span>
                  <span class="modal-content__time_end"></span>
               </p>
               <div class="modal-content__block">
                  <h2 class="modal-content__block_title" id="modal-groups-title">Group</h2>
                  <ul class="modal-content__block_list" id="modal-groups">
                     <li class="modal-content__block_elem"></li>
                  </ul>
               </div>
               <div class="modal-content__block">
                  <h2 class="modal-content__block_title">Teacher</h2>
                  <p class="modal-content__block_text" id="modal-teacher-name"></p>
                  <p class="modal-content__block_text" id="modal-teacher-degree"></p>
               </div>
               <div class="modal-content__block">
                  <h2 class="modal-content__block_title">Subject Type</h2>
                  <p class="modal-content__block_text" id="modal-subj-type"></p>
               </div>
               <div class="modal-content__block mbc">
                  <h2 class="modal-content__block_title">Classroom</h2>
                  <p class="modal-content__block_text" id="modal-classroom"></p>
               </div>
            </div>
         </div>

      </div>

   </schedule>

</main>

@endsection