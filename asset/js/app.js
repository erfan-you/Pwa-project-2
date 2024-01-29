// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((regiter) => {
      console.log("Registered Successfylly => ", regiter);
    })
    .catch((err) => console.log(err));
} else {
  console.log("Not Support");
}

const addCourseBtn = document.querySelector(".courses-btn-add-new-course");
const addCourseModal = document.querySelector("#add-new-course-modal");
const newCourseTitle = document.querySelector(".new-course-title");
const modelAddCourseBtn = document.querySelector(".add-course-btn");
const modalContainers = document.querySelectorAll(".modal-container");


modalContainers.forEach((modalContainer) => {
  modalContainer.addEventListener('click' , (event)=>{
    event.target.classList.remove('visible')
  });
});

const fetchCourse = async () => {
  try {
    const res = await fetch("https://pwa-cms.iran.liara.run/api/courses");
    const data = await res.json();

    return data;
  } catch (err) {
    const data = await db.courses.toArray();
    return data;
  }
};

const createUi = (courses) => {
  const coursesParent = document.querySelector(".courses-list");
  courses.forEach((course) => {
    coursesParent.insertAdjacentHTML(
      "beforeend",
      `
        <li class="courses-item">
          <div class="courses-img-title">
            <img
              src="asset/images/courses/PWA.jpg"
              alt=""
              class="courses-img"
            />
            <h5 class="courses-name">${course.title}</h5>
          </div>
          <div class="courses-btns">
            <a href="" class="courses-btn-edit btn">ویرایش</a>
            <a href="" class="courses-btn-delete btn" onclick="removeCourse(event, '${course._id}')">حذف</a>
          </div>
        </li>
      `
    );
  });
};

const showAddCourseModel = (event) => {
  event.preventDefault();
  addCourseModal.classList.add("visible");
};

const addCourse = (event) => {
  event.preventDefault();

  const newCourse = {
    title: newCourseTitle.value,
  };

  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((sw) => {
      db.newCourses
        .put(newCourse)
        .then((data) =>
          console.log("Course inserted successfully :)) =>", data)
        )
        .catch((err) => console.log("Err =>", err));

      return sw.sync
        .register("add-course")
        .then(() => console.log("Task added successfully :))"))
        .catch((err) => console.log("Error =>", err));
    });
  } else {
    // Fetch
  }
};

const removeCourse = (event, _id) => {
  event.preventDefault();

  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((sw) => {
      db.removedCourse
        .put({ _id })
        .then((data) =>
          console.log("CourseID inserted successfully :)) =>", data)
        )
        .catch((err) => console.log("Err =>", err));

      return sw.sync
        .register("remove-course")
        .then(() => console.log("Task added successfully :))"))
        .catch((err) => console.log("Error =>", err));
    });
  } else {
    // Fetch
  }
};

addCourseBtn.addEventListener("click", (event) => {
  showAddCourseModel(event);
});

modelAddCourseBtn.addEventListener("click", addCourse);

window.addEventListener("load", async () => {
  const courses = await fetchCourse();
  createUi(courses);
});
