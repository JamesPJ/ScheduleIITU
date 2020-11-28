@extends('profile.layout')
@section('title', 'Free rooms | Schedule IITU')
@section('free', 'active')

@section('tab')

<profile-tab title="Free Rooms">

   <div class="blocks__title">
      Now free rooms:
   </div>

   @forelse ($freeRooms as $room)
      <profile-block>
         <a href="{{ route('timetable.room', $room->id) }}" class="room">{{ $room->location }}</a>
      </profile-block>
   @empty
      <profile-block>
         <list-empty text="{{ $text }}"></list-empty>
      </profile-block>
   @endforelse

   
</profile-tab>

@endsection