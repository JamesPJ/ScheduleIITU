@extends('layouts.app')
@section('title', 'Search: '.$word.' | Schedule IITU')

@section('content')

<main class="page">

   <div class="search">
      <div class="search__container">
         <h1 class="search__title">Search results for: {{ $word }}</h1>
         <div class="search__list">

            @forelse ($result as $r)
               <search-item name='{{ $r['name'] }}' 
                           type='{{ $r['type'] }}' 
                           link="{{ route('timetable.'.$r['type'], $r['id']) }}">
               </search-item>
            @empty
                <list-empty text='Nothing found'></list-empty>
            @endforelse

         </div>
      </div>
   </div>

</main>

@endsection