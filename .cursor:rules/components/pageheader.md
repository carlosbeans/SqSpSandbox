---
title: Page Header
---

import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Box } from '@sqs/rosetta-primitives';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { pageHeaderStories } from './PageHeader';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import PageHeaderDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader';
import PageHeaderBodyDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.Body.json';
import PageHeaderActionsDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.Actions.json';
import PageHeaderTitleDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.Title.json';
import PageHeaderItemMetaDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.ItemMeta.json';
import PageHeaderBannerDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.Banner.json';
import PageHeaderDropdownDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/PageHeader/PageHeader.Dropdown.json';

import doSpacing1 from './images/pageheader-08-do-spacing1.png';
import doSpacing2 from './images/pageheader-09-do-spacing2.png';
import doSpacing3 from './images/pageheader-10-do-spacing3.png';
import doSpacing4 from './images/pageheader-11-do-spacing4.png';
import doContent1 from './images/pageheader-12-do-content1.png';
import dontContent1 from './images/pageheader-13-dont-content1.png';
import doContent2 from './images/pageheader-14-do-content2.png';
import dontContent2 from './images/pageheader-15-dont-content2.png';
import doContent3 from './images/pageheader-16-do-content3.png';
import dontContent3 from './images/pageheader-17-dont-content3.png';
import doResponsive1 from './images/pageheader-18-do-responsive1.png';
import doResponsive2 from './images/pageheader-19-do-responsive2.png';
import doResponsive3 from './images/pageheader-20-do-responsive3.png';
import dontResponsive1 from './images/pageheader-21-dont-responsive1.png';
import doA11y1 from './images/pageheader-22-do-a11y1.png';
import doA11y2 from './images/pageheader-23-do-a11y2.png';
import doA11y3 from './images/pageheader-24-do-a11y3.png';
import doA11y4 from './images/pageheader-25-do-a11y4.png';

{
<Description>
  Page Header is a composable structure for the tops of pages including page
  navigation, title, subtitle content, actions, and alert banner.
</Description>
}

<ComponentInformation
  title="PageHeader"
  figmaUrl="https://www.figma.com/design/AviYyuhmEIMgxO87u0k5lh/System-of-Landings-Figma-Toolkit?node-id=2546-60137&node-type=frame&t=tG4zRYhZjVYHNoIn-0"
/>

## Code

### Import

```js
import { PageHeader } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={pageHeaderStories} />

### Props

<PropTable docs={PageHeaderDocs} />

<PropTable docs={PageHeaderBodyDocs} />

<PropTable docs={PageHeaderTitleDocs} />

<PropTable docs={PageHeaderActionsDocs} />

<PropTable docs={PageHeaderItemMetaDocs} />

<PropTable docs={PageHeaderDropdownDocs} />

<PropTable docs={PageHeaderBannerDocs} />

## Guidance

## Usage

### Variants

Page Header design varies depending on two factors:

- Position in the platform hierarchy—or page level; and
- The purpose of the page in the user experience—or page type.

#### Page level

Page level refers to how deep the page is nested within the site hierarchy. Level numbering begins at Home (level zero).

##### Level 1 (L1)

L1 pages appear in the primary navigation. Example: Website, Marketing, and Contacts

##### Level 2 (L2)

L2 pages are nested under L1 pages. Example: Email Campaigns is an L2 under Marketing. Usually, L2s appear in the main navigation after their parent L1 has been visited.

##### Level 3 and beyond (L3+)

L3+ pages appear under L2 pages or deeper. Example: an L3 settings page may have an L4 page nested under it.

---

#### Page type Variants

##### Dashboard

Dashboard pages are landing pages that summarize data or activity. Dashboards generally appear on L0–L2 pages. Dashboards have larger page titles and are more likely to have a Primary CTA.

![Dashboard variant of the Page Header](./images/pageheader-03-variant-dashboard.png)

##### Analytics

Analytics pages host deeper data over a range of time. Analytics is currently its own L1 page with nested L2 pages. The main difference between Analytics pages and other Dashboards, is a range control that changes the date range for which all data on the page is displayed.

![Analytics Page Header Variant](./images/pageheader-04-variant-analytics.png)

##### Item Detail

Item Detail pages present a single item in a collection of data—such as a specific customer profile from the Contacts table—as actionable as possible. Item details are usually L3+ pages and include a spot for additional information about the Item beneath the title.

![Item Detail Page Header Variant](./images/pageheader-05-variant-itemdetail.png)

##### Default pages

Not every page falls into the Dashboard/Item Detail framework. Those pages use the Default Page Header variant customized to their purpose and location in the site hierarchy. Default pages can be full-width or a [constrained layout](/docs/design/interface-guidelines/overview#constrained-layout) for lower density content like a form, settings, or list of information related to a single topic area.

![Default Page Header variant](./images/pageheader-06-variant-default.png)

---

### Anatomy

![Anatomy diagram of the elements documented here](./images/pageheader-07-anatomy.png)

<AnatomyListItem
  number="1"
  title="Title"
  description="A functional title that corresponds to the page’s label in our navigation"
/>

<AnatomyListItem
  number="2"
  title="Subtitle"
  description="Provides additional page context, such as a brief explanation of the feature"
/>

<AnatomyListItem
  number="3"
  title="Range Control (Analytics only)"
  description="Dropdown that changes the period for which data is presented on the entire page (including across tabs)"
/>

<AnatomyListItem
  number="4"
  title="Page Actions (Optional)"
  description="A small number of prioritized actions that can be represented as Primary, Tertiary, or Icon buttons"
/>

<AnatomyListItem
  number="5"
  title="Breadcrumbs (L3+ only)"
  description="Navigation required on L3 pages and deeper, representing the current page’s place in the site navigation"
/>

<AnatomyListItem
  number="6"
  title="Title Accessory (Optional)"
  description="Component slot, primarily for L3+ pages, that require additional information or functionality—such as showing status"
/>

<AnatomyListItem
  number="7"
  title="Item Meta (Item Detail only)"
  description="Optional slot for essential data connected to the content item, like date created or connected profiles"
/>

<AnatomyListItem
  number="8"
  title="Banner (Optional)"
  description="Slot for critical account- or item-level alerts, using the Rosetta Banner for system alerts or a Card for prioritized Marketing message"
/>

<AnatomyListItem
  number="9"
  title="Mobile Toolbar (Separate component)"
  description="Not part of the Page Header composition, but frequently paired with Page Header on mobile to provide a link to the current page’s parent"
/>

---

## Guidance

Page Headers are flexible enough to accommodate a wide array of customization. However, because they appear across our entire platform, some consistency is essential.

### Composition

#### Placement

Page Headers should—with very few exceptions—be the first element on the page and take up the full width of the Primary Content Area. Do not preempt the Page Header with account alerts or marketing.

#### Spacing

Spacing between content slots is handled by the Page Header composition. Within the Page Header, avoid customizing the spacing of standard elements like page title and subtitle.

Spacing below the Page Header is dependent on the page type and first piece of content. In general:

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={doSpacing1} description="Target whitespace equal to space[9] between Dashboard and Analytics Page Headers and content." />

  <Do src={doSpacing2} description="Target whitespace equal to space[6] between Item Detail and Default Page Headers and content." />

  <Do src={doSpacing3} description="Adjust space down if the first piece content has additional whitespace built into it (such as Tabs above tables)." />

  <Do src={doSpacing4} description="On mobile, spacing can be reduced following Rosetta spacing guidelines." />
</Box>
}

---

### Content

The Page Header component is container-based with significant flexibility in its content. Be mindful of the following guidelines when designing your Page Header.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={doContent1} description="Use succinct, descriptive labeling for page titles." />

  <Dont src={dontContent1} description="Don’t replace page titles with other, conversational headlines." />

  <Do src={doContent2} description="Limit interactivity in subtitles to links or more information triggers—and avoid if possible." />

  <Dont src={dontContent2} description="Don’t make the page title interactive. Use one of the more customizable slots." />

  <Do src={doContent3} description="Be mindful of space limitations, use an Action List when you need to offer more actions than can be exposed at one time. " />

  <Dont src={dontContent3} description="Don’t add elements to the Page Actions that do not behave as buttons." />
</Box>
}

---

### Responsive Behavior

Responsive behavior of the content slots within the Page Header are handled by the component.

Responsive changes within content slots are handled by the components used to create that content. For example, the Page Header component will stack the title and subtitle over the page actions—the style of which will change to the mobile styling of the Text and Button components.

The mobile state of the Page Header can be customized to suit custom content or functionality.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={doResponsive1} description="Consider customizing the mobile page actions to prioritize the primary action and move others to an Action List." />

  <Do src={doResponsive2} description="Consider hiding subtitles on mobile to prioritize the visibility of content on small screens." />

  <Do src={doResponsive3} description="You may use the mobile toolbar for page actions that make more sense above the page title, such as range controls." />

  <Dont src={dontResponsive1} description="Avoid truncating Page Header content. If unavoidable, reveal truncated content in a Tooltip on hover, tap, or focus." />
</Box>
}

---

### Accessibility

The Accessibility considerations for Page Header vary depending on the content placed inside of it.

In general, using Rosetta components and following [Squarespace accessibility guidelines](/docs/accessibility/overview/what-is-accessibility) will provide a strong foundation, but stay mindful of the accessibility considerations that custom content may bring:

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={doA11y1} description="Implement the page title as an h1 unless another element makes more sense as the page’s h1 for screen reader users." />

  <Do src={doA11y2} description="Provide buttons with appropriate ARIA labels. For Icon Buttons, expose labels as tooltips." />

  <Do src={doA11y3} description="Ensure custom interactive elements, such as links in the page meta, have a target size of at least 36 x 36 CSS pixels and are usable by Keyboard. Touchable] can be used to adjust the target size of nested elements." />

  <Do src={doA11y4} description="Provide alternative text for media such as icons that convey information not captured in adjacent text." />
</Box>
}

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Key Figures" description="@sqs/rosetta-compositions" url="/docs/components/compositions/KeyFigures" />

  <RelatedLink name="Breadcrumbs" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Breadcrumbs" />

  <RelatedLink name="Banner" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Banner" />

  <RelatedLink name="Card" description="@sqs/rosetta-elements" url="/docs/components/elements/Card" />
</Box>
}
