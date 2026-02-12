---
title: Toast
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text, Box } from '@sqs/rosetta-primitives';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import ToastPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Toast/Toast';
import ToastContainerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Toast/ToastContainerBase';
import { toastStories } from './Toast';

{
<Description>
  A temporary dialog that appears at the bottom of a viewport after a user takes
  an action.
</Description>
}

<ComponentInformation
  title="Toast"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6387%3A1259"
/>

## Code

### Import

```js
import { Toast } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={toastStories} />

### Props

<PropTable docs={ToastPropDocs} />

<PropTable docs={ToastContainerPropDocs} />

## Guidance

### General guidance

A Toast is a localized pop up that can help users get real-time, relevant, and contextual information. It is best used to provide feedback on action a user has taken. Use semantic variants wherever possible.

Toast should never contain a critical message as in some instances, it can be easily missed or quickly dismissed with no way for a user to retrieve that information. For important messages, opt to use an [Alert Dialog](/docs/components/compositions/AlertDialog) or a [Modal](/docs/components/elements/Modal) instead

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Toasts for non-disruptive feedback or confirmation of an action
- Display one Toast at a time
- Ensure all actions contained in a Toast are available elsewhere in the product
- Opt for a Toast variant that can be dismissed by the user
- Use semantic variants for their specific uses

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Display a Toast and open Modal simultaneously
- Have multiple actions in a Toast; limit them to a maximum of two
- Include an action Button for dismissing the Toast — rely on the default close button instead

### Content

Keep the content concise while clearly calling out the affected UI elements.

Toasts should be written in present tense to aid with readability. If there are any actions, keep them short, preferably one verb. Don’t include a period at the end of the content in the Toast.

Avoid possessive pronouns (“yours” “ours” etc.) to account for multiple user types/permissions, as the pronouns selected may not match the permission types of the user.

### Accessibility

Avoid using Toasts that disappear on their own after a certain amount of time — especially if they contain an action, as they can [cause accessibility concerns](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable) for:

- Users with limited mobility who may not be able to navigate to the Toast fast enough to act
- Those using screen magnification software who may miss the appearance of a Toast

All Toasts containing a button must have consistent alt text that mentions the action.

## Usage

### Anatomy

![Anatomy of a Toast](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Message"
  description="Short and clear message to the user"
/>

<AnatomyListItem
  number="2"
  title="Close control"
  description="Cross Large Icon, allows the user to manually dismiss the Toast"
/>

<AnatomyListItem
  number="3"
  title="Action Button (optional)"
  description="Only use for contextual user actions. Button should not disrupt or take the user out of the flow"
/>

---

### Variants

#### Default

By default, Toasts appear for 4 seconds. The close control allows the user to manually remove Toasts from view.

![Default Toast](./images/variant-default.png)

#### Semantic

Toasts also have three semantic variants: success, error, and warning. Success messages communicate positive feedback or completion. Error messages indicate failures. Warnings indicate further attention or action.

![Semantic toasts](./images/variant-semantic.png)

#### Action

Toasts can include an action Button when appropriate. Only include an action in the Toast if the same action is available elsewhere in product and is not critical. Keep the action label short, preferably one verb.

Avoid using multiple actions in a Toast, with a maximum of two. Do not include an action Button for dismissing the Toast — rely on the default close button instead.

Consider extending the display duration for a Toast containing an action.

![Toast with Action Button](./images/variant-action.png)

---

### Specs

#### Mobile

| Property | Value                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Margin   | <Token name="space[6]" /> bottom, <Token name="space[3]" /> left and right                                         |
| Padding  | <Token name="space[3]" /> top and bottom, <Token name="space[4]" /> left and right                                 |
| Width    | 100% of viewport                                                                                                   |
| Height   | Set by message plus top and bottom padding of <Token name="space[3]" />, height accounts for message text wrapping |

![Toast specs, mobile](./images/specs-mobile.png)

#### Desktop

| Property | Value                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Margin   | <Token name="space[6]" /> bottom, <Token name="space[3]" /> left and right                                                      |
| Padding  | <Token name="space[3]" /> top and bottom, <Token name="space[4]" /> left and right                                              |
| Width    | Set by message plus left and right padding of <Token name="space[4]" />, maximum of <Token name="sizes.800" themeKey="sizes" /> |
| Height   | Set by message plus top and bottom padding of <Token name="space[3]" />, height accounts for message text wrapping              |

![Toast specs, desktop](./images/specs-desktop.png)

---

### Behavior

#### Display

Toasts appear at the bottom of the viewport, centered. They pop up and then sink back down after four seconds, by default.

##### Mobile

![Toast display, mobile](./images/behavior-display-mobile.png)

##### Desktop

![Toast display, desktop](./images/behavior-display-desktop.png)

## Migration

### From v9.34.17 to v9.35.0

**This upgrade deprecates [ToastManager from Core Components](https://core-components.squarespace.net/core-components/components/ToastManager)
and adds Toast to the Rosetta Elements package.**

ToastManager no longer supported, but will continue to work as is.
Migration to Toast from Rosetta Elements is strongly encouraged.

---

#### Import updates

##### Old

`import { ToastManager } from '@sqs/core-components'`

##### New

`import { Toast } from '@sqs/rosetta-elements'`

---

#### Usage updates

To allow more customization and easy drop-in replacement,
the Rosetta Toast is a simplified version of the Core Components Toast Manager.
By using three Toast props: `content`, `action`, and `duration`,
the Toast Manager props listed below are replaced:

- `accesories.component`
- `accesories.onPress`
- `accesories.shouldDismissOnPress`
- `accesories.shouldHideOnPress`
- `accesories.text`
- `autoDismiss`
- `cancelAutoDismissOnHover`
- `config`
- `dismissable`
- `immediate`
- `text`
- `textStyles`

---

#### Migration examples

| Task                                           | Previous                                                                      | Updated                                                                                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Show Toast                                     | `toast.present({ text: 'Foo Bar' });`                                         | `toastRef.show({ content: 'Foo Bar' });`                                                                                     |
| <Box minWidth={120}>Prevent auto-dismiss</Box> | `toast.present({ text: 'Foo Bar', autoDismiss: false, dismissable: false });` | `toastRef.show({ content: 'Foo Bar', duration: null });`                                                                     |
| Custom actions                                 | `toast.present({ text: 'Foo Bar', accessories: [{ Text: 'Undo' }] });`        | `toastRef.show({ content: 'Foo Bar', action: ({ remove }) => (<Button.Tertiary onClick={remove}>Undo</Button.Tertiary>) });` |

If you're still unsure on how to migrate your usage of Toast Manager to Toast,
please reach out in the [#design-platform](https://squarespace.slack.com/archives/CEU9V1K5J) Slack channel.

## Content Design

Toasts must include text to communicate a message. The text should be
written as concisely as possible while still being clear about what has
happened or is happening. It’s acceptable to use short phrases for toasts
that are communicating confirmation and error messages, but informative
toasts should use complete sentences.
