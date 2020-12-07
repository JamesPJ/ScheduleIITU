@extends('layouts.admin')
@section('departments', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      @yield('page-title')
   </h1>
   <div class="container">

      <div class="admin-page-slider">
         <div class="admin-page-slider-content">
            <a href="{{ route('admin.departments') }}" class="admin-page-slider-elem @yield('departments-link')">
               Departments
            </a>
            <a href="{{ route('admin.degrees') }}" class="admin-page-slider-elem @yield('degrees-link')">
               Teacher degrees
            </a>
         </div>
      </div>

      @yield('subcontent')
      
   </div>
</main>

@endsection