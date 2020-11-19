@extends('profile.layout')
@section('title', 'Exams | Schedule IITU')
@section('exams', 'active')

@section('tab')

<profile-tab title='Exams'>

   @if (isset($user->teacher))
      @forelse ($user->teacher->exams as $index=>$exam)
         @if ($index == 0)
            <profile-block title='Exams of this semester'>
               <profile-exam subject-name="{{ $exam->subject->name }}" 
                           date="{{ $exam->date_time }}" 
                           duration='{{ $exam->duration }}'
                           room='{{ $exam->room->location }}' 
                           students-number='{{ $exam->students_number }}' 
                           exam-form='{{ $exam->exam_form->name }}'
                           group='{{ $exam->stringGroups }}'>
               </profile-exam>
            </profile-block>
         @else
            <profile-block>
               <profile-exam subject-name="{{ $exam->subject->name }}" 
                           date="{{ $exam->date_time }}" 
                           duration='{{ $exam->duration }}'
                           room='{{ $exam->room->location }}' 
                           students-number='{{ $exam->students_number }}' 
                           exam-form='{{ $exam->exam_form->name }}'
                           group='{{ $exam->stringGroups }}'>
               </profile-exam>
            </profile-block>
         @endif
      @empty
         <profile-block>
            <list-empty text="Sector clear"></list-empty>
         </profile-block>
      @endforelse
   @endif
   @if (isset($user->student))
      @forelse ($user->student->exams as $index=>$exam)
         @if ($index == 0)
            <profile-block title='Exams of this semester'>
               <profile-exam subject-name="{{ $exam->subject->name }}" 
                           date="{{ $exam->date_time }}" 
                           duration='{{ $exam->duration }}'
                           room='{{ $exam->room->location }}'
                           teacher='{{ $exam->teacher->user->fullname }}'
                           students-number='{{ $exam->students_number }}' 
                           exam-form='{{ $exam->exam_form->name }}'
                           group='{{ $exam->stringGroups }}'>
               </profile-exam>
            </profile-block>
         @else
            <profile-block>
               <profile-exam subject-name="{{ $exam->subject->name }}" 
                           date="{{ $exam->date_time }}" 
                           duration='{{ $exam->duration }}'
                           room='{{ $exam->room->location }}' 
                           students-number='{{ $exam->students_number }}' 
                           exam-form='{{ $exam->exam_form->name }}'
                           group='{{ $exam->stringGroups }}'>
               </profile-exam>
            </profile-block>
         @endif
      @empty
         <profile-block>
            <list-empty text="Sector clear"></list-empty>
         </profile-block>
      @endforelse
   @endif

</profile-tab>

@endsection