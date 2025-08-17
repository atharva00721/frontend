// draggableNode.js

import {
  TextCursorInput,
  Brain,
  ArrowLeft,
  Type,
  ArrowUpDown,
  GitBranch,
  FileText,
  Globe,
  CheckCircle,
} from "lucide-react";

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "100px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "#f1f1f1",
        border: "1px solid var(--neutral-200)",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "var(--shadow-sm)",
        transition: "all var(--transition-fast)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-1px)";
        e.target.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "var(--shadow-sm)";
      }}
      draggable
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-1)",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          {getNodeIcon(type)}
        </div>
        <span
          style={{
            color: "var(--neutral-700)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-medium)",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// Helper function to get node icons
const getNodeIcon = (type) => {
  const icons = {
    customInput: <TextCursorInput className="size-4 text-black" />,
    llm: <Brain className="size-4 text-black" />,
    customOutput: <ArrowLeft className="size-4 text-black" />,
    text: <Type className="size-4 text-black" />,
    dataTransformer: <ArrowUpDown className="size-4 text-black" />,
    conditional: <GitBranch className="size-4 text-black" />,
    fileProcessor: <FileText className="size-4 text-black" />,
    apiConnector: <Globe className="size-4 text-black" />,
    dataValidator: <CheckCircle className="size-4 text-black" />,
    webScraper: <Globe className="size-4 text-black" />,
  };
  return icons[type] || "•";
};
