// webScraperNode.js
// Web scraper node to fetch content from URLs

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";
import { Globe } from "lucide-react";

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
      title="Web Scraper"
      description="Fetch content from URLs"
      icon={<Globe size={16} />}
      inputHandles={[{ id: "trigger" }]}
      outputHandles={[{ id: "content" }, { id: "status" }]}
      customStyle={{
        background: "white",
        borderColor: "#86efac",
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
