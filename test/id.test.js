import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import IdGenerator from '../index.js';
import openSource from '../openSource.js';

// Every library_id_* package implements the same contract, because
// library_common/utility/index.js delegates to whichever one is installed and
// cannot tell them apart. These tests are deliberately near-identical across the
// three packages - a divergence is the defect.
describe('the generator contract', () => {
	it('exposes every member the contract requires', () => {
		for (const member of [ 'generateId', 'generateLongId', 'generateShortId',
			'setAlphabet', 'setLengthLong', 'setLengthShort',
			'translateToShortId', 'translateToId' ])
			assert.equal(typeof IdGenerator[member], 'function', member);
	});

	it('generates a non-empty id', () => {
		for (const member of [ 'generateId', 'generateLongId', 'generateShortId' ]) {
			const id = IdGenerator[member]();
			assert.equal(typeof id, 'string', member);
			assert.ok(id.length > 0, member);
		}
	});

	it('generates a different id each time', () => {
		const ids = new Set();
		for (let i = 0; i < 500; i++)
			ids.add(IdGenerator.generateId());
		assert.equal(ids.size, 500);
	});

	// The round trip is what library_common's translateToId/translateToShortId
	// rely on. short-uuid actually shortens, so this is a real conversion.
	it('round trips an id through the short form', () => {
		const id = IdGenerator.generateLongId();
		const short = IdGenerator.translateToShortId(id);
		assert.equal(typeof short, 'string', 'translateToShortId returns a string');
		assert.equal(IdGenerator.translateToId(short), id);
	});

	it('the setters do not throw, whatever the implementation does with them', () => {
		assert.doesNotThrow(() => IdGenerator.setLengthLong(24));
		assert.doesNotThrow(() => IdGenerator.setLengthShort(8));
		assert.doesNotThrow(() => IdGenerator.setAlphabet(null));
	});
});

describe('short-uuid specifics', () => {
	// Regression: this module did `import shortUUID from 'short-uuid'` and called
	// it. short-uuid v6 replaced the callable default export with named exports, so
	// the module threw `shortUUID is not a function` at import - the whole package
	// could not be loaded.
	it('loads, which it could not against short-uuid v6', () => {
		assert.equal(typeof IdGenerator.generateId, 'function');
	});

	it('generates a uuid for the long form', () => {
		assert.match(IdGenerator.generateLongId(), /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
	});

	it('the short form is genuinely shorter', () => {
		assert.ok(IdGenerator.generateShortId().length < IdGenerator.generateLongId().length);
	});

	it('rejects a value that is not a uuid', () => {
		assert.throws(() => IdGenerator.translateToShortId('not-a-uuid'));
	});
});

describe('openSource', () => {
	it('gives every entry a category, name, url and licence', () => {
		const entries = openSource();
		assert.ok(entries.length > 0);
		for (const entry of entries) {
			assert.ok([ 'client', 'server' ].includes(entry.category), entry.name);
			assert.ok(entry.name);
			assert.ok(entry.url, entry.name);
			assert.ok(entry.licenseName, entry.name);
			assert.ok(entry.licenseUrl, entry.name);
		}
	});

	it('lists this package under both categories', () => {
		const mine = openSource().filter(e => e.name === '@thzero/library_id_shortuuid');
		assert.deepEqual(mine.map(e => e.category).sort(), [ 'client', 'server' ]);
	});
});
