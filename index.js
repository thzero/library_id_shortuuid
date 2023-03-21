import shortUUID from 'short-uuid';
import { v4 as uuidv4 } from 'uuid';

const uuidTranslator = shortUUID();

class IdUtility {
	static generateId() {
		return uuidTranslator.fromUUID(uuidv4());
	}

	static generateLongId() {
		return uuidTranslator.fromUUID(uuidv4());
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
