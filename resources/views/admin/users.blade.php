@extends('layouts.admin')
@section('title', 'Users | Admin Panel')
@section('users', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      Users
   </h1>
   <div class="container">

      <div class="admin-page-slider">
         <div class="admin-page-slider-content">
            <a href="#" class="admin-page-slider-elem active">
               Students
            </a>
            <a href="#" class="admin-page-slider-elem">
               Teachers
            </a>
            <a href="#" class="admin-page-slider-elem">
               Deans
            </a>
         </div>
      </div>

      
      
   </div>
</main>

@endsection