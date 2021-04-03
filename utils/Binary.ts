export {}

declare global {
    interface ArrayBuffer {
        to16String: () => String,
        toString: () => String
    }
    interface String {
        toArrayBuffer: () => ArrayBuffer,
        toHexArray: () => Number[]
    }
    interface Number {
        zeroFill: (length: number) => String,
        packArray: () => Array<Number>
    }
    interface Array<T> {
        toArrayBuffer: () => ArrayBuffer
    }
    interface DataView {
        writeArrayBuffer: (ab: ArrayBuffer, start: Number, end?: Number) => void,
        writeArray: (arr: Array<any>, start: Number, end?: Number) => void,
        singleFill: (data: any, start: Number, end: Number) => void
    }
}
ArrayBuffer.prototype.to16String = function() {
    const u8 = new Uint8Array(this)
    const strs = []
    for(let i = 0; i < u8.length; i++) {
        strs.push(u8[i].toString(16))
    }
    return strs.join('')
}
ArrayBuffer.prototype.toString = function() {
    const u8 = new Uint8Array(this);
    const strs = [];
    for(let i = 0; i < u8.length; i++) {
        strs.push(String.fromCharCode(u8[i]));
    }
    return strs.join('')
}

String.prototype.toArrayBuffer = function() {
    const ab = new ArrayBuffer(this.length);
    const abv = new DataView(ab);
    for(let i = 0; i < this.length; i++) {
        abv.setUint8(i, this.charCodeAt(i));
    }
    return ab;
}
String.prototype.toHexArray = function() {
    const arr = [];
    for(let i = 0; i < (this.length / 2); i++) {
        arr.push(parseInt(this.slice(i * 2, i * 2 + 2), 16));
    }
    return arr;
}

Number.prototype.zeroFill = function(len) {
    return ('0'.repeat(len) + this).slice(-len);
}
Number.prototype.packArray = function() {
    const arr = [];
    let i = this as number;
    while (i) {
        arr.unshift(i % 256);
        i = Math.floor(i / 256);
    }
    return arr;
}

Array.prototype.toArrayBuffer = function() {
    const ab = new ArrayBuffer(this.length);
    const abv = new DataView(ab);
    for (let i = 0; i < this.length; i++) {
        abv.setUint8(i, this[i]);
    }
    return ab;
}

DataView.prototype.writeArrayBuffer = function(ab: ArrayBuffer, s: Number, e?: Number) {
    const start = s as number
    if(e == null) {
        e = ab.byteLength + start
    }
    const end = e as number
    const u8 = new Uint8Array(ab);
    for (let i = start; i < end; i++) {
        this.setUint8(i, u8[i - start]);
    }
}
DataView.prototype.writeArray = function(arr: Array<any>, s: Number, e?: Number) {
    const start = s as number
    if (e == null) {
        e = arr.length + start;
    }
    const end = e as number
    for (let i = start; i < end; i++) {
        this.setUint8(i, arr[i - start]);
    }
}
DataView.prototype.singleFill = function(data: any, start: Number, end: Number) {
    for (let i = start as number; i < end; i++) {
        this.setUint8(i, data);
    }
}