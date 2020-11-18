@extends('profile.layout')
@section('title', 'Teacher | Schedule IITU')
@section('teachers', 'active')

@section('tab')

@if (isset($user->student))
<profile-tab title='Teachers'>

   <profile-block title='Operating Systems'>
      <profile-teacher name='Saya Z. Sapakova' 
                  email="s.sapakova@edu.iitu.kz" 
                  degree='Senior Lecture' 
                  department='IT'
                  role="Lecture, Practice, Lab">
      </profile-teacher>
   </profile-block>

</profile-tab>
@endif

@endsection