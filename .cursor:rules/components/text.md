---
title: Text
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { textStories } from './Text';
import {
  commonPropDocs,
  textPropDocs,
} from '@site/src/components/ComponentsPage/PropTable/primitivePropDocs';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text, Box } from '@sqs/rosetta-primitives';
import { Token } from '@site/src/components/Markdown/Token';

{
<Description>
  Component that renders different text styles (e.g., body, caption etc.).
</Description>
}

<ComponentInformation
  title="Text"
  componentPackage="@sqs/rosetta-primitives"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6379%3A3900"
/>

On web, Text represents a text DOM element (e.g., `h1`, `p`); in React Native, it represents Text. The component leverages Styled System `variant` utility to connect the component with text styles as defined in Rosetta Themes. By default, the Text component is unstyled. See examples to view style variants and how to use the `textStyle` prop.

## Code

### Import

```js
import { Text } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={textStories} />

### Props

<PropTable docs={commonPropDocs('Text', textPropDocs)} />

## Guidance

### General guidance

No guidance.

### Content

Content should be written to be clear and simple. When possible, aim for a reading level of 8th grade or below. Avoid jargon and use short, common words and sentences to help with readability.

#### Casing and punctuation

Our UI copy uses a variety of [casing conventions](/docs/content-design/mechanics/capitalization).

#### Sentence case

- Use for headlines with long phrases
- Use for headlines in a primary content area; e.g., main page
- Use for headlines in modals and alert dialogs
- Use for body copy

#### Title case

- Use on surfaces that only offer room for concise labels or headlines
- Use on copy that lives in the sidebar, navigation, or setting labels

#### All caps

- Use for label or action
- Do not use for titles

#### Punctuation

- Periods can be used normally in any complete sentence except for alt tags, checkbox labels, radio button labels, and UI titles.

### Accessibility

Identify the semantic structure of each page. Semantic structure is important for readability, those using assistive technologies, and those relying on keyboard navigation.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Programmatically define the essential semantic structure of a page by clearly marking page regions; eg., `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`
- Have only one `<title>` region and one `<main>` per page
- Have only one `<h1>` per page
- Use meaningful headings that give the user a clear understanding of what the section is about

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Skip heading levels (e.g., going from `<h2>` to `<h5>` on a page)

## Usage

### Overview

The text component renders text. It is an abstraction over the native text elements of our different platforms, like `<p>` or `<h2>` on the web or `<Text>` on native.
In Figma, `Text` is represented as styles found in the right hand sidebar.

### Behavior

The `Text` component comes with _variants_ that encapsulate Rosetta’s default topographic styles. These variants combine properties found in [Rosetta Tokens](/docs/develop/style-packages/tokens#borders) — like size, line-height, font-weight, letter spacing, text-transformation and responsive resizing — into easy-to-use single values.

The variants are:

- [Figure](#figure)
- [DisplayTitle](#displaytitle)
- [Title](#title)
- [Subtitle](#subtitle)
- [Body](#body)
- [Caption](#caption)
- [Label](#label)
- [Action](#action)

In addition to the variant, individual properties can be modified — for example, using tabular numbers to align columns of data — if your specific use case dictates a different style.

In Figma, you'll find entries in the [Rosetta Styles](https://www.figma.com/file/nOdp1Kmnhf7h3dVFfk3YpO/01-Rosetta-Styles?node-id=0%3A1) Figma library for each variant as they appear on desktop and mobile screens. We've included additional styles for common individual property modifications, like changing a font weight, adding tabular numbers, or underlining text.

In code, variants are accessed by using dot notation or the `variant` prop, see the [code tab](/docs/components/primitives/Text#code) for details.

### Variants

#### DisplayTitle

Display Title should be used for the page title on top- and second-level landing pages (pages that appear in the main navigation and their immediate children). It should only be used once at the top of the page. On mobile, the Display Title and Title variants look the same.

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Display Title for pages that appear in the app’s main navigation and their immediate children (for example, Marketing and Email Campaigns)

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use Display Title for pages that appear three levels or deeper in the navigation
- Don’t use Display Title to title anything but pages
- Don’t use Display Title’s larger desktop styles on mobile

| Property    | Value                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------- |
| Font        | <Token name="fonts.ui" />                                                                   |
| Font weight | Mobile: <Token name="fontWeights.medium" />, desktop: <Token name="fontWeights.semibold" /> |
| Font size   | Mobile and desktop: <Token name="fontSizes[7]" />                                           |
| Line height | Mobile and desktop: <Token name="lineHeights[5]" />                                         |
| Color       | <Token name="gray.100" themeKey="colors" />                                                 |

#### Title

Title should be used for the title of a given panel, view, object. Title is used for the titles of pages three or more levels deep in the navigation. It should only be used once in any given context.

{
<Box py={5} px={6} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Title mb={0}>Make it real</Text.Title>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use titles for major sections and objects in the current view.
- Keep titles to a reasonable character length.
- Remember to set an appropriate heading level using the `as` prop.

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use the Title variant when a smaller font size would be more approprate for smaller objects like modals and cards.

| Property    | Value                                                                             |
| ----------- | --------------------------------------------------------------------------------- |
| Font        | <Token name="fonts.ui" />                                                         |
| Font weight | <Token name="fontWeights.semibold" />                                             |
| Font size   | Mobile: <Token name="fontSizes[7]" />, desktop: <Token name="fontSizes[6]" />     |
| Line height | Mobile: <Token name="lineHeights[5]" />, desktop: <Token name="lineHeights[4]" /> |
| Color       | <Token name="gray.100" themeKey="colors" />                                       |

#### Subtitle

The Subtitle style in `semibold` is used for titling smaller objects or sections within a view. In the `medium` weight it is also used directly following a title element, as an added descriptor of the screen, panel or view.

{
<Box p={2} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Label color="gray.300">As a heading</Text.Label>

  <Text.Subtitle fontWeight="semibold" mb={0} py={5} px={6}>
    Look like an expert right from the start
  </Text.Subtitle>
</Box>
}

{
<Box p={2} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Label color="gray.300">Paired with Text.Title</Text.Label>

  <Box py={5} px={6}>
    <Text.Title as="div" m={0} py={1}>
      Make it real
    </Text.Title>

    <Text.Subtitle m={0} pt={1} color="gray.300">
      Look like an expert right from the start
    </Text.Subtitle>
  </Box>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use subtitle in the `semibold` weight for sub sections and smaller objects in the current view.
- Use subtitle in the `medium` weight directly after a Text.Title to add additional context.
- When used as a heading, remember to set an appropriate heading level using the `as` prop.

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use subtitle for long blocks of copy.

| Property    | Value                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Font        | <Token name="fonts.ui" />                                                                                                           |
| Font weight | <Token name="fontWeights.medium" />                                                                                                 |
| Font size   | Mobile: <Token name="fontSizes[5]" />, desktop: <Token name="fontSizes[4]" />                                                       |
| Line height | Mobile: <Token name="lineHeights[3]" />, desktop: <Token name="lineHeights[2]" />                                                   |
| Color       | <Token name="gray.300" themeKey="colors" /> when used as a panel description, otherwise <Token name="gray.100" themeKey="colors" /> |

#### Body

Body is the default text size that should be used for most content. As with all of the type styles, it is optimized to be an ideal size for both mobile and desktop.

In the `semibold` weight it is used as a heading in dense layouts and small objects like [Alerts](/docs/components/compositions/AlertDialog) and [Cards](/docs/components/elements/Card).

In the `medium` weight it used occasionally for subtle emphasis within a component like a cell.

{
<Box py={5} px={6} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Body mb={0}>
    Trusted by the world’s best, Squarespace empowers people with creative ideas
    to succeed.
  </Text.Body>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) when rendering numbers
- Use the `semibold` weight to create headings for detailed sections of views or small objects.
- When used as a heading, remember to set an appropriate heading level using the `as` prop.

| Property    | Value                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Font        | <Token name="fonts.ui" />                                                                                                          |
| Font weight | <Token name="fontWeights.book" />                                                                                                  |
| Font size   | Mobile: <Token name="fontSizes[4]" />, desktop: <Token name="fontSizes[3]" />                                                      |
| Line height | <Token name="lineHeights[2]" />                                                                                                    |
| Color       | Generally <Token name="gray.100" themeKey="colors" />, or <Token name="gray.300" themeKey="colors" /> where deemphasis is required |

#### Caption

The caption style should be used in cases where a smaller descriptor or note is needed, such as an image caption or helper text under inputs.

{
<Box py={5} px={6} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Caption mb={0}>
    Start with any website template and customize it to fit your needs, whether
    you're making a portfolio, blog, or online store.
  </Text.Caption>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use as helper and error copy for form controls
- Use for labelling images and data visualizations
- Use for metadata

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use for large blocks of copy
- Don't use for labels or headings

| Property    | Value                                       |
| ----------- | ------------------------------------------- |
| Font        | <Token name="fonts.ui" />                   |
| Font weight | <Token name="fontWeights.book" />           |
| Font size   | <Token name="fontSizes[2]" />               |
| Line height | <Token name="lineHeights[1]" />             |
| Color       | <Token name="gray.300" themeKey="colors" /> |

#### Label

The label style is used to label indivudial form controls or a small group of related controls.

{
<Box py={5} px={6} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Label mb={0}>All-in-one Platform</Text.Label>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Make sure inputs and groups of related inputs have a visible label
- Make sure the label is associated with its corresponding input in HTML

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use Label as a heading for a large chunk of UI or group of unrelated controls. Instead use Body or Subtitle in the semibold weight.
- Don't make labels too long. See [content guidance](/docs/content-design/style/style-guidelines) for more info.

| Property       | Value                                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| Font           | <Token name="fonts.ui" />                                                     |
| Font weight    | <Token name="fontWeights.medium" />                                           |
| Font size      | Mobile: <Token name="fontSizes[1]" />, desktop: <Token name="fontSizes[0]" /> |
| Line height    | <Token name="lineHeights[0]" />                                               |
| Letter spacing | Mobile: 0.5px, desktop: 0.75px                                                |
| Color          | <Token name="gray.300" themeKey="colors" />                                   |

#### Action

The Action style is for interactive actions, most commonly used in
[Button](/docs/components/primitives/Button)s.

{
<Box py={5} px={6} mt={4} mb={4} border="1px solid" borderColor="gray.800">
  <Text.Action>Get Started</Text.Action>
</Box>
}

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use for any action copy, generally in a Button
- Use clear, concise language that explains the action to the user, preferablyno more than two words

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use action text for style alone. Prefer Label for labelling controls or a heading using Body or Subtitle.

| Property       | Value                                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| Font           | <Token name="fonts.ui" />                                                     |
| Font weight    | <Token name="fontWeights.medium" />                                           |
| Font size      | Mobile: <Token name="fontSizes[3]" />, desktop: <Token name="fontSizes[2]" /> |
| Line height    | <Token name="lineHeights[2]" />                                               |
| Letter spacing | Mobile: 0.25px, desktop: 0.5px                                                |
| Color          | <Token name="gray.100" themeKey="colors" />                                   |

#### Figure

Figure is used to highlight key data in the row Key Figure Cards on dashboard landing pages.

{
<Text.Subtitle as="h4" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use for Key Figure Cards regardless of data type (for example, percentage, number, or text)

{
<Text.Subtitle as="h4" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use the Figure variant for page titles inside of the app
- Don’t link the Figure variant’s text, instead use slots in Key Figure Cards designated for links

| Property    | Value                                                 |
| ----------- | ----------------------------------------------------- |
| Font        | <Token name="fonts.ui" />                             |
| Font weight | Mobile and desktop: <Token name="fontWeights.book" /> |
| Font size   | Mobile and desktop: <Token name="fontSizes[9]" />     |
| Line height | Mobile and desktop: <Token name="lineHeights[6]" />   |
| Color       | <Token name="gray.100" themeKey="colors" />           |
