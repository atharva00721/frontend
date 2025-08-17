// filterNode.js
// Demonstrates conditional logic and different input types

import React from 'react';
import { BaseNode, useNodeState, NodeInput } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [state, updateState] = useNodeState({
    condition: 'contains',
    filterValue: '',
    caseSensitive: false
  }, data);

  const handleConditionChange = (e) => {
    updateState('condition', e.target.value);
  };

  const handleFilterValueChange = (e) => {
    updateState('filterValue', e.target.value);
  };

  const handleCaseSensitiveChange = (e) => {
    updateState('caseSensitive', e.target.checked);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputHandles={[{ id: 'input' }]}
      outputHandles={[
        { id: 'matched' },
        { id: 'unmatched' }
      ]}
      customStyle={{
        backgroundColor: '#fff5ee',
        borderColor: '#ff6347'
      }}
    >
      <NodeInput
        label="Condition"
        value={state.condition}
        onChange={handleConditionChange}
        type="select"
        options={[
          { value: 'contains', label: 'Contains' },
          { value: 'starts_with', label: 'Starts with' },
          { value: 'ends_with', label: 'Ends with' },
          { value: 'equals', label: 'Equals' },
          { value: 'regex', label: 'Regex' }
        ]}
      />
      <NodeInput
        label="Filter Value"
        value={state.filterValue}
        onChange={handleFilterValueChange}
      />
      <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <input
          type="checkbox"
          checked={state.caseSensitive}
          onChange={handleCaseSensitiveChange}
          style={{ width: '12px', height: '12px' }}
        />
        <label style={{ fontSize: '10px', color: '#666' }}>Case sensitive</label>
      </div>
    </BaseNode>
  );
};
