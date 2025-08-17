// aggregatorNode.js
// Demonstrates multiple input handles and aggregation logic

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";
import { BarChart3 } from "lucide-react";

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
      description="Combine multiple inputs into one output"
      icon={<BarChart3 size={16} />}
      inputHandles={inputHandles}
      outputHandles={[{ id: "result" }]}
      minHeight={Math.max(80, 60 + parseInt(state.maxInputs) * 10)}
      customStyle={{ background: "#fff7ed", borderColor: "#f97316" }}
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
      <div className="text-xs text-neutral-500 mt-0.5">
        {inputHandles.length} input handles
      </div>
    </BaseNode>
  );
};
