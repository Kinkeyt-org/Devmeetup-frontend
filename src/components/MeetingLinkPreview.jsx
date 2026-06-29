import React from "react";
import { ExternalLink, Globe } from "lucide-react";
import { getLinkPreviewData } from "../lib/utils";

const MeetingLinkPreview = ({ link, showUrl = true, actionLabel = "Open" }) => {
  const preview = getLinkPreviewData(link);
  if (!preview) return null;

  const label = preview.platform?.name || preview.host || "Meeting link";

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/70 p-3">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
          style={preview.platform?.color ? { backgroundColor: `${preview.platform.color}18` } : undefined}
        >
          {preview.favicon ? (
            <img
              src={preview.favicon}
              alt=""
              className="w-6 h-6 object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <Globe size={18} className="text-neutral-500" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">Meeting link</p>
          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{label}</p>
          {showUrl && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 break-all">
              {preview.href}
            </p>
          )}
        </div>

        {preview.href && (
          <a
            href={preview.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 shrink-0 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:opacity-80 transition-opacity"
          >
            <ExternalLink size={13} />
            {actionLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default MeetingLinkPreview;
