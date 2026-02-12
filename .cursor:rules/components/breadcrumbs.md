---
title: Breadcrumbs
---

import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Description } from '@site/src/components/Markdown/Description';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import { breadcrumbsStories } from './Breadcrumbs.tsx';
import breadcrumbsDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Breadcrumbs/Breadcrumbs';

{
<Description>
  Breadcrumbs are links that represent an absolute path to the current page
  through the site navigation stack.
</Description>
}

<ComponentInformation
  title="Breadcrumbs"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/bWmI5WE3HtivnpsiRsAFF2/03-Rosetta-Components-%5Bv2%5D?type=design&node-id=1705%3A11302&mode=design&t=lXGjWVuuyOmGnVnN-1"
/>

![An example of Rosetta breadcrumbs. They are a series of links separated by slashes. The final page listed in the current page title in static text.](./images/breadcrumbs_01_cover.png)

## Code

### Import

```js
import { Breadcrumbs } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={breadcrumbsStories} />

### Props

<PropTable docs={breadcrumbsDocs} />

## Guidance

### General guidance

Breadcrumbs are links that show the path to the current page in the site navigation. They help users understand where they are, make a mental map of our product, and navigate through complex workflows.

Prefer using breadcrumbs on screens nested at least three levels (L1 - L3) deep and displaying all pages above the current page in the site hierarchy.

### Content

#### Which pages to include

Include all the pages preceding the current page up to L1 on mobile and L2 on desktop. On desktop, also include the current page title.

Breadcrumb destinations may not be implemented as stand-alone pages. For example, Settings appears in a large modal, but each Settings screen within the modal feels like an independent place.

:::danger Only use hierarchical paths
Do not generate breadcrumbs dynamically based on the user's path. This is technically difficult and prevents building a reliable mental model of where to find things in the future.
:::

#### Labels

To make it easier to navigate, use the page titles as labels for your breadcrumb. The only exception is when you have content items like customer profiles or invoices in a data collection. In that case, use the singular version of the content type as the label, like _.../Profile_ or _.../Invoice_.

Breadcrumb labels should use title case, following our [platform capitalization guidelines](/docs/content-design/mechanics/capitalization) for page titles and navigation.

### Accessibility

As a navigation item, accessibility is especially important to keep in mind when implementing breadcrumbs.

![Breadcrumbs with invisible element boundaries highlighted to demonstrate the total tap area and clearspace built into the composition.](./images/breadcrumbs_02_a11y.png)

#### Target size

For accessibility, breadcrumb links must be large enough to be easily clicked or tapped by users with low vision or motor control issues. To ensure this, breadcrumb items and truncation triggers have been designed with a minimum 36x36 CSS pixel target and clear space between items.
Do not adjust element size or spacing as it may reduce accessibility.

#### Assistive technology

When customizing menu item props, use semantic elements and labeling so they are handled properly by assistive technology.

#### Opening linked pages

Open breadcrumbs in the current window or tab. Opening internal links like breadcrumbs in a new tab or window is unconventional and potentially confusing to all users but can be especially disorienting to screen reader users.

## Usage

### Anatomy

![Diagram of the desktop and mobile breadcrumbs with each element described in the anatomy list is labeled.](./images/breadcrumbs_03_anatomy.png)

<AnatomyListItem
  number="1"
  title="L2 ancestor"
  description="An “ancestor” is any page that precedes the current view in our navigation hierarchy. The L2 ancestor—or second-level ancestor—is the first page in this chain after top-level navigation items."
/>

<AnatomyListItem
  number="2"
  title="Truncation trigger"
  description="When there’s not adequate space to show all steps in the navigation hierarchy, hide intermediary steps behind a touchable ellipses that reveals the pages that couldn’t fit."
/>

<AnatomyListItem
  number="3"
  title="Separator"
  description="The separator is a decorative, non-interactive element that delineates breadcrumbs. It should be hidden from screen readers."
/>

<AnatomyListItem
  number="4"
  title="Parent page"
  description="The parent page is the screen immediately preceding the current page in the nested navigation hierarchy. A link to the current page’s parent is always present in the breadcrumb menu."
/>

<AnatomyListItem
  number="5"
  title="Current page"
  description="The page the user is actively viewing. It’s included in the breadcrumb menu on large screens to make the relationship between these links as clear as possible. The current page is not a link and has no interactive state. It should be skipped by keyboard focus and screen readers as it’s redundant with the page title."
/>

<AnatomyListItem
  number="6"
  title="Back link"
  description="Action in the sidebar nav toolbar that brings the user up a level in the navigation hierarchy. This appears as part of the mobile page header, and is not a part of the breadcrumb pattern."
/>

<AnatomyListItem
  number="7"
  title="L1 ancestor"
  description="The L1 ancestor is the top level section of the main Config navigation under which the current screen sits (“Commerce,” “Marketing,” “Setting,” etc.)."
/>

<AnatomyListItem
  number="8"
  title="Breadcrumb overflow menu"
  description="Opened by the truncation trigger, this menu contains all pages between the first and last menu item that are not exposed by default."
/>

---

### Composition

On desktop, breadcrumbs should be the first element on the screen, immediately before the page title. On mobile, they appear between the back link and page title.

The space around breadcrumbs is not built into the component as it may be affected by white space added to the page or header container. White space inherited from the existing page container and white space added around breadcrumbs should add up to consistent values.

![Illustration of where to apply the Rosetta spacing variables documented here.](./images/breadcrumbs_04_composition.png)

| Margin     |     | Desktop                   |     | Mobile                    |
| ---------- | --- | ------------------------- | --- | ------------------------- |
| Top        |     | <Token name="space[5]" /> |     | <Token name="space[3]" /> |
| Left/right |     | <Token name="space[6]" /> |     | <Token name="space[3]" /> |
| Bottom     |     | 1.5rem                    |     | <Token name="space[1]" /> |

### Behavior

#### Truncation

##### Menu truncation

On large screens, truncate anything above three breadcrumbs to ensure the L2 ancestor, parent, and current page remain visible. On mobile, truncate everything between the L1 ancestor and parent, hiding the current page breadcrumb.

###### Displaying truncated items

Truncated items are revealed by the truncation trigger.

Only one truncation trigger is shown, no matter how many levels of navigation has been truncated, but behavior differs slightly when there’s a single hidden page or multiple

###### Single truncated menu item

When there is only one truncated navigation level, the truncation trigger acts as a link to that item. Hover or keyboard focus reveals a tooltip with that page’s title. Click or hitting enter while focused navigates the user to that page.

![Example of breadcrumbs with a single menu item hidden behind the truncation trigger. The cursor is hovering over the truncation trigger, revealing a tooltip with the hidden page’s title.](./images/breadcrumbs_05_truncation_single.png)

###### Multiple truncated menu items

When there are multiple truncated navigation levels, the truncation trigger opens a dropdown menu on hover or keyboard focus.

![Example of multiple truncated menu items being revealed in a dropdown once the trigger has been activated.](./images/breadcrumbs_06_truncation_multiple.png)

##### Menu item truncation

To prevent wrapping, breadcrumb labels may be truncated as well. Menu item truncation is based on the width of the component, available screen width, and number of breadcrumbs.

On desktop, truncated links are also accompanied by a tooltip that displays the full label on hover for clarity.

#### Responsive

##### Content

On mobile, the breadcrumb menu starts with the L1 ancestor instead of L2. That’s because on desktop, the L1 will remain visible in the fixed global navigation.

Also, the current page is hidden from the Breadcrumb Menu in favor of showing the Parent page, which gives users an easy way to jump up one level in the navigation.

##### Mobile truncation

On mobile, regardless of truncated navigation items, the truncation trigger opens a dropdown to avoid sending users to an unexpected page.

The sizing and the alignment of the menu also changes to better fit the space.
