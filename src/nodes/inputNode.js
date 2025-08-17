// inputNode.js

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      inputName: id.replace("customInput-", "input_"),
      inputType: "Text",
      placeholder: "",
      required: false,
      defaultValue: "",
    },
    data
  );

  const handleNameChange = (e) => {
    updateState("inputName", e.target.value);
  };

  const handleTypeChange = (e) => {
    updateState("inputType", e.target.value);
  };

  const handlePlaceholderChange = (e) => {
    updateState("placeholder", e.target.value);
  };

  const handleRequiredChange = (e) => {
    updateState("required", e.target.checked);
  };

  const handleDefaultValueChange = (e) => {
    updateState("defaultValue", e.target.value);
  };

  const resetToDefaults = () => {
    updateState("inputName", id.replace("customInput-", "input_"));
    updateState("inputType", "Text");
    updateState("placeholder", "");
    updateState("required", false);
    updateState("defaultValue", "");
  };

  // Input icon
  const InputIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      description="Pass data of different types into your workflow"
      icon={<InputIcon />}
      outputHandles={[{ id: "value" }]}
      width={280}
    >
      <NodeSection title="Basic Configuration">
        <NodeInput
          label="Input Name"
          value={state.inputName}
          onChange={handleNameChange}
          placeholder="Enter input name"
          helpText="This will be the identifier for this input"
          required
        />

        <NodeInput
          label="Type"
          value={state.inputType}
          onChange={handleTypeChange}
          type="select"
          options={[
            { value: "Text", label: "Text" },
            { value: "Number", label: "Number" },
            { value: "File", label: "File" },
            { value: "URL", label: "URL" },
            { value: "Email", label: "Email" },
            { value: "Date", label: "Date" },
          ]}
          helpText="Select the data type for this input"
        />
      </NodeSection>

      <NodeSection title="Advanced Options" collapsible>
        <NodeInput
          label="Placeholder"
          value={state.placeholder}
          onChange={handlePlaceholderChange}
          placeholder="Enter placeholder text"
          helpText="Text shown when input is empty"
        />

        <NodeInput
          label="Default Value"
          value={state.defaultValue}
          onChange={handleDefaultValueChange}
          placeholder="Enter default value"
          helpText="Initial value for this input"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <input
            type="checkbox"
            id="required"
            checked={state.required}
            onChange={handleRequiredChange}
            style={{ margin: 0 }}
          />
          <label
            htmlFor="required"
            style={{ fontSize: "var(--text-xs)", color: "var(--neutral-700)" }}
          >
            Required field
          </label>
        </div>
      </NodeSection>

      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          justifyContent: "flex-end",
        }}
      >
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Input</NodeButton>
      </div>
    </BaseNode>
  );
};
