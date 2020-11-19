@extends('profile.layout')
@section('title', 'Exams | Schedule IITU')
@section('exams', 'active')

@section('tab')

<profile-tab title='Exams'>

   <div class="blocks__title">
      Exams of this semester
   </div>
   @forelse ($user->exams as $exam)
      <profile-block>
         <profile-exam subject-name='{{ $exam->subject->name }}' 
                     date='{{ $exam->date_time }}' 
                     duration='{{ $exam->duration }}'
                     room='{{ $exam->room->location }}' 
                     @if ($user->isStudent)
                     teacher='{{ $exam->teacher->user->fullname }}'
                     @endif
                     students-number='{{ $exam->students_number }}' 
                     exam-form='{{ $exam->exam_form->name }}'
                     group='{{ $exam->stringGroups }}'>
         </profile-exam>
      </profile-block>
   @empty
      <profile-block>
         <list-empty text="Nothing to take"></list-empty>
      </profile-block>
   @endforelse

</profile-tab>

@endsection