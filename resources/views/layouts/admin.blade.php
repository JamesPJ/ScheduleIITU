<!DOCTYPE html>
<html>

<head>
   <title>@yield('title')</title>
   <meta charset="UTF-8">
   <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
   <link rel="stylesheet" href="{{ asset('/css/admin.css') }}">
   <link rel="shortcut icon" href="{{ asset('/img/favicon.ico') }}" type="image/x-icon">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <script src="https://kit.fontawesome.com/dc04de3ae3.js" crossorigin="anonymous"></script>
</head>

<body class="lock">
   <div id="app">
      <div class="loader" :class="{hide:!loaderActive}">
         <div class="loader-box secondary">
            <div class="loader-circle"></div>
         </div>
      </div>

      @if (isset($error))
      <alert title='Error' message='{{ $error }}' type='error'></alert>
      @endif
      @if (isset($success))
      <alert title='Success' message='{{ $success }}' type='success'></alert>
      @endif

      @yield('background')

      <div class="wrapper">

         <app-nav lang="En" search-page='{{ route('search') }}' menu-left="yes" @yield('nav-top')>
            @if (isset($user) && $user->isUser)
            <a class="btn tr" href="{{ route('profile.index') }}"><i class="fas fa-user"></i></a>
            @endif
            @if (isset($user) && $user->isAdmin)
            <a class="btn tr" href="{{ route('admin.dashboard') }}"><i class="fas fa-cog"></i></a>
            @endif
            @if (isset($user) && $user->isOnlyAdmin)
            <a class="btn tr" href="{{ route('logout') }}"><i class="fas fa-sign-out-alt"></i></a>
            @endif
         </app-nav>
         <div id="admin-menu">
            <div class="admin-menu-blank">
               <h1 class="admin-menu-blank-title">Admin Panel</h1>
               <button class="btn tr close" onclick="toggleAdminMenu()"><i class="fas fa-bars"></i></button>
            </div>
            <div class="admin-menu-content">
               <a href="{{ route('admin.dashboard') }}" class="admin-menu-link @yield('dashboard')">Dashboard</a>
               <a href="{{ route('admin.users') }}" class="admin-menu-link @yield('users')">Users</a>
               <a href="{{ route('admin.groups') }}" class="admin-menu-link @yield('groups')">Groups</a>
               <a href="{{ route('admin.departments') }}" class="admin-menu-link @yield('departments')">Departments</a>
               <a href="{{ route('admin.timetables') }}" class="admin-menu-link @yield('timetables')">Timetables</a>
               <a href="{{ route('admin.exams') }}" class="admin-menu-link @yield('exams')">Exams</a>
               <a href="{{ route('admin.settings') }}" class="admin-menu-link @yield('settings')">Settings</a>
            </div>
         </div>


         @yield('content')


         @if (!isset($footer))
         <app-footer text="All rights reserved"></app-footer>
         @endif
      </div>

   </div>

   <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
   <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2"></script> -->
   <script src="{{ asset('/js/admin.app.js') }}"></script>
   <script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>
