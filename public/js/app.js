/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Vue.component('app-footer', {
  props: ['text'],
  data: function data() {
    return {
      link: "https://github.com/hypev",
      name: "kurr"
    };
  },
  computed: {
    year: function year() {
      return new Date().getFullYear();
    }
  },
  template: "\n      <footer class=\"footer\">\n         <div class=\"footer-content container\">\n            <p class=\"footer-content-text\">\n               {{ text }} &copy;\n               <a :href=\"link\" target=\"_blank\">{{ name }}</a>\n               {{ year }}\n            </p>\n         </div>\n      </footer>\n   "
});
Vue.component('app-nav', {
  props: ['lang', 'top'],
  data: function data() {
    return {
      dropDown: false,
      langs: ['En', 'Ru', 'Kz']
    };
  },
  methods: {
    langDropDown: function langDropDown() {
      this.dropDown = !this.dropDown;
    }
  },
  template: "\n      <header class=\"header\">\n         <div class=\"header__content\">\n            <nav class=\"menu\">\n               <div class=\"lang\">\n\n                  <button class=\"btn tr\" data-modal=\"search\"><i class=\"fas fa-search\"></i></button>\n                  <modal id=\"search\">\n                     <form action=\"/search\" method='GET' class=\"search__form\" id=\"search-overlay-form\">\n                        <input name=\"keyword\" type=\"text\" placeholder=\"Group, Teacher, Room...\" required\n                           autocomplete=\"off\">\n                        <button type=\"submit\"><i class=\"fas fa-search\"></i></button>\n                     </form>\n                  </modal>\n\n                  <slot></slot>\n\n                  <div class=\"lang\">\n                     <button class=\"btn lang__btn\" @click=\"langDropDown\">\n                        {{ lang }} <i class=\"fas fa-angle-down\"></i>\n                     </button>\n                     <div class=\"lang__dropdown\" :class=\"{active:dropDown}\">\n                        <a href=\"#\" class=\"btn lang__btn\" v-for=\"l of langs\" v-if=\"l != lang\">{{l}}</a>\n                     </div>\n                  </div>\n               </div>\n            </nav>\n         </div>\n      </header>\n   "
});
Vue.component('alert', {
  props: ['obj', 'title', 'message', 'type'],
  data: function data() {
    return {
      active: true
    };
  },
  computed: {
    classComputed: function classComputed() {
      return this.obj ? this.obj["class"] : this.classType;
    },
    classType: function classType() {
      if (this.type || this.type === 'error' || this.type === 'success') {
        if (this.type === 'error') return {
          active: this.active,
          error: true,
          success: false
        };else return {
          active: this.active,
          error: false,
          success: true
        };
      }

      return {
        active: this.active
      };
    },
    titleComputed: function titleComputed() {
      return this.obj ? this.obj.title : this.title ? this.title : "Where is title?";
    },
    messageComputed: function messageComputed() {
      return this.obj ? this.obj.message : this.message ? this.message : "";
    }
  },
  methods: {
    close: function close() {
      if (this.obj) this.obj["class"].active = false;else this.active = false;
    }
  },
  created: function created() {
    this.active = this.obj ? this.obj["class"].active : true;
  },
  template: "\n      <div id=\"alert\" :class=\"classComputed\">\n         <strong>{{ titleComputed }}</strong>\n         <span v-if=\"messageComputed != ''\">{{messageComputed}}</span>\n         <button type=\"button\" @click=\"close\"><i class=\"fas fa-times\"></i></button>\n      </div>\n   "
});
Vue.component('modal', {
  props: ['id', 'hide-button'],
  methods: {
    close: function close() {
      var _this = this;

      if (!data.modalMoving) {
        data.modalMoving = true;
        document.body.classList.remove("lock");
        document.getElementById(this.id).classList.remove("active");
        setTimeout(function () {
          document.getElementById(_this.id).classList.remove("df");
          data.modalMoving = false;
        }, 301);
      }
    },
    checkContent: function checkContent(event) {
      if (!event.target.closest(".modal__content")) {
        this.close();
      }
    }
  },
  template: "\n      <div class=\"modal\" :id=\"id\" @click=\"checkContent\">\n         <button class=\"modal__btn\" v-if=\"!hideButton\"><i class=\"fas fa-times\"></i></button>\n         <div class=\"modal__content\">\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('group-select', {
  props: ['text'],
  data: function data() {
    return {
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
        "class": {
          error: true,
          success: false,
          active: false
        }
      }
    };
  },
  computed: {
    grads: function grads() {
      return this.getGrads();
    },
    courses: function courses() {
      return this.getCourses();
    },
    isCourses: function isCourses() {
      return this.grads && this.graduation != "";
    },
    specialities: function specialities() {
      return this.getSpecialities();
    },
    isSpecialities: function isSpecialities() {
      return this.courses && this.course != "";
    },
    groups: function groups() {
      return this.getGroups();
    },
    isGroups: function isGroups() {
      return this.specialities && this.speciality != "";
    }
  },
  methods: {
    getGrads: function getGrads() {
      return ['Bachelor', 'Master', 'Doctor studies'];
    },
    getCourses: function getCourses() {
      if (this.graduation) {
        return [1, 2, 3, 4];
      }

      return null;
    },
    getSpecialities: function getSpecialities() {
      if (this.course) {
        return ['CS', 'CSp', 'CSSE', 'IS', 'SIS', 'RET', 'MCM', 'FIN', 'ITM', 'JUR'];
      }

      return null;
    },
    getGroups: function getGroups() {
      if (this.speciality) {
        return ['CSSE-1803K', 'CSSE-1807K'];
      }

      return null;
    },
    sendForm: function sendForm() {
      if (this.validate()) {
        window.location.href = "/profile";
      } else {
        this.alert.title = "Error";
        this.alert.message = this.message;
        this.alert["class"].success = false;
        this.alert["class"].error = true;
        this.alert["class"].active = true;
      }
    },
    validate: function validate() {
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
    graduation: function graduation() {
      if (this.grads && !this.grads.includes(this.graduation)) {
        this.message = "Please choose Graduation!";
        this.gradError = true;
      } else {
        this.gradError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;

      if (!this.withOptions) {
        this.course = "";
        this.speciality = "";
        this.group = "";
      }
    },
    course: function course() {
      if (!this.changed && this.courses && !this.courses.includes(this.course)) {
        this.message = "Please choose Course!";
        this.courseError = true;
      } else {
        this.courseError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;

      if (!this.withOptions) {
        this.speciality = "";
        this.group = "";
      }
    },
    speciality: function speciality() {
      if (!this.changed && this.specialities && !this.specialities.includes(this.speciality)) {
        this.message = "Please choose Speciality!";
        this.specError = true;
      } else {
        this.specError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;

      if (!this.withOptions) {
        this.group = "";
      }

      this.withOptions = false;
    },
    group: function group() {
      if (!this.changed && this.groups && !this.groups.includes(this.group)) {
        this.message = "Please choose Group!";
        this.groupError = true;
      } else {
        this.groupError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;
    }
  },
  template: "\n      <form class=\"select__form\" :class=\"{'select__form__profile':deleteBtn}\">\n         <alert :obj=\"alert\"></alert>\n         <select v-model=\"graduation\" :class=\"{error:gradError}\">\n            <option disabled value=\"\">Graduation</option>\n            <option v-for=\"g in grads\" :value=\"g\">{{g}}</option>\n         </select>\n         <select v-model=\"course\" :disabled=\"!isCourses\" :class=\"{error:courseError}\">\n            <option disabled value=\"\">Course</option>\n            <option v-for=\"c in courses\" :value=\"c\">{{c}}</option>\n         </select>\n         <select v-model=\"speciality\" :disabled=\"!isSpecialities\" :class=\"{error:specError}\">\n            <option disabled value=\"\">Speciality</option>\n            <option v-for=\"s in specialities\" :value=\"s\">{{s}}</option>\n         </select>\n         <select v-model=\"group\" :disabled=\"!isGroups\" :class=\"{error:groupError}\">\n            <option disabled value=\"\">Group</option>\n            <option v-for=\"g in groups\" :value=\"g\">{{g}}</option>\n         </select>\n         <button type=\"button\" :class=\"{'select__form_btn':!deleteBtn, 'btn outline':deleteBtn}\" @click=\"sendForm\">{{ text }}</button>\n      </form>\n   "
}); // ! PROFILE PAGE

Vue.component('profile-block', {
  props: ['title', 'expand'],
  computed: {
    large: function large() {
      return this.expand && this.expand === 'yes';
    }
  },
  template: "\n      <div class=\"block\" :class=\"{expand:large}\">\n         <h2 class=\"block__title\" v-if='title'>{{ title }}</h2>\n         <div class=\"block__content\">\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('profile-group', {
  props: ['group-id', 'name'],
  template: "\n      <div class=\"group\">\n         <h1 class=\"group__name\">{{ name }}</h1>\n         <button class=\"btn outline error\" :data-modal=\"name\">Delete</button>\n         <modal :id='name'>\n            <div class=\"group__modal\">\n               <h1>Do you want delete {{name}} from group list?</h1>\n               <form>\n                  <input type=\"hidden\" name=\"id\" :value=\"groupId\">\n                  <button class=\"btn\">Delete</button>\n               </form>\n            </div>\n         </modal>\n      </div>\n   "
});
Vue.component('profile-exam', {
  props: ['subject-name', 'date', 'time', 'duration', 'room', 'students-number', 'exam-form', 'teacher', 'group'],
  computed: {
    when: function when() {
      var text = this.days > 0 ? this.days + " days left" : this.days < 0 ? Math.abs(this.days) + " days passed" : "Today";
      return text;
    },
    days: function days() {
      var day = 24 * 3600 * 1000;
      var examsDate = new Date(this.date);
      var nowDate = new Date();
      return Math.ceil((examsDate - nowDate) / day);
    },
    classObj: function classObj() {
      return {
        red: this.days < 0,
        green: this.days == 0
      };
    }
  },
  template: "\n      <div class=\"exam\">\n         <h1 :class=\"classObj\">{{when}}</h1>\n         <ul>\n            <li>\n               <i class=\"fas fa-circle\"></i>\n               <span>Subject:</span> {{subjectName}}\n            </li>\n            <li>\n               <i class=\"far fa-calendar-alt\"></i>\n               <span>Date and Time:</span> {{date}} | {{time}}\n            </li>\n            <li>\n               <i class=\"fas fa-hourglass\"></i>\n               <span>Duration:</span> {{duration}} min\n            </li>\n            <li>\n               <i class=\"fas fa-map-marker-alt\"></i>\n               <span>Room:</span> {{room}}\n            </li>\n            <li>\n               <i class=\"fas fa-users\"></i>\n               <span>Students Number:</span> {{studentsNumber}}\n            </li>\n            <li>\n               <i class=\"fas fa-edit\"></i>\n               <span>Exam Form:</span> {{examForm}}\n            </li>\n            <li>\n               <i class=\"fas fa-user-tie\"></i>\n               <span>Teacher:</span> {{teacher}}\n            </li>\n            <li>\n               <i class=\"fas fa-users\"></i>\n               <span>Group:</span> {{group}}\n            </li>\n         </ul>\n      </div>\n   "
});
Vue.component('profile-groupmate', {
  props: ['name'],
  template: "\n      <div class=\"groupmate\">\n         <h1>{{name}}</h1>\n      </div>\n   "
});
Vue.component('profile-teacher', {
  props: ['name', 'email', 'role', 'degree', 'department'],
  computed: {
    link: function link() {
      return "mailto:" + this.email;
    }
  },
  template: "\n      <div class=\"profile-teacher\">\n         <h1>{{name}}</h1>\n         <p>{{role}}</p>\n         <p>{{degree}}</p>\n         <p>Department: {{department}}</p>\n         <a :href=\"link\">{{email}}</a>\n      </div>\n   "
});
Vue.component('profile-tab', {
  props: ['title', 'center-block-title'],
  template: "\n      <div class=\"tab\" :class=\"{'center-block-title':centerBlockTitle}\">\n         <h1 class=\"tab__title\">{{ title }}</h1>\n         <slot></slot>\n      </div>\n   "
});
Vue.component('sidebar', {
  props: ['name', 'role', 'email'],
  data: function data() {
    return {
      tabs: []
    };
  },
  computed: {
    isTeacher: function isTeacher() {
      return this.role.includes('teacher');
    },
    isStudent: function isStudent() {
      return this.role.includes('student');
    },
    roleCap: function roleCap() {
      return this.role.charAt(0).toUpperCase() + this.role.slice(1);
    }
  },
  methods: {
    changeTab: function changeTab(event) {
      var _this2 = this;

      var btn = event.target;
      var prevBtn = document.querySelector('.sidebar__link.active');

      if (!btn.classList.contains('active')) {
        prevBtn.classList.remove('active');
        btn.classList.add('active');
        menuOpen();
        var menu = document.getElementById("menu-open");
        var computedStyle = window.getComputedStyle(menu, null).getPropertyValue('display');
        var timeOut = computedStyle == 'none' ? 0 : 310;
        setTimeout(function () {
          var find = false;

          var _iterator = _createForOfIteratorHelper(_this2.tabs),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              t = _step.value;

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
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }, timeOut);
      }
    }
  },
  created: function created() {
    if (this.isStudent) {
      this.tabs = [{
        name: 'profile',
        "class": 'active'
      }, {
        name: 'exams',
        "class": 'bottom'
      }, {
        name: 'groupmates',
        "class": 'bottom'
      }, {
        name: 'teachers',
        "class": 'bottom'
      }];
    } else if (this.isTeacher) {
      this.tabs = [{
        name: 'exams',
        "class": 'active'
      }, {
        name: 'departmentmates',
        "class": 'bottom'
      }];
    }
  },
  template: "\n      <div class=\"sidebar\" id=\"sidebar\">\n         <div class=\"sidebar__blank\">\n            <img src=\"img/logo.png\" alt=\"Logo\">\n         </div>\n         <div class=\"sidebar__content\">\n            <h1 class=\"sidebar__name\">{{ name }}</h1>\n            <h2 class=\"sidebar__email\">{{ email }}</h2>\n            <p class=\"sidebar__role\">{{ roleCap }}</p>\n            <div class=\"sidebar__links\">\n               <a href=\"#\" class=\"sidebar__link\" :class=\"{active:isStudent}\" @click.prevent=\"changeTab\" data-tab=\"profile\" v-if=\"isStudent\">Profile</a>\n               <a href=\"schedule.html\" class=\"sidebar__link\">Schedule</a>\n               <a href=\"#\" class=\"sidebar__link\" :class=\"{active:isTeacher}\" @click.prevent=\"changeTab\" data-tab=\"exams\">Exams</a>\n               <a href=\"#\" class=\"sidebar__link\" @click.prevent=\"changeTab\" data-tab=\"groupmates\" v-if=\"isStudent\">Groupmates</a>\n               <a href=\"#\" class=\"sidebar__link\" @click.prevent=\"changeTab\" data-tab=\"teachers\" v-if=\"isStudent\">Teachers</a>\n               <a href=\"#\" class=\"sidebar__link\" @click.prevent=\"changeTab\" data-tab=\"departmentmates\" v-if=\"isTeacher\">Departmentmates</a>\n               <a href=\"/logout\" class=\"sidebar__link danger\">Logout</a>\n            </div>\n         </div>\n      </div>\n   "
}); // ! SEARCH PAGE

Vue.component('search-item', {
  props: ['type', 'name', 'timetable-id'],
  computed: {
    link: function link() {
      return "/timetable/" + this.timetableId;
    }
  },
  template: "\n      <a :href=\"link\" class=\"search__item\">\n         <span class=\"search__item_type\">{{ type }}</span>\n         <span class=\"search__item_name\">{{ name }}</span>\n      </a>\n   "
}); // ! SCHEDULE PAGE

Vue.component('schedule', {
  props: ['type', 'name'],
  computed: {
    icon: function icon() {
      return this.type == 'group' ? 'fa-users' : this.type == 'teacher' ? 'fa-user-tie' : this.type == 'room' ? 'fa-map-marker-alt' : "";
    }
  },
  template: "\n      <div class=\"schedule\">\n         <div class=\"schedule__container\">\n            <h1 class=\"schedule__title\"><i class=\"fas\" :class=\"icon\"></i> {{ name }}</h1>\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('day-slider', {
  computed: {
    transformIndicator: function transformIndicator() {
      var dayIndex = Math.min(Math.max(new Date().getDay() - 1, 0), 5);
      return {
        transform: "translateX(".concat(dayIndex * 100, "%)")
      };
    }
  },
  template: "\n      <div class=\"schedule__slider\">\n         <div class=\"schedule__slider_indicator\" id=\"schedule-indicator\" :style=\"transformIndicator\"></div>\n         <slot></slot>   \n      </div>\n   "
});
Vue.component('day-slider-btn', {
  props: ['title-lg', 'title-md', 'title-sm', 'day'],
  methods: {
    changeDay: function changeDay() {
      var dayIndex = this.day;
      var indicator = document.getElementById("schedule-indicator");
      indicator.style.transform = "translateX(".concat(dayIndex * 100, "%)");
      document.getElementsByClassName("schedule-day active")[0].classList.remove("active");
      document.querySelector(".schedule-day[data-day=\"".concat(dayIndex, "\"]")).classList.add("active");
    }
  },
  template: "\n      <button class=\"schedule__slider_btn\" :data-day=\"day\" @click=\"changeDay\" disabled>\n         <span class=\"schedule__slider_btn--title--expand\">{{ titleLg }}</span>\n         <span class=\"schedule__slider_btn--title--tablet\">{{ titleMd }}</span>\n         <span class=\"schedule__slider_btn--title--mobile\">{{ titleSm }}</span>\n      </button>\n   "
});
Vue.component('timetable-folder', {
  props: ['count'],
  template: "\n      <div class=\"schedule-day__folder\">\n         <button class=\"schedule-day__folder_list\" data-modal=\"subject-folder\">\n            <div class=\"schedule-day__folder_elem\" v-for=\"e in Math.min(count, 4)\"></div>\n         </button>\n         <modal id='subject-folder'>\n            <div class=\"schedule-day__folder_modal\">\n               <slot></slot>\n            </div>\n         </modal>\n      </div>\n   "
});
Vue.component('timetable-time', {
  props: ['start', 'end'],
  template: "\n      <div class=\"schedule__time_elem time__elem\">\n         <span class=\"time__elem_start\">{{start}}</span>\n         <span class=\"time__elem_end\">{{end}}</span>\n      </div>\n   "
});
Vue.component('timetable-day', {
  props: ['day'],
  computed: {
    activeDay: function activeDay() {
      return {
        active: +this.day == Math.min(new Date().getDay() - 1, 6)
      };
    }
  },
  template: "\n      <div class=\"schedule__column schedule-day\" :class=\"activeDay\" :data-day=\"day\">\n         <slot></slot>\n      </div>\n   "
});
Vue.component('timetable-group', {
  props: ['name'],
  template: "\n      <li class=\"schedule-subj__groups_elem\">{{ name }}</li>\n   "
});
Vue.component('timetable-cell', {
  props: ['start', 'end', 'teacher', 'room', 'subject', 'type', 'degree'],
  computed: {
    isNotEmpty: function isNotEmpty() {
      return this.start && this.end && this.teacher && this.room && this.subject && this.type;
    },
    near: function near() {
      var s = this.startSeconds;
      return {
        'soon': this.startSeconds - this.currentSeconds <= 1200 && this.startSeconds - this.currentSeconds >= 0 && this.currentDay,
        'ongoing': this.currentSeconds >= this.startSeconds && this.currentSeconds < this.endSeconds && this.currentDay
      };
    },
    startSeconds: function startSeconds() {
      var date = new Date();
      var hours = +this.start[0] * 10 + +this.start[1];
      var min = +this.start[3] * 10 + +this.start[4];
      date.setHours(hours, min, 0);
      return date.getTime() / 1000;
    },
    endSeconds: function endSeconds() {
      var date = new Date();
      var hours = +this.end[0] * 10 + +this.end[1];
      var min = +this.end[3] * 10 + +this.end[4];
      date.setHours(hours, min, 0);
      return date.getTime() / 1000;
    },
    currentSeconds: function currentSeconds() {
      return new Date().getTime() / 1000;
    },
    currentDay: function currentDay() {
      var todayDay = new Date().getDay() - 1;
      var subjDay = this.$parent.day;
      return todayDay == subjDay;
    }
  },
  template: "\n      <div class=\"schedule-day__subj\" :data-start=\"start\" :data-end=\"end\">\n         <button class=\"schedule-day__subj_content schedule-subj\" :class=\"near\" v-if=\"isNotEmpty\">\n            <span class=\"schedule-subj__teacher\">{{ teacher }}</span>\n            <span class=\"schedule-subj__class\">{{ room }}</span>\n            <span class=\"schedule-subj__name\">{{ subject }}</span>\n            <span class=\"schedule-subj__type\">{{ type }}</span>\n            <span class=\"schedule-subj__time\">{{ start }} - {{ end }}</span>\n            <span class=\"schedule-subj__degree\">{{degree}}</span>\n            <ul class=\"schedule-subj__groups\">\n               <slot></slot>\n            </ul>\n         </button>\n      </div>\n   "
});
var data = {
  loaderActive: true,
  modalMoving: false
};
var app = new Vue({
  el: "#app",
  data: data,
  mounted: function mounted() {
    this.$nextTick(function () {
      setTimeout(function () {
        data.loaderActive = false;
        setTimeout(function () {
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
  document.querySelectorAll("*[data-modal]").forEach(function (item) {
    item.addEventListener('click', function () {
      if (!data.modalMoving) {
        data.modalMoving = true;
        document.body.classList.add("lock");
        document.getElementById(item.dataset.modal).classList.add("df");
        setTimeout(function () {
          document.getElementById(item.dataset.modal).classList.add("active");
        }, 10);
        setTimeout(function () {
          data.modalMoving = false;
        }, 311);
      }
    });
  });
  var sModal = document.getElementById("schedule-modal");

  if (sModal != null) {
    sModal.addEventListener("click", function (event) {
      if (!event.target.closest(".modal-content")) {
        subjModalClose();
      }
    });
  }

  var sliderBtn = document.getElementsByClassName("schedule__slider_btn");
  var indicator = document.getElementById("schedule-indicator");

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

  var subjList = document.getElementsByClassName("schedule-day__subj_content");

  if (subjList != null) {
    var _loop = function _loop(i) {
      subjList[i].addEventListener("click", function () {
        var subjName = subjList[i].getElementsByClassName("schedule-subj__name")[0].textContent;
        var teacherName = subjList[i].getElementsByClassName("schedule-subj__teacher")[0].textContent;
        var subjType = subjList[i].getElementsByClassName("schedule-subj__type")[0].textContent;
        var classroom = subjList[i].getElementsByClassName("schedule-subj__class")[0].textContent;
        var degree = subjList[i].getElementsByClassName("schedule-subj__degree")[0].textContent;
        var time = subjList[i].getElementsByClassName("schedule-subj__time")[0].textContent.split(" - ");
        var groups = subjList[i].getElementsByClassName("schedule-subj__groups_elem");
        console.log(time);
        var modal = document.getElementById("schedule-modal");
        document.getElementById("modal-subj-name").textContent = subjName;
        document.getElementById("modal-teacher-name").textContent = teacherName;
        document.getElementById("modal-teacher-degree").textContent = degree;
        document.getElementById("modal-subj-type").textContent = subjType;
        document.getElementById("modal-classroom").textContent = classroom;
        document.getElementById("modal-time").getElementsByClassName("modal-content__time_start")[0].textContent = time[0];
        document.getElementById("modal-time").getElementsByClassName("modal-content__time_end")[0].textContent = time[1];
        var groupsModal = document.getElementById("modal-groups");

        if (groups.length > 1) {
          document.getElementById("modal-groups-title").textContent = "Groups";
        } else {
          document.getElementById("modal-groups-title").textContent = "Group";
        }

        for (var j = 0; j < groups.length; j++) {
          var g = document.createElement("li");
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
    };

    for (var i = 0; i < subjList.length; i++) {
      _loop(i);
    }
  }
});

window.bgAnimate = function () {
  var bg = document.getElementById("homeBG");

  if (bg != null) {
    bg.classList.toggle("active");
  }
};

window.btnStateChange = function (state) {
  var btns = document.getElementsByClassName("schedule__slider_btn");

  if (btns != null) {
    for (var i = 0; i < btns.length; i++) {
      btns.item(i).disabled = state;
    }
  }
};

window.menuOpen = function () {
  document.getElementById("menu-open").classList.toggle("active");
  document.getElementById("sidebar").classList.toggle("active");
};

window.subjModalClose = function () {
  var modal = document.getElementById("schedule-modal");
  var modalContent = modal.getElementsByClassName("modal-content")[0];
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
};

/***/ }),

/***/ "./resources/scss/style.scss":
/*!***********************************!*\
  !*** ./resources/scss/style.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/scss/style.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\schedule-iitu\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\schedule-iitu\resources\scss\style.scss */"./resources/scss/style.scss");


/***/ })

/******/ });