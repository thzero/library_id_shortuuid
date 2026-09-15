![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_id_shortuuid)
![David](https://img.shields.io/david/thzero/library_id_shortuuid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_id_shortuuid

Id generation for [@thzero/library_common](https://github.com/thzero/library_common),
backed by [uuid](https://github.com/uuidjs/uuid) and
[short-uuid](https://github.com/oculus42/short-uuid).

The only one of the three implementations whose short form is a **real, lossless
conversion** — a 36-character uuid v4 becomes 22 characters and converts back
exactly. Use this one when ids go in a url or a QR code but must remain uuids in
the database.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+

### Installation

[![NPM](https://nodei.co/npm/@thzero/library_id_shortuuid.png?compact=true)](https://npmjs.org/package/@thzero/library_id_shortuuid)

```
npm install @thzero/library_id_shortuuid
```

#### Peer dependencies

None. `uuid` and `short-uuid` are direct dependencies.

## What it provides

`index.js` — default export `IdUtility`, a class of statics implementing the
generator contract `library_common` delegates to.

| Member | Behaviour |
|---|---|
| `generateId()` | `generateLongId()` |
| `generateLongId()` | A uuid v4 — 36 characters |
| `generateShortId()` | That uuid shortened — 22 characters |
| `translateToShortId(id)` | uuid → short form |
| `translateToId(short)` | short form → uuid |
| `setAlphabet`, `setLengthLong`, `setLengthShort` | **No-ops.** Present for contract compatibility; uuid length and alphabet are fixed |

`translateToShortId` **throws** on anything that is not a uuid — it is a
conversion, not a passthrough. That is the opposite of
[library_id_nanoid](https://github.com/thzero/library_id_nanoid) and
[library_id_uuid](https://github.com/thzero/library_id_uuid), where both
directions are identity and accept anything.

`openSource.js` — a default-exported function returning the licence manifest for
this package, `uuid` and `short-uuid`, under both the `client` and `server`
categories.

### short-uuid v6

short-uuid v6 removed the callable default export that v4 had. This package uses
the current API:

```js
import { createTranslator } from 'short-uuid';
const uuidTranslator = createTranslator();
```

If you pin an older `short-uuid`, that import breaks. The package requires
`^6.0.3`.

## Configuration

None. This package reads no configuration, and the three setters are no-ops
because a uuid's shape is fixed.

## Wiring it up

```js
import IdGenerator from '@thzero/library_id_shortuuid';

Utility.setIdGenerator(IdGenerator);
```

On the server, through `BootMain`:

```js
import IdGenerator from '@thzero/library_id_shortuuid';

class AppBootMain extends BootMain {
    _initIdGenerator() {
        return IdGenerator;
    }
}
```

`_initIdGeneratorAlphabet`, `_initIdGeneratorLengthLong` and
`_initIdGeneratorLengthShort` have no effect with this generator.

### Storing ids

Store the long form and convert at the boundary. Storing the short form means
every lookup pays a conversion and any id that reaches the database by another
route will not match.

## Development

```
npm run lint       # eslint .
npm run lint:fix   # eslint . --fix
npm test           # node --test "test/*.test.js"
```
