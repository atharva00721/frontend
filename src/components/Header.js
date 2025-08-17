import React, { useState } from "react";

export const Header = () => {
  const [activeTab, setActiveTab] = useState("Objects");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "Start", label: "Start" },
    { id: "Objects", label: "Objects" },
    { id: "Knowledge", label: "Knowledge" },
    { id: "AI", label: "AI" },
    { id: "Integrations", label: "Integrations" },
    { id: "Logic", label: "Logic" },
    { id: "Data", label: "Data" },
    { id: "Chat", label: "Chat" },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-6 py-4">
        {/* Top row with title and actions */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Pipelines / Journey Pipeline: Knowledge Assistant
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-secondary btn-sm">View Traces</button>
            <button className="btn btn-secondary btn-sm">
              Version History
            </button>
            <button className="btn btn-purple btn-sm">Deploy Changes</button>
            <button className="btn btn-success btn-sm">Run</button>
            <button className="btn btn-secondary btn-sm">Export</button>
            <button className="btn btn-secondary btn-sm">⚙️</button>
          </div>
        </div>

        {/* Search and tabs row */}
        <div className="flex items-center gap-6">
          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Nodes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-600 bg-primary-50 border-b-2 border-primary-600"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
