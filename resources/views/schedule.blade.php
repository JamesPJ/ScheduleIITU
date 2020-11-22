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

            @for($i = 0; $i < 6; $i++)
               <timetable-day day="{{ $i }}">
                  @foreach($timeRange as $time)
                     @if (count($schedule[$i][$time->id]) == 0)
                        <timetable-cell start='{{ $time->startStr }}' end='{{ $time->endStr }}'></timetable-cell>
                     @elseif (count($schedule[$i][$time->id]) == 1)
                        <timetable-cell start='{{ $time->startStr }}' end='{{ $time->endStr }}'
                              teacher='{{ $schedule[$i][$time->id][0]->teacher->user->fullname }}'
                              room='{{ $schedule[$i][$time->id][0]->room->location }}'
                              subject='{{ $schedule[$i][$time->id][0]->subject->name }}'
                              type='{{ $schedule[$i][$time->id][0]->subject_type->name }}'
                              degree='{{ $schedule[$i][$time->id][0]->teacher->stringDegrees }}'>
                           @foreach ($schedule[$i][$time->id][0]->groups as $group)
                               <timetable-group name='{{ $group->name }}'></timetable-group>
                           @endforeach
                        </timetable-cell>
                     @elseif (count($schedule[$i][$time->id]) > 1)
                        <timetable-folder count="{{ count($schedule[$i][$time->id]) }}" modal-id="{{ $i."-".$time->id }}">
                           @foreach($schedule[$i][$time->id] as $c)
                              <timetable-cell start='{{ $time->startStr }}' end='{{ $time->endStr }}'
                                    teacher='{{ $c->teacher->user->fullname }}'
                                    room='{{ $c->room->location }}'
                                    subject='{{ $c->subject->name }}'
                                    type='{{ $c->subject_type->name }}'
                                    degree='{{ $c->teacher->stringDegrees }}'>
                                 @foreach ($c->groups as $group)
                                    <timetable-group name='{{ $group->name }}'></timetable-group>
                                 @endforeach
                              </timetable-cell>
                           @endforeach
                        </timetable-folder>
                     @endif
                  @endforeach
               </timetable-day>
            @endfor

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