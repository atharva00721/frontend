// aggregatorNode.js
// Demonstrates multiple input handles and aggregation logic

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const AggregatorNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      aggregationType: "concat",
      separator: ", ",
      maxInputs: 5,
    },
    data
  );

  const handleAggregationTypeChange = (e) => {
    updateState("aggregationType", e.target.value);
  };

  const handleSeparatorChange = (e) => {
    updateState("separator", e.target.value);
  };

  const handleMaxInputsChange = (e) => {
    updateState("maxInputs", e.target.value);
  };

  // Generate input handles based on maxInputs
  const inputHandles = Array.from(
    { length: parseInt(state.maxInputs) },
    (_, i) => ({
      id: `input${i + 1}`,
      style: { top: `${((i + 1) * 100) / (parseInt(state.maxInputs) + 1)}%` },
    })
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      inputHandles={inputHandles}
      outputHandles={[{ id: "result" }]}
      minHeight={Math.max(80, 60 + parseInt(state.maxInputs) * 10)}
      customStyle={{
        backgroundColor: "#faf0e6",
        borderColor: "#daa520",
      }}
    >
      <NodeInput
        label="Aggregation Type"
        value={state.aggregationType}
        onChange={handleAggregationTypeChange}
        type="select"
        options={[
          { value: "concat", label: "Concatenate" },
          { value: "sum", label: "Sum (numbers)" },
          { value: "average", label: "Average" },
          { value: "join", label: "Join with separator" },
          { value: "merge", label: "Merge objects" },
        ]}
      />
      {(state.aggregationType === "concat" ||
        state.aggregationType === "join") && (
        <NodeInput
          label="Separator"
          value={state.separator}
          onChange={handleSeparatorChange}
        />
      )}
      <NodeInput
        label="Max Inputs"
        value={state.maxInputs}
        onChange={handleMaxInputsChange}
        type="number"
      />
      <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
        {inputHandles.length} input handles
      </div>
    </BaseNode>
  );
};
