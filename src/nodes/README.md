# Node Abstraction System

This directory contains a flexible node abstraction system that reduces code duplication and makes it easy to create new node types for the pipeline UI.

## Overview

The abstraction consists of three main components:

1. **BaseNode** - A reusable component that handles common node functionality
2. **useNodeState** - A custom hook for managing node state
3. **NodeInput** - A reusable input component for consistent UI

## BaseNode Component

The `BaseNode` component provides:

- Consistent styling and layout
- Automatic handle management (input/output connections)
- Flexible content area for custom node logic
- Flexible height with minimum height constraint
- Customizable dimensions and styling

### Props

```javascript
{
  id,                    // Node ID (required)
  data,                  // Node data (required)
  title,                 // Node title (required)
  children,              // Node content (required)
  inputHandles: [],      // Array of input handle configurations
  outputHandles: [],     // Array of output handle configurations
  width: 200,           // Node width (optional)
  height: 80,           // Node height (optional, used as minHeight)
  minHeight: 80,        // Minimum node height (optional)
  customStyle: {}       // Additional CSS styles (optional)
}
```

### Handle Configuration

```javascript
{
  id: 'handleName',           // Handle identifier
  style: { top: '50%' }       // Custom positioning (optional)
}
```

## useNodeState Hook

A custom hook that simplifies state management for nodes:

```javascript
const [state, updateState] = useNodeState(
  {
    field1: "defaultValue1",
    field2: "defaultValue2",
  },
  data
);
```

### Parameters

- `initialState` - Object with default values
- `data` - Node data from props

### Returns

- `state` - Current state object
- `updateState` - Function to update state: `updateState('fieldName', newValue)`

## NodeInput Component

A reusable input component with consistent styling:

```javascript
<NodeInput
  label="Field Label"
  value={state.fieldName}
  onChange={handleChange}
  type="text" // "text", "number", "select"
  options={[]} // For select inputs
  placeholder="..." // Optional placeholder
/>
```

## Creating a New Node

Here's a step-by-step guide to create a new node:

### 1. Create the Node File

Create a new file in the `src/nodes/` directory:

```javascript
// myCustomNode.js
import React from "react";
import { BaseNode, useNodeState, NodeInput } from "./BaseNode";

export const MyCustomNode = ({ id, data }) => {
  const [state, updateState] = useNodeState(
    {
      myField: "defaultValue",
    },
    data
  );

  const handleChange = (e) => {
    updateState("myField", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="My Custom Node"
      inputHandles={[{ id: "input" }]}
      outputHandles={[{ id: "output" }]}
    >
      <NodeInput
        label="My Field"
        value={state.myField}
        onChange={handleChange}
      />
    </BaseNode>
  );
};
```

### 2. Register the Node

Add the import and registration in `src/ui.js`:

```javascript
import { MyCustomNode } from "./nodes/myCustomNode";

const nodeTypes = {
  // ... existing nodes
  myCustom: MyCustomNode,
};
```

### 3. Add to Toolbar

Add the node to the toolbar in `src/toolbar.js`:

```javascript
<DraggableNode type="myCustom" label="My Custom" />
```

## Example Nodes

The system includes several example nodes that demonstrate different capabilities:

### Web Scraper Node

- **Purpose**: Fetch content from URLs
- **Features**: Configurable HTTP methods, custom headers, timeout settings
- **Demonstrates**: URL input, HTTP configuration, multiple outputs

### Filter Node

- **Purpose**: Conditional filtering
- **Features**: Multiple output handles, checkbox inputs
- **Demonstrates**: Conditional rendering, multiple outputs

### Transformer Node

- **Purpose**: Text transformation
- **Features**: Dynamic input fields, conditional UI
- **Demonstrates**: Conditional input rendering

### Aggregator Node

- **Purpose**: Data aggregation
- **Features**: Dynamic handle generation, flexible height with minimum constraint
- **Demonstrates**: Dynamic node sizing, multiple inputs, flexible height

### Condition Node

- **Purpose**: Conditional branching
- **Features**: Multiple output handles, custom expressions
- **Demonstrates**: Branching logic, custom styling

### Flexible Node

- **Purpose**: Demonstrates flexible height capabilities
- **Features**: Dynamic content, conditional rendering, variable field count
- **Demonstrates**: Flexible height with minimum constraint, dynamic UI

## Benefits of the Abstraction

1. **Reduced Code Duplication**: Common functionality is centralized
2. **Consistent Styling**: All nodes have uniform appearance
3. **Easy Maintenance**: Changes to common functionality apply to all nodes
4. **Rapid Development**: New nodes can be created quickly
5. **Flexible**: Supports various node types and configurations
6. **Adaptive Layout**: Nodes can grow with content while maintaining minimum size

## Best Practices

1. **Use the abstraction**: Always extend `BaseNode` for new nodes
2. **Leverage hooks**: Use `useNodeState` for state management
3. **Consistent naming**: Use descriptive handle IDs
4. **Custom styling**: Use `customStyle` prop for node-specific styling
5. **Flexible height**: Use `minHeight` for nodes with dynamic content
6. **Documentation**: Add comments explaining complex node logic

## Migration from Old Nodes

The existing nodes have been refactored to use the new abstraction:

- **Before**: ~30-40 lines per node with lots of duplication
- **After**: ~20-25 lines per node with clean, maintainable code

The functionality remains identical, but the code is now more maintainable and extensible.
