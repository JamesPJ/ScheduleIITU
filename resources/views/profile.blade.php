@extends('layouts.app')
@section('title', 'Profile | Schedule IITU')
@section('page-center', 'center')

@section('content')
<profile>
   <button id="menu-open" class="btn tr" onclick="menuOpen()">
      <i class="fas fa-angle-right"></i>
   </button>
   <sidebar name='{{ session('userName') }}' email='{{ session('userEmail') }}' role='student'></sidebar>
   <tabs-list>
      <!-- ! PROFILE -->
      <profile-tab title="Profile Setting" class="active" id="profile-tab">
         <profile-block title='Groups' expand='yes'>
            <profile-group group-id='1' name='CSSE-1803K'></profile-group>
            <profile-group group-id='2' name='CSSE-1807K'></profile-group>
            <profile-group group-id='3' name='CSSE-1808K'></profile-group>
         </profile-block>
         <button class="btn outline success" data-modal="add-group">Add Group</button>
         <modal id="add-group">
            <div class="container">
               <group-select text="Add"></group-select>
            </div>
         </modal>
      </profile-tab>

      <!-- ! EXAMS -->
      <profile-tab title='Exams' class="bottom" id="exams-tab">
         <profile-block title='Exams of this semester'>
            <profile-exam subject-name="Web Technologies" date="11/12/2020" time='15:00' duration='60'
               room='404' students-number='18' exam-form='Project' teacher='Alpysbay N.E.'
               group='CSSE-1803K'></profile-exam>
         </profile-block>
         <profile-block>
            <profile-exam subject-name="Web Technologies" date="12/12/2020" time='15:00' duration='60'
               room='404' students-number='18' exam-form='Project' teacher='Alpysbay N.E.'
               group='CSSE-1803K'></profile-exam>
         </profile-block>
      </profile-tab>

      <!-- ! GROUPMATES -->
      <profile-tab title='Groupmates' class="bottom" id="groupmates-tab">
         <profile-block title='CSSE-1803K'>
            <profile-groupmate name='Timur Rakhmetulla'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Daulet Bakhytzhan'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Ali Baitas'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Meiyr Erbol'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Kasiyet Yerkin'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Almat Sagandykov'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Abai Kunanbaev'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Ulbolsyn Tulekova'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Rahim Kurmangali'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Temirlan Asanov'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Zhandos Tynystan'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Bekzat Zharylkassyn'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Bekzat Myrzan'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Dinara Jalakenova'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Bolat Mombek'></profile-groupmate>
         </profile-block>
         <profile-block>
            <profile-groupmate name='Erlan Erzhan'></profile-groupmate>
         </profile-block>
      </profile-tab>

      <!-- ! TEACHERS -->
      <profile-tab title='Teachers' class="bottom" id="teachers-tab" center-block-title="yes">
         <profile-block title='Operating Systems'>
            <profile-teacher name='Saya Z. Sapakova' email="s.sapakova@edu.iitu.kz" degree='Senior Lecture' department='IT'
               role="Lecture, Practice, Lab"></profile-teacher>
         </profile-block>
         <profile-block title="Web Technologies">
            <profile-teacher name='Nurzhan Mukazhanov' email="n.mukazhanov@edu.iitu.kz" role="Lecture">
            </profile-teacher>
         </profile-block>
         <profile-block>
            <profile-teacher name='Nursultan Y. Alpysbay' email="n.alpysbay@edu.iitu.kz"
               role="Practice, Lab"></profile-teacher>
         </profile-block>
         <profile-block title="Architecture and Organization of Computer Systems">
            <profile-teacher name='Nurgul Nalgozhina' email="n.nalgozhina@edu.iitu.kz"
               role="Lecture, Practice, Lab"></profile-teacher>
         </profile-block>
         <profile-block title="Software Development Tools">
            <profile-teacher name='Zhuldyz Kalpeyeva' email="zh.kalpeyeva@edu.iitu.kz" role="Lecture">
            </profile-teacher>
         </profile-block>
         <profile-block>
            <profile-teacher name='Aigerim K. Bolshibayeva' email="a.bolshibayeva@edu.iitu.kz"
               role="Practice, Lab">
            </profile-teacher>
         </profile-block>
         <profile-block title="Microsoft .NET Framework, Application Dev Foundation">
            <profile-teacher name='Yergali Dauletbek' email="y.dauletbek@edu.iitu.kz" role="Lecture">
            </profile-teacher>
         </profile-block>
         <profile-block>
            <profile-teacher name='Assel Sagalova' email="a.sagalova@edu.iitu.kz" role="Practice, Lab">
            </profile-teacher>
         </profile-block>
         <profile-block title="Java EE Web-Component Developer">
            <profile-teacher name='Ilyas Zhuanyshev' email="i.zhuanyshev@edu.iitu.kz"
               role="Lecture, Practice, Lab"></profile-teacher>
         </profile-block>
      </profile-tab>

      <!-- ! DEPMATES -->
      <profile-tab title='Departmentmates' class="bottom" id='departmentmates-tab' center-block-title="yes">
         <profile-block>
            <profile-teacher name='Nursultan Y. Alpysbay' email="n.alpysbay@edu.iitu.kz"></profile-teacher>
         </profile-block>
      </profile-tab>

   </tabs-list>
</profile>
@endsection