## Context

Rosetta’s spacing system is an important way to ensure visual consistency.

Rosetta is fundamentally based on an 11px—or 22px—spacing system, which was initially created for the now defunct Blog app. It was derived from the 44pt minimum recommended touch area for iOS. 22px is used as Rosetta's body text line height, icon size, and the spacing between most UI elements.

To alter the style of a Rosetta component, use theme variables instead of Rosetta Tokens. This is because Rosetta components **do not** use Rosetta Tokens directly, they always resolve styles from a Theme.

## Tokens

```json
{
  "0": "0px",
  "1": "6px",
  "2": "11px",
  "3": "16px",
  "4": "22px",
  "5": "27px",
  "6": "33px",
  "7": "38px",
  "8": "44px",
  "9": "49px",
  "10": "55px"
}
```

## Usage

In a Rosetta component you can use spacing tokens like:

```jsx
<Flex gap={1} my={2}>
```

Alternatively for a custom component you can also style components like:

```jsx
import { borders, colors, space, radii } from '@sqs/rosetta-tokens';

<MyComponent
  style={{
    padding: space[3],
  }}
/>;
```