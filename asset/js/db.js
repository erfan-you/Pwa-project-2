var db = new Dexie("pwa project");
const dbVersion = 1;

db.version(dbVersion).stores({
  courses: "_id",
  removedCourse: "_id",
  newCourses: "title",
});
