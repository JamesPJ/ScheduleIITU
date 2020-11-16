@extends('layouts.app')
@section('title', 'Choose your group | Schedule IITU')
@section('page-center', 'center')

@section('content')
<div class="select">
   <h1 class="select__title">First time here? Let's select your group.</h1>
   <p class="select__subtitle">You can add more groups later in profile!</p>
   <group-select text='This is my group!'></group-select>
</div>
@endsection