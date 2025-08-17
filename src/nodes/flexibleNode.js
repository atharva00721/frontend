// flexibleNode.js
// Demonstrates flexible height with dynamic content

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";
import { Settings } from "lucide-react";

export const FlexibleNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      nodeType: "simple",
      textContent: "This is a simple node",
      showExtraFields: false,
      fieldCount: 3,
    },
    data
  );

  const handleNodeTypeChange = (e) => {
    updateState("nodeType", e.target.value);
  };

  const handleTextContentChange = (e) => {
    updateState("textContent", e.target.value);
  };

  const handleShowExtraFieldsChange = (e) => {
    updateState("showExtraFields", e.target.checked);
  };

  const handleFieldCountChange = (e) => {
    updateState("fieldCount", parseInt(e.target.value));
  };

  // Generate dynamic fields based on fieldCount
  const dynamicFields = Array.from({ length: state.fieldCount }, (_, i) => (
    <NodeInput
      key={i}
      label={`Field ${i + 1}`}
      value={state[`field${i + 1}`] || ""}
      onChange={(e) => updateState(`field${i + 1}`, e.target.value)}
    />
  ));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Flexible Node"
      description="Dynamic node with flexible height"
      icon={<Settings size={16} />}
      inputHandles={[{ id: "input" }]}
      outputHandles={[{ id: "output" }]}
      minHeight={100}
      customStyle={{
        background: "#eff6ff",
        borderColor: "#2563eb",
        borderStyle: "solid",
      }}
    >
      <NodeInput
        label="Node Type"
        value={state.nodeType}
        onChange={handleNodeTypeChange}
        type="select"
        options={[
          { value: "simple", label: "Simple" },
          { value: "complex", label: "Complex" },
          { value: "dynamic", label: "Dynamic" },
        ]}
      />

      <NodeInput
        label="Text Content"
        value={state.textContent}
        onChange={handleTextContentChange}
      />

      {state.nodeType === "complex" && (
        <div className="text-xs text-neutral-500 mt-1">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={state.showExtraFields}
              onChange={handleShowExtraFieldsChange}
              className="w-3 h-3"
            />
            <label className="text-xs">Show extra fields</label>
          </div>
        </div>
      )}

      {state.nodeType === "dynamic" && (
        <NodeInput
          label="Field Count"
          value={state.fieldCount}
          onChange={handleFieldCountChange}
          type="number"
        />
      )}

      {state.nodeType === "complex" && state.showExtraFields && (
        <>
          <NodeInput
            label="Extra Field 1"
            value={state.extraField1 || ""}
            onChange={(e) => updateState("extraField1", e.target.value)}
          />
          <NodeInput
            label="Extra Field 2"
            value={state.extraField2 || ""}
            onChange={(e) => updateState("extraField2", e.target.value)}
          />
        </>
      )}

      {state.nodeType === "dynamic" && (
        <>
          <div className="text-xs text-neutral-500 mt-1">
            Dynamic fields ({state.fieldCount}):
          </div>
          {dynamicFields}
        </>
      )}

      <div className="text-xs text-neutral-500 mt-1 italic">
        This node demonstrates flexible height - it grows with content!
      </div>
    </BaseNode>
  );
};
