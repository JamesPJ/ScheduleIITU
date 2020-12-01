const { default: Axios } = require("axios");

window.toggleAdminMenu = function () {
   document.getElementById("admin-menu").classList.toggle("active");
}