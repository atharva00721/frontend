// fileProcessorNode.js
// File processing operations node

import React from "react";
import {
  BaseNode,
  useNodeState,
  NodeInput,
  NodeSection,
  NodeButton,
} from "./BaseNode";
import { FileText } from "lucide-react";

export const FileProcessorNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      operation: "read",
      filePath: "",
      fileType: "text",
      encoding: "utf8",
      outputFormat: "json",
      delimiter: ",",
      hasHeader: true,
      compression: "none",
      outputPath: "",
      appendMode: false,
    },
    data
  );

  const handleOperationChange = (e) => {
    updateState("operation", e.target.value);
  };

  const handleFilePathChange = (e) => {
    updateState("filePath", e.target.value);
  };

  const handleFileTypeChange = (e) => {
    updateState("fileType", e.target.value);
  };

  const handleEncodingChange = (e) => {
    updateState("encoding", e.target.value);
  };

  const handleOutputFormatChange = (e) => {
    updateState("outputFormat", e.target.value);
  };

  const handleDelimiterChange = (e) => {
    updateState("delimiter", e.target.value);
  };

  const handleHasHeaderChange = (e) => {
    updateState("hasHeader", e.target.checked);
  };

  const handleCompressionChange = (e) => {
    updateState("compression", e.target.value);
  };

  const handleOutputPathChange = (e) => {
    updateState("outputPath", e.target.value);
  };

  const handleAppendModeChange = (e) => {
    updateState("appendMode", e.target.checked);
  };

  const resetToDefaults = () => {
    updateState("operation", "read");
    updateState("filePath", "");
    updateState("fileType", "text");
    updateState("encoding", "utf8");
    updateState("outputFormat", "json");
    updateState("delimiter", ",");
    updateState("hasHeader", true);
    updateState("compression", "none");
    updateState("outputPath", "");
    updateState("appendMode", false);
  };

  const getOperationDescription = () => {
    const descriptions = {
      read: "Read and parse file content",
      write: "Write data to a file",
      append: "Append data to existing file",
      copy: "Copy file to new location",
      move: "Move file to new location",
      delete: "Delete file from system",
      compress: "Compress file using specified algorithm",
      extract: "Extract compressed file",
      convert: "Convert file between formats",
    };
    return descriptions[state.operation] || "";
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="File Processor"
      description={getOperationDescription()}
      icon={<FileText size={16} />}
      inputHandles={[
        { id: "data", style: { top: "25%" } },
        { id: "trigger", style: { top: "75%" } },
      ]}
      outputHandles={[
        { id: "content", style: { top: "25%" } },
        { id: "status", style: { top: "75%" } },
      ]}
      width={320}
      customStyle={{
        background: "linear-gradient(to bottom right, #f0fdf4, #eff6ff)",
        borderColor: "#86efac",
      }}
    >
      <NodeSection title="Operation">
        <NodeInput
          label="Operation"
          value={state.operation}
          onChange={handleOperationChange}
          type="select"
          options={[
            { value: "read", label: "Read File" },
            { value: "write", label: "Write File" },
            { value: "append", label: "Append to File" },
            { value: "copy", label: "Copy File" },
            { value: "move", label: "Move File" },
            { value: "delete", label: "Delete File" },
            { value: "compress", label: "Compress File" },
            { value: "extract", label: "Extract File" },
            { value: "convert", label: "Convert Format" },
          ]}
          helpText="Select the file operation"
        />
      </NodeSection>

      <NodeSection title="File Configuration">
        <NodeInput
          label="File Path"
          value={state.filePath}
          onChange={handleFilePathChange}
          placeholder="/path/to/file.txt"
          helpText="Path to the file"
          required
        />

        <NodeInput
          label="File Type"
          value={state.fileType}
          onChange={handleFileTypeChange}
          type="select"
          options={[
            { value: "text", label: "Text" },
            { value: "json", label: "JSON" },
            { value: "csv", label: "CSV" },
            { value: "xml", label: "XML" },
            { value: "yaml", label: "YAML" },
            { value: "binary", label: "Binary" },
            { value: "image", label: "Image" },
            { value: "pdf", label: "PDF" },
          ]}
          helpText="Type of file being processed"
        />

        <NodeInput
          label="Encoding"
          value={state.encoding}
          onChange={handleEncodingChange}
          type="select"
          options={[
            { value: "utf8", label: "UTF-8" },
            { value: "ascii", label: "ASCII" },
            { value: "latin1", label: "Latin-1" },
            { value: "base64", label: "Base64" },
          ]}
          helpText="File encoding (for text files)"
        />
      </NodeSection>

      {(state.operation === "read" || state.operation === "convert") && (
        <NodeSection title="Parsing Options">
          <NodeInput
            label="Output Format"
            value={state.outputFormat}
            onChange={handleOutputFormatChange}
            type="select"
            options={[
              { value: "json", label: "JSON" },
              { value: "csv", label: "CSV" },
              { value: "xml", label: "XML" },
              { value: "yaml", label: "YAML" },
              { value: "text", label: "Plain Text" },
              { value: "array", label: "Array" },
              { value: "object", label: "Object" },
            ]}
            helpText="Format for output data"
          />

          {state.fileType === "csv" && (
            <>
              <NodeInput
                label="Delimiter"
                value={state.delimiter}
                onChange={handleDelimiterChange}
                placeholder=","
                helpText="CSV field delimiter"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasHeader"
                  checked={state.hasHeader}
                  onChange={handleHasHeaderChange}
                  className="m-0"
                />
                <label htmlFor="hasHeader" className="text-xs text-neutral-700">
                  Has header row
                </label>
              </div>
            </>
          )}
        </NodeSection>
      )}

      {(state.operation === "write" || state.operation === "append") && (
        <NodeSection title="Output Configuration">
          <NodeInput
            label="Output Path"
            value={state.outputPath}
            onChange={handleOutputPathChange}
            placeholder="/path/to/output.txt"
            helpText="Path for output file"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="appendMode"
              checked={state.appendMode}
              onChange={handleAppendModeChange}
              className="m-0"
            />
            <label htmlFor="appendMode" className="text-xs text-neutral-700">
              Append mode (don't overwrite)
            </label>
          </div>
        </NodeSection>
      )}

      {(state.operation === "compress" || state.operation === "extract") && (
        <NodeSection title="Compression Options">
          <NodeInput
            label="Compression Type"
            value={state.compression}
            onChange={handleCompressionChange}
            type="select"
            options={[
              { value: "none", label: "None" },
              { value: "gzip", label: "Gzip" },
              { value: "zip", label: "ZIP" },
              { value: "tar", label: "TAR" },
              { value: "7z", label: "7-Zip" },
            ]}
            helpText="Compression algorithm"
          />
        </NodeSection>
      )}

      <NodeSection title="Advanced Options" collapsible>
        <NodeInput
          label="Error Handling"
          value={state.errorHandling || "fail"}
          onChange={(e) => updateState("errorHandling", e.target.value)}
          type="select"
          options={[
            { value: "fail", label: "Fail on Error" },
            { value: "skip", label: "Skip and Continue" },
            { value: "retry", label: "Retry Operation" },
          ]}
          helpText="How to handle file operation errors"
        />

        <NodeInput
          label="Timeout (ms)"
          value={state.timeout || "30000"}
          onChange={(e) => updateState("timeout", e.target.value)}
          type="number"
          helpText="Operation timeout in milliseconds"
        />
      </NodeSection>

      <div className="flex gap-2 justify-end">
        <NodeButton variant="secondary" onClick={resetToDefaults}>
          Reset
        </NodeButton>
        <NodeButton variant="primary">Test Operation</NodeButton>
      </div>
    </BaseNode>
  );
};
