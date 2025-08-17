// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-4 bg-white border-b border-neutral-200 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="webScraper" label="Web Scraper" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transformer" label="Transformer" />
        <DraggableNode type="aggregator" label="Aggregator" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="flexible" label="Flexible" />
      </div>
    </div>
  );
};
