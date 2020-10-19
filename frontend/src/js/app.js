function openSearchForm() {
   let overlay = document.getElementById("search-overlay");
   if (overlay != null) {
      document.body.style.overflow = "hidden";
      overlay.style.display = "flex";
      setTimeout(function () {
         overlay.classList.remove("hide");
      }, 1);
   }
}

function closeSearchForm() {
   let overlay = document.getElementById("search-overlay");
   if (overlay != null) {
      overlay.classList.add("hide");
      document.body.style.removeProperty("overflow");
      setTimeout(function () {
         overlay.style.removeProperty("display");
      }, 310);
   }
}

function langDropDown() {
   let langDropDown = document.getElementById("lang-dropdown");
   if (langDropDown != null) {
      langDropDown.classList.toggle("lang__dropdown_active");
   }
}

function bgAnimate() {
   let bg = document.getElementById("bg");
   if (bg != null) {
      bg.classList.toggle("active");
   }
}

function btnStateChange(state) {
   let btns = document.getElementsByClassName("schedule__slider_btn");
   if (btns != null) {
      for (let i = 0; i < btns.length; i++) {
         btns.item(i).disabled = state;
      }
   }
}

function subjModalClose() {
   let modal = document.getElementById("schedule-modal");
   let modalContent = modal.getElementsByClassName("modal-content")[0];

   modal.classList.remove("active");
   document.body.style.removeProperty("overflow");
   setTimeout(function () {
      modal.style.display = "none";
      document.getElementById("modal-subj-name").textContent = "";
      document.getElementById("modal-teacher-name").textContent = "";
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

document.addEventListener('DOMContentLoaded', function () {



   // * OVERLAY MENU CLOSE IF CLICK NOT ON BTN *
   document.onclick = function (event) {
      if (!event.target.closest(".lang__btn_drop")) {
         let langDropDown = document.getElementById("lang-dropdown");
         if (langDropDown != null) {
            langDropDown.classList.remove("lang__dropdown_active");
         }
      }
   }



   // * SWITCHING DAYS OF SCHEDULE *
   // * AND *
   // * DISABLED/ENABLE BTNS ON DESKTOP/MOBILE *
   let sliderBtn = document.getElementsByClassName("schedule__slider_btn");
   let indicator = document.getElementById("schedule-indicator");
   if (sliderBtn != null && indicator != null) {
      for (let i = 0; i < sliderBtn.length; i++) {
         sliderBtn[i].addEventListener('click', function () {
            let dayIndex = sliderBtn[i].dataset.day;
            if (indicator != null) {
               indicator.style.transform = `translateX(${dayIndex * 100}%)`;
            }
            document.getElementsByClassName("schedule-day active")[0].classList.remove("active");
            document.querySelector(`.schedule-day[data-day="${dayIndex}"]`).classList.add("active");
         }, false);
      }
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



   // * SET TIMES TO ALL TIME DIVS *
   let timeElemList = document.getElementsByClassName("time__elem");
   if (timeElemList != null) {
      for (let i = 0; i < timeElemList.length; i++) {
         let elem = timeElemList[i];
         elem.getElementsByClassName("time__elem_start")[0].textContent = elem.dataset.start;
         elem.getElementsByClassName("time__elem_end")[0].textContent = elem.dataset.end;
      }
   }



   // * SET TIMES TO ALL SUBJ *
   let subjElemList = document.getElementsByClassName("schedule-day__subj");
   if (subjElemList != null) {
      for (let i = 0; i < subjElemList.length; i++) {
         let subj = subjElemList[i];
         let elem = subj.getElementsByClassName("schedule-subj__time")[0];
         if (elem != null) {
            elem.textContent = `${subj.dataset.start} - ${subj.dataset.end}`;
         }
      }
   }



   // * CHECK IF COURSE / SPECIALITY SELECTED *
   let coursesSelect = document.getElementById("course");
   let specialitySelect = document.getElementById("speciality");
   let groupSelect = document.getElementById("group");

   if (coursesSelect != null) {
      if (coursesSelect.value != "Course") {
         specialitySelect.disabled = false;
      }
      coursesSelect.onchange = function () {
         if (coursesSelect != null && coursesSelect.value != "Course") {
            specialitySelect.disabled = false;
         }
      };
   }

   if (specialitySelect != null) {
      if (specialitySelect.value != "Speciality") {
         groupSelect.disabled = false;
      }
      specialitySelect.onchange = function () {
         if (specialitySelect != null && specialitySelect.value != "Speciality") {
            groupSelect.disabled = false;
         }
      };
   }

   // * SUBJECT MODAL *
   let subjList = document.getElementsByClassName("schedule-day__subj_content");
   if (subjList != null) {
      for (let i = 0; i < subjList.length; i++) {
         subjList[i].addEventListener("click", function () {
            let subjName = subjList[i].getElementsByClassName("schedule-subj__name")[0].textContent;
            let teacherName = subjList[i].getElementsByClassName("schedule-subj__teacher")[0].textContent;
            let subjType = subjList[i].getElementsByClassName("schedule-subj__type")[0].textContent;
            let classroom = subjList[i].getElementsByClassName("schedule-subj__class")[0].textContent;
            let time = subjList[i].getElementsByClassName("schedule-subj__time")[0].textContent.split(" - ");
            let groups = subjList[i].getElementsByClassName("schedule-subj__groups_elem");
            console.log(time);
            let modal = document.getElementById("schedule-modal");
            document.getElementById("modal-subj-name").textContent = subjName;
            document.getElementById("modal-teacher-name").textContent = teacherName;
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
            document.body.style.overflow = "hidden";
            setTimeout(function () {
               modal.classList.add("active");
            }, 20);
         }, false);
      }
   }
});