@extends('layouts.app')
@section('title', 'Search: '.$word.' | Schedule IITU')

@section('content')

<main class="page center">

   <div class="search">
      <div class="search__container">
         <h1 class="search__title">Search results for: {{ $word }}</h1>
         <div class="search__list">

            <search-item name='CSSE-1803K' type='Group' link="{{ route('timetable', 1) }}"></search-item>
            <search-item name='Almisreb A.A' type='Teacher' link="{{ route('timetable', 2) }}"></search-item>
            <search-item name='404' type='Room' link="{{ route('timetable', 3) }}"></search-item>

         </div>
      </div>
   </div>

</main>

@endsection