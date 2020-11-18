<!DOCTYPE html>
<html>

<head>
  <title>@yield('title')</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
  <link rel="shortcut icon" href="{{ asset('/img/favicon.ico') }}" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script src="https://kit.fontawesome.com/dc04de3ae3.js" crossorigin="anonymous"></script>
</head>

<body class="lock">
  <div id="app">

    <div class="loader" :class="{hide:!loaderActive}">
      <div class="loader-box">
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
    
      <app-nav lang="En" search-page='{{ route('search') }}' class='@yield('nav-top')'>
        @if (isset($user) && $user->isUser)
          <a class="btn tr" href="/profile"><i class="fas fa-user"></i></a>
        @endif
        @if (isset($user) && $user->isAdmin)
          <a class="btn tr" href="/admin"><i class="fas fa-cog"></i></a>
        @endif
      </app-nav>


      @yield('content')


      @if (!isset($footer))
        <app-footer text="All rights reserved"></app-footer>
      @endif
    </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2"></script> -->
  <script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>