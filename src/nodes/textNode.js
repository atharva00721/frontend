// textNode.js

import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      text: "{{input}}",
    },
    data
  );

  const handleTextChange = (e) => {
    updateState("text", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      outputHandles={[{ id: "output" }]}
    >
      <NodeInput label="Text" value={state.text} onChange={handleTextChange} />
    </BaseNode>
  );
};
