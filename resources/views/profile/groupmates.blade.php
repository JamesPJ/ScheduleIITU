@extends('profile.layout')
@section('title', 'Groupmates | Schedule IITU')
@section('groupmates', 'active')

@section('tab')

<profile-tab title='Groupmates'>

   @foreach ($user->student->groupmates as $groupmate)
   <profile-block>
      <div class="groupmate">{{ $groupmate->user->fullname }}</div>
   </profile-block>
   @endforeach

</profile-tab>

@endsection