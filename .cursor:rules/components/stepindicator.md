---
title: Step Indicator
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { stepIndicatorStories } from './StepIndicator';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import StepIndicatorHorizontalProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/StepIndicator/Horizontal.json';
import StepIndicatorVerticalProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/StepIndicator/Vertical.json';

{

<Description>
  The Step Indicator is designed to show progress through a series of steps. It
  highlights the current step, marks completed steps, and gives a sense of how
  many are remaining.
</Description>
}

<ComponentInformation
  title="StepIndicator"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?m=auto&node-id=5784-20667&t=h62jbtVZaqL8sQLp-1"
/>

## Code

### Import

```js
import { StepIndicator } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={stepIndicatorStories} />

### Props

<PropTable docs={StepIndicatorHorizontalProps} />

<PropTable docs={StepIndicatorVerticalProps} />

## General Guidance

The component is decorative and not clickable or interactive. It should be placed between “Back” and “Next” call-to-action buttons to visually reinforce pagination.

![Step Indicator in motion](./images/step-indicator.png)

### Anatomy

![Anatomy of the Step Indicator](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Active step"
  description="The extended black pill shape represents the step that the user is currently viewing."
/>

<AnatomyListItem
  number="2"
  title="Completed step"
  description="The black outlined white circle represents the step(s) that the user has already seen or completed."
/>

<AnatomyListItem
  number="3"
  title="Future step"
  description="The filled gray circle represents the step(s) that the user has not yet seen or completed."
/>

### Do use Step Indicator for

- Decorative pagination between steps
- Setting user expectations for how many steps are ahead

### Do not use Step Indicator for

- Replacing forward or back actions

### Related Components

{

<Box display="grid" gap={2} sx={{ gridTemplateColumns: '1fr 1fr' }}>
  <RelatedLink
    name="Dialog"
    description="@sqs/rosetta-compositions"
    url="/docs/components/compositions/Dialogs/dialog/"
  />
</Box>
}
