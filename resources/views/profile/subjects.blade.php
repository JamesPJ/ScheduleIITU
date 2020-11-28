@extends('profile.layout')
@section('title', 'Subjects | Schedule IITU')
@section('subjects', 'active')

@section('tab')

<profile-tab title="Subjects Settings">

   <div class="blocks__title">
      Subjects
   </div>

   @forelse ($user->student->allSubjects as $subject)
      <profile-block>
         <div class="subject">
            <div class="subject-text">
               {{ $subject->name }}
            </div>
            @if ($user->student->isBlocked($subject))
               <form action="{{ route('profile.subject.show') }}" method="POST">
                  @csrf
                  <input type="hidden" name="subject_id" value="{{ $subject->id }}">
                  <button class="subject-btn btn tr" title="Show in schedule">
                     <i class="fas fa-eye"></i>
                  </button>
               </form>
            @else
               <form action="{{ route('profile.subject.block') }}" method="POST">
                  @csrf
                  <input type="hidden" name="subject_id" value="{{ $subject->id }}">
                  <button class="subject-btn btn tr" title="Hide from schedule">
                     <i class="fas fa-eye-slash"></i>
                  </button>
               </form>
            @endif
         </div>
      </profile-block>
   @empty
      <profile-block>
         <list-empty text="Firstly add group"></list-empty>
      </profile-block>
   @endforelse

   
</profile-tab>

@endsection