@extends('layouts.app')
@section('title', 'Your group | Schedule IITU')

@section('content')

<app-nav lang="En">
   <a class="btn tr" href="/profile"><i class="fas fa-user"></i></a>
   <a class="btn tr" href="/admin"><i class="fas fa-cog"></i></a>
</app-nav>

<main class="page center">

   <div class="select">
      <h1 class="select__title">First time here? Let's select your group.</h1>
      <p class="select__subtitle">You can add more groups later in profile!</p>
      <group-select text='This is my group!'></group-select>
   </div>

</main>
<app-footer text="All rights reserved"></app-footer>
@endsection