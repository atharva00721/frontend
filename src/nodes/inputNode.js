// inputNode.js

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { TextCursorInput } from "lucide-react";

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

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      description="Pass data of different types into your workflow"
      icon={<TextCursorInput size={16} />}
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="required"
            checked={state.required}
            onChange={handleRequiredChange}
            className="m-0"
          />
          <label htmlFor="required" className="text-xs text-neutral-700">
            Required field
          </label>
        </div>
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Input</NodeButton>
      </div>
    </BaseNode>
  );
};
