const { default: Axios } = require("axios");

Vue.component('app-footer', {
   props: ['text'],
   data: function () {
      return {
         link: "https://github.com/hypev",
         name: "kurr"
      };
   },
   computed: {
      year: function () {
         return new Date().getFullYear();
      }
   },
   template: `
      <footer class="footer">
         <div class="footer-content container">
            <p class="footer-content-text">
               {{ text }} &copy;
               <a :href="link" target="_blank">{{ name }}</a>
               {{ year }}
            </p>
         </div>
      </footer>
   `
});

Vue.component('app-nav', {
   props: ['lang', 'top', 'search-page'],
   data: function () {
      return {
         dropDown: false,
         langs: ['En', 'Ru', 'Kz'],
      };
   },
   methods: {
      langDropDown: function () {
         this.dropDown = !this.dropDown;
      }
   },
   template: `
      <header class="header">
         <div class="header__content">
            <nav class="menu">
               <div class="lang">

                  <button class="btn tr" data-modal="search"><i class="fas fa-search"></i></button>
                  <modal id="search">
                     <form :action="searchPage" method='GET' class="search__form" id="search-overlay-form">
                        <input name="keyword" type="text" placeholder="Group, Teacher, Room..." required
                           autocomplete="off">
                        <button type="submit"><i class="fas fa-search"></i></button>
                     </form>
                  </modal>

                  <slot></slot>

                  <div class="lang">
                     <button class="btn lang__btn" @click="langDropDown">
                        {{ lang }} <i class="fas fa-angle-down"></i>
                     </button>
                     <div class="lang__dropdown" :class="{active:dropDown}">
                        <a href="#" class="btn lang__btn" v-for="l of langs" v-if="l != lang">{{l}}</a>
                     </div>
                  </div>
               </div>
            </nav>
         </div>
      </header>
   `
});

Vue.component('list-empty', {
   props: ['text'],
   template: `
      <div class='empty'>
         {{ text }}
      </div>
   `
});

Vue.component('alert', {
   props: ['obj', 'title', 'message', 'type'],
   data: function () {
      return {
         active: true
      }
   },
   computed: {
      classComputed: function () {
         return this.obj ? this.obj.class : this.classType;
      },
      classType: function () {
         if (this.type || this.type === 'error' || this.type === 'success') {
            if (this.type === 'error')
               return {
                  active: this.active,
                  error: true,
                  success: false
               };
            else
               return {
                  active: this.active,
                  error: false,
                  success: true
               };
         }
         return {
            active: this.active
         };
      },
      titleComputed: function () {
         return this.obj ? this.obj.title : this.title ? this.title : "Where is title?";
      },
      messageComputed: function () {
         return this.obj ? this.obj.message : this.message ? this.message : "";
      }
   },
   methods: {
      close: function () {
         if (this.obj)
            this.obj.class.active = false;
         else
            this.active = false;
      }
   },
   created: function () {
      this.active = this.obj ? this.obj.class.active : true;
   },
   template: `
      <div id="alert" :class="classComputed">
         <strong>{{ titleComputed }}</strong>
         <span v-if="messageComputed != ''">{{messageComputed}}</span>
         <button type="button" @click="close"><i class="fas fa-times"></i></button>
      </div>
   `
});

Vue.component('modal', {
   props: ['id'],
   methods: {
      close: function () {
         if (!data.modalMoving) {
            data.modalMoving = true;
            document.body.classList.remove("lock");
            document.getElementById(this.id).classList.remove("active");
            setTimeout(() => {
               document.getElementById(this.id).classList.remove("df");
               data.modalMoving = false;
            }, 301);
         }
      },
      checkContent: function (event) {
         if (!event.target.closest(".modal__content")) {
            this.close();
         }
      }
   },
   template: `
      <div class="modal" :id="id" @click="checkContent">
         <button class="modal__btn"><i class="fas fa-times"></i></button>
         <div class="modal__content">
            <slot></slot>
         </div>
      </div>
   `
});

Vue.component('group-select', {
   props: ['text', 'link', 'api-grads', 'api-courses', 'api-specialities', 'api-groups'],
   data: function () {
      return {
         grads: [],
         courses: [],
         specialities: [],
         groups: [],
         graduation: "",
         course: "",
         speciality: "",
         group: "",
         gradError: false,
         courseError: false,
         specError: false,
         groupError: false,
         changed: false,
         message: "",
         alert: {
            title: "",
            message: "",
            class: {
               error: true,
               success: false,
               active: false
            }
         }
      };
   },
   computed: {
      isGrads: function () {
         return this.grads.length > 0;
      },
      isCourses: function () {
         return this.graduation != "" && this.courses.length > 0;
      },
      isSpecialities: function () {
         return this.course != "" && this.specialities.length > 0;
      },
      isGroups: function () {
         return this.speciality != "" && this.groups.length > 0;
      },
      csrf: function () {
         return document.querySelector('meta[name="csrf-token"]').content;
      }
   },
   methods: {
      getGrads: function () {
         Axios
            .get(this.apiGrads)
            .then(response => {
               for (let g of response.data) {
                  this.grads.push({
                     id: g.id,
                     name: g.name
                  });
               }
            });
      },
      getCourses: function () {
         if (this.graduation != "") {
            Axios
               .get(this.apiCourses, {
                  params: {
                     id: this.graduation
                  }
               })
               .then(response => {
                  for (let c of response.data) {
                     this.courses.push(c);
                  }
               });
         }
      },
      getSpecialities: function () {
         if (this.course) {
            Axios
               .get(this.apiSpecialities, {
                  params: {
                     course: this.course
                  }
               })
               .then(response => {
                  for (let s of response.data) {
                     this.specialities.push({
                        id: s.id,
                        name: s.abbr
                     });
                  }
               });
         }
         return null;
      },
      getGroups: function () {
         if (this.speciality) {
            Axios
               .get(this.apiGroups, {
                  params: {
                     id: this.speciality,
                     course: this.course
                  }
               })
               .then(response => {
                  for (let s of response.data) {
                     this.groups.push({
                        id: s.id,
                        name: s.name
                     });
                  }
               });
         }
         return null;
      },
      sendForm: function (event) {
         if (!this.validate()) {
            this.alert.title = "Error";
            this.alert.message = this.message;
            this.alert.class.success = false;
            this.alert.class.error = true;
            this.alert.class.active = true;
            event.preventDefault();
         }
      },
      validate: function () {
         this.changed = false;
         if (this.grads && this.graduation == "") {
            this.message = "Please choose Graduation!";
            this.gradError = true;
            return false;
         } else this.gradError = false;

         if (this.courses && this.course == "") {
            this.message = "Please choose Course!";
            this.courseError = true;
            return false;
         } else this.courseError = false;

         if (this.specialities && this.speciality == "") {
            this.message = "Please choose Speciality!";
            this.specError = true;
            return false;
         } else this.specError = false;

         if (this.groups && this.group == "") {
            this.message = "Please choose Group!";
            this.groupError = true;
            return false;
         } else this.groupError = false;
         this.message = "";
         return true;
      }
   },
   created: function () {
      this.getGrads();
   },
   watch: {
      graduation: function () {
         if (this.graduation == "") {
            this.message = "Please choose Graduation!";
            this.gradError = true;
         } else {
            this.gradError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
         this.courses = [];
         this.specialities = [];
         this.groups = [];
         this.course = "";
         this.speciality = "";
         this.group = "";
         this.getCourses();
      },
      course: function () {
         if (!this.changed && this.course == "") {
            this.message = "Please choose Course!";
            this.courseError = true;
         } else {
            this.courseError = false;
            this.alert.class.active = false;
         }
         this.specialities = [];
         this.groups = [];
         this.speciality = "";
         this.group = "";
         this.changed = true;
         this.getSpecialities();
      },
      speciality: function () {
         if (!this.changed && this.speciality == "") {
            this.message = "Please choose Speciality!";
            this.specError = true;
         } else {
            this.specError = false;
            this.alert.class.active = false;
         }
         this.groups = [];
         this.group = "";
         this.changed = true;
         this.getGroups();
      },
      group: function () {
         if (!this.changed && this.group == "") {
            this.message = "Please choose Group!";
            this.groupError = true;
         } else {
            this.groupError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
      }
   },
   template: `
      <form class="select__form" method="POST" :action="link">
         <alert :obj="alert"></alert>
         <select v-model="graduation" :disabled="!isGrads" :class="{error:gradError}">
            <option disabled value="">Graduation</option>
            <option v-for="g in grads" :value="g.id">{{g.name}}</option>
         </select>
         <select v-model="course" :disabled="!isCourses" :class="{error:courseError}">
            <option disabled value="">Course</option>
            <option v-for="c in courses" :value="c">{{c}}</option>
         </select>
         <select v-model="speciality" :disabled="!isSpecialities" :class="{error:specError}">
            <option disabled value="">Speciality</option>
            <option v-for="s in specialities" :value="s.id">{{s.name}}</option>
         </select>
         <select name="group_id" v-model="group" :disabled="!isGroups" :class="{error:groupError}">
            <option disabled value="">Group</option>
            <option v-for="g in groups" :value="g.id">{{g.name}}</option>
         </select>
         <input type='hidden' name="_token" v-model="csrf">
         <button type="submit" class="select__form_btn" @click="sendForm($event)">{{ text }}</button>
      </form>
   `
});

// ! PROFILE PAGE

Vue.component('profile-block', {
   props: ['expand'],
   computed: {
      large: function () {
         return this.expand && this.expand === 'yes';
      }
   },
   template: `
      <div class="block" :class="{expand:large}">
         <div class="block__content">
            <slot></slot>
         </div>
      </div>
   `
});

Vue.component('profile-group', {
   props: ['group-id', 'name', 'link'],
   computed: {
      csrf: function () {
         return document.querySelector('meta[name="csrf-token"]').content;
      }
   },
   template: `
      <div class="group">
         <h1 class="group__name">{{ name }}</h1>
         <button class="btn outline error" :data-modal="name">Delete</button>
         <modal :id='name'>
            <div class="group__modal">
               <h1>Do you want delete {{name}} from group list?</h1>
               <form :action='link' method='post'>
                  <input type="hidden" name="_token" v-model="csrf">
                  <input type="hidden" name="id" v-model="groupId">
                  <button class="btn">Delete</button>
               </form>
            </div>
         </modal>
      </div>
   `
});

Vue.component('profile-exam', {
   props: ['subject-name', 'date', 'duration', 'room', 'students-number', 'exam-form', 'teacher', 'group'],
   computed: {
      when: function () {
         let text = this.days > 0 ? this.days + " days left" :
            this.days < 0 ? Math.abs(this.days) + " days passed" :
               "Today";

         if (this.days == 0) {
            let hour = Math.floor(Math.abs(this.minutes) / 60);
            let minute = (Math.abs(this.minutes) - hour * 60);
            let time = "";
            if (hour > 0)
               time += hour + " hour ";
            if (minute > 0)
               time += minute + " minutes";
            text = this.minutes > 0 ? time + " left" :
               this.minutes < 0 ? time + " passed" :
                  "Now";
         }
         return text;
      },
      days: function () {
         let day = 24 * 3600 * 1000;
         let examsDate = new Date(this.date);
         let nowDate = new Date();
         let days = (examsDate - nowDate) / day;
         return days > 0 ? Math.floor(days) : Math.ceil(days);
      },
      minutes: function () {
         let minute = 60 * 1000;
         let examsTime = new Date(this.date);
         let nowTime = new Date();
         let minutes = (examsTime - nowTime) / minute;
         return minutes > 0 ? Math.floor(minutes) : Math.ceil(minutes);
      },
      classObj: function () {
         return {
            red: this.days < 0,
            green: this.days == 0
         };
      },
      dateComputed: function () {
         let date = new Date(this.date);
         let dateStr = "";
         dateStr += ("0" + date.getDate()).slice(-2) + "/";
         dateStr += ("0" + (date.getMonth() + 1)).slice(-2) + "/";
         dateStr += date.getFullYear() + " ";
         dateStr += ("0" + date.getHours()).slice(-2) + ":";
         dateStr += ("0" + date.getMinutes()).slice(-2);
         return dateStr;
      }
   },
   template: `
      <div class="exam">
         <h1 :class="classObj">{{when}}</h1>
         <ul>
            <li>
               <i class="fas fa-circle"></i>
               <span>Subject:</span> {{subjectName}}
            </li>
            <li>
               <i class="far fa-calendar-alt"></i>
               <span>Date and Time:</span> {{dateComputed}}
            </li>
            <li>
               <i class="fas fa-hourglass"></i>
               <span>Duration:</span> {{duration}} min
            </li>
            <li>
               <i class="fas fa-map-marker-alt"></i>
               <span>Room:</span> {{room}}
            </li>
            <li>
               <i class="fas fa-users"></i>
               <span>Students Number:</span> {{studentsNumber}}
            </li>
            <li>
               <i class="fas fa-edit"></i>
               <span>Exam Form:</span> {{examForm}}
            </li>
            <li v-if="teacher">
               <i class="fas fa-user-tie"></i>
               <span>Teacher:</span> {{teacher}}
            </li>
            <li>
               <i class="fas fa-users"></i>
               <span>Group:</span> {{group}}
            </li>
         </ul>
      </div>
   `
});

Vue.component('profile-teacher', {
   props: ['name', 'email', 'role', 'degree', 'department'],
   computed: {
      link: function () {
         return "mailto:" + this.email;
      }
   },
   template: `
      <div class="profile-teacher">
         <h1>{{name}}</h1>
         <p v-if="role">{{role}}</p>
         <p>{{degree}}</p>
         <p v-if="department">Department: {{department}}</p>
         <a :href="link">{{email}}</a>
      </div>
   `
});

Vue.component('profile-tab', {
   props: ['title', 'center-block-title'],
   template: `
      <div class="tab" :class="{'center-block-title':centerBlockTitle}">
         <h1 class="tab__title">{{ title }}</h1>
         <slot></slot>
      </div>
   `
});

Vue.component('sidebar', {
   props: ['name', 'role', 'email', 'logo-link'],
   computed: {
      roleCap: function () {
         return this.role.charAt(0).toUpperCase() + this.role.slice(1);
      }
   },
   template: `
      <div class="sidebar" id="sidebar">
         <div class="sidebar__blank">
            <img :src="logoLink" alt="Logo">
         </div>
         <div class="sidebar__content">
            <h1 class="sidebar__name">{{ name }}</h1>
            <h2 class="sidebar__email">{{ email }}</h2>
            <p class="sidebar__role">{{ roleCap }}</p>
            <div class="sidebar__links">
               <slot></slot>
            </div>
         </div>
      </div>
   `
});

// ! SEARCH PAGE

Vue.component('search-item', {
   props: ['type', 'name', 'link'],
   template: `
      <a :href="link" class="search__item">
         <span class="search__item_type">{{ type }}</span>
         <span class="search__item_name">{{ name }}</span>
      </a>
   `
});

// ! SCHEDULE PAGE

Vue.component('schedule', {
   props: ['type', 'name'],
   computed: {
      icon: function () {
         return this.type == 'group' ? 'fa-users' :
            this.type == 'teacher' ? 'fa-user-tie' :
               this.type == 'room' ? 'fa-map-marker-alt' : "";
      }
   },
   template: `
      <div class="schedule">
         <div class="schedule__container">
            <h1 class="schedule__title"><i class="fas" :class="icon"></i> {{ name }}</h1>
            <slot></slot>
         </div>
      </div>
   `
});

Vue.component('day-slider', {
   computed: {
      transformIndicator: function () {
         let dayIndex = Math.min(Math.max(new Date().getDay() - 1, 0), 5);
         return {
            transform: `translateX(${dayIndex * 100}%)`
         }
      }
   },
   template: `
      <div class="schedule__slider">
         <div class="schedule__slider_indicator" id="schedule-indicator" :style="transformIndicator"></div>
         <slot></slot>   
      </div>
   `
});

Vue.component('day-slider-btn', {
   props: ['title-lg', 'title-md', 'title-sm', 'day'],
   methods: {
      changeDay: function () {
         let dayIndex = this.day;
         let indicator = document.getElementById("schedule-indicator");
         indicator.style.transform = `translateX(${dayIndex * 100}%)`;
         document.getElementsByClassName("schedule-day active")[0].classList.remove("active");
         document.querySelector(`.schedule-day[data-day="${dayIndex}"]`).classList.add("active");
      }
   },
   template: `
      <button class="schedule__slider_btn" :data-day="day" @click="changeDay" disabled>
         <span class="schedule__slider_btn--title--expand">{{ titleLg }}</span>
         <span class="schedule__slider_btn--title--tablet">{{ titleMd }}</span>
         <span class="schedule__slider_btn--title--mobile">{{ titleSm }}</span>
      </button>
   `
});

Vue.component('timetable-folder', {
   props: ['count'],
   template: `
      <div class="schedule-day__folder">
         <button class="schedule-day__folder_list" data-modal="subject-folder">
            <div class="schedule-day__folder_elem" v-for="e in Math.min(count, 4)"></div>
         </button>
         <modal id='subject-folder'>
            <div class="schedule-day__folder_modal">
               <slot></slot>
            </div>
         </modal>
      </div>
   `
});

Vue.component('timetable-time', {
   props: ['start', 'end'],
   template: `
      <div class="schedule__time_elem time__elem">
         <span class="time__elem_start">{{start}}</span>
         <span class="time__elem_end">{{end}}</span>
      </div>
   `
});

Vue.component('timetable-day', {
   props: ['day'],
   computed: {
      activeDay: function () {
         return {
            active: +this.day == Math.min(new Date().getDay() - 1, 6)
         }
      }
   },
   template: `
      <div class="schedule__column schedule-day" :class="activeDay" :data-day="day">
         <slot></slot>
      </div>
   `
});

Vue.component('timetable-group', {
   props: ['name'],
   template: `
      <li class="schedule-subj__groups_elem">{{ name }}</li>
   `
});

Vue.component('timetable-cell', {
   props: ['start', 'end', 'teacher', 'room', 'subject', 'type', 'degree'],
   computed: {
      isNotEmpty: function () {
         return this.start && this.end && this.teacher && this.room && this.subject && this.type;
      },
      near: function () {
         let s = this.startSeconds;
         return {
            'soon': this.startSeconds - this.currentSeconds <= 1200 && this.startSeconds - this.currentSeconds >= 0 && this.currentDay,
            'ongoing': this.currentSeconds >= this.startSeconds && this.currentSeconds < this.endSeconds && this.currentDay
         }
      },
      startSeconds: function () {
         let date = new Date();
         let hours = +this.start[0] * 10 + +this.start[1];
         let min = +this.start[3] * 10 + +this.start[4];
         date.setHours(hours, min, 0);
         return date.getTime() / 1000;
      },
      endSeconds: function () {
         let date = new Date();
         let hours = +this.end[0] * 10 + +this.end[1];
         let min = +this.end[3] * 10 + +this.end[4];
         date.setHours(hours, min, 0);
         return date.getTime() / 1000;
      },
      currentSeconds: function () {
         return new Date().getTime() / 1000;
      },
      currentDay: function () {
         let todayDay = new Date().getDay() - 1;
         let subjDay = this.$parent.day;
         return todayDay == subjDay;
      }
   },
   template: `
      <div class="schedule-day__subj" :data-start="start" :data-end="end">
         <button class="schedule-day__subj_content schedule-subj" :class="near" v-if="isNotEmpty">
            <span class="schedule-subj__teacher">{{ teacher }}</span>
            <span class="schedule-subj__class">{{ room }}</span>
            <span class="schedule-subj__name">{{ subject }}</span>
            <span class="schedule-subj__type">{{ type }}</span>
            <span class="schedule-subj__time">{{ start }} - {{ end }}</span>
            <span class="schedule-subj__degree">{{degree}}</span>
            <ul class="schedule-subj__groups">
               <slot></slot>
            </ul>
         </button>
      </div>
   `
});

var data = {
   loaderActive: true,
   modalMoving: false
}

var app = new Vue({
   el: "#app",
   data: data,
   mounted: function () {
      this.$nextTick(function () {
         setTimeout(() => {
            data.loaderActive = false;
            setTimeout(() => {
               document.body.classList.remove("lock");
            }, 10);
         }, 300);
      });
   }
});

document.addEventListener("DOMContentLoaded", function () {

   document.addEventListener("click", function (event) {
      if (!event.target.closest(".lang")) {
         app.$children[0].dropDown = false;
      }
   });

   document.querySelectorAll("*[data-modal]").forEach(item => {
      item.addEventListener('click', function () {
         if (!data.modalMoving) {
            data.modalMoving = true;
            document.body.classList.add("lock");
            document.getElementById(item.dataset.modal).classList.add("df");
            setTimeout(() => {
               document.getElementById(item.dataset.modal).classList.add("active");
            }, 10);
            setTimeout(() => {
               data.modalMoving = false;
            }, 311);
         }
      });
   });

   let sModal = document.getElementById("schedule-modal");
   if (sModal != null) {
      sModal.addEventListener("click", function (event) {
         if (!event.target.closest(".modal-content")) {
            subjModalClose();
         }
      });
   }

   let sliderBtn = document.getElementsByClassName("schedule__slider_btn");
   let indicator = document.getElementById("schedule-indicator");
   if (sliderBtn != null && indicator != null) {
      if (window.getComputedStyle(indicator, null).getPropertyValue("display") === "block") {
         btnStateChange(false);
      }
      window.onresize = function () {
         if (window.getComputedStyle(indicator, null).getPropertyValue("display") === "block") {
            btnStateChange(false);
         } else {
            btnStateChange(true);
         }
      };
   }

   let subjList = document.getElementsByClassName("schedule-day__subj_content");
   if (subjList != null) {
      for (let i = 0; i < subjList.length; i++) {
         subjList[i].addEventListener("click", function () {
            let subjName = subjList[i].getElementsByClassName("schedule-subj__name")[0].textContent;
            let teacherName = subjList[i].getElementsByClassName("schedule-subj__teacher")[0].textContent;
            let subjType = subjList[i].getElementsByClassName("schedule-subj__type")[0].textContent;
            let classroom = subjList[i].getElementsByClassName("schedule-subj__class")[0].textContent;
            let degree = subjList[i].getElementsByClassName("schedule-subj__degree")[0].textContent;
            let time = subjList[i].getElementsByClassName("schedule-subj__time")[0].textContent.split(" - ");
            let groups = subjList[i].getElementsByClassName("schedule-subj__groups_elem");
            console.log(time);
            let modal = document.getElementById("schedule-modal");
            document.getElementById("modal-subj-name").textContent = subjName;
            document.getElementById("modal-teacher-name").textContent = teacherName;
            document.getElementById("modal-teacher-degree").textContent = degree;
            document.getElementById("modal-subj-type").textContent = subjType;
            document.getElementById("modal-classroom").textContent = classroom;
            document.getElementById("modal-time").getElementsByClassName("modal-content__time_start")[0].textContent = time[0];
            document.getElementById("modal-time").getElementsByClassName("modal-content__time_end")[0].textContent = time[1];
            let groupsModal = document.getElementById("modal-groups");
            if (groups.length > 1) {
               document.getElementById("modal-groups-title").textContent = "Groups";
            } else {
               document.getElementById("modal-groups-title").textContent = "Group";
            }
            for (let j = 0; j < groups.length; j++) {
               let g = document.createElement("li");
               g.classList.add("modal-content__block_elem");
               g.textContent = groups[j].textContent;
               groupsModal.appendChild(g);
            }

            if (subjList[i].classList.contains("ongoing")) {
               modal.getElementsByClassName("modal-content")[0].classList.add("ongoing");
            } else if (subjList[i].classList.contains("soon")) {
               modal.getElementsByClassName("modal-content")[0].classList.add("soon");
            }

            modal.style.display = "block";
            document.body.classList.add("lock");
            setTimeout(function () {
               modal.classList.add("active");
            }, 20);
         }, false);
      }
   }

});

window.bgAnimate = function () {
   let bg = document.getElementById("homeBG");
   if (bg != null) {
      bg.classList.toggle("active");
   }
}

window.btnStateChange = function (state) {
   let btns = document.getElementsByClassName("schedule__slider_btn");
   if (btns != null) {
      for (let i = 0; i < btns.length; i++) {
         btns.item(i).disabled = state;
      }
   }
}

window.menuOpen = function () {
   document.getElementById("menu-open").classList.toggle("active");
   document.getElementById("sidebar").classList.toggle("active");
}

window.subjModalClose = function () {
   let modal = document.getElementById("schedule-modal");
   let modalContent = modal.getElementsByClassName("modal-content")[0];

   modal.classList.remove("active");
   document.body.classList.remove("lock");
   setTimeout(function () {
      modal.style.display = "none";
      document.getElementById("modal-subj-name").textContent = "";
      document.getElementById("modal-teacher-name").textContent = "";
      document.getElementById("modal-teacher-degree").textContent = "";
      document.getElementById("modal-subj-type").textContent = "";
      document.getElementById("modal-classroom").textContent = "";
      document.getElementById("modal-time").getElementsByClassName("modal-content__time_start")[0].textContent = "";
      document.getElementById("modal-time").getElementsByClassName("modal-content__time_end")[0].textContent = "";
      document.getElementById("modal-groups").innerHTML = "";

      if (modalContent.classList.contains("ongoing")) {
         modalContent.classList.remove("ongoing");
      } else if (modalContent.classList.contains("soon")) {
         modalContent.classList.remove("soon");
      }
   }, 320);
}