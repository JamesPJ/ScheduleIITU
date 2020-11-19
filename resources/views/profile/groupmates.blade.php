@extends('profile.layout')
@section('title', 'Groupmates | Schedule IITU')
@section('groupmates', 'active')

@section('tab')

<profile-tab title='Groupmates'>

   @forelse ($user->student->groupmates as $group)
      <div class="blocks__title">
         {{ $group['name'] }}
      </div>
      @forelse ($group['students'] as $groupmate)
         <profile-block>
            <div class="groupmate">{{ $groupmate->user->fullname }}</div>
         </profile-block>
      @empty
         <profile-block>
            <list-empty text="Wow! You first member"></list-empty>
         </profile-block>
      @endforelse
   @empty
      <profile-block>
         <list-empty text="Firstly add group"></list-empty>
      </profile-block>
   @endforelse

</profile-tab>

@endsection