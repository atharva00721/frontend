// textNode.js

import React, { useMemo, useEffect, useRef, useState } from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";
import { Type, Info, AlertCircle } from "lucide-react";

export const TextNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      text: "{{input}}",
    },
    data
  );

  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Function to extract variables from text (e.g., "{{variableName}}")
  const extractVariables = (text) => {
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const variables = new Set();
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      variables.add(match[1]);
    }

    return Array.from(variables);
  };

  // Function to validate variable names
  const validateVariable = (variableName) => {
    const validVariableRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    return validVariableRegex.test(variableName);
  };

  // Extract variables from current text
  const variables = useMemo(() => {
    return extractVariables(state.text);
  }, [state.text]);

  // Validate variables
  const invalidVariables = useMemo(() => {
    const allMatches = state.text.match(/\{\{([^}]+)\}\}/g) || [];
    return allMatches
      .map((match) => match.slice(2, -2))
      .filter((variable) => !validateVariable(variable));
  }, [state.text]);

  // Create input handles for detected variables
  const inputHandles = useMemo(() => {
    return variables.map((variable) => ({
      id: variable,
      style: {
        top: `${(variables.indexOf(variable) + 1) * 25}%`,
      },
    }));
  }, [variables]);

  // Calculate dynamic dimensions based on text content
  const calculateDimensions = () => {
    if (!textareaRef.current) return { width: 200, height: 80 };

    const textarea = textareaRef.current;
    const text = state.text;
    const lines = text.split("\n").length;
    const maxLineLength = Math.max(
      ...text.split("\n").map((line) => line.length)
    );

    // Base dimensions
    let width = Math.max(200, Math.min(400, maxLineLength * 8 + 40));
    let height = Math.max(80, Math.min(300, lines * 20 + 60));

    // Add extra height for input handles
    if (inputHandles.length > 0) {
      height += inputHandles.length * 20;
    }

    // Add extra height for validation messages
    if (invalidVariables.length > 0) {
      height += 30;
    }

    return { width, height };
  };

  const dimensions = useMemo(() => {
    return calculateDimensions();
  }, [state.text, inputHandles.length, invalidVariables.length]);

  const handleTextChange = (e) => {
    updateState("text", e.target.value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [state.text]);

  // Function to render text with syntax highlighting
  const renderHighlightedText = (text) => {
    if (!isFocused) return text;

    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return parts.map((part, index) => {
      if (part.match(/^\{\{[^}]+\}\}$/)) {
        const variableName = part.slice(2, -2);
        const isValid = validateVariable(variableName);
        return (
          <span
            key={index}
            className={`px-1 rounded ${
              isValid
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
            title={
              isValid
                ? `Variable: ${variableName}`
                : `Invalid variable: ${variableName}`
            }
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Character count and statistics
  const characterCount = state.text.length;
  const wordCount = state.text.trim()
    ? state.text.trim().split(/\s+/).length
    : 0;
  const lineCount = state.text.split("\n").length;

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      description="Display or manipulate text content"
      icon={<Type size={16} />}
      inputHandles={inputHandles}
      outputHandles={[{ id: "output" }]}
      width={dimensions.width}
      height={dimensions.height}
      customStyle={{
        background: "white",
        borderColor: invalidVariables.length > 0 ? "#ef4444" : "#3b82f6",
        borderWidth: "2px",
        boxShadow: isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
      }}
    >
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-medium text-neutral-700 text-xs">
            Text Content
          </label>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>{characterCount} chars</span>
            <span>•</span>
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{lineCount} lines</span>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={state.text}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-3 py-2 border border-neutral-300 rounded-md text-xs bg-white text-neutral-900 transition-all duration-150 w-full box-border resize-none min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter text content... Use {{variableName}} for variables"
            rows={Math.max(3, state.text.split("\n").length)}
          />

          {/* Syntax highlighting overlay (visible when focused) */}
          {isFocused && (
            <div
              className="absolute inset-0 px-3 py-2 pointer-events-none text-xs whitespace-pre-wrap overflow-hidden"
              style={{
                fontFamily: "inherit",
                lineHeight: "inherit",
                color: "transparent",
                caretColor: "transparent",
              }}
            >
              {renderHighlightedText(state.text)}
            </div>
          )}
        </div>

        {/* Variable information */}
        {variables.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
            <Info size={10} />
            <span>Variables: {variables.join(", ")}</span>
          </div>
        )}

        {/* Validation errors */}
        {invalidVariables.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
            <AlertCircle size={10} />
            <span>Invalid variables: {invalidVariables.join(", ")}</span>
          </div>
        )}

        {/* Help text */}
        <div className="text-xs text-neutral-500 italic">
          💡 Tip: Use {"{{variableName}}"} to create input connections. Variable
          names must start with a letter, underscore, or dollar sign.
        </div>
      </div>
    </BaseNode>
  );
};
