@extends('layouts.admin')
@section('title', 'Settings | Admin Panel')
@section('settings', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      Settings
   </h1>
   <div class="admin-settings">
      <div class="admin-settings-block">
         <h1 class="admin-settings-title">Password</h1>
         <form action="{{ route('admin.changePassword') }}" method="POST" class="admin-settings-password">
            @csrf
            <input type="password" name="old_password" placeholder="Old Password" autocomplete="off">
            <input type="password" name="new_password" placeholder="New Password">
            <input type="password" name="new_repeat_password" placeholder="Repeat Password">
            <button class="btn outline success">Save</button>
         </form>
      </div>
   </div>
</main>

@endsection