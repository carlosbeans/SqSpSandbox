---
title: Table
---

import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { Description } from '@site/src/components/Markdown/Description';

{
<Description>
Tables display large amounts of data in rows and columns, and allow the user
to quickly sort and compare the data.
</Description>
}

<ComponentInformation
  title="Table"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6445%3A1"
/>

![The new Rosetta Table](./images/table.png)

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
<RelatedLink name="Tutorials" description="Learn how to build tables step by step, from basic to complex features and patterns." url="/docs/components/compositions/Table/Tutorials" />

<RelatedLink name="Core Concepts" description="Learn about the TanStack Table Core Concepts behind the new Rosetta Table." url="/docs/components/compositions/Table/CoreConcepts" />

<RelatedLink name="Examples" description="These examples showcase all the Table features." url="/docs/components/compositions/Table/Examples" />

<RelatedLink name="Props" description="Table & features props" url="/docs/components/compositions/Table/Props" />

<RelatedLink name="FAQ" description="Frequently asked questions about the new Rosetta Table component." url="/docs/components/compositions/Table/FAQ" />

<RelatedLink name="Patterns" description="These proposed patterns can be used with Table features." url="/docs/components/compositions/Table/patterns/CustomPageHeader" />

<RelatedLink name="Migration" description="Learn how to migrate your old tables to the newest Rosetta Tables." url="/docs/components/compositions/Table/MigrationGuide" />

<RelatedLink name="Office hours" description="Visit us during Office hours with all your table questions and projects." url="/docs/components/compositions/Table/OfficeHours" />
</Box>
}
