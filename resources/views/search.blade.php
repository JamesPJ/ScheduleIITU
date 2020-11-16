@extends('layouts.app')
@section('title', 'Search: '.$word.' | Schedule IITU')

@section('content')

<app-nav lang="En">
   <a class="btn tr" href="/profile"><i class="fas fa-user"></i></a>
   <a class="btn tr" href="/admin"><i class="fas fa-cog"></i></a>
</app-nav>

<main class="page center">

   <div class="search">
      <div class="search__container">
         <h1 class="search__title">Search results for: {{ $word }}</h1>
         <div class="search__list">

            <search-item name='CSSE-1803K' type='Group' timetable-id='1'></search-item>
            <search-item name='Almisreb A.A' type='Teacher' timetable-id='2'></search-item>
            <search-item name='404' type='Room' timetable-id='3'></search-item>

         </div>
      </div>
   </div>

</main>
<app-footer text="All rights reserved"></app-footer>
@endsection