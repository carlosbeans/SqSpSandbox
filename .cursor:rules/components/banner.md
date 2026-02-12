---
title: Banner
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Text } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import BannerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Banner/Banner';
import { bannerStories } from './Banner';

<Description>
  Component that displays important messages with optional actions, available in
  multiple variants (default, info, success, error, caution) and layouts
  (wide/narrow).
</Description>

<ComponentInformation
  title="Banner"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=4722-4958&t=LQheS7p8fmfxJ0pv-11"
/>

:::info

This is the new, redesigned Banner component. Please migrate your previous Banner to this one. Reach out to [Design Platform](https://squarespace.slack.com/archives/CEU9V1K5J) if you have any questions.

:::

## Code

### Import

```js
import { Banner } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={bannerStories} />

### Props

<PropTable
  docs={BannerPropDocs}
  title="Banner"
  componentPackage="@sqs/rosetta-compositions"
/>

## Guidance

### Criteria for usage

There are three base criteria for using Banner:

1. **Relevant**: Message must relate directly to action taken or information displayed on current page or form
2. **Prominent**: Message should require the elevated visual weight
3. **Persistent**: Message needs to remain visible until user takes action or intentionally closes the message

Use a Banner only if it meets all three of these conditions. Otherwise, use an [alternative pattern](#alternatives-to-banner).

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>

- Use Banner to communicate only the most relevant, prominent, and persistent statuses
- Use Banner to communicate the state of an entire page or form

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>

- Use Banner to communicate irrelevant, unimportant, or temporary statuses
- Use Banner to communicate status for a single component, a single heading, or a section of a page

### When not to use Banner

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't use Banner to:
</Text.Subtitle>

**Communicate the status of components**

![Guidance: Component Status](./images/guidance-component-status.png)

- **Example**: One input field in a form has an error
- Instead, communicate that error with the error text on the input field, not with a Banner for the entire form
- Components have status built into them, they do not need to be surfaced to the page or form level

**Communicate the status of a compositions**

![Guidance: Composition Status](./images/guidance-composition-status.png)

- On some pages, there may be different compositions, or groups of components, that handle a specific feature, view, or settings
- Any status that only affects a single composition should be communicated close to or within that composition

**Convey status of a subpage**

![Guidance: Subpage Status](./images/guidance-subpage-status.png)

- **Example**: Don’t display a status for a subpage (Cookies and Data Privacy) on a higher level page (Settings)
- Keep statuses relevant to the current page

**Make promos or recommendations**

![Guidance: Promos](./images/guidance-promos.png)

- Promos, insights, tips, or related recommendations should use dedicated patterns like the SoL Static, Temporary Promo, Tip, and Insight

In any of these cases, see the following alternatives.

### Alternatives to Banner

#### [Status Message](/docs/patterns/other/StatusMessage)

![Status Message](./images/alternative-status-message.png)

- [Status Message](/docs/patterns/other/StatusMessage) can be placed below, above, or next to other components
- Rosetta component that consists of a glyph next to some Text
- These come in the usual status variants of Danger, Warning, Success, Neutral, and Accent
- "Lighter" UI footprint, especially on smaller surfaces

#### [SoL Static or Temporary Promo](/docs/dashboard/components/FeaturePromo/)

![SoL Promos](./images/alternative-sol-promo.png)

- [Feature Promos](/docs/dashboard/components/FeaturePromo/) can be used for promotions or encouraging users to explore a feature
- Can contain images to better visualize or promote a product or feature
- Designed specifically for the Dashboard framework, including Full Width, Image, and No Image variants

#### SoL [Tip](/docs/dashboard/components/Tip/) and [Insight](/docs/dashboard/components/Insight/)

![SoL Tip and Insight](./images/alternative-sol-tip-insight.png)

- [Tip](/docs/dashboard/components/Tip/) is used to provide information that educates users on how to use a selling product
- [Insight](/docs/dashboard/components/Insight/) provides data-backed information that helps users understand their business performance

#### [Empty State](/docs/patterns/other/EmptyState)

![Empty State](./images/alternative-empty-state.png)

- [Empty state](/docs/patterns/other/EmptyState) can be used in cases of errors
- Could be used when there is insufficient data to orient what users should normally see
- Can contain actions to help resolve or promote beginning a flow
- Can communicate status, errors, or promotion while still preserving page layout

---

## Usage

### Examples

#### Error

Actions on page or form are completely blocked and needs immediate resolution:

![Error Banner](./images/variant-error.png)

- For this use case, this is a critical, blocking error that prevents users from interacting with the rest of the domain management, so we don’t include a close option
- Critical errors or failures that blocks the user from proceeding
- Action must be taken immediately in order to resume normal operation

#### Caution

Something is negatively affecting or partially blocking the user’s ability to complete a page or form

![Warning Banner](./images/variant-warning.png)

- This example encourages users to complete the store setup process. The description adds no useful context, so we remove it.
- User should resolve something in order to proceed with the expected flow or action
- A feature on the user’s website will not function properly unless action is taken on a settings or configuration page
- User’s financials might be at risk unless user takes an action

#### Success

Confirmation upon completion of a flow and redirection:

![Success Banner](./images/variant-success.png)

- A user just completed a full page form, wizard, or dedicated flow then gets redirected back to a table or dashboard view. There is no resolution that is needed, so we remove the action.
- A user has taken action on another page, which now enables new actions on this page
- Note that Success banners should be displayed temporarily, on first redirect. After this initial confirmation, do not show this Banner
- If the message needs to show upon taking action on this page, or needs to appear for a few seconds, using a [Toast](/docs/components/elements/Toast) is more appropriate

#### Default

Page or form requires additional information that should be disclosed, but users are not blocked:

![Default Banner](./images/variant-default.png)

- Some inputs on a form are different from their usual state because some condition is not met

---

### Anatomy

![Anatomy of a Banner](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Glyph"
  description="Each variant has a default glyph, but can be overridden. Required."
/>

<AnatomyListItem
  number="2"
  title="Title"
  description="Concise message or description. Required. "
/>

<AnatomyListItem
  number="3"
  title="Body (Optional)"
  description="Provides context for the title. Can contain information or links. Optional if the Title is self-explanatory and needs no further context."
/>

<AnatomyListItem
  number="4"
  title="Action Button (Optional)"
  description="Action to resolve the issue. There should only be one action on a banner. Do not use an informational links (View details, Learn More, etc.) as an action. Instead, use Text Links in the body. Optional if no resolution needed."
/>

<AnatomyListItem
  number="5"
  title="Close Button (Optional)"
  description="Button to dismiss the Banner. Optional if error should be intentionally persistent or a blocker."
/>

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>

- Include support documentation or additional links as Text Links in the body
- Use a short verb or phrase as the Action Button text

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>

- Include unnecessary body text
- Use the Action Button as a link to support documentation

### Sizing

![Banner Sizing](./images/sizing.png)

Banner has two size variants: Default and Narrow.

- The Default size variant should be used when Banner is 600px wide or larger
- The Narrow size variant should be used when the component is 599px or narrower

### Glyph Usage

Banner uses glyphs (not icons) as an additional method of communicating status in addition to color and content.

- Exclamation mark glyph: Use this icon to indicate a banner contains critical information.
- Checkmark glyph: Use this icon to indicate a banner contains a confirmation message.
- Information glyph: Use this icon to indicate a banner contains information for the user.
- Cross circle / Cross octagon glyphs: Use this icon to indicate blocked actions.

### Accessibility

Do not rely on the color alone to convey status to users. Ensure language and glyphs properly reflect the severity of the Banner message for users who can’t recognize certain colors.

---

## Related components

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Alert Dialog"
    description="@sqs/rosetta-compositions"
    url="/docs/components/compositions/AlertDialog"
  />

  <RelatedLink
    name="Toast"
    description="@sqs/rosetta-elements"
    url="/docs/components/elements/Toast"
  />
</Box>
