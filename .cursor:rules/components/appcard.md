---
title: App Card
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { appCardStories } from './AppCard';
import AppCardDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AppCard/AppCard';
import AppCardBannerDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AppCard/AppCard.Banner.json';
import AppCardContentDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AppCard/AppCard.Content.json';
import AppStoreButtonDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AppCard/StoreButton';

{
<Description>
  A modal for mobile devices that prompts the user to install Squarespace apps.
</Description>
}

<ComponentInformation
  title="AppCard"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6837%3A10219"
/>

:::info
If you set your browser to emulate an iOS or Android device and refresh the page, you will see a link to the App Store or Play Store, respectively.
:::

## Code

### Import

```js
import { AppCard } from '@sqs/rosetta-compositions';
import { Platform } from '@sqs/rosetta-utilities';
```

### Examples

<StoryRenderer stories={appCardStories} />

### Props

<PropTable docs={AppCardDocs} />

<PropTable docs={AppCardBannerDocs} />

<PropTable docs={AppCardContentDocs} />

<PropTable docs={AppStoreButtonDocs} />

## Usage

### General guidance

App Cards redirect users to mobile Squarespace's mobile apps for a user experience that's more customized — and optimized — for mobile devices rather than the mobile site experience. It's intended to be a temporary solution.

---

### Anatomy

![Anatomy of an App Card](./images/anatomy.png)

<AnatomyListItem number="1" title="Close Button" />

<AnatomyListItem number="2" title="Image" />

<AnatomyListItem number="3" title="Title" />

<AnatomyListItem number="4" title="Description" />

<AnatomyListItem
  number="5"
  title="Button"
  description="Displays either an Apple App Store logo or a Google Play Store logo, depending on the platform"
/>

---

### Variants

#### Default

Redirects to the Squarespace app ([iOS](https://apps.apple.com/us/app/squarespace/id1361797894) / [Android](https://play.google.com/store/apps/details?id=com.squarespace.android.squarespaceapp\&hl=en_US)).

![Default App Card](./images/variant-default.png)

#### Commerce

Redirects to the Commerce app ([iOS](https://apps.apple.com/us/app/squarespace-commerce/id1033276920) / [Android](https://play.google.com/store/apps/details?id=com.squarespace.android.commerce\&hl=en_US)).

![Commerce App Card](./images/variant-commerce.png)

#### Analytics

Redirects to the Analytics app ([iOS](https://apps.apple.com/us/app/squarespace-analytics/id730533177) / [Android](https://play.google.com/store/apps/details?id=com.squarespace.android.analytics\&hl=en_US)).

![Analytics App Card](./images/variant-analytics.png)

---

### Specs

App Cards utilize the [Wizard](/docs/components/compositions/Wizard) component in a [Sheet](/docs/components/elements/Sheet) overlay, with a special full-width [Button](/docs/components/primitives/Button) that shows the app store logo for a platform.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Wizard" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Wizard" />

  <RelatedLink name="Sheet" description="@sqs/rosetta-elements" url="/docs/components/elements/Sheet" />

  <RelatedLink name="Button" description="@sqs/rosetta-primitives" url="/docs/components/primitives/Button" />
</Box>
}
