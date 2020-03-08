/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const BinaryStream = require("./BinaryStream");

class Packet extends BinaryStream {

    getId() {
        throw new Error("You must implement Packet.getId()");
    }

    getString() {
        return this.get(this.getShort());
    }

    putString(string) {
        this.putShort(string.length);
        this.put(string);
    }

    encodeHeader() {
        this.putByte(this.getId());
    }

    encodePayload() {
        throw new Error("You must implement Packet.encodePayload()");
    }

    decodeHeader() {
        this.getByte(); // PID
    }

    decodePayload() {
        throw new Error("You must implement Packet.decodePayload()");
    }

    encode() {
        this.offset = 0;
        this.buffer = "";
        this.encodeHeader();
        this.encodePayload();
    }

    decode() {
        this.offset = 0;
        this.decodeHeader();
        this.decodePayload();
    }

}

module.exports = Packet;