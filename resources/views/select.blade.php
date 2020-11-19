@extends('layouts.app')
@section('title', 'Your group | Schedule IITU')

@section('content')

<main class="page center">

   @if ($user->isStudent)
   <div class="select">
      <h1 class="select__title">First time here? Let's select your group.</h1>
      <p class="select__subtitle">You can add more groups later in profile!</p>
      <group-select link="{{ route('profile.group.add') }}" 
                  text='This is my group!'
                  api-grads="{{ route('api.graduations') }}"
                  api-courses="{{ route('api.courses') }}"
                  api-specialities="{{ route('api.specialities') }}"
                  api-groups="{{ route('api.groups') }}"></group-select>
   </div>
   @endif

</main>

@endsection