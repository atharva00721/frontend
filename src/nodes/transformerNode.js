// transformerNode.js
// Demonstrates text transformation capabilities

import React from 'react';
import { BaseNode, useNodeState, NodeInput } from './BaseNode';

export const TransformerNode = ({ id, data }) => {
  const [state, updateState] = useNodeState({
    transformType: 'uppercase',
    customPattern: '',
    replacement: ''
  }, data);

  const handleTransformTypeChange = (e) => {
    updateState('transformType', e.target.value);
  };

  const handleCustomPatternChange = (e) => {
    updateState('customPattern', e.target.value);
  };

  const handleReplacementChange = (e) => {
    updateState('replacement', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transformer"
      inputHandles={[{ id: 'input' }]}
      outputHandles={[{ id: 'output' }]}
      customStyle={{
        backgroundColor: '#f0fff0',
        borderColor: '#32cd32',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <NodeInput
        label="Transform Type"
        value={state.transformType}
        onChange={handleTransformTypeChange}
        type="select"
        options={[
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'capitalize', label: 'Capitalize' },
          { value: 'trim', label: 'Trim whitespace' },
          { value: 'replace', label: 'Replace pattern' },
          { value: 'reverse', label: 'Reverse text' }
        ]}
      />
      {state.transformType === 'replace' && (
        <>
          <NodeInput
            label="Pattern"
            value={state.customPattern}
            onChange={handleCustomPatternChange}
            placeholder="Enter regex pattern"
          />
          <NodeInput
            label="Replacement"
            value={state.replacement}
            onChange={handleReplacementChange}
            placeholder="Enter replacement text"
          />
        </>
      )}
    </BaseNode>
  );
};
