import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { cn } from "@/lib/utils";


const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();

  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>


      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-3xl font-extrabold font-heading text-[#1d1b15]">
            Academic Leaderboard
          </h1>
          <p className="mb-6 text-center text-base text-[#4b4738]">
            See where you stand among esteemed scholars in the community.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full bg-[#e8e2d7]" />
          <div className="w-full space-y-2">
            {leaderboard.map((userProgress, i) => (
              <div
                key={userProgress.userId}
                className="flex w-full items-center rounded-xl border border-[#e8e2d7] bg-white p-3 px-5 shadow-sm transition hover:bg-[#f9f3e8]"
              >
                <span
                  className={cn(
                    "mr-4 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                    i === 0 && "bg-[#fae282] text-[#534600]",
                    i === 1 && "bg-[#d1d9f3] text-[#131b2e]",
                    i === 2 && "bg-[#fdd2ac] text-[#5d4124]",
                    i > 2 && "text-[#7c7766]"
                  )}
                >
                  {i + 1}
                </span>

                <Avatar className="ml-2 mr-4 h-11 w-11 border border-[#e8e2d7] bg-[#f0d97a]/20">
                  <AvatarImage
                    src={userProgress.userImageSrc}
                    className="object-cover"
                  />
                </Avatar>

                <p className="flex-1 font-bold text-[#1d1b15]">
                  {userProgress.userName}
                </p>
                <span className="rounded-md bg-[#f3ede2] px-2.5 py-1 text-xs font-bold text-[#6e5e06]">
                  {userProgress.points} XP
                </span>
              </div>
            ))}
          </div>

        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
