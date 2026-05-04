import React from 'react';

const EventDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

        {/* TOP BAR SKELETON */}
        <div className="flex items-center justify-between pt-4 md:pt-12 pb-4">
          <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-white/5 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-white/5 animate-pulse" />
            <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-white/5 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-10 lg:gap-16 mt-4 md:mt-8 animate-pulse">

          {/* LEFT: HERO IMAGE SKELETON */}
          <div className="w-full md:w-[45%] lg:w-[42%] shrink-0">
            <div
              className="w-full bg-neutral-200 dark:bg-white/5 rounded-[20px]"
              style={{ aspectRatio: '4 / 3', maxHeight: 380 }}
            />
          </div>

          {/* RIGHT: DETAILS SKELETON */}
          <div className="flex-1 flex flex-col mt-6 md:mt-0 md:pt-2">

            {/* TITLE SKELETON */}
            <div className="flex items-start justify-between gap-3">
              <div className="h-10 w-3/4 bg-neutral-200 dark:bg-white/5 rounded-lg" />
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-neutral-200 dark:bg-white/5 rounded-full" />
              </div>
            </div>

            {/* META ROW SKELETON */}
            <div className="mt-6 space-y-3">
              <div className="h-4 w-1/2 bg-neutral-200 dark:bg-white/5 rounded" />
              <div className="h-4 w-1/3 bg-neutral-200 dark:bg-white/5 rounded" />
              <div className="h-4 w-1/4 bg-neutral-200 dark:bg-white/5 rounded" />
            </div>

            {/* DESCRIPTION SKELETON */}
            <div className="mt-8 space-y-2">
              <div className="h-4 w-full bg-neutral-200 dark:bg-white/5 rounded" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-white/5 rounded" />
              <div className="h-4 w-2/3 bg-neutral-200 dark:bg-white/5 rounded" />
            </div>

            {/* MAP SKELETON */}
            <div className="mt-10">
              <div className="h-4 w-24 bg-neutral-200 dark:bg-white/5 rounded mb-4" />
              <div className="h-[250px] w-full bg-neutral-200 dark:bg-white/5 rounded-2xl" />
            </div>

            {/* BUTTON SKELETON (Desktop/Tablet) */}
            <div className="hidden md:block mt-10">
              <div className="h-[54px] w-full bg-neutral-200 dark:bg-white/5 rounded-xl" />
            </div>

          </div>
        </div>
      </div>

      {/* FIXED BOTTOM BUTTON SKELETON (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center md:hidden px-5 pb-8 pt-6">
        <div className="h-[54px] w-full bg-neutral-200 dark:bg-white/10 rounded-xl" />
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
