@extends('layouts.admin')
@section('title', 'Users | Admin Panel')
@section('users', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      Users
   </h1>
   <div class="container">
      <admin-users users-link="{{ route('admin.api.users') }}"
                  students-link="{{ route('admin.api.students') }}"
                  teachers-link="{{ route('admin.api.teachers') }}"
                  deans-link="{{ route('admin.api.deans') }}"
                  add-user-link="{{ route('admin.api.add-user') }}"
                  edit-user-link="{{ route('admin.api.edit-user') }}"
                  delete-user-link="{{ route('admin.api.delete-user') }}"
                  departments-link="{{ route('admin.api.departments') }}"></admin-users>
   </div>
</main>

@endsection