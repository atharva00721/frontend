// conditionNode.js
// Demonstrates branching logic and multiple output handles

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const ConditionNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      conditionType: "equals",
      compareValue: "",
      customExpression: "",
    },
    data
  );

  const handleConditionTypeChange = (e) => {
    updateState("conditionType", e.target.value);
  };

  const handleCompareValueChange = (e) => {
    updateState("compareValue", e.target.value);
  };

  const handleCustomExpressionChange = (e) => {
    updateState("customExpression", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputHandles={[{ id: "input" }]}
      outputHandles={[
        { id: "true", style: { top: "30%" } },
        { id: "false", style: { top: "70%" } },
      ]}
      customStyle={{
        backgroundColor: "#ffe4e1",
        borderColor: "#ff69b4",
        borderStyle: "dashed",
      }}
    >
      <NodeInput
        label="Condition Type"
        value={state.conditionType}
        onChange={handleConditionTypeChange}
        type="select"
        options={[
          { value: "equals", label: "Equals" },
          { value: "not_equals", label: "Not equals" },
          { value: "greater_than", label: "Greater than" },
          { value: "less_than", label: "Less than" },
          { value: "contains", label: "Contains" },
          { value: "empty", label: "Is empty" },
          { value: "custom", label: "Custom expression" },
        ]}
      />
      {state.conditionType !== "empty" && state.conditionType !== "custom" && (
        <NodeInput
          label="Compare Value"
          value={state.compareValue}
          onChange={handleCompareValueChange}
        />
      )}
      {state.conditionType === "custom" && (
        <NodeInput
          label="Expression"
          value={state.customExpression}
          onChange={handleCustomExpressionChange}
          placeholder="e.g., value > 10 && value < 100"
        />
      )}
      <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
        True → False
      </div>
    </BaseNode>
  );
};
