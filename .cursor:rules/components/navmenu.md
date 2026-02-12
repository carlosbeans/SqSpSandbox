---
title: Nav Menu
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { navMenuStories } from './NavMenu';
import NavMenuPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavMenu';
import NavItemPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavItem';
import NavItemAccessoryPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavItemAccessory';
import NavGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavGroup';
import NavTextPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavText';
import NavTitlePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavMenu/NavTitle';

{
<Description>
  Menu used for navigation; often in left panel of the Squarespace CMS.
</Description>
}

<ComponentInformation
  title="NavMenu"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6415%3A5"
/>

## Code

### Import

```js
import { NavMenu } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={navMenuStories} />

### Props

<PropTable docs={NavMenuPropDocs} />

<PropTable docs={NavItemPropDocs} />

<PropTable docs={NavItemAccessoryPropDocs} />

<PropTable docs={NavGroupPropDocs} />

<PropTable docs={NavTextPropDocs} />

<PropTable docs={NavTitlePropDocs} />

## Usage

### General guidance

NavMenus are the primary form of navigation in most Squarespace products and are generally displayed in a [Panel](https://core-components.squarespace.net/core-components/components/Panel). Items within the Nav Menu's panel behave in two different ways:

- Pushes a new panel with items; leads the user to sub-sections of a product
- Refreshes workspace; items in Panel remain unchanged

If a panel is the last Panel in a navigation, NavMenu also provides a title and a description for additional context.

---

### Anatomy

![Anatomy of a NavMenu](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Nav item"
  description="Menu items that lead the user further into app navigation; a panel pushes when item is clicked or the workspace is refreshed"
/>

<AnatomyListItem
  number="2"
  title="Indicator"
  description="Indicates selected nav item"
/>

<AnatomyListItem
  number="3"
  title="Accessory"
  description="Optional text to describe a nav item (e.g., “New”)"
/>

<AnatomyListItem
  number="4"
  title="Panel title"
  description="Main title for the panel"
/>

<AnatomyListItem
  number="5"
  title="Panel description"
  description="Short description of the product or feature"
/>

<AnatomyListItem number="6" title="Label" description="Label for a nav group" />

<AnatomyListItem
  number="7"
  title="Nav group"
  description="Group of navigation items that belong together"
/>

---

### Variants

#### Root menu

This is the main menu in /config to lead customers into the core sections of the Squarespace product.

In /config, the root menu sits below the Squarespace logo and above the user's information.

![Root NavMenu](./images/variant-root.png)

#### Nested menu

Nested menus are used for navigation through each core Squarespace product (i.e., products listed in the root menu variant). Items within a nested menu behave in two different ways:

- Pushes a new panel with items; leads the user to sub-sections of the product
- Refreshes the user's workspace; items in panel remain unchanged (e.g., Analytics)

Nested menus should always be paired with a [Toolbar](/docs/patterns/other/Toolbar) containing a [Back Button](/docs/components/elements/BackButton) that navigates to the previous panel. The label of the Back Button should be the title of the parent panel. In the example below, “Home” is the appropriate Back Button label.

![Nested NavMenu](./images/variant-nested.png)

#### Panel template

NavMenu also provides a title and a description for panels with inputs. Any controls can be used within the panel.

Panel templates should always be paired with a [Toolbar](/docs/patterns/other/Toolbar) containing a [Back Button](/docs/components/elements/BackButton) that navigates to the previous panel. The label of the Back Button should be the title of the parent panel. In the example below, “Settings” is the appropriate Back Button label.

![Panel template](./images/variant-panel.png)

#### NavDialog

The [NavDialog](/docs/components/compositions/NavDialog) utilizes the NavMenu in a [Modal](/docs/components/elements/Modal). It is commonly used for settings, such as page settings or link settings (in the [LinkEditor](https://core-components.squarespace.net/core-components/components/LinkEditor)).

![NavDialog](./images/variant-navdialog.png)

---

### Specs

#### Mobile

| Nested component  | Property | Value                                                                                 |
|-------------------|----------|---------------------------------------------------------------------------------------|
| Panel             | Padding  | <Token name="space[2]" /> left and right (per [Grid](/docs/components/elements/Grid)) |
| Toolbar           | Height   | <Token name="sizes.300" themeKey="sizes" />                                           |
|                   | Margin   | <Token name="space[2]" /> bottom                                                      |
| Panel title       | Padding  | <Token name="space[1]" /> top and bottom                                              |
|                   | Margin   | <Token name="space[4]" /> bottom, if no panel description                             |
| Panel description | Padding  | <Token name="space[1]" /> top                                                         |
|                   | Margin   | <Token name="space[2]" /> bottom                                                      |
| Nav item          | Padding  | <Token name="space[1]" /> top and bottom                                              |
|                   | Margin   | 0px                                                                                   |
| Nav group         | Padding  | 0px                                                                                   |
|                   | Margin   | <Token name="space[4]" /> bottom                                                      |
| Label             | Padding  | <Token name="space[2]" /> top                                                         |
|                   | Margin   | <Token name="space[2]" /> bottom                                                      |

![Nested menu specs, on mobile](./images/specs-nested-mobile.png)

![Panel title and description specs, on mobile](./images/specs-panel-template-mobile.png)

![NavDialog specs, on mobile](./images/specs-navdialog-mobile.png)

#### Desktop

| Nested component  | Property | Value                                                                                                                       |
|-------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| Panel             | Padding  | <Token name="space[6]" /> left and right (per [Grid](/docs/components/elements/Grid))                                       |
|                   | Width    | Default: <Token name="sizes.700" themeKey="sizes" /><br />NavDialog: 36% of [Dialog](/docs/components/elements/Modal) width |
| Toolbar           | Height   | Default: <Token name="sizes.450" themeKey="sizes" /><br />NavDialog: <Token name="sizes.400" themeKey="sizes" />            |
|                   | Margin   | 0px                                                                                                                         |
| Panel title       | Padding  | <Token name="space[1]" /> top and bottom                                                                                    |
|                   | Margin   | <Token name="space[4]" /> bottom, if no panel description                                                                   |
| Panel description | Padding  | <Token name="space[1]" /> top and bottom                                                                                    |
|                   | Margin   | <Token name="space[2]" /> bottom                                                                                            |
| Nav item          | Padding  | <Token name="space[1]" /> top and bottom                                                                                    |
|                   | Margin   | 0px                                                                                                                         |
| Nav group         | Padding  | 0px                                                                                                                         |
|                   | Margin   | <Token name="space[4]" /> bottom                                                                                            |
| Label             | Padding  | <Token name="space[2]" /> top                                                                                               |
|                   | Margin   | <Token name="space[2]" /> bottom                                                                                            |

![Nested menu specs, on desktop](./images/specs-nested-desktop.png)

![Panel title and description specs, on desktop](./images/specs-panel-template-desktop.png)

## ![NavDialog specs, on desktop](./images/specs-navdialog-desktop.png)

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Nav Dialog" description="@sqs/rosetta-compositions" url="/docs/components/compositions/NavDialog" />

  <RelatedLink name="Toolbar" url="/docs/patterns/other/Toolbar" />
</Box>
}
