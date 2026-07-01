import React from "react";

const EventSkeleton = () => {
  return (
    <div className="group flex flex-row items-center p-3 sm:p-4 animate-pulse rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 gap-4 w-full">
      {/* Image Skeleton */}
      <div className="w-28 h-20 sm:w-36 sm:h-24 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
      
      {/* Content Skeleton */}
      <div className="flex flex-col justify-between flex-1 min-w-0 self-stretch">
        {/* Date & Bookmark Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-6 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0" />
        </div>
        
        {/* Title Skeleton */}
        <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded my-1" />
        
        {/* Attendees & Status Skeleton */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-neutral-100 dark:border-white/5">
          <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-800 rounded shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;
