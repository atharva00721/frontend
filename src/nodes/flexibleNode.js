// flexibleNode.js
// Demonstrates flexible height with dynamic content

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

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
      inputHandles={[{ id: "input" }]}
      outputHandles={[{ id: "output" }]}
      minHeight={100}
      customStyle={{
        backgroundColor: "#e6f3ff",
        borderColor: "#0066cc",
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
        <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <input
              type="checkbox"
              checked={state.showExtraFields}
              onChange={handleShowExtraFieldsChange}
              style={{ width: "12px", height: "12px" }}
            />
            <label style={{ fontSize: "10px" }}>Show extra fields</label>
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
          <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>
            Dynamic fields ({state.fieldCount}):
          </div>
          {dynamicFields}
        </>
      )}

      <div
        style={{
          fontSize: "10px",
          color: "#666",
          marginTop: "4px",
          fontStyle: "italic",
        }}
      >
        This node demonstrates flexible height - it grows with content!
      </div>
    </BaseNode>
  );
};
