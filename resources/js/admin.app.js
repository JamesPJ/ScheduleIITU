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

window.toggleAdminMenu = function () {
   document.getElementById("admin-menu").classList.toggle("active");
}