const t={},i={};class s{constructor(t,i,s=!1){this.low=void 0,this.high=void 0,this.unsigned=void 0,this.low=0|t,this.high=0|i,this.unsigned=s}toInt(){return this.unsigned?this.low>>>0:this.low}toNumber(){return this.unsigned?(this.high>>>0)*e+(this.low>>>0):this.high*e+(this.low>>>0)}toString(t=10){if(t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.equals(s.MIN_VALUE)){const i=s.fromNumber(t),e=this.divide(i),h=e.multiply(i).subtract(this);return e.toString(t)+h.toInt().toString(t)}return"-"+this.negate().toString(t)}const i=s.fromNumber(Math.pow(t,6),this.unsigned);let e="",h=this;for(;;){const s=h.divide(i);let r=(h.subtract(s.multiply(i)).toInt()>>>0).toString(t);if(h=s,h.isZero())return r+e;for(;r.length<6;)r="0"+r;e=""+r+e}}getHighBits(){return this.high}getHighBitsUnsigned(){return this.high>>>0}getLowBits(){return this.low}getLowBitsUnsigned(){return this.low>>>0}getNumBitsAbs(){if(this.isNegative())return this.equals(s.MIN_VALUE)?64:this.negate().getNumBitsAbs();const t=0!=this.high?this.high:this.low;let i;for(i=31;i>0&&0==(t&1<<i);i--);return 0!=this.high?i+33:i+1}isZero(){return 0===this.high&&0===this.low}isNegative(){return!this.unsigned&&this.high<0}isPositive(){return this.unsigned||this.high>=0}isOdd(){return 1==(1&this.low)}isEven(){return 0==(1&this.low)}equals(t){return t instanceof s||(t=s.fromValue(t)),(this.unsigned===t.unsigned||this.high>>>31!=1||t.high>>>31!=1)&&this.high===t.high&&this.low===t.low}notEquals(t){return!this.equals(t)}lessThan(t){return this.compare(t)<0}lessThanOrEqual(t){return this.compare(t)<=0}greaterThan(t){return this.compare(t)>0}greaterThanOrEqual(t){return this.compare(t)>=0}compare(t){if(t instanceof s||(t=s.fromValue(t)),this.equals(t))return 0;const i=this.isNegative(),e=t.isNegative();return i&&!e?-1:!i&&e?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.subtract(t).isNegative()?-1:1}negate(){return!this.unsigned&&this.equals(s.MIN_VALUE)?s.MIN_VALUE:this.not().add(s.ONE)}add(t){t instanceof s||(t=s.fromValue(t));let i=0,e=0,h=0,r=0;return r+=(65535&this.low)+(65535&t.low),h+=r>>>16,r&=65535,h+=(this.low>>>16)+(t.low>>>16),e+=h>>>16,h&=65535,e+=(65535&this.high)+(65535&t.high),i+=e>>>16,e&=65535,i+=(this.high>>>16)+(t.high>>>16),i&=65535,s.fromBits(h<<16|r,i<<16|e,this.unsigned)}subtract(t){return t instanceof s||(t=s.fromValue(t)),this.add(t.negate())}multiply(t){if(this.isZero())return s.ZERO;if(t instanceof s||(t=s.fromValue(t)),t.isZero())return s.ZERO;if(this.equals(s.MIN_VALUE))return t.isOdd()?s.MIN_VALUE:s.ZERO;if(t.equals(s.MIN_VALUE))return this.isOdd()?s.MIN_VALUE:s.ZERO;if(this.isNegative())return t.isNegative()?this.negate().multiply(t.negate()):this.negate().multiply(t).negate();if(t.isNegative())return this.multiply(t.negate()).negate();if(this.lessThan(n)&&t.lessThan(n))return s.fromNumber(this.toNumber()*t.toNumber(),this.unsigned);const i=65535&this.high,e=this.low>>>16,h=65535&this.low,r=65535&t.high,o=t.low>>>16,u=65535&t.low;let g=0,f=0,a=0,l=0;return l+=h*u,a+=l>>>16,l&=65535,a+=e*u,f+=a>>>16,a&=65535,a+=h*o,f+=a>>>16,a&=65535,f+=i*u,g+=f>>>16,f&=65535,f+=e*o,g+=f>>>16,f&=65535,f+=h*r,g+=f>>>16,f&=65535,g+=(this.high>>>16)*u+i*o+e*r+h*(t.high>>>16),g&=65535,s.fromBits(a<<16|l,g<<16|f,this.unsigned)}divide(t){if(t instanceof s||(t=s.fromValue(t)),t.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?s.UZERO:s.ZERO;let i,e,h;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.greaterThan(this))return s.UZERO;if(t.greaterThan(this.shiftRightUnsigned(1)))return s.UONE;h=s.UZERO}else{if(this.equals(s.MIN_VALUE))return t.equals(s.ONE)||t.equals(s.NEG_ONE)?s.MIN_VALUE:t.equals(s.MIN_VALUE)?s.ONE:(i=this.shiftRight(1).divide(t).shiftLeft(1),i.equals(s.ZERO)?t.isNegative()?s.ONE:s.NEG_ONE:(e=this.subtract(t.multiply(i)),h=i.add(e.divide(t)),h));if(t.equals(s.MIN_VALUE))return this.unsigned?s.UZERO:s.ZERO;if(this.isNegative())return t.isNegative()?this.negate().divide(t.negate()):this.negate().divide(t).negate();if(t.isNegative())return this.divide(t.negate()).negate();h=s.ZERO}for(e=this;e.greaterThanOrEqual(t);){i=Math.max(1,Math.floor(e.toNumber()/t.toNumber()));const r=Math.ceil(Math.log(i)/Math.LN2),n=r<=48?1:Math.pow(2,r-48);let o=s.fromNumber(i),u=o.multiply(t);for(;u.isNegative()||u.greaterThan(e);)i-=n,o=s.fromNumber(i,this.unsigned),u=o.multiply(t);o.isZero()&&(o=s.ONE),h=h.add(o),e=e.subtract(u)}return h}modulo(t){return t instanceof s||(t=s.fromValue(t)),this.subtract(this.divide(t).multiply(t))}not(){return s.fromBits(~this.low,~this.high,this.unsigned)}and(t){return t instanceof s||(t=s.fromValue(t)),s.fromBits(this.low&t.low,this.high&t.high,this.unsigned)}or(t){return t instanceof s||(t=s.fromValue(t)),s.fromBits(this.low|t.low,this.high|t.high,this.unsigned)}xor(t){return t instanceof s||(t=s.fromValue(t)),s.fromBits(this.low^t.low,this.high^t.high,this.unsigned)}shiftLeft(t){return t instanceof s&&(t=t.toInt()),0==(t&=63)?this:t<32?s.fromBits(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):s.fromBits(0,this.low<<t-32,this.unsigned)}shiftRight(t){return t instanceof s&&(t=t.toInt()),0==(t&=63)?this:t<32?s.fromBits(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):s.fromBits(this.high>>t-32,this.high>=0?0:-1,this.unsigned)}shiftRightUnsigned(t){return t instanceof s&&(t=t.toInt()),0==(t&=63)?this:t<32?s.fromBits(this.low>>>t|this.high<<32-t,this.high>>>t,this.unsigned):s.fromBits(32===t?this.high:this.high>>>t-32,0,this.unsigned)}rotateLeft(t){let i;return t instanceof s&&(t=t.toInt()),0==(t&=63)?this:32===t?s.fromBits(this.high,this.low,this.unsigned):t<32?(i=32-t,s.fromBits(this.low<<t|this.high>>>i,this.high<<t|this.low>>>i,this.unsigned)):(i=32-(t-=32),s.fromBits(this.high<<t|this.low>>>i,this.low<<t|this.high>>>i,this.unsigned))}rotateRight(t){let i;return t instanceof s&&(t=t.toInt()),0==(t&=63)?this:32===t?s.fromBits(this.high,this.low,this.unsigned):t<32?(i=32-t,s.fromBits(this.high<<i|this.low>>>t,this.low<<i|this.high>>>t,this.unsigned)):(i=32-(t-=32),s.fromBits(this.low<<i|this.high>>>t,this.high<<i|this.low>>>t,this.unsigned))}toSigned(){return this.unsigned?s.fromBits(this.low,this.high,!1):this}toUnsigned(){return this.unsigned?this:s.fromBits(this.low,this.high,!0)}toBytes(t){return t?this.toBytesLE():this.toBytesBE()}toBytesLE(){const t=this.high,i=this.low;return[255&i,i>>>8&255,i>>>16&255,i>>>24,255&t,t>>>8&255,t>>>16&255,t>>>24]}toBytesBE(){const t=this.high,i=this.low;return[t>>>24,t>>>16&255,t>>>8&255,255&t,i>>>24,i>>>16&255,i>>>8&255,255&i]}static fromBytes(t,i,e){return e?s.fromBytesLE(t,i):s.fromBytesBE(t,i)}static fromBytesLE(t,i){return new s(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,i)}static fromBytesBE(t,i){return new s(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],i)}static fromInt(e,h){let r;if(h){if(r=0<=(e>>>=0)&&e<256){const t=i[e];if(t)return t}const t=s.fromBits(e,(0|e)<0?-1:0,!0);return r&&(i[e]=t),t}{if(r=-128<=(e|=0)&&e<128){const i=t[e];if(i)return i}const i=s.fromBits(e,e<0?-1:0,!1);return r&&(t[e]=i),i}}static fromNumber(t,i){if(isNaN(t))return i?s.UZERO:s.ZERO;if(i){if(t<0)return s.UZERO;if(t>=h)return s.MAX_UNSIGNED_VALUE}else{if(t<=-r)return s.MIN_VALUE;if(t+1>=r)return s.MAX_VALUE}return t<0?s.fromNumber(-t,i).negate():s.fromBits(t%e|0,t/e|0,i)}static fromBits(t,i,e){return new s(t,i,e)}static fromString(t,i,e){if(0===t.length)throw Error("empty string");if("NaN"===t||"Infinity"===t||"+Infinity"===t||"-Infinity"===t)return s.ZERO;if("number"==typeof i?(e=i,i=!1):i=!!i,(e=e||10)<2||36<e)throw RangeError("radix");let h;if((h=t.indexOf("-"))>0)throw Error("interior hyphen");if(0===h)return s.fromString(t.substring(1),i,e).negate();const r=s.fromNumber(Math.pow(e,8));let n=s.ZERO;for(let i=0;i<t.length;i+=8){const h=Math.min(8,t.length-i),o=parseInt(t.substring(i,i+h),e);if(h<8){const t=s.fromNumber(Math.pow(e,h));n=n.multiply(t).add(s.fromNumber(o))}else n=n.multiply(r),n=n.add(s.fromNumber(o))}return n.unsigned=i,n}static fromValue(t,i){return"number"==typeof t?s.fromNumber(t,i):"string"==typeof t?s.fromString(t,i):s.fromBits(t.low,t.high,"boolean"==typeof i?i:t.unsigned)}}s.ZERO=s.fromInt(0),s.UZERO=s.fromInt(0,!0),s.ONE=s.fromInt(1),s.UONE=s.fromInt(1,!0),s.NEG_ONE=s.fromInt(-1),s.MAX_VALUE=s.fromBits(-1,2147483647,!1),s.MAX_UNSIGNED_VALUE=s.fromBits(-1,-1,!0),s.MIN_VALUE=s.fromBits(0,-2147483648,!1);const e=4294967296,h=e*e,r=h/2,n=s.fromInt(1<<24);export{s as Long};
//# sourceMappingURL=long.modern.js.map