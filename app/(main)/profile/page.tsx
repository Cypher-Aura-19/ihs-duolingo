import { redirect } from "next/navigation";
import { UserProgress } from "@/components/user-progress";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ActivityChart } from "@/components/profile/activity-chart";
import { RecentLessons } from "@/components/profile/recent-lessons";
import { ProfileSkills } from "@/components/profile/profile-skills";
import { ProfileRightPanel } from "@/components/profile/profile-right-panel";
import {
  getStudentProfile,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const studentProfileData = getStudentProfile();

  const [userProgress, userSubscription, studentProfile] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    studentProfileData,
  ]);

  if (!userProgress || !userProgress.activeCourse || !studentProfile) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="mx-auto max-w-[1180px] overflow-x-clip px-4 pb-16 sm:px-6">
      <header className="mb-6 flex flex-col gap-4 border-b border-[#e8e2d7] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-[#1d1b15] sm:text-4xl">
            Your profile
          </h1>
          <p className="mt-1 text-sm text-[#686354]">
            Welcome back, {studentProfile.name}. Here is how your English is
            progressing.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-6">
          <ProfileHeader
            profile={studentProfile}
            activeCourseTitle={userProgress.activeCourse.title}
            activeCourseImage={userProgress.activeCourse.imageSrc}
            hasActiveSubscription={isPro}
          />

          <ActivityChart />
          <RecentLessons />
          <ProfileSkills competencies={studentProfile.competencies} />
        </main>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <ProfileRightPanel
            profile={studentProfile}
            points={userProgress.points}
          />
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
