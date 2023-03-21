class IdUtility {
	static generateId() {
		// return uuidv4();
		return Utility.generateShortId();
	}

	static generateLongId() {
		return uuidv4();
	}

	static generateShortId() {
		return nano
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
