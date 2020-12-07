@extends('layouts.admin')
@section('groups', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      @yield('page-title')
   </h1>
   <div class="container">

      <div class="admin-page-slider">
         <div class="admin-page-slider-content">
            <a href="{{ route('admin.groups') }}" class="admin-page-slider-elem @yield('groups-link')">
               Groups
            </a>
            <a href="{{ route('admin.specialities') }}" class="admin-page-slider-elem @yield('specialities-link')">
               Specialities
            </a>
         </div>
      </div>

      @yield('subcontent')
      
   </div>
</main>

@endsection