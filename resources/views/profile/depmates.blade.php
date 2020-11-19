@extends('profile.layout')
@section('title', 'Department | Schedule IITU')
@section('departmentmates', 'active')

@section('tab')

<profile-tab title='Departmentmates' center-block-title="yes">
   
   @forelse ($user->teacher->depmates as $index=>$teacher)
      @if ($index == 0)
         <profile-block title="{{ $teacher->department->name }}">
            <profile-teacher name='{{ $teacher->user->fullname }}' 
                        email="{{ $teacher->user->email }}" 
                        degree='{{ $teacher->degree->name }}'>
            </profile-teacher>
         </profile-block>
      @else
         <profile-block>
            <profile-teacher name='{{ $teacher->user->fullname }}' 
                        email="{{ $teacher->user->email }}" 
                        degree='{{ $teacher->degree->name }}'>
            </profile-teacher>
         </profile-block>
      @endif
   @empty
      <profile-block title="{{ $user->teacher->department->name }}">
         <list-empty text="No one in this department"></list-empty>
      </profile-block>
   @endforelse
</profile-tab>

@endsection