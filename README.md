# @astii/compare-version
with it you can compare versions, get the next version and more

## Install

```typeScript
npm install @astii/compare-version --save

```

or

```typeScript
yarn add @astii/compare-version
```

## Usage

```typeScript
import { compareVersions, getNextVersion } from '@astii/compare-version'
compareVersions("1.0.0", "1.0.1") //-1
compareVersions("1.0.0", "1.0.0") //0
compareVersions("1.0.1", "1.0.0") //1
const nextVersion = getNextVersion("1.0.0") //1.0.1
```