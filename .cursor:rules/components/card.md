---
title: Card
---

import { Description } from '@site/src/components/Markdown/Description';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import CardProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Card/Card';
import BodyProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Card/Card.Body';
import { Token } from '@site/src/components/Markdown/Token';
import { cardStories } from './Card';

{

<Description>
  A container that includes concise content, with a flexible design. Cards often
  provide a preview to linked information and allow users to browse a collection
  of related content and actions.
</Description>
}

<ComponentInformation
  title="Card"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6398%3A3732"
/>

## Code

### Import

```js
import { Card } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={cardStories} />

### Props

<PropTable docs={CardProps} />

<PropTable docs={BodyProps} />

## Guidance

### General guidance

Cards are used to group sets of information. Their use and design is very flexible, and can be used in a number of different ways including educational, support, and promotional purposes.

### Content

The content in a Card can be used to help educate users, direct users to relevant resources, or prompt users to complete a task. If the information in a Card isn’t critical, allow the user to dismiss the Card.

The text in a Card title will wrap if the text overflows. Keep titles concise, and check the copy in supported languages and viewport sizes. If there is more than one Card on a given page, organize them in a logical manner (e.g., highest to lowest, alphabetical/numerical order) to reduce cognitive load. Follow guidelines for all components ([Text](/docs/components/primitives/Text/), [Button](/docs/components/primitives/Button/), [Image](/docs/components/elements/Image/), [Divider](/docs/components/elements/Divider/), [Radio](/docs/components/primitives/Radio/Next/), etc.) included in the Card.

### Accessibility

When Cards contain several components or are grouped together:

- Ensure all semantic elements are present
- Ensure all heading levels are correct
- Ensure the Images and [Icons](/docs/components/icons) have alt text and are accurately represented

#### Card focus

Whenever possible, explicitly specify the focus order for elements inside the Card. Sometimes focus may need to move to a non-interactive element to guide a user’s attention or to ensure that focus is not lost. See the [Keyboard Navigation](/docs/accessibility/requirements/focus-order) section to learn more about focus.

#### Card navigation

Keyboard users should make as few <KeyboardKey name="Tab" /> presses as possible to get to any interactive element.

## Usage

### Composition

Rather than predefining designs for a Card, Rosetta Cards are flexible in such they can include any combination of the components below, and in any order.

#### [Text](/docs/components/primitives/Text)

##### Card title

The most important copy in the Card, should be short and concise. Not every Card needs to have a title, some may have just body or caption copy.

| Property     | Value                                  |
| ------------ | -------------------------------------- |
| Margin       | <Token name="space[1]" /> bottom       |
| Text variant | `subtitle` or `body`                   |
| Font weight  | <Token name="fontWeights[semibold]" /> |

![Subtitle Semibold](./images/variant-composition-subtitle.png)

![Body Semibold](./images/variant-composition-body-semi.png)

##### Card body

The main copy in the Card.

| Property     | Value                            |
| ------------ | -------------------------------- |
| Margin       | <Token name="space[1]" /> bottom |
| Text variant | `body`                           |

![Body](./images/variant-composition-body.png)

##### Caption

Additional copy that’s more discreet.

| Property     | Value                                       |
| ------------ | ------------------------------------------- |
| Color        | <Token name="gray.300" themeKey="colors" /> |
| Margin       | <Token name="space[1]" /> bottom            |
| Text variant | `body`                                      |

![Caption](./images/variant-composition-caption.png)

#### [Button](/docs/components/primitives/Button)

Cards can include one or two Buttons. Each Button can be any variant and size, though if space allows, opt for medium or large buttons for a larger tap zone. Buttons can be aligned horizontally or be full-width and stack vertically.

![Button](./images/variant-composition-button.png)

#### [Image](/docs/components/elements/Image)

A Card can have one image in it. The image container should sit edge-to-edge in the card, whether the card is horizontal or vertical. The container can be any height (in a vertical Card) or width (in a horizontal Card).

The image inside the container can either cover or be contained in the space, but it should always be centered.

![Image](./images/variant-composition-image.png)

#### [Icon](/docs/components/icons)

Any icon from the Rosetta Icons library.

![Icons](./images/variant-composition-icon.png)

#### [Action List](/docs/components/compositions/ActionList)

Triggered by an Ellipsis Icon, a Card can include an ActionList for multiple user actions.

![Action List](./images/variant-composition-actionlist.png)

#### [Divider](/docs/components/elements/Divider)

A line. It divides things.

![Divider](./images/variant-composition-divider.png)

#### [Close control](/docs/patterns/other/IconButton)

If the Card is dismissible, it should have a Cross Large Icon in the top-right corner that the user can click/tap to dismiss the Card. This Icon should generally be placed inline with a subtitle, and putting it on top of an image should be avoided.

![Close control](./images/variant-composition-close-control.png)

#### [Checkbox](/docs/components/elements/Checkbox/Next/)

If the Card is being used in a group as a multi-select list, including a Checkbox can help improve clarity that the Card is selectable.

![Checkbox](./images/variant-composition-checkbox.png)

#### [Radio](/docs/components/primitives/Radio)

If the Card is being used in a group as a single-select list, including a Radio button can help improve clarity that the Card is selectable.

![Radio](./images/variant-composition-radio.png)

---

### Variants

#### Dismissible

If the information in a Card isn’t critical, allow the user to dismiss the Card.

![Dismissible Card](./images/variant-dismissible.png)

#### Style

Cards can either be default or quiet style.

##### Default

Default style Cards have a border of <Token name="gray.100" themeKey="colors" />, and generally have horizontal padding of <Token name="space[4]" /> and vertical padding of <Token name="space[3]" />.

![Card with default style](./images/variant-style-default.png)

##### Quiet

Quiet style is defined by having no border and smaller padding in the text container, and is reserved for very simple Cards with little content. Quiet cards should always have an image.

![Card with quiet style](./images/variant-style-quiet.png)

---

### Behavior

#### Interaction

Cards should generally have some form of interaction such as viewing, editing, purchasing, etc. Some actions are exposed in Buttons, and others by simply clicking the Card.

If a Card only has the ability to be opened or viewed in more detail, do not include a [Button](/docs/components/primitives/Button). Clicking anywhere on the Card should perform that action.

If a Card has more than one action, or the action is more specific than “open” or “view” — such as “edit” — include a Button.

Groups of cards can also act like checkboxes (multi-select) or radio buttons (single-select). In this case, there should be no Buttons or other interactive elements in the Card.

#### Text overflow

Copy inside cards wrap, so avoid having long titles. Also be sure to check the copy in every supported language.

![Cards with overflowing copy](./images/behavior-text-overflow.png)

---

### Specs

#### Padding

Because Cards are so flexible and can be used in so many different scenarios, it’s hard to have a definitive answer for internal spacing. Using the [space tokens](/docs/develop/style-packages/tokens#space), adjust the design to what feels right in the context.

##### Standard

Maintain padding of <Token name="space[5]" /> <Token name="space[6]" /> in the text container.

##### Compact

Maintain padding of <Token name="space[3]" /> <Token name="space[4]" /> in the text container.

---

### Layout

See [layout](/docs/design/interface-guidelines/overview) for guidelines on using Cards with other components on the Grid.

#### Card content

Cards can either have a vertical or horizontal layout. In either case, Card widths are fluid.

##### Horizontal

![Card with horizontal layout](./images/variant-direction-horizontal.png)

##### Vertical

![Card with vertical layout](./images/variant-direction-vertical.png)

#### Groups of Cards

##### Tiled

The default option. Cards can be stacked in a single column, or wrapped.

![Cards in a tiled layout](./images/layout-tiled-01.png)

![Cards in a tiled layout](./images/layout-tiled-02.png)

##### Horizontal masonry

Horizontal masonry grids can vary in width. Rows of cards may vary in height, but the cards within a row are consistent in height. It is preferred to use the quiet style Cards in a horizontal masonry grid.

![Cards in a horizontal masonry layout](./images/layout-horizontal-masonry.png)

##### Vertical masonry

Vertical masonry grids can vary in height but have a consistent width.

![Cards in a vertical masonry layout](./images/layout-vertical-masonry.png)
