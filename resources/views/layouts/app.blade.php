<!DOCTYPE html>
<html>

<head>
  <title>@yield('title')</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
  <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script src="https://kit.fontawesome.com/dc04de3ae3.js" crossorigin="anonymous"></script>
</head>

<body class="lock">
  <div id="app">

    @if (session('error'))
      <alert title='Error' message='{{ session('error') }}' type='error'></alert>
    @endif
    @if (session('success'))
      <alert title='Success' message='{{ session('success') }}' type='success'></alert>
    @endif

    <div class="loader" :class="{hide:!loaderActive}">
      <div class="loader-box">
        <div class="loader-circle"></div>
      </div>
    </div>

    @yield('background')

    <div class="wrapper">
      <app-nav @yield('page-name') role='anonymous' lang="En" @yield('nav-top')></app-nav>
      <main class="page @yield('page-center')">

        @yield('content')

      </main>
      <app-footer text="All rights reserved"></app-footer>
    </div>

  </div>


  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2"></script> -->
  <script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>