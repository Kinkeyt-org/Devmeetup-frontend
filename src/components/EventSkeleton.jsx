import React from "react";

const EventSkeleton = () => {
  return (
    <div className="group flex flex-row items-center gap-4 p-2 sm:p-3 animate-pulse rounded-2xl border border-neutral-200 dark:border-white/5">
      {/* Image Skeleton */}
      <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
      
      {/* Content Skeleton */}
      <div className="flex flex-col justify-center flex-1 space-y-2 min-w-0">
        {/* Date */}
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
        
        {/* Title */}
        <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
        
        {/* Location */}
        <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
    </div>
  );
};

export default EventSkeleton;
