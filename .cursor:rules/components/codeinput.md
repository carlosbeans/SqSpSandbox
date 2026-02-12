---
title: Code Input
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import CodeInputProp from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/CodeInput/CodeInput';
import { codeInputStories } from "./CodeInput";

{
<Description>
  The Code Input uses the CodeMirror 6 library to allow users to type code with rich features, such as syntax highlighting.
</Description>
}

<ComponentInformation
  title="CodeInput"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=13238%3A184"
/>

:::info
CodeInput uses CodeMirror 6, which is [documented here](https://codemirror.net/6/).
:::

## Code

### Import

```js
import { CodeInput } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={codeInputStories} />

### Props

<PropTable docs={CodeInputProp} />

## Usage

### General guidance

The Code Input is a special input in a [Cell](/docs/components/elements/Cell) that allows the user to input code with rich features, such as syntax highlighting.

Code Inputs should be used where customers enter custom code for their website.

---

### Anatomy

![Anatomy of a Code Input](./images/anatomy.png)

<AnatomyListItem number="1" title="Line number" description="Optional" />

<AnatomyListItem number="2" title="Line of code" />

<AnatomyListItem
  number="3"
  title="Focus indicator"
  description="Highlighted background to show the user which line they're editing"
/>

<AnatomyListItem number="4" title="Cell" />

---

### Specs

Code Inputs are always displayed in a floating Cell.

#### Label

As with any input, Code Inputs should always have a label.

![Code Input with a label](./images/specs-label.png)

#### Size

Rosetta does not enforce a minimum or maximum width or height of the Code Input, but it should be noted that code editing often requires more space than a standard [Textarea](/docs/components/elements/Textarea/Next). Consider adding additional height to a Code Input, or even an “expand” option to view the Code Input in a larger window.

![Code Input expanded in a Modal](./images/specs-expand.png)

---

### Behavior

#### Language

The Code Input can be rendered with a pre-defined language or with a language selector, depending on the use case. A predefined language is useful for cases like the Custom CSS panel, while a language selector is useful for the Code Block editor.

![Code Input with CSS set as the language](./images/language-preselected.png)

![Code Input with a language selection dropdown](./images/language-dropdown.png)

##### Supported languages

See [CodeMirror's documentation](https://codemirror.net/6/).

## Migration

### From v9.50.0 to v9.50.1

**This upgrade deprecates [CodeMirrorField from Core Components](https://core-components.squarespace.net/core-components/components/CodeMirrorField)
and adds CodeInput to the Rosetta Compositions package.**

CodeMirrorField is no longer supported, but will continue to work as is.
Migration to CodeInput from Rosetta Compositions is strongly encouraged.

---

#### Import updates

##### Old

`import { CodeMirrorField } from '@sqs/core-components'`

##### New

`import { CodeInput } from '@sqs/rosetta-compositions'`

---

#### Usage updates

The CodeInput only replaces the text input area of CodeMirrorField.
In order to replace the language "Type" dropdown and "Display Source" toggle,
please see the [Code Input Pattern](/docs/components/compositions/CodeInput).

The CodeInput also uses [CodeMirror 6](https://codemirror.net/6/),
which is more modular and extensible than previous versions of CodeMirror.
There are a wide variety of extensions available, such as extensions to add
specific languages, line numbers, autocompletion, and syntax highlighting.

---

If you're still unsure on how to migrate your usage of CodeMirrorField to CodeInput,
please reach out in the [#design-platform](https://squarespace.slack.com/archives/CEU9V1K5J) Slack channel.
