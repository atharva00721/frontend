// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-4 bg-white border-b border-neutral-200">
      <div className="flex flex-wrap gap-3">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="dataTransformer" label="Data Transformer" />
        <DraggableNode type="conditional" label="Conditional" />
        <DraggableNode type="fileProcessor" label="File Processor" />
        <DraggableNode type="apiConnector" label="API Connector" />
        <DraggableNode type="dataValidator" label="Data Validator" />
        <DraggableNode type="webScraper" label="Web Scraper" />
      </div>
    </div>
  );
};
