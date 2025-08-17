// webScraperNode.js
// Web scraper node to fetch content from URLs

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const WebScraperNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      url: "",
      method: "GET",
      headers: "{}",
      timeout: "5000",
    },
    data
  );

  const handleUrlChange = (e) => {
    updateState("url", e.target.value);
  };

  const handleMethodChange = (e) => {
    updateState("method", e.target.value);
  };

  const handleHeadersChange = (e) => {
    updateState("headers", e.target.value);
  };

  const handleTimeoutChange = (e) => {
    updateState("timeout", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title={
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-success-500 rounded-md flex items-center justify-center text-white text-xs font-semibold">
            🌐
          </div>
          <span>Web Scraper</span>
        </div>
      }
      inputHandles={[{ id: "trigger" }]}
      outputHandles={[{ id: "content" }, { id: "status" }]}
      customStyle={{
        backgroundColor: "white",
        borderColor: "var(--success-300)",
        borderWidth: "2px",
      }}
    >
      <NodeInput
        label="URL"
        value={state.url}
        onChange={handleUrlChange}
        type="text"
        placeholder="https://example.com"
      />
      <NodeInput
        label="Method"
        value={state.method}
        onChange={handleMethodChange}
        type="select"
        options={[
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "DELETE", label: "DELETE" },
        ]}
      />
      <NodeInput
        label="Headers (JSON)"
        value={state.headers}
        onChange={handleHeadersChange}
        type="text"
        placeholder='{"Content-Type": "application/json"}'
      />
      <NodeInput
        label="Timeout (ms)"
        value={state.timeout}
        onChange={handleTimeoutChange}
        type="number"
      />
    </BaseNode>
  );
};
