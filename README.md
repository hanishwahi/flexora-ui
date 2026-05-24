# Flexora UI

Reusable React components with built-in styling.

## Install

```bash
npm install flexora-ui
```

## Button

The Button component works without installing Tailwind, Bootstrap, or any extra CSS package. Choose a `variant` and `size`, and Flexora UI applies the design automatically.

```tsx
import { Button } from "flexora-ui";

export function Example() {
    return (
        <Button
            name="Save changes"
            variant="primary"
            size="md"
            onClick={() => console.log("Saved")}
        />
    );
}
```

You can also use `children`, icons, `className`, and `style` when you need custom design control.

```tsx
<Button
    variant="outlined"
    startIcon={<span>+</span>}
    className="my-custom-button"
    style={{ borderRadius: 999 }}
>
    Create project
</Button>
```

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `name` | `string` | `"Click Me"` |
| `children` | `React.ReactNode` | - |
| `variant` | `"primary" \| "secondary" \| "danger" \| "success" \| "outlined" \| "ghost"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `startIcon` | `React.ReactNode` | - |
| `endIcon` | `React.ReactNode` | - |
| `fullWidth` | `boolean` | `false` |
| `className` | `string` | - |
| `style` | `React.CSSProperties` | - |

All native button props like `disabled`, `type`, `onClick`, and `aria-*` are supported.
