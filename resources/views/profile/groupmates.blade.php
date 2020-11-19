@extends('profile.layout')
@section('title', 'Groupmates | Schedule IITU')
@section('groupmates', 'active')

@section('tab')

<profile-tab title='Groupmates'>

   @forelse ($user->student->groupmates as $group)
      @forelse ($group['students'] as $index=>$groupmate)
         @if ($index == 0)
            <profile-block title='{{ $group['name'] }}'>
               <div class="groupmate">{{ $groupmate->user->fullname }}</div>
            </profile-block>
         @else
            <profile-block>
               <div class="groupmate">{{ $groupmate->user->fullname }}</div>
            </profile-block>
         @endif
      @empty
         <profile-block title='{{ $group['name'] }}'>
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