@extends('profile.layout')
@section('title', 'Department | Schedule IITU')
@section('departmentmates', 'active')

@section('tab')

<profile-tab title='Departmentmates' center-block-title="yes">
   
   <div class="blocks__title">
      {{ $user->teacher->department->name }}
   </div>
   @forelse ($user->teacher->depmates as $teacher)
      <profile-block>
         <profile-teacher name='{{ $teacher->user->fullname }}' 
                     email="{{ $teacher->user->email }}" 
                     degree='{{ $teacher->stringDegrees }}'>
         </profile-teacher>
      </profile-block>
   @empty
      <profile-block>
         <list-empty text="No one in this department"></list-empty>
      </profile-block>
   @endforelse
</profile-tab>

@endsection