export declare class Long {
    static readonly ZERO: Long;
    static readonly UZERO: Long;
    static readonly ONE: Long;
    static readonly UONE: Long;
    static readonly NEG_ONE: Long;
    static readonly MAX_VALUE: Long;
    static readonly MAX_UNSIGNED_VALUE: Long;
    static readonly MIN_VALUE: Long;
    low: number;
    high: number;
    unsigned: boolean;
    constructor(low: number, high: number, unsigned?: boolean);
    toInt(): number;
    toNumber(): number;
    toString(radix?: number): string;
    getHighBits(): number;
    getHighBitsUnsigned(): number;
    getLowBits(): number;
    getLowBitsUnsigned(): number;
    getNumBitsAbs(): number;
    isZero(): boolean;
    isNegative(): boolean;
    isPositive(): boolean;
    isOdd(): boolean;
    isEven(): boolean;
    equals(other: Long | number | string): boolean;
    notEquals(other: Long | number | string): boolean;
    lessThan(other: Long | number | string): boolean;
    lessThanOrEqual(other: Long | number | string): boolean;
    greaterThan(other: Long | number | string): boolean;
    greaterThanOrEqual(other: Long | number | string): boolean;
    compare(other: Long | number | string): 0 | 1 | -1;
    negate(): Long;
    add(addend: Long | number | string): Long;
    subtract(subtrahend: Long | number | string): Long;
    multiply(multiplier: Long | number | string): Long;
    divide(divisor: Long | number | string): Long;
    modulo(divisor: Long | number | string): Long;
    not(): Long;
    and(other: Long | number | string): Long;
    or(other: Long | number | string): Long;
    xor(other: Long | number | string): Long;
    shiftLeft(numBits: number | Long): Long;
    shiftRight(numBits: number | Long): Long;
    shiftRightUnsigned(numBits: number | Long): Long;
    rotateLeft(numBits: number | Long): Long;
    rotateRight(numBits: number | Long): Long;
    toSigned(): Long;
    toUnsigned(): Long;
    toBytes(le?: boolean): number[];
    toBytesLE(): number[];
    toBytesBE(): number[];
    static fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;
    static fromBytesLE(bytes: number[], unsigned?: boolean): Long;
    static fromBytesBE(bytes: number[], unsigned?: boolean): Long;
    static fromInt(value: number, unsigned?: boolean): Long;
    static fromNumber(value: number, unsigned?: boolean): Long;
    static fromBits(lowBits: number, highBits: number, unsigned?: boolean): Long;
    static fromString(str: string, unsigned?: boolean | number, radix?: number): Long;
    static fromValue(val: Long | number | string | {
        low: number;
        high: number;
        unsigned: boolean;
    }, unsigned?: boolean): Long;
}