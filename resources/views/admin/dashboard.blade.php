@extends('layouts.admin')
@section('title', 'Dashboard | Admin Panel')
@section('dashboard', 'active')

@section('content')

<main class="page">
   <h1 class="admin-page-title">
      Dashboard
   </h1>
   <div class="admin-dashboard container">

		<div class="admin-dashboard-block">
         <circle-bar progress="{{ $workload }}"></circle-bar>
         <div class="admin-dashboard-block-text">
            Workload of rooms
         </div>
      </div>

      <div class="admin-dashboard-block">
         <div class="admin-dashboard-block-total-img">
            <i class="fas fa-user-tie"></i>
         </div>
         <div class="admin-dashboard-block-total-count">
            {{ $totalTeachers }}
         </div>
         <div class="admin-dashboard-block-text">
            Teachers registered
         </div>
      </div>

      <div class="admin-dashboard-block">
         <div class="admin-dashboard-block-total-img">
            <i class="fas fa-user-graduate"></i>
         </div>
         <div class="admin-dashboard-block-total-count">
            {{ $totalStudents }}
         </div>
         <div class="admin-dashboard-block-text">
            Students registered
         </div>
      </div>

      <div class="admin-dashboard-block">
         <app-chart>
            @foreach ($daysWorkloaded as $dayName=>$percentage)
               <app-chart-elem text="{{ $dayName }}" percentage="{{ $percentage }}"></app-chart-elem>
            @endforeach
         </app-chart>

         <div class="admin-dashboard-block-text">
            Daily workload of rooms
         </div>
      </div>

      <div class="admin-dashboard-block">
         <app-chart>
            @foreach ($maxWorkloadedRoom as $room)
               <app-chart-elem text="{{ $room['room']->location }}" 
                           percentage="{{ $room['percentage'] }}"></app-chart-elem>
            @endforeach
         </app-chart>
         <div class="admin-dashboard-block-text">
            Top 5 workloaded rooms
         </div>
      </div>

      <div class="admin-dashboard-block">
         <app-chart>
            @foreach ($maxWorkloadedTime as $time)
               <app-chart-elem text="{{ $time['time']->startStr }} {{ $time['time']->endStr }}" 
                           percentage="{{ $time['percentage'] }}"></app-chart-elem>
            @endforeach
         </app-chart>
         <div class="admin-dashboard-block-text">
            Top 5 workloaded times
         </div>
      </div>

   </div>
</main>

@endsection