import { getCourses, getUserProgress } from "@/db/queries";

import { List } from "./list";

const CoursesPage = async () => {


  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3 py-6">
      <h1 className="text-3xl font-extrabold font-heading text-[#1d1b15] mb-6">
        Language Courses & Curricula
      </h1>

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>

  );
};

export default CoursesPage;
