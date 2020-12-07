@extends('layouts.admin')
@section('users', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      @yield('page-title')
   </h1>
   <div class="container">

      <div class="admin-page-slider">
         <div class="admin-page-slider-content">
            <a href="{{ route('admin.students') }}" class="admin-page-slider-elem @yield('students-link')">
               Students
            </a>
            <a href="{{ route('admin.teachers') }}" class="admin-page-slider-elem @yield('teachers-link')">
               Teachers
            </a>
            <a href="{{ route('admin.deans') }}" class="admin-page-slider-elem @yield('deans-link')">
               Deans
            </a>
         </div>
      </div>

      @yield('subcontent')
      
   </div>
</main>

@endsection