const { default: Axios } = require("axios");

Vue.component('circle-bar', {
   props: ['progress'],
   data: function () {
      return {
         offset: 471
      }
   },
   created: function () {
      setTimeout(() => {
         this.offset = 471 * ((100 - this.progress) / 100);
      }, 700);
   },
   template: `
      <div class="circle">
			<div class="progress-text">
				{{ progress }}%
			</div>
         <svg>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stop-color="#5eaefd" />
               <stop offset="100%" stop-color="#03dac6" />
            </linearGradient>
				<circle class="bg" cx="100" cy="100" r="75"></circle>
				<circle :stroke-dashoffset="offset" class="progress" cx="100" cy="100" r="75"></circle>
         </svg>
		</div>
   `
});

Vue.component('app-chart', {
   template: `
      <div class="admin-dashboard-chart">
         <slot></slot>
      </div>
   `
});

Vue.component('app-chart-elem', {
   props: ['text', 'percentage'],
   data: function () {
      return {
         class: false
      };
   },
   computed: {
      percentageClass: function () {
         return {
            ['p-' + this.percentage]: true,
            'active': this.class
         }
      }
   },
   created: function () {
      setTimeout(() => {
         this.class = true;
      }, 700);
   },
   template: `
      <div class="admin-dashboard-chart-elem">
         <div class="admin-dashboard-chart-elem-tooltip">
            {{ percentage }}%
         </div>
         <div class="admin-dashboard-chart-elem-bar">
            <div class="admin-dashboard-chart-elem-bar-indicator" :class="percentageClass"></div>
         </div>
         <div class="admin-dashboard-chart-elem-text">
            {{ text }}
         </div>
      </div>
   `
});

Vue.component('admin-user-elem', {
   props: ['id', 'email', 'fullname', 'roles'],
   computed: {
      stringRoles: function () {
         let str = this.roles.join(", ");
         return str.charAt(0).toUpperCase() + str.slice(1);;
      }
   },
   template: `
      <div class="admin-users-elem">
         <span class="admin-users-elem-email">{{ email }}</span>
         <span class="admin-users-elem-fullname">{{ fullname }}</span>
         <span class="admin-users-elem-role">{{ stringRoles }}</span>
         <button class="btn secondary">Edit</button>
      </div>
   `
});

Vue.component('add-user', {
   props: ['link', 'departments-link'],
   data: function () {
      return {
         fullname: "",
         email: "",
         role: "",
         department: "",
         password: "",
         departments: []
      };
   },
   computed: {
      csrf: function () {
         return document.querySelector('meta[name="csrf-token"]').content;
      }
   },
   methods: {
      getDepartments: function () {
         Axios
            .get(this.departmentsLink)
            .then(response => {
               for (d of response.data) {
                  this.departments.push(d);
               }
            });
      }
   },
   created: function () {
      this.getDepartments();
   },
   template: `
      <modal id="add-user">
         <form method="post" :action="link" class="admin-users-add">
            <input type="hidden" name="_token" v-model="csrf">
            <input type="text" name="fullname" placeholder="Fullname" v-model="fullname" required>
            <input type="email" name="email" placeholder="Email" v-model="email" required>
            <select name="role" v-model="role" required>
               <option disabled selected value="">Role</option>
               <option value="student">Student</option>
               <option value="teacher">Teacher</option>
               <option value="dean">Dean</option>
            </select>
            <select name="department_id" v-if="role == 'teacher'" v-model="department" required>
               <option disabled selected value="">Department</option>
               <option v-for="d of departments" :value="d.id">{{ d.name }}</option>
            </select>
            <input type="password" v-if="role == 'dean'" placeholder="Passowrd" v-model="password" required>
            <p v-if="role == 'student'">After adding you can edit groups!</p>
            <p v-if="role == 'teacher'">After adding you can edit degrees!</p>
            <button class="btn secondary">Add</button>
         </form>
      </modal>
   `
});

Vue.component('admin-users', {
   props: [
      'users-link',
      'students-link',
      'teachers-link',
      'deans-link',
      'add-user-link',
      'edit-user-link',
      'delete-user-link',
      'departments-link'
   ],
   data: function () {
      return {
         users: [],
         students: [],
         teachers: [],
         deans: [],
         filterString: "",
         role: "",
         sort: "",
         currentOrder: "desc"
      };
   },
   computed: {
      list: function () {
         let users = [];
         let list = this.role == "student" ? this.students :
            this.role == "teacher" ? this.teachers :
               this.role == "dean" ? this.deans : this.users;
         for (u of list) {
            if ((u.fullname.toLowerCase().includes(this.filterString.toLowerCase())
               || u.email.toLowerCase().includes(this.filterString)))
               users.push(u);
         }
         if (this.sort != "") {
            let asc = this.currentOrder == "asc";
            if (this.sort == "id") {
               users.sort(function (a, b) {
                  if (asc) {
                     return a.id - b.id;
                  }
                  return b.id - a.id;
               });
            } else if (this.sort == "email") {
               users.sort(function (a, b) {
                  if (asc) {
                     return a.email > b.email ? 1 : a.email < b.email ? -1 : 0;
                  }
                  return a.email < b.email ? 1 : a.email > b.email ? -1 : 0;
               });

            } else if (this.sort == "fullname") {
               users.sort(function (a, b) {
                  if (asc) {
                     return a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0;
                  }
                  return a.fullname < b.fullname ? 1 : a.fullname > b.fullname ? -1 : 0;
               });
            }
         }
         return users;
      },
      iconClass: function () {
         return {
            "fa-sort-alpha-down": this.currentOrder == "asc",
            "fa-sort-alpha-up": this.currentOrder == "desc"
         }
      }
   },
   methods: {
      getUsers: function () {
         Axios
            .get(this.usersLink)
            .then(response => {
               for (u of response.data) {
                  let user = {
                     id: u.id,
                     email: u.email,
                     fullname: u.fullname,
                     roles: []
                  };
                  for (r of u.roles) {
                     user.roles.push(r.name);
                  }
                  this.users.push(user);
               }
            });
      },
      getStudents: function () {
         Axios
            .get(this.studentsLink)
            .then(response => {
               for (s of response.data) {
                  let student = {
                     id: s.id,
                     user_id: s.user.id,
                     email: s.user.email,
                     fullname: s.user.fullname,
                     roles: [],
                     groups: []
                  };
                  for (r of s.user.roles) {
                     student.roles.push(r.name);
                  }
                  for (g of s.groups) {
                     student.groups.push(g.name);
                  }
                  this.students.push(student);
               }
            });
      },
      getTeachers: function () {
         Axios
            .get(this.teachersLink)
            .then(response => {
               for (t of response.data) {
                  let teacher = {
                     id: t.id,
                     user_id: t.user.id,
                     email: t.user.email,
                     fullname: t.user.fullname,
                     roles: [],
                     department: t.department.name,
                     degrees: []
                  };
                  for (r of t.user.roles) {
                     teacher.roles.push(r.name);
                  }
                  for (d of t.degrees) {
                     teacher.degrees.push(d.name);
                  }
                  this.teachers.push(teacher);
               }
            });
      },
      getDeans: function () {
         Axios
            .get(this.deansLink)
            .then(response => {
               for (d of response.data) {
                  let dean = {
                     id: d.id,
                     user_id: d.user.id,
                     email: d.user.email,
                     fullname: d.user.fullname,
                     roles: []
                  }
                  for (r of d.user.roles) {
                     dean.roles.push(r.name);
                  }
                  this.deans.push(dean);
               }
            });
      },
      reverseOrder: function () {
         this.currentOrder = this.currentOrder == "asc" ? "desc" : "asc";
      }
   },
   created: function () {
      this.getUsers();
      this.getStudents();
      this.getTeachers();
      this.getDeans();
   },
   template: `
      <div class="admin-users">
         <div class="admin-users-filter">
            <input type="text" placeholder="Fullname or email" v-model="filterString">
            <select v-model="role">
               <option disabled selected value="">User Role</option>
               <option value="any">Any</option>
               <option value="student">Student</option>
               <option value="teacher">Teacher</option>
               <option value="dean">Dean</option>
            </select>
            <select v-model="sort">
               <option disabled selected value="">Sort By</option>
               <option value="id">Register time</option>
               <option value="fullname">Fullname</option>
               <option value="email">Email</option>
            </select>
            <button class="btn secondary" @click="reverseOrder">
               <i class="fas" :class="iconClass"></i>
            </button>
            <button class="btn secondary" data-modal="add-user">
               Add User
            </button>
         </div>
         <add-user :link="addUserLink" :departments-link="departmentsLink"></add-user>
         <div class="admin-users-list">
            <admin-user-elem v-for="u of list" 
                           :id="u.id" 
                           :key="u.id" 
                           :email="u.email" 
                           :fullname="u.fullname" 
                           :roles="u.roles">
            </admin-user-elem>
         </div>
      </div>
   `
});

window.toggleAdminMenu = function () {
   document.getElementById("admin-menu").classList.toggle("active");
}