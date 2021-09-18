import { Long } from "./long";

describe("long-ts tests", () => {
	test("basic", () => {
		expect.assertions(5);

		const longVal = new Long(0xffffffff, 0x7fffffff);
		expect(longVal.toNumber()).toBe(9223372036854775807);
		expect(longVal.toString()).toBe("9223372036854775807");

		const longVal2 = Long.fromValue(longVal);
		expect(longVal2.toNumber()).toBe(9223372036854775807);
		expect(longVal2.toString()).toBe("9223372036854775807");
		expect(longVal2.unsigned).toBe(longVal.unsigned);
	});

	test("toString", () => {
		expect.assertions(5);

		const longVal = Long.fromBits(0xffffffff, 0xffffffff, true);
		// #10
		expect(longVal.toString(16)).toBe("ffffffffffffffff");
		expect(longVal.toString(10)).toBe("18446744073709551615");
		expect(longVal.toString(8)).toBe("1777777777777777777777");
		// #7, obviously wrong in goog.math.Long
		expect(Long.fromString("zzzzzz", 36).toString(36)).toBe("zzzzzz");
		expect(Long.fromString("-zzzzzz", 36).toString(36)).toBe("-zzzzzz");
	});

	test("toBytes", () => {
		expect.assertions(2);

		const longVal = Long.fromBits(0x01234567, 0x12345678);
		expect(longVal.toBytesBE()).toStrictEqual([
			0x12, 0x34, 0x56, 0x78, 0x01, 0x23, 0x45, 0x67,
		]);
		expect(longVal.toBytesLE()).toStrictEqual([
			0x67, 0x45, 0x23, 0x01, 0x78, 0x56, 0x34, 0x12,
		]);
	});

	test("fromBytes", () => {
		expect.assertions(5);

		const longVal = Long.fromBits(0x01234567, 0x12345678);
		const ulongVal = Long.fromBits(0x01234567, 0x12345678, true);
		expect(Long.fromBytes(longVal.toBytes())).toStrictEqual(longVal);
		expect(
			Long.fromBytes([0x12, 0x34, 0x56, 0x78, 0x01, 0x23, 0x45, 0x67])
		).toStrictEqual(longVal);
		expect(
			Long.fromBytes(
				[0x12, 0x34, 0x56, 0x78, 0x01, 0x23, 0x45, 0x67],
				false,
				false
			)
		).toStrictEqual(longVal);
		expect(
			Long.fromBytes(
				[0x67, 0x45, 0x23, 0x01, 0x78, 0x56, 0x34, 0x12],
				false,
				true
			)
		).toStrictEqual(longVal);
		expect(
			Long.fromBytes(
				[0x67, 0x45, 0x23, 0x01, 0x78, 0x56, 0x34, 0x12],
				true,
				true
			)
		).toStrictEqual(ulongVal);
	});

	test("unsignedMinMax", () => {
		expect.assertions(3);

		expect(Long.MIN_VALUE.toString()).toBe("-9223372036854775808");
		expect(Long.MAX_VALUE.toString()).toBe("9223372036854775807");
		expect(Long.MAX_UNSIGNED_VALUE.toString()).toBe("18446744073709551615");
	});

	test("unsignedConstructNegint", () => {
		expect.assertions(5);

		const longVal = Long.fromInt(-1, true);
		expect(longVal.low).toBe(-1);
		expect(longVal.high).toBe(-1);
		expect(longVal.unsigned).toBe(true);
		expect(longVal.toNumber()).toBe(18446744073709551615);
		expect(longVal.toString()).toBe("18446744073709551615");
	});

	test("unsignedConstructHighLow", () => {
		expect.assertions(5);

		const longVal = new Long(0xffffffff, 0xffffffff, true);
		expect(longVal.low).toBe(-1);
		expect(longVal.high).toBe(-1);
		expect(longVal.unsigned).toBe(true);
		expect(longVal.toNumber()).toBe(18446744073709551615);
		expect(longVal.toString()).toBe("18446744073709551615");
	});

	test("unsignedConstructNumber", () => {
		expect.assertions(5);

		const longVal = Long.fromNumber(0xffffffffffffffff, true);
		expect(longVal.low).toBe(-1);
		expect(longVal.high).toBe(-1);
		expect(longVal.unsigned).toBe(true);
		expect(longVal.toNumber()).toBe(18446744073709551615);
		expect(longVal.toString()).toBe("18446744073709551615");
	});

	test("unsignedToSignedUnsigned", () => {
		expect.assertions(4);

		let longVal = Long.fromNumber(-1, false);
		expect(longVal.toNumber()).toBe(-1);
		longVal = longVal.toUnsigned();
		expect(longVal.toNumber()).toBe(0xffffffffffffffff);
		expect(longVal.toString(16)).toBe("ffffffffffffffff");
		longVal = longVal.toSigned();
		expect(longVal.toNumber()).toBe(-1);
	});

	test("unsignedMaxSubMaxSigned", () => {
		expect.assertions(2);

		const longVal = Long.MAX_UNSIGNED_VALUE.subtract(Long.MAX_VALUE).subtract(
			Long.ONE
		);
		expect(longVal.toNumber()).toBe(Long.MAX_VALUE.toNumber());
		expect(longVal.toString()).toBe(Long.MAX_VALUE.toString());
	});

	test("unsignedMaxSubMax", () => {
		expect.assertions(5);

		const longVal = Long.MAX_UNSIGNED_VALUE.subtract(Long.MAX_UNSIGNED_VALUE);
		expect(longVal.low).toBe(0);
		expect(longVal.high).toBe(0);
		expect(longVal.unsigned).toBe(true);
		expect(longVal.toNumber()).toBe(0);
		expect(longVal.toString()).toBe("0");
	});

	test("unsignedZeroSubSigned", () => {
		expect.assertions(5);

		const longVal = Long.fromInt(0, true).add(Long.fromInt(-1, false));
		expect(longVal.low).toBe(-1);
		expect(longVal.high).toBe(-1);
		expect(longVal.unsigned).toBe(true);
		expect(longVal.toNumber()).toBe(18446744073709551615);
		expect(longVal.toString()).toBe("18446744073709551615");
	});

	test("unsignedMaxDivMaxSigned", () => {
		expect.assertions(2);

		const longVal = Long.MAX_UNSIGNED_VALUE.divide(Long.MAX_VALUE);
		expect(longVal.toNumber()).toBe(2);
		expect(longVal.toString()).toBe("2");
	});

	test("unsignedDivMaxUnsigned", () => {
		expect.assertions(1);

		const longVal = Long.MAX_UNSIGNED_VALUE;
		expect(longVal.divide(longVal).toString()).toBe("1");
	});

	test("unsignedDivNegSigned", () => {
		expect.assertions(2);

		const a = Long.MAX_UNSIGNED_VALUE;
		const b = Long.fromInt(-2);
		expect(b.toUnsigned().toString()).toBe(
			Long.MAX_UNSIGNED_VALUE.subtract(1).toString()
		);
		const longVal = a.divide(b);
		expect(longVal.toString()).toBe("1");
	});

	test("unsignedMinSignedDivOne", () => {
		expect.assertions(1);

		const longVal = Long.MIN_VALUE.divide(Long.ONE);
		expect(longVal.toString()).toBe(Long.MIN_VALUE.toString());
	});

	test("unsignedMsbUnsigned", () => {
		expect.assertions(3);

		const longVal = Long.UONE.shiftLeft(63);
		expect(longVal.notEquals(Long.MIN_VALUE)).toBe(true);
		expect(longVal.toString()).toBe("9223372036854775808");
		expect(Long.fromString("9223372036854775808", true).toString()).toBe(
			"9223372036854775808"
		);
	});

	test("issue31", () => {
		expect.assertions(4);

		const a = new Long(0, 8, true);
		const b = Long.fromNumber(2656901066, true);
		expect(a.unsigned).toBe(true);
		expect(b.unsigned).toBe(true);
		const x = a.divide(b);
		expect(x.toString()).toBe("12");
		expect(x.unsigned).toBe(true);
	});

	test("rotateLeft", () => {
		expect.assertions(3);

		const longVal = Long.fromBits(0x01234567, 0x89abcdef);
		const longValL = Long.fromBits(0x12345678, 0x9abcdef0);
		const longValR = Long.fromBits(0xf0123456, 0x789abcde);
		const longValS = Long.fromBits(0x89abcdef, 0x01234567);
		// little rotate
		let v = longVal.rotateLeft(4);
		expect(v).toStrictEqual(longValL);
		// big rotate
		v = longVal.rotateLeft(60);
		expect(v).toStrictEqual(longValR);
		// swap
		v = longVal.rotateLeft(32);
		expect(v).toStrictEqual(longValS);
	});

	test("rotateRight", () => {
		expect.assertions(3);

		const longVal = Long.fromBits(0x01234567, 0x89abcdef);
		const longValL = Long.fromBits(0x12345678, 0x9abcdef0);
		const longValR = Long.fromBits(0xf0123456, 0x789abcde);
		const longValS = Long.fromBits(0x89abcdef, 0x01234567);
		// little rotate
		let v = longVal.rotateRight(4);
		expect(v).toStrictEqual(longValR);
		// big rotate
		v = longVal.rotateRight(60);
		expect(v).toStrictEqual(longValL);
		// swap
		v = longVal.rotateRight(32);
		expect(v).toStrictEqual(longValS);
	});
});
