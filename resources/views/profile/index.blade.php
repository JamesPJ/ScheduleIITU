@extends('profile.layout')
@section('title', 'Profile | Schedule IITU')
@section('profile', 'active')

@section('tab')

<profile-tab title="Profile Setting">

   <div class="blocks__title">
      Groups
   </div>

   <profile-block expand='yes'>
   @forelse ($user->student->groups as $group)
      <profile-group group-id='{{ $group->id }}' 
                     name='{{ $group->name }}' 
                     link='{{ route('profile.group.delete') }}'>
      </profile-group>
   @empty
      <list-empty text="You haven't added any group"></list-empty>
   @endforelse
   </profile-block>

   
   <button class="btn outline success" data-modal="add-group">Add Group</button>
   <modal id="add-group">
      <div class="container">
         <group-select link="{{ route('profile.group.add') }}" 
                     text='Add'
                     api-grads="{{ route('api.graduations') }}"
                     api-courses="{{ route('api.courses') }}"
                     api-specialities="{{ route('api.specialities') }}"
                     api-groups="{{ route('api.groups') }}"></group-select>
      </div>
   </modal>
   
</profile-tab>

@endsection