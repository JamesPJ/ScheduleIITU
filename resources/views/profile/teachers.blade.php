@extends('profile.layout')
@section('title', 'Teacher | Schedule IITU')
@section('teachers', 'active')

@section('tab')

<profile-tab title='Teachers'>

   @forelse ($user->student->teachers as $subject => $teachers)
      <div class="blocks__title center">
         {{ $subject }}
      </div>
      @foreach($teachers as $teacher)
         <profile-block>
            <profile-teacher name='{{ $teacher['fullname'] }}' 
                     email="{{ $teacher['email'] }}" 
                     degree='{{ $teacher['degree'] }}' 
                     department='{{ $teacher['department'] }}'>
            </profile-teacher>
         </profile-block>
      @endforeach
   @empty
      <profile-block>
         <list-empty text="Firstly add group"></list-empty>
      </profile-block>
   @endforelse

</profile-tab>

@endsection