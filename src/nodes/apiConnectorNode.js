// apiConnectorNode.js
// External API connection node

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { Globe } from "lucide-react";

export const APIConnectorNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      url: "",
      method: "GET",
      headers: "{}",
      body: "",
      authType: "none",
      apiKey: "",
      username: "",
      password: "",
      timeout: "30000",
      retryCount: "3",
      outputFormat: "json",
      successCodes: "200,201,202",
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

  const handleBodyChange = (e) => {
    updateState("body", e.target.value);
  };

  const handleAuthTypeChange = (e) => {
    updateState("authType", e.target.value);
  };

  const handleApiKeyChange = (e) => {
    updateState("apiKey", e.target.value);
  };

  const handleUsernameChange = (e) => {
    updateState("username", e.target.value);
  };

  const handlePasswordChange = (e) => {
    updateState("password", e.target.value);
  };

  const handleTimeoutChange = (e) => {
    updateState("timeout", e.target.value);
  };

  const handleRetryCountChange = (e) => {
    updateState("retryCount", e.target.value);
  };

  const handleOutputFormatChange = (e) => {
    updateState("outputFormat", e.target.value);
  };

  const handleSuccessCodesChange = (e) => {
    updateState("successCodes", e.target.value);
  };

  const resetToDefaults = () => {
    updateState("url", "");
    updateState("method", "GET");
    updateState("headers", "{}");
    updateState("body", "");
    updateState("authType", "none");
    updateState("apiKey", "");
    updateState("username", "");
    updateState("password", "");
    updateState("timeout", "30000");
    updateState("retryCount", "3");
    updateState("outputFormat", "json");
    updateState("successCodes", "200,201,202");
  };

  const getMethodDescription = () => {
    const descriptions = {
      GET: "Retrieve data from the API",
      POST: "Create new resource or submit data",
      PUT: "Update existing resource completely",
      PATCH: "Partially update existing resource",
      DELETE: "Remove resource from the API",
    };
    return descriptions[state.method] || "";
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Connector"
      description={getMethodDescription()}
      icon={<Globe size={16} />}
      inputHandles={[{ id: "trigger" }]}
      outputHandles={[
        { id: "response", style: { top: "25%" } },
        { id: "status", style: { top: "75%" } },
      ]}
      width={350}
      customStyle={{
        background: "linear-gradient(to bottom right, #eef2ff, #faf5ff)",
        borderColor: "#a5b4fc",
      }}
    >
      <NodeSection title="Request Configuration">
        <NodeInput
          label="API URL"
          value={state.url}
          onChange={handleUrlChange}
          placeholder="https://api.example.com/endpoint"
          helpText="Full URL of the API endpoint"
          required
        />

        <NodeInput
          label="HTTP Method"
          value={state.method}
          onChange={handleMethodChange}
          type="select"
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "PATCH", label: "PATCH" },
            { value: "DELETE", label: "DELETE" },
            { value: "HEAD", label: "HEAD" },
            { value: "OPTIONS", label: "OPTIONS" },
          ]}
          helpText="HTTP method for the request"
        />

        <NodeInput
          label="Headers (JSON)"
          value={state.headers}
          onChange={handleHeadersChange}
          type="textarea"
          placeholder='{"Content-Type": "application/json", "Accept": "application/json"}'
          helpText="Request headers in JSON format"
        />

        {(state.method === "POST" ||
          state.method === "PUT" ||
          state.method === "PATCH") && (
          <NodeInput
            label="Request Body"
            value={state.body}
            onChange={handleBodyChange}
            type="textarea"
            placeholder='{"key": "value"}'
            helpText="Request body data"
          />
        )}
      </NodeSection>

      <NodeSection title="Authentication">
        <NodeInput
          label="Auth Type"
          value={state.authType}
          onChange={handleAuthTypeChange}
          type="select"
          options={[
            { value: "none", label: "No Authentication" },
            { value: "api_key", label: "API Key" },
            { value: "bearer", label: "Bearer Token" },
            { value: "basic", label: "Basic Auth" },
            { value: "oauth2", label: "OAuth 2.0" },
          ]}
          helpText="Authentication method"
        />

        {(state.authType === "api_key" || state.authType === "bearer") && (
          <NodeInput
            label="API Key / Token"
            value={state.apiKey}
            onChange={handleApiKeyChange}
            type="password"
            placeholder="Enter your API key or token"
            helpText="API key or bearer token"
          />
        )}

        {state.authType === "basic" && (
          <>
            <NodeInput
              label="Username"
              value={state.username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
              helpText="Basic auth username"
            />
            <NodeInput
              label="Password"
              value={state.password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter password"
              helpText="Basic auth password"
            />
          </>
        )}
      </NodeSection>

      <NodeSection title="Response Handling">
        <NodeInput
          label="Output Format"
          value={state.outputFormat}
          onChange={handleOutputFormatChange}
          type="select"
          options={[
            { value: "json", label: "JSON" },
            { value: "text", label: "Plain Text" },
            { value: "xml", label: "XML" },
            { value: "binary", label: "Binary" },
            { value: "raw", label: "Raw Response" },
          ]}
          helpText="Format for response data"
        />

        <NodeInput
          label="Success Status Codes"
          value={state.successCodes}
          onChange={handleSuccessCodesChange}
          placeholder="200,201,202"
          helpText="Comma-separated list of successful HTTP status codes"
        />
      </NodeSection>

      <NodeSection title="Advanced Options" collapsible>
        <NodeInput
          label="Timeout (ms)"
          value={state.timeout}
          onChange={handleTimeoutChange}
          type="number"
          placeholder="30000"
          helpText="Request timeout in milliseconds"
        />

        <NodeInput
          label="Retry Count"
          value={state.retryCount}
          onChange={handleRetryCountChange}
          type="number"
          placeholder="3"
          helpText="Number of retry attempts on failure"
        />

        <NodeInput
          label="Rate Limiting"
          value={state.rateLimit || "none"}
          onChange={(e) => updateState("rateLimit", e.target.value)}
          type="select"
          options={[
            { value: "none", label: "No Rate Limiting" },
            { value: "per_second", label: "Per Second" },
            { value: "per_minute", label: "Per Minute" },
            { value: "per_hour", label: "Per Hour" },
          ]}
          helpText="Rate limiting for API calls"
        />

        <NodeInput
          label="Cache Duration (s)"
          value={state.cacheDuration || "0"}
          onChange={(e) => updateState("cacheDuration", e.target.value)}
          type="number"
          placeholder="0"
          helpText="Cache response for specified seconds (0 = no cache)"
        />
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test API</NodeButton>
      </div>
    </BaseNode>
  );
};
