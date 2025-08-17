// llmNode.js

import React from "react";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: 'system', style: { top: `${100 / 3}%` } },
        { id: 'prompt', style: { top: `${200 / 3}%` } }
      ]}
      outputHandles={[{ id: 'response' }]}
    >
      <div style={{ fontSize: '11px', color: '#666' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
};
