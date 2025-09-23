# Debug Guide: "Text strings must be rendered within a <Text> component"

## Step-by-step debugging process:

### 1. Check Navigation Parameters
The error often occurs when navigation parameters are missing or malformed:

```javascript
// In PercursoDetalhes.js, ensure percurso exists
const { percurso } = route.params || {};
if (!percurso) {
  return (
    <View style={styles.container}>
      <Text>Error: No route data found</Text>
    </View>
  );
}
```

### 2. Check Dynamic Content Rendering
Look for variables that might be undefined:

```javascript
// Instead of:
<Text>{someVariable}</Text>

// Use:
<Text>{someVariable || 'Default text'}</Text>
// Or:
<Text>{someVariable ? someVariable : 'Default text'}</Text>
```

### 3. Check Conditional Rendering
Ensure boolean conditions don't render strings directly:

```javascript
// Wrong:
{condition && 'Some text'}

// Correct:
{condition && <Text>Some text</Text>}
```

### 4. Check Array Mapping
Ensure mapped items are properly wrapped:

```javascript
// Make sure each mapped item returns JSX
{items.map(item => (
  <Text key={item.id}>{item.name}</Text>
))}
```

### 5. Most likely culprits in this codebase:
- PercursoDetalhes.js when navigation params are missing
- Activity.js when API data has unexpected format
- Any component receiving navigation params

### 6. Quick fixes to try:
Add null checks and default values to prevent undefined rendering.