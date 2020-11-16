@extends('layouts.app')
@section('title', 'Schedule IITU')


@section('background')
<div id="homeBG">
   <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920"
      height="1080" preserveAspectRatio="none" viewBox="0 0 1920 1080">
      <g>
         <path class="leftTop" d="M0,652.378C121.267,679.866,253.674,622.703,348.489,542.259C438.917,465.537,449.91,335.835,499.862,228.279C550.216,
               119.856,660.336,25.833,643.283,-92.49C626.23,-210.813,496.095,-271.76,415.122,-359.706C337.044,-444.507,281.712,-553.593,
               176.136,-599.865C64.165,-648.94,-66.106,-658.94,-182.533,-621.65C-297.728,-584.754,-385.44,-493.628,-457.914,
               -396.785C-526.708,-304.86,-563.369,-196.879,-584.831,-84.086C-607.145,33.185,-650.301,167.396,-584.178,266.785C-517.788,
               366.574,-359.896,338.334,-259.866,404.36C-157.865,471.687,-119.193,625.36,0,652.378">
         </path>
         <path class="rightBottom" d="M1920 1751.613C2047.62 1743.821 2075.745 1556.7060000000001 2173.077 1473.795 2252.104 
               1406.4769999999999 2376.325 1401.204 2433.2619999999997 1314.399 2492.925 1223.439 2500.2380000000003 
               1106.474 2484.626 998.819 2469.025 891.242 2410.863 798.126 2345.768 711.0699999999999 2276.424 618.331 
               2203.571 523.171 2096.32 479.51 1983.671 433.65099999999995 1847.704 409.246 1739.163 464.125 1632.842 
               517.882 1604.019 652.294 1547.333 757.082 1502.836 839.3389999999999 1474.66 923.398 1443.094 1011.431 
               1402.6680000000001 1124.174 1290.384 1235.963 1335.897 1346.751 1380.992 1456.522 1548.718 1438.356 
               1646.252 1505.96 1749.099 1577.247 1795.096 1759.239 1920 1751.613">
         </path>
      </g>
   </svg>
</div>
@endsection


@section('content')

<app-nav lang="En">
   <a class="btn tr" href="/profile"><i class="fas fa-user"></i></a>
   <a class="btn tr" href="/admin"><i class="fas fa-cog"></i></a>
</app-nav>

<main class="page center">

   <div class="search">
      <h1 class="search__title">What are you looking for?</h1>
      <form action="{{ route('search') }}" method="GET" class="search__form">
         <input name="keyword" type="text" placeholder="Group, Teacher, Room..." required autocomplete="off"
            onfocus="bgAnimate()" onfocusout="bgAnimate()">
         <button type="submit"><i class="fas fa-search"></i></button>
      </form>
      <h2 class="search__subtitle">Or</h2>
      <a href="/login" class="search__openid"><i class="fab fa-microsoft"></i>OpenID</a>
   </div>

</main>

<app-footer text="All rights reserved"></app-footer>
@endsection