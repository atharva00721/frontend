import React from "react";

export const StatusBar = () => {
  return (
    <div className="bg-white border-t border-neutral-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-success-700 font-medium">
              Draft saved
            </span>
          </div>
          <div className="text-sm text-neutral-500">Last saved: Just now</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <span className="text-sm text-neutral-600">Admin</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">Zoom:</span>
            <span className="text-sm font-medium">72%</span>
          </div>

          <button className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
            💬
          </button>
        </div>
      </div>
    </div>
  );
};
