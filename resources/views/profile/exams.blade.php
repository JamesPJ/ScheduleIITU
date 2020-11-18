@extends('profile.layout')
@section('title', 'Exams | Schedule IITU')
@section('exams', 'active')

@section('tab')

<profile-tab title='Exams'>

   <profile-block title='Exams of this semester'>
      <profile-exam subject-name="Web Technologies" 
                  date="11/12/2020" 
                  time='15:00' 
                  duration='60'
                  room='404' 
                  students-number='18' 
                  exam-form='Project' 
                  teacher='Alpysbay N.E.'
                  group='CSSE-1803K'>
      </profile-exam>
   </profile-block>

</profile-tab>

@endsection