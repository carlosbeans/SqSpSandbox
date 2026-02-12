---
title: Modal
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Text, Box } from '@sqs/rosetta-primitives';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { Token } from '@site/src/components/Markdown/Token';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import ModalDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Modal';
import DialogDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Modal.Dialog';
import DialogResponsiveProviderDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Dialog.ResponsiveProvider';
import OverlayDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Overlay';
import PositionDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Position';
import TransitionDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Modal/Transition';
import { modalStories } from './Modal';

{
<Description>
  Modals are dialogs presented above an overlay. The component focuses the
  user’s attention to the content within the Modal.
</Description>
}

<ComponentInformation
  title="Modal"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6415%3A229"
/>

## Code

### Import

```js
import { Modal } from '@sqs/rosetta-elements';

// All named components within Modal
const { Transition, Position, Overlay, Dialog, TouchScroll } = Modal;
const { DragHandle } = Position;
```

### Examples

<StoryRenderer stories={modalStories} />

### Props

<PropTable docs={ModalDocs} />

<PropTable docs={DialogDocs} />

<PropTable docs={DialogResponsiveProviderDocs} />

<PropTable docs={OverlayDocs} />

<PropTable docs={PositionDocs} />

<PropTable docs={TransitionDocs} />

## Guidance

### General guidance

Modals are used to present **_critical information_** or to **_request user input to complete a workflow._** In either case, a user's workflow is interrupted — this is by design. Modals use an overlay to hide content within a viewport, causing the user to focus on the task within the Modal.

Modals should always be triggered by an explicit user action, such as clicking a button. When the user completes the task, or dismisses the Modal, they return to the previous workflow.

Since Modals disrupt the user, they should be used sparingly. Whenever possible, opt to place content within the main page or in components that do not disrupt users such as [Card](/docs/components/elements/Card), [Tooltip](/docs/components/elements/Tooltip), or [Pop Over](/docs/components/elements/PopOver).

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Modals for a warning state when the user is about to take an action with serious consequences
- Restrict Modals to user-initiated actions, urgent messaging, or the input of complex information within a larger workflow

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Show error states, loading screens, or success states in a Modal
- Announce new features or promote related features in a Modal
- Send the user out of the page if the task requires concentration or if data could be lost if the user abandons the task
- Rely on Modals to present educational content or introduce users to a new area of the product
- Trigger Modals on navigation change, page load, or other cases where the user has not explicitly initiated an action

### Content

When writing content for Modals, repetition is key. Try to match the title of the Modal with the primary CTA/Button to reduce cognitive load in readers. Avoid using more than two CTAs in a Modal.

Modals can benefit from a conversational tone. When possible, use questions for Modal titles as the interaction with the user is a more natural response than to a statement.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- **Title:** Upload All Documents?
- **CTA:** Upload | Cancel

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- **Title:** Upload Document
- **CTA:** Yes | No

### Accessibility

#### Keyboard navigation

When a Modal opens, focus must move from the window to the Modal and remain locked inside the Modal until the Modal is closed. If possible, the focus inside the Modal should land on a logical area, or the least destructive element inside the Modal.

Modals must have a button or "Close" control available to allow users to dismiss the Modal. Additionally, pressing the <KeyboardKey name="Esc" /> key on the keyboard should always close the Modal –– without triggering a destructive action (e.g., hitting the <KeyboardKey name="Esc" /> key should not confirm a deletion).

When the Modal closes, focus should return to the element it was on before the Modal was opened or, if that element is no longer available, to a different element, to keep focus order logical.

#### Semantics

The Modal dialog must have an accessible name and an (optional) description. Consider using `aria-labelledby` or `aria-describedby` on the dialog to avoid content duplication. Additionally, you must manually set `aria-modal="true"` until this is implemented in the component.

## Usage

### Anatomy

![Anatomy of a Modal](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Dialog"
  description="The content area the user interacts with"
/>

<AnatomyListItem
  number="2"
  title="Overlay"
  description="Covers everything under the modal to focus the user’s attention"
/>

---

### Specs

By default, the Dialog in the Modal component will only take on the width and height of its content, unless otherwise specified.

The Overlay should always fill 100% of the viewport width and height.

---

### Dialog sizes

:::info
Dialog sizes are not exported variants of the Modal component, but are able to be created using the size tokens. See the examples under the code tab for code you can use.
:::

Rosetta recommends five sizes for Dialogs. The different sizes are not directly tied to intentions, but each comes with usage guidelines.

To avoid creating an additional level of naming, the names of the size options directly reference the dialog's maximum width, per the [size tokens](/docs/develop/style-packages/tokens#sizes).

You should always use a [Grid](/docs/components/elements/Grid) inside a Modal dialog.

#### Sizes.700

The smallest recommended Modal size, which should be used for low-complexity flows.

Example uses:

- [Alert Dialog](/docs/components/compositions/AlertDialog)
- Section editor (V7.1)
- Details editors (V8)
- Assistant

| Property | Value                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| Width    | <Token name="sizes.700" themeKey="sizes" />, shrinks fluidly on smaller screens |
| Height   | Set by inner content                                                            |
| Margin   | <Token name="space[3]" /> left and right                                        |

![sizes.700 dialog](./images/sizes-700.png)

#### Sizes.750

:::info
Formerly known as the Skinny Modal
:::

Use for low- to medium-complexity flows.

Consider a bigger modal or break the content into separate steps when the inner content height exceeds 600px. Doing this prevents the illusion of completeness, a common UX problem. (For reference, the illusion of completeness occurs when the viewport doesn't offer scrolling to guide users toward additional content.)

Example uses:

- Settings with one to three inputs

| Property | Value                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| Width    | <Token name="sizes.750" themeKey="sizes" />, shrinks fluidly on smaller screens |
| Height   | Set by inner content, max. 600px                                                |
| Margin   | <Token name="space[6]" /> on all sides                                          |
| Toolbar  | <Token name="sizes.400" themeKey="sizes" /> height, fixed position at top       |

![sizes.750 dialog](./images/sizes-750.png)

#### Sizes.900

:::info
This size actually is exported in code, via Dialog.Responsive
:::

Use for medium-complexity flows. To ensure content remains an optimized height and width, this dialog size has an additional rule that maintains a 4:3 aspect ratio.

Example uses:

- [NavDialog](/docs/components/compositions/NavDialog)
- [Wizard](/docs/components/compositions/Wizard)

| Property     | Value                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Width        | Max. <Token name="sizes.900" themeKey="sizes" />                          |
| Height       | Max. 675px (<Token name="sizes.900" themeKey="sizes" /> \* 0.75)          |
| Margin       | <Token name="space[6]" /> on all sides                                    |
| Toolbar      | <Token name="sizes.400" themeKey="sizes" /> height, fixed position at top |
| Aspect ratio | 4:3                                                                       |

![sizes.900 dialog](./images/sizes-900.png)

#### Sizes.Inset

Use for medium- to high-complexity flows where the added space is valuable, but keeping the user in their context is important.

Example uses:

- Section store
- Product composer

| Property | Value                                                                     |
| -------- | ------------------------------------------------------------------------- |
| Width    | `100vw` minus margin                                                      |
| Height   | `100vh` minus margin, max. 1680px                                         |
| Margin   | <Token name="space[6]" /> \* 2 on all sides                               |
| Toolbar  | <Token name="sizes.400" themeKey="sizes" /> height, fixed position at top |

![sizes.Inset dialog](./images/sizes-inset.png)

#### Sizes.Fullwidth

Use for high-complexity flows when it's appropriate to remove the user from the context.

Example uses:

- Universal checkout

| Property | Value                                                                     |
| -------- | ------------------------------------------------------------------------- |
| Width    | `100vw`                                                                   |
| Height   | `100vh`                                                                   |
| Toolbar  | <Token name="sizes.400" themeKey="sizes" /> height, fixed position at top |

![sizes.Fullscreen dialog](./images/sizes-fullscreen.png)

---

### Behavior

Modals should be triggered by a user action, such as clicking a [Button](/docs/components/primitives/Button). They are purposefully disruptive, and designed to focus the user’s attention.

#### Scrolling and overflow

Dialog content can be longer than the height of the dialog. When this happens, the title should remain visible inside the [Toolbar](/docs/patterns/other/Toolbar), utilizing [TitleTransition](/docs/components/elements/TitleTransition). This applies to Wizard Modals, Nav Modals and Skinny Modals.

![Title transition on scroll](./images/modal-scroll.gif)

#### Responsiveness

On mobile, Modals—with the exception of
[Alert Dialog](/docs/components/compositions/AlertDialog)s—
should display in a [Sheet](/docs/components/elements/Sheet).

![Modal displayed in a Sheet, mobile](./images/behavior-responsiveness.png)

#### Draggable

Dialogs can be draggable, when appropriate. This can be useful for site editing where a user may want to move the Dialog around in order to see underneath.

#### Anchored position

By default, Dialogs are centered in the viewport; but if appropriate, a Dialog can be anchored to a specific position or element instead.

#### Navigation

##### Toolbar

Typically, Modals should include a Toolbar stretched across the top of the content container. The [Toolbar](/docs/patterns/other/Toolbar) can be used for:

- Primary action (right side)
- Close control (left-side)
- Title (when scrolled)
- Step counter (in [Wizard](/docs/components/compositions/Wizard))

![Toolbar in a Dialog](./images/behavior-toolbar-01.png)

![Toolbar in a Dialog](./images/behavior-toolbar-02.png)

##### Close control

Modals should always include a close affordance—typically a tertiary [Button](/docs/components/primitives/Button) with the label “Close” in the left side of the [Toolbar](/docs/patterns/other/Toolbar). Any primary action Button can also serve as a way to dismiss the Modal.

The <KeyboardKey name="Esc" /> key should always close a Modal.

##### Nav Menu

For more complex Modals, a [Nav Menu](/docs/components/compositions/NavMenu) can be used inside the dialog. This pre-composed in the [Nav Dialog](/docs/components/compositions/NavDialog).

![Nav Dialog](./images/variant-nav.png)

##### Steps

For multi-step flow, display a Wizard inside a Modal dialog.

![Wizard in a dialog, default view](./images/variant-wizard-default.png)

![Wizard in a dialog, split view](./images/variant-wizard-split.png)

#### With an Alert Dialog

See [Alert Dialog](/docs/components/compositions/AlertDialog#behavior).

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Sheet" description="@sqs/rosetta-elements" url="/docs/components/elements/Sheet" />

  <RelatedLink name="Wizard" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Wizard" />

  <RelatedLink name="Nav Dialog" description="@sqs/rosetta-compositions" url="/docs/components/compositions/NavDialog" />

  <RelatedLink name="Alert Dialog" description="@sqs/rosetta-compositions" url="/docs/components/compositions/AlertDialog" />

  <RelatedLink name="Grid" description="@sqs/rosetta-elements" url="/docs/components/elements/Grid" />

  <RelatedLink name="Toolbar" url="/docs/patterns/other/Toolbar" />
</Box>
}
