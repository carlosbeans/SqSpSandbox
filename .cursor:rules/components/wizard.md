---
title: Wizard
---

import { Text, Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { Token } from '@site/src/components/Markdown/Token';
import { wizardStories } from './Wizard';
import WizardBasePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/WizardBase';
import WizardStepBasePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/StepBase';
import WizardButtonPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/WizardButton';
import SplitScreenPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/SplitScreen';
import NavigationPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/Navigation.json';
import WizardContentPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/Content';
import WizardBackButtonPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Wizard/BackButton';

{
<Description>
  Component that pushes and pops panels for step-based workflows and tutorials.
</Description>
}

<ComponentInformation
  title="Wizard"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=1645-293784&t=xHanZpm2wYGoa43J-4"
/>

:::danger Component Deprecated
This component has been deprecated. Please use the new [Drawer with Wizard Steps](/docs/components/compositions/Dialogs/drawer?story=with-wizard-steps).
:::

## Code

### Import

```js
import { Wizard } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={wizardStories} />

### Props

<PropTable docs={WizardBasePropDocs} />

<PropTable docs={WizardStepBasePropDocs} />

<PropTable docs={WizardButtonPropDocs} />

<PropTable docs={SplitScreenPropDocs} />

<PropTable docs={NavigationPropDocs} />

<PropTable docs={WizardContentPropDocs} />

<PropTable docs={WizardBackButtonPropDocs} />

## Guidance

### General guidance

Wizards should be used for step-by-step workflows to assist the user in completing a task, or breaking down complex information into smaller, user-friendly portions. They are usually implemented within a [Modal](/docs/components/elements/Modal) using a Responsive Dialog.

{
<Text.Title as="h2" color="green.300" mt={4} mb={1}>
  Do
</Text.Title>
}

- Step-by-step workflows, such as onboarding
- Breaking multi-step workflows down into smaller tasks
- Have explicit user-initiated triggers like [Buttons](/docs/components/primitives/Button/) to initiate Wizards
- Maintain persistent triggers to re-enter a Wizard if a user abandons or does not complete the process on their first visit

{
<Text.Title as="h2" color="red.300" mt={4} mb={1}>
  Don't
</Text.Title>
}

- Don’t use Wizards to introduce users to new features or new areas of the product
- Don’t use Wizards for tasks that must be completed more than once, or that can be completed in other ways in the product
- Trigger Wizards on first time visits of pages, navigation changes, or other unprompted use cases
- Don't use [Disclosures](/docs/patterns/other/CellFields/Disclosure) with Wizards since they disrupt the step-by-step workflow. Instead, try using [Dropdowns](/docs/components/compositions/Dropdown/Next) for selection of options.

### Content

The content in a Wizard should be used to gather data/information (like a tax form) or to help a user complete a task (like domain registration). Because Wizards are a disruptive UI, they should not be used for less urgent tasks such as educating a user or introducing them to a new area of the product.

Avoid using a Wizard for very simple tasks, tasks that require a lot of data entry from the user, or tasks that are time sensitive and need to be completed quickly as the user may become overwhelmed or frustrated.

Keep the content in each part of the Wizard simple and understandable by limiting the content to just the information the user needs to focus on at that time by providing short, clear instructions. If the Wizard has the option to use imagery, make sure the image is relevant to the user’s task and has the appropriate alt text for those unable to view the content.

As a user moves through a Wizard, provide feedback or visual clues (e.g., progress bar, step numbers, prompts) to help them feel confident as they move through the flow.

### Accessibility

#### Keyboard navigation

When a Wizard opens, the focus must move from the window to the Wizard and remain locked inside the Wizard until the Wizard is closed. If possible, the focus inside the Wizard should land on a logical area, or the least destructive element inside the Wizard. The user should be able to move forward and backwards through the content in the Wizard using just their keyboard.

Wizards must have a button or "Close" control available to allow users to dismiss it. Additionally, pressing the <KeyboardKey name="Esc" /> key on the keyboard should always close the Wizard –– without triggering a destructive action (e.g., hitting the <KeyboardKey name="Esc" /> key should not confirm a deletion).

When the Wizard closes, focus should return to the element it was on before the Wizard was opened or, if that element is no longer available, to a different element, to keep focus order logical.

#### Semantics

The Wizard dialog must have an accessible name and an (optional) description. Consider using `aria-labelledby` or `aria-describedby` on the dialog to avoid content duplication. Additionally, you must manually set `aria-modal="true"` until this is implemented in the component.

---

## Usage

### Anatomy

![Anatomy of a Wizard, default variant](./images/anatomy-default.png)

![Anatomy of a Wizard, split variant](./images/anatomy-split.png)

<AnatomyListItem
  number="1"
  title="Toolbar"
  description="Top bar that contains a step counter and close button"
/>

<AnatomyListItem
  number="2"
  title="Title"
  description="The title of each step in the Wizard"
/>

<AnatomyListItem
  number="3"
  title="Description"
  description="Optional description for each step in the Wizard"
/>

<AnatomyListItem
  number="4"
  title="Buttons container"
  description="Can hold either a “Get Started” Button, or a “Next” and “Previous” Button"
/>

<AnatomyListItem
  number="5"
  title="Content area"
  description="Space for inputs to be included"
/>

<AnatomyListItem number="6" title="Image" description="Split variant only" />

---

### Variants

#### Default

The default Wizard should be used for most Wizard implementations. The content area can include any necessary input or text components.

![Default Wizard, in a Modal](./images/type-default.png)

#### Split

Use the split variant when a complimentary image is desired. It's often used as a first step or into of the Wizard, with the following steps using the Default variant.

![Split Wizard, in a Modal](./images/type-split.png)

---

### Specs

The Wizard itself takes the full width and height of its parent container. In most cases, it should be used in a Responsive Dialog within a [Modal](/docs/components/elements/Modal).

On mobile, a Wizard in a Modal opens in a [Sheet](/docs/components/elements/Sheet).

#### Internal spacing

There are some recommended spacing guidelines for inside the Wizard, see the diagrams below for details. Most importantly, Include a <Token name="space[6]" /> between the description and the content.

##### Mobile

![Specs of a Wizard, mobile](./images/specs-internal-spacing-mobile.png)

##### Desktop

The content container is 54% the width of the Wizard.

![Specs of a Wizard, desktop](./images/specs-internal-spacing-desktop.png)

---

### Behavior

#### Navigation

Navigation in a Wizard should be clear and direct. The below guidelines apply to both default and split Wizard variants.

##### Welcome

If a welcome or intro screen is appropriate, place it before the steps of the workflow. The welcome screen should contain an introduction to the workflow, a “Get Started” Button, and a step count (e.g, “1 of X”)

:::info
In the default Wizard, the “Get Started” button aligns to the right, but in a Split Wizard it aligns to the left.
:::

![Welcome screen](./images/navigation-welcome.png)

##### Step

Once in the workflow, a step count should always be present, as well as both a “Previous” and a “Next” Button.

If user inputs are required in the content, the “Next” Button can be disabled until they have done so. If the user inputs are not required, the “Next” Button can be a “Skip” Button instead.

![Step screen](./images/navigation-step.png)

##### Branches

It is also possible to begin a Wizard with two or three branches in order to split users off into slightly different flows. A step counter reading “1 of X” should be shown.

![Welcome screen with branches](./images/navigation-branches.png)

#### Scrolling and overflow

##### Mobile

On mobile, the content in the Wizard can be an indefinite because the container will scroll. The Buttons at the bottom are not sticky — they will sit underneath the content.

![Wizard scrolling, mobile](./images/scrolling-mobile.png)

##### Desktop

On desktop, the content scrolls within the Responsive Dialog. On scroll, the title transitions into the Toolbar and Buttons are sticky.

![Title transition on scroll](./images/modal-scroll.gif)

![Wizard scrolling, desktop](./images/scrolling-desktop-01.png)

![Wizard scrolling, desktop](./images/scrolling-desktop-02.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Modal" description="@sqs/rosetta-elements" url="/docs/components/elements/Modal" />

  <RelatedLink name="Grid" description="@sqs/rosetta-elements" url="/docs/components/elements/Grid" />

  <RelatedLink name="Toolbar" url="/docs/patterns/other/Toolbar" />

  <RelatedLink name="Button" description="@sqs/rosetta-primitives" url="/docs/components/primitives/Button" />
</Box>
}
