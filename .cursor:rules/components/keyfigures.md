---
title: Key Figures
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Description } from '@site/src/components/Markdown/Description';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { keyFiguresStories } from './KeyFigures';
import KeyFiguresPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/KeyFigures/KeyFigures';
import DashboardCardPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/KeyFigures/DashboardCardProps';
import AnalyticsTabPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/KeyFigures/AnalyticsTabProps';
import ItemDetailCardPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/KeyFigures/ItemDetailCardProps';

import kfDoImage1 from './images/keyfigures-16-colorcoding-do.png';
import kfDoImage2 from './images/keyfigures-18-nontextcontent-do.png';
import kfDoImage3 from './images/keyfigures-20-targetsize-do.png';
import kfDontImage1 from './images/keyfigures-15-colorcoding-dont.png';
import kfDontImage2 from './images/keyfigures-17-nontextcontent-dont.png';
import kfDontImage3 from './images/keyfigures-19-targetsize-dont.png';

{
<Description>
  Key Figures are rows of cards that highlight the most relevant and actionable
  data within a product area, feature, or record.
</Description>
}

<ComponentInformation
  title="Key Figures"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/bWmI5WE3HtivnpsiRsAFF2/03-Rosetta-Components-%5Bv2%5D?type=design&node-id=2656%3A12484&mode=design&t=hKY5UosPyXZ317KW-1"
/>

## Code

### Import

```js
import { KeyFigures } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={keyFiguresStories} />

### Props

<PropTable docs={KeyFiguresPropDocs} />

<PropTable docs={DashboardCardPropDocs} />

<PropTable docs={AnalyticsTabPropDocs} />

<PropTable docs={ItemDetailCardPropDocs} />

## Usage

### General guidance

Key Figures help prioritize and contextualize customer data. Key Figures are not _required_ on every page that includes customer data, but can help customers find greater value in our platform by making their data clearer and more actionable throughout their journey.

They can be used on product landing pages, like Selling, to provide an overview of their business’s performance within that product area and help focus customers’ attention on the most important information. On dashboards, they can summarize the progress of vital workflows and surface potential operational problems. On detail pages for records like contact profiles and invoices, Key Figures can highlight recent activity

### Variants

#### Dashboard

Use the Dashboard variant on landing pages one or two levels deep in the site navigation. Data highlighted in Dashboard Key Figure cards should help focus the customer’s attention on important performance metrics or facilitate the efficient completion of workflows.

![The Dashboard variant of Key Figures.](./images/keyfigures-01-variants-dashboard.png)

#### Analytics

Analytics Key Figure cards act as tabs. Use the Analytics variant on dashboards meant specifically for deep data analysis to summarize the data organized underneath each Key Figure tab.

![The Analytics variant of Key Figures, which behaves like a set of tabs.](./images/keyfigures-02-variants-analytics.png)

#### Item Detail

Use the Item Detail variant on pages dedicated to a single instance of a content type (for example, an individual profile or invoice) to highlight the most important data and activity attached to a content item.

![The slimmer Item Detail variant of Key Figures.](./images/keyfigures-03-variants-itemdetail-row.png)

##### Item Detail card variants

![Variations of cards available in Item Detail Key Figures, described in the following text.](./images/keyfigures-04-variants-itemdetail-cards.png)

###### Standard Figure

Standard figures contain a title with optional tooltip, the figure, a caption, and an optional link.

###### Linked Figure

If the card highlights another related content item, you can link to that item’s details in the key figure.

As a rule of thumb, if the link is also the title of the linked page, use a linked figure. Otherwise, use a standard figure with a link in the footer.

###### Row Hero

If one figure in the row is particularly important, you can highlight it with larger text. Rows should have only one hero.

###### Titled Row Hero

By default, the Row Hero is a number and a caption, but you can use it with a title instead. Do not use both Titled Row Hero and Row Hero cards in the same Key Figure row.

**If you need both a title and a caption, use a standard figure.**

### Anatomy

![Diagram of a row of Key Figures with each element described in the anatomy list labeled.](./images/keyfigures-05-anatomy.png)

<AnatomyListItem
  number="1"
  title="Card Title"
  description="A simple and straight-forward description of the data presented."
/>

<AnatomyListItem
  number="2"
  title="Card Subtitle (Optional, only in Dashboard cards)"
  description="Brief context, such as a description of the data or time period it represents. "
/>

<AnatomyListItem
  number="3"
  title="Info Trigger (Optional)"
  description="Displays a tooltip with brief, additional context."
/>

<AnatomyListItem
  number="4"
  title="Figure"
  description="The key data point being presented. Generally numerical, but can follow a variety of formats. Should be static text."
/>

<AnatomyListItem
  number="5"
  title="Card Footer (Optional)"
  description="Supporting content for the data point. Try to keep the visibility of the card footer consistent across all key figures in a row. "
/>

<AnatomyListItem
  number="6"
  title="Footer Caption (Recommended)"
  description="Captions can clarify data: showing change over time or conveying status. Can accept text and status messages. In general, use the right footer for links. Caption elements don’t need to be the same across cards, but if you use captions on one card, try to use them on all."
/>

<AnatomyListItem
  number="7"
  title="Footer Accessory (Optional, not available in Analytics cards)"
  description="In general, use the right footer for linking from the card or displaying status. You do not need a right footer on all cards in a row as long as all cards have a left caption element."
/>

<AnatomyListItem
  number="8"
  title="Range Control (Optional)"
  description="If a historical view of Key Figure data is helpful in the context of the current dashboard, include a range control dropdown in the whitespace above the cards. This should only control the Key Figures. On analytical dashboards, the range control appears in the Page Header. The Analytics Key Figure variant does not have its own range control."
/>

### Composition

#### Page hierarchy

In general, Key Figures should appear immediately after the Page Header, although they may be preempted by Banners with critical system messaging. In general, promotional cards and Banners should appear below Key Figures.

![Dashboard Key Figures preceeded by a Banner.](./images/keyfigures-06-composition-withbanner1.png)

![Item Detail Key Figures preceded by a Banner.](./images/keyfigures-06-composition-withbanner2.png)

#### Positioning

Generally, the Key Figure row should appear alone on one row of the page grid. However, if there are only 1–2 Key Figures, the row may be followed by another module.

![Key Figures wrapped in a narrower container to make space for an adjacent module.](./images/keyfigures-07-composition-withaside.png)

#### Customization

Limit more customized composition to card figure and footer content. Avoid adjusting the size, spacing, and styling of functional elements like card titles and the cards themselves.

![Key Figures customized to include a toggle in the card footer.](./images/keyfigures-08-composition-customfooter.png)

### Content

#### Highlighted data

Select data that is either the most important or actionable to a client given their location and depth in the platform. For example, “Most Popular Products” would be more relevant on a dashboard in the “Selling” section than a dashboard of customer profiles.

Try to limit Key Figures to a small number around 3 to avoid bogging customers down. To prioritize, consider:

- What information best conveys the health of the customers’ business in the current product area?
- What operational issues might be surfaced to customers in Key Figures?
- What business metrics are customers able to affect through actions they take near the Key Figures?

![An example of Key Figures populated with relevant data.](./images/keyfigures-09-content.png)

#### Null state

When no data is available, the figure is replaced with a gray dash. Consider using a plain text caption to explain why the card isn’t displaying data.

### Behavior

#### Content scaling

By default, the width of the Key Figure row is distributed equally across cards.

The ideal number of Key Figure cards is around three, but cards have built-in minimum and maximum widths for predictable behavior if the number of cards vary.

##### Dashboard cards

Dashboard cards will fill the Key Figure row with no max-width.

![An example of how Dashboard cards respond when there are fewer than three cards.](./images/keyfigures-10-maxwidth-dashboard.png)

##### Analytics cards

Analytics cards have a max-width of <Token name="sizes[700]" /> to preserve their folder tab-like appearance.

![An example of how Analytics cards respond when they reach their max width.](./images/keyfigures-11-maxwidth-analytics.png)

##### Item Detail cards

Item Detail cards have a max-width of 33% of their parent container and will float left if there are not enough cards to fill the Key Figure row.

![An example of Item Detail cards when their container exceeds their combined max width.](./images/keyfigures-12-maxwidth-itemdetail.png)

#### Content wrapping

As Key Figure cards scale down, content will wrap. If using standard subcomponents, spacing should adjust to preserve visual alignment across cards.

You may add truncation or abbreviation, but avoid the need by being as concise as possible.

![Key Figures content wraps by default.](./images/keyfigures-13-contentwrapping.png)

#### Horizontal overflow

Key Figures are wrapped in an Overflow Box to prevent unexpected layout shifts when the minimum width of Key Figure cards exceeds the row’s container width.

![Key Figures with overflow box enabled.](./images/keyfigures-12-horizontaloverflow.png)

#### Responsive behavior

On mobile, card width switches to a percentage of the container. Dashboard and Analytics Key Figures can be scrolled horizontally. Item Detail Key Figures stack vertically.

![Mobile states of each Key Figure variant.](./images/keyfigures-14-mobile.png)

### Accessibility

#### Color coding

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={kfDoImage1} description="Avoid using color alone to represent positive, negative, and neutral trends in Key Figure data. Doing so may make that information inaccessible to users with different forms of color blindness." />

  <Dont src={kfDontImage1} description="Be sure to include text or icons to reinforce the meaning of color-coded information." />
</Box>
}

#### Non-text content

When using non-text content in Key Figures, like Status Messages with Glyphs, include appropriate alt text so any information not conveyed through text is still accessible to screen readers.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={kfDoImage2} description="Provide descriptive alt text when non-text content adds meaning that will be lost to users who can’t see it." />

  <Dont src={kfDontImage2} description="Don’t provide alt text for non-text content that is redundant with nearby text." />
</Box>
}

#### Target sizing

Interactive elements inside Key Figures should have an accessible target size of at least 36 x 36 CSS pixels.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={kfDoImage3} description="Use additional padding or a Touchable wrapper with hitSlop to increase the target of small elements. " />

  <Dont src={kfDontImage3} description="Don’t nest interactive elements inside the Analytics Tab variant." />
</Box>
}

---

## Related resources

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Design Architecture" description="Playbook" url="/docs/design/playbooks/design-architecture" />

  <RelatedLink name="Banner" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Banner" />
</Box>
}
