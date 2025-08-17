// outputNode.js

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [state, updateState] = useNodeState({
    outputName: id.replace("customOutput-", "output_"),
    outputType: "Text"
  }, data);

  const handleNameChange = (e) => {
    updateState('outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    updateState('outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputHandles={[{ id: 'value' }]}
    >
      <NodeInput
        label="Name"
        value={state.outputName}
        onChange={handleNameChange}
      />
      <NodeInput
        label="Type"
        value={state.outputType}
        onChange={handleTypeChange}
        type="select"
        options={[
          { value: "Text", label: "Text" },
          { value: "File", label: "Image" }
        ]}
      />
    </BaseNode>
  );
};
