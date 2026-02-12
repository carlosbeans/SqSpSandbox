---
title: Badge
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Text, Flex } from '@sqs/rosetta-primitives';
import { Checkmark } from '@sqs/rosetta-icons';
import { Token } from '@site/src/components/Markdown/Token';
import BadgePropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Badge/Badge';
import { badgeStories } from './Badge';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';

{

<Description>
Badge is a simple component for marking UI with status labels like 'New', 'Beta', or 'Recommended'. It provides a consistent way to highlight features or content with small, styled text labels.
</Description>
}

<ComponentInformation title="Badge" componentPackage="@sqs/rosetta-elements" />

## Code

### Import

```js
import { Badge } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={badgeStories} />

### Props

<PropTable docs={BadgePropDocs} />

## Guidance

### When to use Badge

Use Badge to mark UI elements with status or descriptive information.

- **New features** - Use `appearance="blue"` specifically for "New" labels
- **Beta features** - Use `appearance="default"` for "Beta" or other general status
- **Recommendations** - Use `appearance="default"` for recommendations
- **Pro features** - Use `appearance="default"` for "Pro" or premium indicators

### Appearance variants

Badge provides two appearance variants optimized for different use cases:

| Variant | Use Case | Border Color | Text Color |
|---------|----------|------------|------------|
| `blue` | "New" labels only | `blue.300` | `blue.300` |
| `default` | General purpose badges | `gray.100` | `gray.100` |

Use the `color` prop to pass a custom color.

### Placement

Badge should be positioned to clearly associate with the content it's describing:

1. **Next to titles** - Place alongside and center aligned with headings with proper spacing
2. **Above content** - Position above the content when inline placement doesn't work
3. **Corner placement** - Use as a last resort when other placements don't make sense

### Badge Timing Requirements

Badges should follow these timing requirements:

- **When Beta**: Remove when not beta
- **When New**: Must have scheduled removal in timely manner
- **When Recommended**: Must be based on user data or context
