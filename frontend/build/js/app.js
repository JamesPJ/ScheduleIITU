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
   props: ['role', 'page', 'lang'],
   data: function () {
      return {
         dropDown: false,
         langs: ['En', 'Ru', 'Kz']
      };
   },
   computed: {
      isNotIndex: function () {
         return !this.page;
      },
      isUser: function () {
         return this.role == 'student' || this.role == 'teacher';
      },
      isDeans: function () {
         return this.role == 'deans';
      }
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
                  <button class="btn tr" v-if="isNotIndex" data-modal="search"><i class="fas fa-search"></i></button>
                  <modal id="search" v-if="isNotIndex">
                     <form action="search.html" class="search__form" id="search-overlay-form">
                        <input name="keyword" type="text" placeholder="Group, Teacher, Room..." required
                           autocomplete="off">
                        <button type="submit"><i class="fas fa-search"></i></button>
                     </form>
                  </modal>
                  <a class="btn tr" href="profile.html" v-if="isUser"><i class="fas fa-user"></i></a>
                  <a class="btn tr" href="admin/" v-if="isDeans"><i class="fas fa-cog"></i></a>
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

Vue.component('alert', {
   props: ['obj', 'title', 'message', 'type'],
   data: function () {
      return {
         active: true
      }
   },
   computed: {
      classc: function () {
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
      titlec: function () {
         return this.obj ? this.obj.title : this.title ? this.title : "Where is title?";
      },
      messagec: function () {
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
      <div id="alert" :class="classc">
         <strong>{{ titlec }}</strong>
         <span v-if="messagec != ''">{{messagec}}</span>
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

Vue.component('profile-block', {
   props: ['title', 'expand'],
   computed: {
      large: function () {
         return this.expand && this.expand === 'yes';
      }
   },
   template: `
      <div class="block" :class="{expand:large}">
         <h2 class="block__title" v-if='title'>{{ title }}</h2>
         <div class="block__content">
            <slot></slot>
         </div>
      </div>
   `
});

Vue.component('profile-group', {
   props: ['group-id', 'name'],
   template: `
      <div class="group">
         <h1 class="group__name">{{ name }}</h1>
         <button class="btn outline error" :data-modal="name">Delete</button>
         <modal :id='name'>
            <div class="group__modal">
               <h1>Do you want delete {{name}} from group list?</h1>
               <form>
                  <input type="hidden" name="id" :value="groupId">
                  <button class="btn">Delete</button>
               </form>
            </div>
         </modal>
      </div>
   `
});

Vue.component('profile-exam', {
   props: ['subject-name', 'date', 'time', 'duration', 'room', 'students-number', 'exam-form', 'teacher'],
   computed: {
      when: function () {
         let text = this.days > 0 ? this.days + " days left" :
            this.days < 0 ? Math.abs(this.days) + " days passed" :
               "Today";
         return text;
      },
      days: function () {
         let day = 24 * 3600 * 1000;
         let examsDate = new Date(this.date);
         let nowDate = new Date();
         return Math.ceil((examsDate - nowDate) / day);
      },
      classObj: function () {
         return {
            red: this.days < 0,
            green: this.days == 0
         };
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
               <span>Date:</span> {{date}}
            </li>
            <li>
               <i class="fas fa-clock"></i>
               <span>Start Time:</span> {{time}}
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
            <li>
               <i class="fas fa-user-tie"></i>
               <span>Teacher:</span> {{teacher}}
            </li>
         </ul>
      </div>
   `
});

Vue.component('profile-groupmate', {
   props: ['name'],
   template: `
      <div class="groupmate">
         <h1>{{name}}</h1>
      </div>
   `
});

Vue.component('profile-teacher', {
   props: ['name', 'email', 'role'],
   computed: {
      link: function () {
         return "mailto:" + this.email;
      }
   },
   template: `
      <div class="profile-teacher">
         <h1>{{name}}</h1>
         <p>{{role}}</p>
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

Vue.component('tabs-list', {
   props: [],
   template: `
      <div class="tabs">
         <slot></slot>
      </div>
   `
});

Vue.component('group-select', {
   props: ['text', 'db-graduation', 'db-course', 'db-speciality', 'db-group', 'group-id'],
   data: function () {
      return {
         graduation: "",
         gradError: false,
         course: "",
         courseError: false,
         speciality: "",
         specError: false,
         group: "",
         groupError: false,
         message: "",
         changed: false,
         withOptions: false,
         deleteBtn: false,
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
      grads: function () {
         return this.getGrads();
      },
      courses: function () {
         return this.getCourses();
      },
      isCourses: function () {
         return this.grads && this.graduation != "";
      },
      specialities: function () {
         return this.getSpecialities();
      },
      isSpecialities: function () {
         return this.courses && this.course != "";
      },
      groups: function () {
         return this.getGroups();
      },
      isGroups: function () {
         return this.specialities && this.speciality != "";
      }
   },
   methods: {
      getGrads: function () {
         return ['Bachelor', 'Master', 'Doctor studies'];
      },
      getCourses: function () {
         if (this.graduation) {
            return [1, 2, 3, 4];
         }
         return null;
      },
      getSpecialities: function () {
         if (this.course) {
            return [
               'CS', 'CSp', 'CSSE', 'IS', 'SIS',
               'RET', 'MCM', 'FIN', 'ITM', 'JUR'
            ];
         }
         return null;
      },
      getGroups: function () {
         if (this.speciality) {
            return [
               'CSSE-1803K', 'CSSE-1807K'
            ];
         }
         return null;
      },
      sendForm: function () {
         if (this.validate()) {
            window.location.href = "profile.html";
         } else {
            this.alert.title = "Error!";
            this.alert.message = this.message;
            this.alert.class.success = false;
            this.alert.class.error = true;
            this.alert.class.active = true;
         }
      },
      validate: function () {
         this.changed = false;
         if (this.grads && !this.grads.includes(this.graduation)) {
            this.message = "Please choose Graduation!";
            this.gradError = true;
            return false;
         } else this.gradError = false;

         if (this.courses && !this.courses.includes(this.course)) {
            this.message = "Please choose Course!";
            this.courseError = true;
            return false;
         } else this.courseError = false;

         if (this.specialities && !this.specialities.includes(this.speciality)) {
            this.message = "Please choose Speciality!";
            this.specError = true;
            return false;
         } else this.specError = false;

         if (this.groups && !this.groups.includes(this.group)) {
            this.message = "Please choose Group!";
            this.groupError = true;
            return false;
         } else this.groupError = false;
         this.message = "";
         return true;
      }
   },
   watch: {
      graduation: function () {
         if (this.grads && !this.grads.includes(this.graduation)) {
            this.message = "Please choose Graduation!";
            this.gradError = true;
         } else {
            this.gradError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
         if (!this.withOptions) {
            this.course = "";
            this.speciality = "";
            this.group = "";
         }
      },
      course: function () {
         if (!this.changed && this.courses && !this.courses.includes(this.course)) {
            this.message = "Please choose Course!";
            this.courseError = true;
         } else {
            this.courseError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
         if (!this.withOptions) {
            this.speciality = "";
            this.group = "";
         }
      },
      speciality: function () {
         if (!this.changed && this.specialities && !this.specialities.includes(this.speciality)) {
            this.message = "Please choose Speciality!";
            this.specError = true;
         } else {
            this.specError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
         if (!this.withOptions) {
            this.group = "";
         }
         this.withOptions = false;
      },
      group: function () {
         if (!this.changed && this.groups && !this.groups.includes(this.group)) {
            this.message = "Please choose Group!";
            this.groupError = true;
         } else {
            this.groupError = false;
            this.alert.class.active = false;
         }
         this.changed = true;
      }
   },
   created: function () {
      if (this.dbGraduation && this.dbCourse && this.dbSpeciality && this.dbGroup) {
         this.graduation = this.dbGraduation;
         this.course = +this.dbCourse;
         this.speciality = this.dbSpeciality;
         this.group = this.dbGroup;
         this.withOptions = true;
         this.deleteBtn = true;
      }
   },
   template: `
      <form class="select__form" :class="{'select__form__profile':deleteBtn}">
         <alert :obj="alert"></alert>
         <select v-model="graduation" :class="{error:gradError}">
            <option disabled value="">Graduation</option>
            <option v-for="g in grads" :value="g">{{g}}</option>
         </select>
         <select v-model="course" :disabled="!isCourses" :class="{error:courseError}">
            <option disabled value="">Course</option>
            <option v-for="c in courses" :value="c">{{c}}</option>
         </select>
         <select v-model="speciality" :disabled="!isSpecialities" :class="{error:specError}">
            <option disabled value="">Speciality</option>
            <option v-for="s in specialities" :value="s">{{s}}</option>
         </select>
         <select v-model="group" :disabled="!isGroups" :class="{error:groupError}">
            <option disabled value="">Group</option>
            <option v-for="g in groups" :value="g">{{g}}</option>
         </select>
         <button type="button" :class="{'select__form_btn':!deleteBtn, 'btn outline':deleteBtn}" @click="sendForm">{{ text }}</button>
         <button type="button" class="btn outline danger" v-if="deleteBtn">Delete</button>
      </form>
   `
});

Vue.component('profile', {
   template: `
      <div class="profile">
         <slot></slot>
      </div>
   `
});

Vue.component('sidebar', {
   props: ['name', 'role', 'email'],
   data: function () {
      return {
         tabs: [
            { name: 'profile', class: 'active' },
            { name: 'exams', class: 'bottom' },
            { name: 'groupmates', class: 'bottom' },
            { name: 'teachers', class: 'bottom' }
         ]
      }
   },
   methods: {
      changeTab: function (event) {
         let btn = event.target;
         let prevBtn = document.querySelector('.sidebar__link.active');
         if (!btn.classList.contains('active')) {
            prevBtn.classList.remove('active');
            btn.classList.add('active');
            menuOpen();
            let menu = document.getElementById("menu-open");
            let computedStyle = window.getComputedStyle(menu, null).getPropertyValue('display');
            let timeOut = computedStyle == 'none' ? 0 : 310;

            setTimeout(() => {

               let find = false;
               for (t of this.tabs) {
                  if (t.name == btn.dataset.tab) {
                     find = true;
                     document.getElementById(t.name + "-tab").classList.add('active');
                     document.getElementById(t.name + "-tab").classList.remove('bottom');
                     document.getElementById(t.name + "-tab").classList.remove('top');
                     continue;
                  } else if (!find) {
                     document.getElementById(t.name + "-tab").classList.remove('active');
                     document.getElementById(t.name + "-tab").classList.add('top');
                     document.getElementById(t.name + "-tab").classList.remove('bottom');
                  } else {
                     document.getElementById(t.name + "-tab").classList.remove('active');
                     document.getElementById(t.name + "-tab").classList.add('bottom');
                     document.getElementById(t.name + "-tab").classList.remove('top');
                  }
               }
            }, timeOut);

         }
      }
   },
   template: `
      <div class="sidebar" id="sidebar">
         <div class="sidebar__blank">
            <img src="img/logo.png" alt="Logo">
         </div>
         <div class="sidebar__content">
            <h1 class="sidebar__name">{{ name }}</h1>
            <h2 class="sidebar__email">{{ email }}</h2>
            <p class="sidebar__role">{{ role }}</p>
            <div class="sidebar__links">
               <a href="#" class="sidebar__link active" @click.prevent="changeTab" data-tab="profile">Profile</a>
               <a href="schedule.html" class="sidebar__link">Schedule</a>
               <a href="#" class="sidebar__link" @click.prevent="changeTab" data-tab="exams">Exams</a>
               <a href="#" class="sidebar__link" @click.prevent="changeTab" data-tab="groupmates">Groupmates</a>
               <a href="#" class="sidebar__link" @click.prevent="changeTab" data-tab="teachers">Teachers</a>
               <a href="/logout" class="sidebar__link danger">Logout</a>
            </div>
         </div>
      </div>
   `
});

Vue.component('search-item', {
   props: ['type', 'name', 'timetable-id'],
   computed: {
      link: function () {
         return "/timetable?id=" + this.timetableId;
      }
   },
   template: `
      <a href="schedule.html" class="search__item">
         <span class="search__item_type">{{ type }}</span>
         <span class="search__item_name">{{ name }}</span>
      </a>
   `
});

Vue.component('search', {
   props: ['word'],
   template: `
      <div class="search">
         <div class="search__container">
            <h1 class="search__title">Search results for: "{{word}}"</h1>
            <div class="search__list">
               <slot></slot>
            </div>
         </div>
      </div>
   `
});

var data = {
   loaderActive: true,
   modalMoving: false
}

var app = new Vue({
   el: "#app",
   data: data
});

function bgAnimate() {
   let bg = document.getElementById("homeBG");
   if (bg != null) {
      bg.classList.toggle("active");
   }
}

document.addEventListener("DOMContentLoaded", function () {

   document.querySelectorAll("*[data-modal]").forEach(item => {
      item.addEventListener('click', function () {
         if (!data.modalMoving) {
            data.modalMoving = true;
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

});

window.addEventListener('load', function () {
   setTimeout(() => {
      data.loaderActive = false;
   }, 300);
});



function menuOpen() {
   document.getElementById("menu-open").classList.toggle("active");
   document.getElementById("sidebar").classList.toggle("active");
}