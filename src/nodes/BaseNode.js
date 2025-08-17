import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { ChevronDown, ChevronUp, Settings, X, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";

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

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={cn(
        "border border-neutral-200 bg-white rounded-lg shadow-md transition-all duration-200 relative flex flex-col p-4",
        typeof customStyle === "string" ? customStyle : ""
      )}
      style={{
        width,
        minHeight: isMinimized ? 60 : Math.max(height, minHeight),
        ...(typeof customStyle === "object" ? customStyle : {}),
      }}
    >
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
      <div
        className={cn(
          "flex items-start justify-between gap-2",
          !isMinimized && "mb-3"
        )}
      >
        <div className="flex flex-col gap-1 flex-1">
          <div className="font-semibold text-sm text-neutral-900 flex items-center gap-2 m-0">
            {icon && <span>{icon}</span>}
            {typeof title === "string" ? title : title}
          </div>
          {!isMinimized && description && (
            <p className="text-xs text-neutral-600 leading-relaxed m-0">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {showMinimize && (
            <button
              className="bg-transparent border-none cursor-pointer p-1 rounded text-neutral-500 text-xs flex items-center justify-center transition-all duration-150 min-w-5 min-h-5 hover:bg-neutral-100"
              onClick={handleMinimize}
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>
          )}
          <button
            className="bg-transparent border-none cursor-pointer p-1 rounded text-neutral-500 text-xs flex items-center justify-center transition-all duration-150 min-w-5 min-h-5 hover:bg-neutral-100"
            title="Settings"
          >
            <Settings size={12} />
          </button>
          <button
            className="bg-transparent border-none cursor-pointer p-1 rounded text-neutral-500 text-xs flex items-center justify-center transition-all duration-150 min-w-5 min-h-5 hover:bg-neutral-100"
            title="Close"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Content - Hidden when minimized */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col gap-3  transition-all duration-200">
          {children}
        </div>
      )}

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.style?.top || `${(index + 1) * 25}%`,
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};

// Helper hook for common state management patterns
export const useNodeState = (initialState, data) => {
  const [state, setState] = useState(() => {
    const mergedState = {};
    Object.keys(initialState).forEach((key) => {
      mergedState[key] =
        data && data[key] !== undefined ? data[key] : initialState[key];
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
  return (
    <div className="flex flex-col gap-1 text-xs">
      <label className="font-medium text-neutral-700 text-xs mb-1 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-xs">*</span>}
        {helpText && (
          <span title={helpText} className="cursor-help">
            <HelpCircle size={10} />
          </span>
        )}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="px-3 py-2 border border-neutral-300 rounded-md text-xs bg-white text-neutral-900 transition-all duration-150 w-full box-border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="px-3 py-2 border border-neutral-300 rounded-md text-xs bg-white text-neutral-900 transition-all duration-150 w-full box-border resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="px-3 py-2 border border-neutral-300 rounded-md text-xs bg-white text-neutral-900 transition-all duration-150 w-full box-border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          required={required}
        />
      )}
      {helpText && (
        <div className="text-xs text-neutral-500 italic">{helpText}</div>
      )}
    </div>
  );
};

// Additional helper components
export const NodeSection = ({ title, children, collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleIcon = () => (
    <ChevronDown
      size={12}
      className={cn(
        "transition-transform duration-150",
        isCollapsed ? "-rotate-90" : "rotate-0"
      )}
    />
  );

  return (
    <div className="border border-neutral-200 rounded-md overflow-hidden mb-3">
      <div
        className={cn(
          "px-3 py-2 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between",
          collapsible && "cursor-pointer"
        )}
        onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
      >
        <h4 className="font-medium text-xs text-neutral-700 m-0">{title}</h4>
        {collapsible && toggleIcon()}
      </div>
      <div className={cn("p-3", isCollapsed && "hidden")}>{children}</div>
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
  const baseClasses =
    "border-none rounded-md text-xs font-medium cursor-pointer transition-all duration-150 inline-flex items-center gap-1";

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50",
    secondary:
      "bg-neutral-100 text-neutral-700 border border-neutral-300 hover:bg-neutral-200 disabled:opacity-50",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
  };

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-2",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const NodeDivider = () => <div className="h-px bg-neutral-200 my-3" />;
