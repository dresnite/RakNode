/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const InternetAddress = require("../utils/InternetAddress");
const Network = require("locutus/php/network");

const MAX_UINT32 = 0xFFFFFFFF;
const AF_INET6 = 10;

class BinaryStream {

    constructor(buffer = "", offset = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }

    getByte() {
        return this.buffer.readUInt8(this.getOffsetThenIncrease(1));
    }

    putByte(byte) {
        this.put(Buffer.from([byte & 0xff]));
    }

    getBoolean() {
        return this.getByte() === 1;
    }

    putBoolean(boolean) {
        this.putByte(boolean === true ? 1 : 0);
    }

    getShort() {
        return this.buffer.readUInt16BE(this.getOffsetThenIncrease(2));
    }

    putShort(short) {
        let buffer = Buffer.alloc(2);
        buffer.writeUInt16BE(short, 0);
        this.put(buffer);
    }

    getSignedShort() {
        return this.buffer.readInt16BE(this.getOffsetThenIncrease(2));
    }

    putSignedShort(short) {
        let buffer = Buffer.alloc(2);
        buffer.writeInt16BE(short, 0);
        this.put(buffer);
    }

    getLShort() {
        return this.buffer.readUInt16LE(this.getOffsetThenIncrease(2));
    }

    putLShort(short) {
        let buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(short, 0);
        this.put(buffer);
    }

    getSignedLShort() {
        return this.buffer.readInt16LE(this.getOffsetThenIncrease(2));
    }

    putSignedLShort(short) {
        let buffer = Buffer.alloc(2);
        buffer.writeInt16LE(short, 0);
        this.put(buffer);
    }

    getTriad() {
        return this.buffer.readUIntBE(this.getOffsetThenIncrease(3), 3);
    }

    putTriad(triad) {
        let buffer = Buffer.alloc(3);
        buffer.writeUIntBE(triad, 0, 3);
        this.put(buffer);
    }

    getLTriad() {
        return this.buffer.readUIntLE(this.getOffsetThenIncrease(3), 3);
    }

    putLTriad(triad) {
        let buffer = Buffer.alloc(3);
        buffer.writeUIntLE(triad, 0, 3);
        this.put(buffer);
    }

    getInt() {
        return this.buffer.readInt32BE(this.getOffsetThenIncrease(4));
    }

    putInt(int) {
        let buffer = Buffer.alloc(4);
        buffer.writeInt32BE(int, 0);
        this.put(buffer);
    }

    getLInt() {
        return this.buffer.readInt32LE(this.getOffsetThenIncrease(4));
    }

    putLInt(int) {
        let buffer = Buffer.alloc(4);
        buffer.writeInt32LE(int, 0);
        this.put(buffer);
    }

    getFloat() {
        return this.buffer.readFloatBE(this.getOffsetThenIncrease(4));
    }

    putFloat(float) {
        let buffer = Buffer.alloc(4);
        buffer.writeFloatBE(float, 0);
        this.put(buffer);
    }

    getLFloat() {
        return this.buffer.readFloatLE(this.getOffsetThenIncrease(4));
    }

    putLFloat(float) {
        let buffer = Buffer.alloc(4);
        buffer.writeFloatLE(float, 0);
        this.put(float);
    }

    getDouble() {
        return this.buffer.readDoubleBE(this.getOffsetThenIncrease(8));
    }

    putDouble(double) {
        let buffer = Buffer.alloc(8);
        buffer.writeDoubleBE(double, 0);
        this.put(buffer);
    }

    getLDouble() {
        return this.buffer.readDoubleLE(this.getOffsetThenIncrease(8));
    }

    putLDouble(double) {
        let buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(double, 0);
        this.put(buffer);
    }

    getLong() {
        return (this.buffer.readUInt32BE(this.getOffsetThenIncrease(4)) << 8) + this.buffer.readUInt32BE(this.getOffsetThenIncrease(4));
    }

    putLong(long) {
        let buffer = Buffer.alloc(8);
        buffer.writeUInt32BE((~~(long / MAX_UINT32)), 0);
        buffer.writeUInt32BE((long & MAX_UINT32), 4);
        this.put(buffer);
    }

    getLLong() {
        return this.buffer.readUInt32LE(0) + (this.buffer.readUInt32LE(4) << 8);
    }

    putLLong(long) {
        let buffer = Buffer.alloc(8);
        buffer.writeUInt32LE((long & MAX_UINT32), 0);
        buffer.writeUInt32LE((~~(long / MAX_UINT32)), 4);
        this.put(buffer);
    }

    getUnsignedVarInt() {
        let value = 0;

        for(let i = 0; i <= 35; i += 7) {
            let b = this.getByte();
            value |= ((b & 0x7f) << i);
            if((b & 0x80) === 0) {
                return value;
            }
        }

        return 0;
    }

    putUnsignedVarInt(int) {
        let stream = new BinaryStream();

        for(let i = 0; i < 5; i++) {
            if((int >> 7) !== 0) {
                stream.putByte(int | 0x80);
            } else {
                stream.putByte(int & 0x7f);
                break;
            }
            int >>= 7;
        }

        this.put(stream.buffer);
    }

    getVarInt() {
        let raw = this.getUnsignedVarInt();
        let tmp = (((raw << 63) >> 63) ^ raw) >> 1;
        return tmp ^ (raw & (1 << 63));
    }

    putVarInt(int) {
        int <<= 32 >> 32;
        return this.putUnsignedVarInt((int << 1) ^ (int >> 31));
    }

    getUnsignedVarLong() {
        let value = 0;

        for(let i = 0; i <= 63; i += 7) {
            let b = this.getByte();
            value |= ((b & 0x7f) << i);

            if((b & 0x80) === 0) {
                return value;
            }
        }

        return 0;
    }

    putUnsignedVarLong(long) {
        for(let i = 0; i < 10; i++) {
            if((long >> 7) !== 0) {
                this.putByte(long | 0x80);
            } else {
                this.putByte(long & 0x7f);
                break;
            }
            long >>= 7;
        }

        return this;
    }

    getVarLong() {
        let raw = this.getUnsignedVarLong();
        let tmp = (((raw << 63) >> 63) ^ raw) >> 1;
        return tmp ^ (raw & (1 << 63));
    }

    putVarLong(long) {
        return this.putUnsignedVarLong((long << 1) ^ (long >> 63));
    }

    getAddress() {
        let ip;
        let port;
        let version = this.getByte();
        switch(version){
            case 4:
                ip = (this.getByte() & 0xFF) + "." + (this.getByte() & 0xFF) + "." + (this.getByte() & 0xFF) + "." + (this.getByte() & 0xFF);
                port = this.getShort();
                break;
            case 6:
                this.getLShort();
                port = this.getShort();
                this.getInt();
                let byteAddress = "";
                for(let i = this.offset; i < this.offset + 16; i++) {
                    byteAddress = byteAddress.concat(this.buffer[i].toString());
                }
                ip = Network.inet_ntop(this.get(16));
                this.getInt();
                break;
            default:
                throw new Error(`IPv${version} is not compatible with RakNode`)
        }

        return new InternetAddress(ip, port, version);
    }

    /**
     * @param {InternetAddress} address
     */
    putAddress(address) {
        this.putByte(address.version);

        switch(address.version) {
            case 4:
                address.ip.split(".", 4).forEach(part => this.putByte((Number(b)) & 0xff));
                this.putShort(address.port);
                break;
            case 6:
                this.putLShort(AF_INET6);
                this.putShort(address.port);
                this.putInt(0);
                this.put(Network.inet_pton(address.ip));
                this.putInt(0);
                break;
            default:
                throw new Error(`IPv${address.version} is not supported by RakNode!`);
        }
    }

    getOffsetThenIncrease(bytes) {
        let offset = this.offset;
        this.offset += bytes;
        return offset;
    }

    get(length){
        let initialOffset = this.offset;
        this.offset += length;
        return this.buffer.slice(initialOffset, this.offset);
    }

    put(buffer) {
        if(buffer instanceof Buffer){
            this.buffer = Buffer.concat([this.buffer, buffer]);
            this.offset += buffer.length;
        }else if(typeof buffer === "string"){
            buffer = Buffer.from(buffer, "hex");
            this.buffer = Buffer.concat([this.buffer, buffer]);
            this.offset += buffer.length;
        }else if(Array.isArray(buffer)){
            buffer = Buffer.from(buffer);
            this.buffer = Buffer.concat([this.buffer, buffer]);
            this.offset += buffer.length;
        }
        return this;
    }

    reset() {
        this.buffer = "";
        this.offset = 0;
    }

    hasOffsetReachedEnd() {
        return typeof this.buffer[this.offset] !== "undefined";
    }

}

module.exports = BinaryStream;