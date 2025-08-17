// BaseNode.js
// Base abstraction for all node types to reduce code duplication
//
// ENHANCED FEATURES:
// - Title with optional icon
// - Mini description below title
// - Minimize/expand functionality
// - Control buttons (minimize, settings, close)
// - Organized content sections
// - Enhanced input components with validation and help text
// - Collapsible sections
// - Action buttons
//
// USAGE EXAMPLE:
// <BaseNode
//   id="my-node"
//   title="My Node"
//   description="This node does something amazing"
//   icon={<MyIcon />}
//   outputHandles={[{ id: "output" }]}
//   width={300}
// >
//   <NodeSection title="Configuration">
//     <NodeInput
//       label="Name"
//       value={name}
//       onChange={setName}
//       required
//       helpText="Enter a unique name"
//     />
//   </NodeSection>
//
//   <NodeSection title="Advanced" collapsible>
//     <NodeInput
//       label="Type"
//       value={type}
//       onChange={setType}
//       type="select"
//       options={[
//         { value: "text", label: "Text" },
//         { value: "number", label: "Number" }
//       ]}
//     />
//   </NodeSection>
//
//   <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "flex-end" }}>
//     <NodeButton variant="secondary" onClick={reset}>Reset</NodeButton>
//     <NodeButton variant="primary" onClick={save}>Save</NodeButton>
//   </div>
// </BaseNode>

import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  data,
  title,
  description,
  icon,
  children,
  inputHandles = [],
  outputHandles = [],
  width = 200,
  height = 80,
  minHeight = 80,
  customStyle = {},
  showMinimize = true,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const baseStyle = {
    width,
    minHeight: isMinimized ? 60 : Math.max(height, minHeight),
    border: "1px solid var(--neutral-200)",
    backgroundColor: "white",
    borderRadius: "var(--radius-lg)",
    padding: isMinimized ? "var(--space-3)" : "var(--space-4)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxShadow: "var(--shadow-md)",
    transition: "all var(--transition-normal)",
    ...customStyle,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: isMinimized ? 0 : "var(--space-3)",
    gap: "var(--space-2)",
  };

  const titleSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-1)",
    flex: 1,
  };

  const titleStyle = {
    fontWeight: "var(--font-semibold)",
    fontSize: "var(--text-sm)",
    color: "var(--neutral-900)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    margin: 0,
  };

  const descriptionStyle = {
    fontSize: "var(--text-xs)",
    color: "var(--neutral-600)",
    lineHeight: "1.4",
    margin: 0,
  };

  const controlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
  };

  const controlButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "var(--space-1)",
    borderRadius: "var(--radius-sm)",
    color: "var(--neutral-500)",
    fontSize: "var(--text-xs)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all var(--transition-fast)",
    minWidth: "20px",
    minHeight: "20px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
    overflow: "hidden",
    transition: "all var(--transition-normal)",
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Simple icon components
  const MinimizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14l5-5 5 5z" />
    </svg>
  );

  const ExpandIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );

  return (
    <div style={baseStyle}>
      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
        />
      ))}

      {/* Header with Title, Description, and Controls */}
      <div style={headerStyle}>
        <div style={titleSectionStyle}>
          <div style={titleStyle}>
            {icon && <span>{icon}</span>}
            {typeof title === "string" ? title : title}
          </div>
          {!isMinimized && description && (
            <p style={descriptionStyle}>{description}</p>
          )}
        </div>

        <div style={controlsStyle}>
          {showMinimize && (
            <button
              style={controlButtonStyle}
              onClick={handleMinimize}
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <ExpandIcon /> : <MinimizeIcon />}
            </button>
          )}
          <button style={controlButtonStyle} title="Settings">
            <SettingsIcon />
          </button>
          <button style={controlButtonStyle} title="Close">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Content - Hidden when minimized */}
      {!isMinimized && <div style={contentStyle}>{children}</div>}

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};

// Helper hook for common state management patterns
export const useNodeState = (initialState, data) => {
  const [state, setState] = React.useState(() => {
    const mergedState = {};
    Object.keys(initialState).forEach((key) => {
      mergedState[key] = data?.[key] || initialState[key];
    });
    return mergedState;
  });

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return [state, updateState];
};

// Common input components
export const NodeInput = ({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder,
  required = false,
  helpText,
}) => {
  const inputStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-1)",
    fontSize: "var(--text-xs)",
  };

  const labelStyle = {
    fontWeight: "var(--font-medium)",
    color: "var(--neutral-700)",
    fontSize: "var(--text-xs)",
    marginBottom: "var(--space-1)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
  };

  const inputElementStyle = {
    padding: "var(--space-2) var(--space-3)",
    border: "1px solid var(--neutral-300)",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-xs)",
    backgroundColor: "white",
    color: "var(--neutral-900)",
    transition: "all var(--transition-fast)",
    width: "100%",
    boxSizing: "border-box",
  };

  const helpTextStyle = {
    fontSize: "var(--text-xs)",
    color: "var(--neutral-500)",
    fontStyle: "italic",
  };

  const requiredStyle = {
    color: "var(--error-500)",
    fontSize: "var(--text-xs)",
  };

  return (
    <div style={inputStyle}>
      <label style={labelStyle}>
        {label}
        {required && <span style={requiredStyle}>*</span>}
        {helpText && (
          <span title={helpText} style={{ cursor: "help" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
          </span>
        )}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          style={inputElementStyle}
          required={required}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          style={{
            ...inputElementStyle,
            resize: "vertical",
            minHeight: "60px",
          }}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          style={inputElementStyle}
          placeholder={placeholder}
          required={required}
        />
      )}
      {helpText && <div style={helpTextStyle}>{helpText}</div>}
    </div>
  );
};

// Additional helper components
export const NodeSection = ({ title, children, collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sectionStyle = {
    border: "1px solid var(--neutral-200)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    marginBottom: "var(--space-3)",
  };

  const headerStyle = {
    padding: "var(--space-2) var(--space-3)",
    backgroundColor: "var(--neutral-50)",
    borderBottom: "1px solid var(--neutral-200)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: collapsible ? "pointer" : "default",
  };

  const titleStyle = {
    fontWeight: "var(--font-medium)",
    fontSize: "var(--text-xs)",
    color: "var(--neutral-700)",
    margin: 0,
  };

  const contentStyle = {
    padding: "var(--space-3)",
    display: isCollapsed ? "none" : "block",
  };

  const toggleIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{
        transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
        transition: "transform var(--transition-fast)",
      }}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  return (
    <div style={sectionStyle}>
      <div
        style={headerStyle}
        onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
      >
        <h4 style={titleStyle}>{title}</h4>
        {collapsible && toggleIcon()}
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export const NodeButton = ({
  children,
  onClick,
  variant = "primary",
  size = "sm",
  disabled = false,
}) => {
  const buttonStyle = {
    padding:
      size === "sm"
        ? "var(--space-1) var(--space-2)"
        : "var(--space-2) var(--space-3)",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--font-medium)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all var(--transition-fast)",
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-1)",
    ...(variant === "primary" && {
      backgroundColor: "var(--primary-500)",
      color: "white",
      "&:hover": !disabled && {
        backgroundColor: "var(--primary-600)",
      },
    }),
    ...(variant === "secondary" && {
      backgroundColor: "var(--neutral-100)",
      color: "var(--neutral-700)",
      border: "1px solid var(--neutral-300)",
      "&:hover": !disabled && {
        backgroundColor: "var(--neutral-200)",
      },
    }),
    ...(variant === "danger" && {
      backgroundColor: "var(--error-500)",
      color: "white",
      "&:hover": !disabled && {
        backgroundColor: "var(--error-600)",
      },
    }),
    ...(disabled && {
      opacity: 0.5,
    }),
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const NodeDivider = () => (
  <div
    style={{
      height: "1px",
      backgroundColor: "var(--neutral-200)",
      margin: "var(--space-3) 0",
    }}
  />
);
