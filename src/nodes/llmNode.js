// llmNode.js

import React from "react";
import { BaseNode } from "./BaseNode";
import { Brain } from "lucide-react";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      description="Large Language Model processing"
      icon={<Brain size={16} />}
      inputHandles={[
        { id: "system", style: { top: `${100 / 3}%` } },
        { id: "prompt", style: { top: `${200 / 3}%` } },
      ]}
      outputHandles={[{ id: "response" }]}
    >
      <div className="text-xs text-neutral-500">This is a LLM.</div>
    </BaseNode>
  );
};
