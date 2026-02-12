---
title: Pop Over
---

import { Description } from "@site/src/components/Markdown/Description";
import { ComponentInformation } from "@site/src/components/ComponentsPage/ComponentInformation";
import { PropTable } from "@site/src/components/ComponentsPage/PropTable";
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import PopOverPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/PopOver/PopOver';
import WithPositionHelperDocs from '@sqs/rosetta-prop-docs/docs/packages/utilities/components/WithPositionHelper/WithPositionHelper';
import { popOverStories } from "./PopOver";

{
<Description>
  Small floating Modal that displays context information after user action (e.g. Button click). Modal can be anchored to a Button, Text, etc.
</Description>
}

<ComponentInformation
  title="PopOver"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=7222%3A49"
/>

## Code

### Import

```js
import { PopOver } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={popOverStories} />

### Props

<PropTable docs={PopOverPropDocs} />

<PropTable docs={WithPositionHelperDocs} />

## Guidance

### General guidance

Pop Overs are a type of localized pop up used to present messaging or additional (non-critical) input on top of the main UI content. Pop Overs can also be used to guide users through a task, and act as a less disruptive alternative to the similar [Modal](/docs/components/elements/Modal) component as they do not create an overlay over the entire screen and can be positioned closer to the target user action.

Pop Overs can contain [Text](/docs/components/primitives/Text), [Checkboxes](/docs/components/elements/Checkbox/Next), [Radio Buttons](/docs/components/primitives/Radio/Next), CTAs, and other UI elements.

### Content

Pop Overs can be used to reduce the amount of copy on the screen in order to simplify the visual UI. They are used for simple actions, and should only contain one piece of information, such as a message or a set of Checkboxes to make a [Filter](/docs/patterns/other/Filtering). A Pop Over can also be used to introduce a user to a new product or feature.

The content inside a Pop Over should always be short and directly related to the current task. Pop Overs should never contain critical information that is essential to the functioning of the UI, or for the user to continue their task. To display critical information, use a Modal instead. Pop Overs should never have multiple pages of content or any navigational depth.

A [Button](/docs/components/primitives/Button), Icon Button, styled Text, or other UI elements are recommended as triggers for a Pop Over to indicate to users that there are additional simple actions or information available.

### Accessibility

While using the keyboard, the user should be able to <KeyboardKey name="Tab" /> and <KeyboardKey name="Shift" /> + <KeyboardKey name="Tab" /> through the elements of the Pop Over. Pop Overs should close when the user hits <KeyboardKey name="Esc" />.

After triggering the Pop Over, focus should remain on its trigger. The next focused item should be any action within the Pop Over.

When the user hits <KeyboardKey name="Esc" />, focus should return to the element it was on before the Pop Over was opened (or if that element is no longer available, to a different element) to keep focus order logical.

## Usage

### Overview

Pop Overs are flexible containers that can be anchored to either a side of the viewport, or an element in the UI. They are similar to modals in that they appear on top of the interface, but do not block the user from what they were doing.

---

### Anatomy

![Anatomy of a Modal](./images/anatomy.png)

<AnatomyListItem number="1" title="Container" />

<AnatomyListItem number="2" title="Arrow" description="Optional" />

---

### Specs

The Pop Over is purposely flexible and has very few constraints, in order to serve as many use cases as possible.

| Property | Value                                                                              |
|----------|------------------------------------------------------------------------------------|
| Width    | Set by inner content, or a custom maximum                                          |
| Height   | Set by inner content                                                               |
| Margin   | <Token name="space[4]" /> left and right, <Token name="space[3]" /> top and bottom |

---

### Behavior

![Example Pop Over use, as a Filter](./images/example-filter.png)

#### Position

Pop Overs must be anchored to either a side of the viewport, or another element. The space between the anchor and the Pop Over should be a Space Token value.
