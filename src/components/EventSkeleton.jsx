import React from "react";

const EventSkeleton = () => {
  return (
    <div className="group flex flex-row items-center p-2.5 sm:p-3 animate-pulse rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 gap-3 w-full">
      {/* Image Skeleton */}
      <div className="w-24 h-18 sm:w-28 sm:h-20 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
      
      {/* Content Skeleton */}
      <div className="flex flex-col justify-between flex-1 min-w-0 self-stretch">
        {/* Date & Bookmark Skeleton */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="h-2.5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-5 w-5 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0" />
        </div>
        
        {/* Title Skeleton */}
        <div className="h-3.5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded my-0.5" />
        
        {/* Attendees & Status Skeleton */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1.5">
          <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-3 w-10 bg-neutral-200 dark:bg-neutral-800 rounded shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;
