@extends('layouts.admin')
@section('title', 'Login | Admin Panel')

@section('content')

<main class="page center">
   <div class="login-block">
      <h1 class="login-block-name">{{ $user->fullname }}</h1>
      <h2 class="login-block-email">{{ $user->email }}</h2>
      <form action="{{ route('admin.auth') }}" class="admin-login-form" method="post">
         @csrf
         <input type="password" name="password" placeholder="Password">
         <button class="admin-login-form-btn btn">Login</button>
      </form>
   </div>
</main>

@endsection