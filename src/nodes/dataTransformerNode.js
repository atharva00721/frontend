// dataTransformerNode.js
// Data transformation node for filtering, mapping, sorting, etc.

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { ArrowUpDown } from "lucide-react";

export const DataTransformerNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      operation: "filter",
      condition: "",
      field: "",
      value: "",
      sortOrder: "asc",
      limit: "100",
      transformFunction: "",
    },
    data
  );

  const handleOperationChange = (e) => {
    updateState("operation", e.target.value);
  };

  const handleConditionChange = (e) => {
    updateState("condition", e.target.value);
  };

  const handleFieldChange = (e) => {
    updateState("field", e.target.value);
  };

  const handleValueChange = (e) => {
    updateState("value", e.target.value);
  };

  const handleSortOrderChange = (e) => {
    updateState("sortOrder", e.target.value);
  };

  const handleLimitChange = (e) => {
    updateState("limit", e.target.value);
  };

  const handleTransformFunctionChange = (e) => {
    updateState("transformFunction", e.target.value);
  };

  const resetToDefaults = () => {
    updateState("operation", "filter");
    updateState("condition", "");
    updateState("field", "");
    updateState("value", "");
    updateState("sortOrder", "asc");
    updateState("limit", "100");
    updateState("transformFunction", "");
  };

  const getOperationDescription = () => {
    const descriptions = {
      filter: "Filter data based on conditions",
      map: "Transform each item in the data",
      sort: "Sort data by specified field",
      limit: "Limit the number of results",
      group: "Group data by specified field",
      aggregate: "Perform aggregation operations",
    };
    return descriptions[state.operation] || "";
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Transformer"
      description={getOperationDescription()}
      icon={<ArrowUpDown size={16} />}
      inputHandles={[{ id: "data" }]}
      outputHandles={[{ id: "transformed" }, { id: "errors" }]}
      width={320}
      customStyle={{
        background: "linear-gradient(to bottom right, #faf5ff, #eff6ff)",
        borderColor: "#c084fc",
      }}
    >
      <NodeSection title="Transformation Type">
        <NodeInput
          label="Operation"
          value={state.operation}
          onChange={handleOperationChange}
          type="select"
          options={[
            { value: "filter", label: "Filter" },
            { value: "map", label: "Map/Transform" },
            { value: "sort", label: "Sort" },
            { value: "limit", label: "Limit" },
            { value: "group", label: "Group" },
            { value: "aggregate", label: "Aggregate" },
          ]}
          helpText="Select the transformation operation"
        />
      </NodeSection>

      {state.operation === "filter" && (
        <NodeSection title="Filter Conditions">
          <NodeInput
            label="Field"
            value={state.field}
            onChange={handleFieldChange}
            placeholder="e.g., age, status, category"
            helpText="Field to filter on"
          />
          <NodeInput
            label="Condition"
            value={state.condition}
            onChange={handleConditionChange}
            type="select"
            options={[
              { value: "equals", label: "Equals" },
              { value: "not_equals", label: "Not Equals" },
              { value: "greater_than", label: "Greater Than" },
              { value: "less_than", label: "Less Than" },
              { value: "contains", label: "Contains" },
              { value: "starts_with", label: "Starts With" },
              { value: "ends_with", label: "Ends With" },
            ]}
          />
          <NodeInput
            label="Value"
            value={state.value}
            onChange={handleValueChange}
            placeholder="Enter filter value"
          />
        </NodeSection>
      )}

      {state.operation === "map" && (
        <NodeSection title="Transform Function">
          <NodeInput
            label="Transform Function"
            value={state.transformFunction}
            onChange={handleTransformFunctionChange}
            type="textarea"
            placeholder="item => ({ ...item, processed: true })"
            helpText="JavaScript function to transform each item"
          />
        </NodeSection>
      )}

      {state.operation === "sort" && (
        <NodeSection title="Sort Configuration">
          <NodeInput
            label="Sort Field"
            value={state.field}
            onChange={handleFieldChange}
            placeholder="e.g., name, date, priority"
          />
          <NodeInput
            label="Sort Order"
            value={state.sortOrder}
            onChange={handleSortOrderChange}
            type="select"
            options={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
          />
        </NodeSection>
      )}

      {state.operation === "limit" && (
        <NodeSection title="Limit Configuration">
          <NodeInput
            label="Limit"
            value={state.limit}
            onChange={handleLimitChange}
            type="number"
            placeholder="100"
            helpText="Maximum number of items to return"
          />
        </NodeSection>
      )}

      <NodeSection title="Advanced Options" collapsible>
        <NodeInput
          label="Error Handling"
          value={state.errorHandling || "skip"}
          onChange={(e) => updateState("errorHandling", e.target.value)}
          type="select"
          options={[
            { value: "skip", label: "Skip Errors" },
            { value: "fail", label: "Fail on Error" },
            { value: "log", label: "Log and Continue" },
          ]}
          helpText="How to handle transformation errors"
        />
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Transform</NodeButton>
      </div>
    </BaseNode>
  );
};
