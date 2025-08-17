// conditionalNode.js
// Conditional logic and branching node

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { GitBranch } from "lucide-react";

export const ConditionalNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      conditionType: "simple",
      field: "",
      operator: "equals",
      value: "",
      logicalOperator: "AND",
      conditions: [],
      customExpression: "",
      trueOutput: "true",
      falseOutput: "false",
    },
    data
  );

  const handleConditionTypeChange = (e) => {
    updateState("conditionType", e.target.value);
  };

  const handleFieldChange = (e) => {
    updateState("field", e.target.value);
  };

  const handleOperatorChange = (e) => {
    updateState("operator", e.target.value);
  };

  const handleValueChange = (e) => {
    updateState("value", e.target.value);
  };

  const handleLogicalOperatorChange = (e) => {
    updateState("logicalOperator", e.target.value);
  };

  const handleCustomExpressionChange = (e) => {
    updateState("customExpression", e.target.value);
  };

  const handleTrueOutputChange = (e) => {
    updateState("trueOutput", e.target.value);
  };

  const handleFalseOutputChange = (e) => {
    updateState("falseOutput", e.target.value);
  };

  const addCondition = () => {
    const newCondition = {
      id: Date.now(),
      field: "",
      operator: "equals",
      value: "",
    };
    updateState("conditions", [...state.conditions, newCondition]);
  };

  const removeCondition = (conditionId) => {
    updateState(
      "conditions",
      state.conditions.filter((c) => c.id !== conditionId)
    );
  };

  const updateCondition = (conditionId, field, value) => {
    updateState(
      "conditions",
      state.conditions.map((c) =>
        c.id === conditionId ? { ...c, [field]: value } : c
      )
    );
  };

  const resetToDefaults = () => {
    updateState("conditionType", "simple");
    updateState("field", "");
    updateState("operator", "equals");
    updateState("value", "");
    updateState("logicalOperator", "AND");
    updateState("conditions", []);
    updateState("customExpression", "");
    updateState("trueOutput", "true");
    updateState("falseOutput", "false");
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      description="Create conditional logic and branching"
      icon={<GitBranch size={16} />}
      inputHandles={[{ id: "data" }]}
      outputHandles={[
        { id: "true", style: { top: "25%" } },
        { id: "false", style: { top: "75%" } },
      ]}
      width={350}
      customStyle={{
        background: "linear-gradient(to bottom right, #fff7ed, #fef2f2)",
        borderColor: "#fb923c",
      }}
    >
      <NodeSection title="Condition Type">
        <NodeInput
          label="Type"
          value={state.conditionType}
          onChange={handleConditionTypeChange}
          type="select"
          options={[
            { value: "simple", label: "Simple Condition" },
            { value: "complex", label: "Multiple Conditions" },
            { value: "custom", label: "Custom Expression" },
          ]}
          helpText="Choose the type of condition"
        />
      </NodeSection>

      {state.conditionType === "simple" && (
        <NodeSection title="Simple Condition">
          <NodeInput
            label="Field"
            value={state.field}
            onChange={handleFieldChange}
            placeholder="e.g., status, age, category"
            helpText="Field to evaluate"
          />
          <NodeInput
            label="Operator"
            value={state.operator}
            onChange={handleOperatorChange}
            type="select"
            options={[
              { value: "equals", label: "Equals" },
              { value: "not_equals", label: "Not Equals" },
              { value: "greater_than", label: "Greater Than" },
              { value: "less_than", label: "Less Than" },
              { value: "greater_equal", label: "Greater or Equal" },
              { value: "less_equal", label: "Less or Equal" },
              { value: "contains", label: "Contains" },
              { value: "not_contains", label: "Not Contains" },
              { value: "is_empty", label: "Is Empty" },
              { value: "is_not_empty", label: "Is Not Empty" },
            ]}
          />
          <NodeInput
            label="Value"
            value={state.value}
            onChange={handleValueChange}
            placeholder="Enter comparison value"
            helpText="Value to compare against"
          />
        </NodeSection>
      )}

      {state.conditionType === "complex" && (
        <NodeSection title="Multiple Conditions">
          <NodeInput
            label="Logical Operator"
            value={state.logicalOperator}
            onChange={handleLogicalOperatorChange}
            type="select"
            options={[
              { value: "AND", label: "AND (All conditions must be true)" },
              { value: "OR", label: "OR (Any condition can be true)" },
            ]}
          />

          <div className="space-y-2">
            {state.conditions.map((condition, index) => (
              <div
                key={condition.id}
                className="border border-neutral-200 rounded p-2 bg-neutral-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">
                    Condition {index + 1}
                  </span>
                  <button
                    onClick={() => removeCondition(condition.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <NodeInput
                    label="Field"
                    value={condition.field}
                    onChange={(e) =>
                      updateCondition(condition.id, "field", e.target.value)
                    }
                    placeholder="field"
                  />
                  <NodeInput
                    label="Op"
                    value={condition.operator}
                    onChange={(e) =>
                      updateCondition(condition.id, "operator", e.target.value)
                    }
                    type="select"
                    options={[
                      { value: "equals", label: "=" },
                      { value: "not_equals", label: "≠" },
                      { value: "greater_than", label: ">" },
                      { value: "less_than", label: "<" },
                    ]}
                  />
                  <NodeInput
                    label="Value"
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(condition.id, "value", e.target.value)
                    }
                    placeholder="value"
                  />
                </div>
              </div>
            ))}
            <NodeButton variant="secondary" onClick={addCondition} size="sm">
              Add Condition
            </NodeButton>
          </div>
        </NodeSection>
      )}

      {state.conditionType === "custom" && (
        <NodeSection title="Custom Expression">
          <NodeInput
            label="JavaScript Expression"
            value={state.customExpression}
            onChange={handleCustomExpressionChange}
            type="textarea"
            placeholder="data.status === 'active' && data.age > 18"
            helpText="Write a JavaScript expression that returns true/false"
          />
        </NodeSection>
      )}

      <NodeSection title="Output Configuration">
        <NodeInput
          label="True Output"
          value={state.trueOutput}
          onChange={handleTrueOutputChange}
          placeholder="true"
          helpText="Output when condition is true"
        />
        <NodeInput
          label="False Output"
          value={state.falseOutput}
          onChange={handleFalseOutputChange}
          placeholder="false"
          helpText="Output when condition is false"
        />
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Condition</NodeButton>
      </div>
    </BaseNode>
  );
};
