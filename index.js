import { createTranslator } from 'short-uuid';
import { v4 as uuidv4 } from 'uuid';

// short-uuid v6 replaced the callable default export with named exports;
// createTranslator() is what shortUUID() used to return.
const uuidTranslator = createTranslator();

class IdUtility {
	static generateId() {
		return IdUtility.generateLongId();
	}

	static generateLongId() {
		return uuidv4();
	}

	static generateShortId() {
		return uuidTranslator.fromUUID(uuidv4());
	}

	static setAlphabet(alphabet) {
	}

	static setLengthLong(length) {
	}

	static setLengthShort(length) {
	}

	static translateToShortId(id) {
		return uuidTranslator.fromUUID(id);
	}

	static translateToId(id) {
		return uuidTranslator.toUUID(id);
	}
}

export default IdUtility;
