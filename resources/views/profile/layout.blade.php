@extends('layouts.app')

@section('content')

<main class="page center">

   <div class="profile">
      <button id="menu-open" class="btn tr" onclick="menuOpen()">
         <i class="fas fa-angle-right"></i>
      </button>
      
      <sidebar name='{{ $user->fullname }}' email='{{ $user->email }}' role='{{ $user->stringRoles }}' logo-link="{{ asset('/img/logo.png') }}">
         @if ($user->isStudent)
            <a href="{{ route('profile.index') }}" class="sidebar__link @yield('profile')">Profile</a>
            <a href="{{ route('profile.groupmates') }}" class="sidebar__link @yield('groupmates')">Groupmates</a>
            <a href="{{ route('profile.teachers') }}" class="sidebar__link @yield('teachers')">Teachers</a>
         @endif
         @if($user->isTeacher)
            <a href="{{ route('profile.departmentmates') }}" class="sidebar__link @yield('departmentmates')">Departmentmates</a>
         @endif
         <a href="{{ route('schedule') }}" class="sidebar__link">Schedule</a>
         <a href="{{ route('profile.exams') }}" class="sidebar__link @yield('exams')">Exams</a>
         <a href="{{ route('logout') }}" class="sidebar__link danger">Logout</a>
      </sidebar>
      
      @yield('tab')

   </div>

</main>

@endsection