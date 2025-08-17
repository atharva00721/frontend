// dataValidatorNode.js
// Data validation and schema checking node

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { CheckCircle } from "lucide-react";

export const DataValidatorNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      validationType: "schema",
      schema: "",
      field: "",
      rule: "required",
      pattern: "",
      minLength: "",
      maxLength: "",
      minValue: "",
      maxValue: "",
      allowedValues: "",
      customValidation: "",
      errorMessage: "Validation failed",
      strictMode: false,
    },
    data
  );

  const handleValidationTypeChange = (e) => {
    updateState("validationType", e.target.value);
  };

  const handleSchemaChange = (e) => {
    updateState("schema", e.target.value);
  };

  const handleFieldChange = (e) => {
    updateState("field", e.target.value);
  };

  const handleRuleChange = (e) => {
    updateState("rule", e.target.value);
  };

  const handlePatternChange = (e) => {
    updateState("pattern", e.target.value);
  };

  const handleMinLengthChange = (e) => {
    updateState("minLength", e.target.value);
  };

  const handleMaxLengthChange = (e) => {
    updateState("maxLength", e.target.value);
  };

  const handleMinValueChange = (e) => {
    updateState("minValue", e.target.value);
  };

  const handleMaxValueChange = (e) => {
    updateState("maxValue", e.target.value);
  };

  const handleAllowedValuesChange = (e) => {
    updateState("allowedValues", e.target.value);
  };

  const handleCustomValidationChange = (e) => {
    updateState("customValidation", e.target.value);
  };

  const handleErrorMessageChange = (e) => {
    updateState("errorMessage", e.target.value);
  };

  const handleStrictModeChange = (e) => {
    updateState("strictMode", e.target.checked);
  };

  const resetToDefaults = () => {
    updateState("validationType", "schema");
    updateState("schema", "");
    updateState("field", "");
    updateState("rule", "required");
    updateState("pattern", "");
    updateState("minLength", "");
    updateState("maxLength", "");
    updateState("minValue", "");
    updateState("maxValue", "");
    updateState("allowedValues", "");
    updateState("customValidation", "");
    updateState("errorMessage", "Validation failed");
    updateState("strictMode", false);
  };

  const getValidationDescription = () => {
    const descriptions = {
      schema: "Validate against JSON schema",
      field: "Validate specific field",
      custom: "Custom validation logic",
      type: "Type checking validation",
      format: "Format validation (email, URL, etc.)",
    };
    return descriptions[state.validationType] || "";
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Validator"
      description={getValidationDescription()}
      icon={<CheckCircle size={16} />}
      inputHandles={[{ id: "data" }]}
      outputHandles={[
        { id: "valid", style: { top: "25%" } },
        { id: "invalid", style: { top: "75%" } },
      ]}
      width={320}
      customStyle={{
        background: "linear-gradient(to bottom right, #ecfdf5, #f0fdfa)",
        borderColor: "#6ee7b7",
      }}
    >
      <NodeSection title="Validation Type">
        <NodeInput
          label="Type"
          value={state.validationType}
          onChange={handleValidationTypeChange}
          type="select"
          options={[
            { value: "schema", label: "JSON Schema" },
            { value: "field", label: "Field Validation" },
            { value: "custom", label: "Custom Logic" },
            { value: "type", label: "Type Checking" },
            { value: "format", label: "Format Validation" },
          ]}
          helpText="Choose validation approach"
        />
      </NodeSection>

      {state.validationType === "schema" && (
        <NodeSection title="JSON Schema">
          <NodeInput
            label="Schema Definition"
            value={state.schema}
            onChange={handleSchemaChange}
            type="textarea"
            placeholder='{"type": "object", "properties": {"name": {"type": "string"}}}'
            helpText="JSON schema for validation"
          />
        </NodeSection>
      )}

      {state.validationType === "field" && (
        <NodeSection title="Field Validation">
          <NodeInput
            label="Field Name"
            value={state.field}
            onChange={handleFieldChange}
            placeholder="email, age, status"
            helpText="Field to validate"
          />

          <NodeInput
            label="Validation Rule"
            value={state.rule}
            onChange={handleRuleChange}
            type="select"
            options={[
              { value: "required", label: "Required" },
              { value: "email", label: "Email Format" },
              { value: "url", label: "URL Format" },
              { value: "phone", label: "Phone Number" },
              { value: "date", label: "Date Format" },
              { value: "number", label: "Number" },
              { value: "integer", label: "Integer" },
              { value: "boolean", label: "Boolean" },
              { value: "array", label: "Array" },
              { value: "object", label: "Object" },
              { value: "pattern", label: "Regex Pattern" },
              { value: "length", label: "Length Range" },
              { value: "range", label: "Value Range" },
              { value: "enum", label: "Allowed Values" },
            ]}
            helpText="Type of validation rule"
          />

          {state.rule === "pattern" && (
            <NodeInput
              label="Regex Pattern"
              value={state.pattern}
              onChange={handlePatternChange}
              placeholder="^[a-zA-Z0-9]+$"
              helpText="Regular expression pattern"
            />
          )}

          {state.rule === "length" && (
            <>
              <NodeInput
                label="Min Length"
                value={state.minLength}
                onChange={handleMinLengthChange}
                type="number"
                placeholder="1"
                helpText="Minimum length"
              />
              <NodeInput
                label="Max Length"
                value={state.maxLength}
                onChange={handleMaxLengthChange}
                type="number"
                placeholder="100"
                helpText="Maximum length"
              />
            </>
          )}

          {state.rule === "range" && (
            <>
              <NodeInput
                label="Min Value"
                value={state.minValue}
                onChange={handleMinValueChange}
                type="number"
                placeholder="0"
                helpText="Minimum value"
              />
              <NodeInput
                label="Max Value"
                value={state.maxValue}
                onChange={handleMaxValueChange}
                type="number"
                placeholder="100"
                helpText="Maximum value"
              />
            </>
          )}

          {state.rule === "enum" && (
            <NodeInput
              label="Allowed Values"
              value={state.allowedValues}
              onChange={handleAllowedValuesChange}
              placeholder="active,inactive,pending"
              helpText="Comma-separated list of allowed values"
            />
          )}
        </NodeSection>
      )}

      {state.validationType === "custom" && (
        <NodeSection title="Custom Validation">
          <NodeInput
            label="Validation Function"
            value={state.customValidation}
            onChange={handleCustomValidationChange}
            type="textarea"
            placeholder="data => data.age >= 18 && data.email.includes('@')"
            helpText="JavaScript function that returns true/false"
          />
        </NodeSection>
      )}

      <NodeSection title="Error Handling">
        <NodeInput
          label="Error Message"
          value={state.errorMessage}
          onChange={handleErrorMessageChange}
          placeholder="Validation failed"
          helpText="Message to show when validation fails"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="strictMode"
            checked={state.strictMode}
            onChange={handleStrictModeChange}
            className="m-0"
          />
          <label htmlFor="strictMode" className="text-xs text-neutral-700">
            Strict mode (fail on first error)
          </label>
        </div>
      </NodeSection>

      <NodeSection title="Advanced Options" collapsible>
        <NodeInput
          label="Validation Mode"
          value={state.validationMode || "all"}
          onChange={(e) => updateState("validationMode", e.target.value)}
          type="select"
          options={[
            { value: "all", label: "Validate All Fields" },
            { value: "first", label: "Stop on First Error" },
            { value: "collect", label: "Collect All Errors" },
          ]}
          helpText="How to handle multiple validation errors"
        />

        <NodeInput
          label="Error Format"
          value={state.errorFormat || "simple"}
          onChange={(e) => updateState("errorFormat", e.target.value)}
          type="select"
          options={[
            { value: "simple", label: "Simple Message" },
            { value: "detailed", label: "Detailed Errors" },
            { value: "json", label: "JSON Format" },
          ]}
          helpText="Format for error output"
        />
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Validation</NodeButton>
      </div>
    </BaseNode>
  );
};
