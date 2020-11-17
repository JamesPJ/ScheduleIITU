@extends('layouts.app')
@section('title', 'Your group | Schedule IITU')

@section('content')

<main class="page center">

   <div class="select">
      <h1 class="select__title">First time here? Let's select your group.</h1>
      <p class="select__subtitle">You can add more groups later in profile!</p>
      <group-select link="{{ route('group-select') }}" text='This is my group!'></group-select>
   </div>

</main>

@endsection