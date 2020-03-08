/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const PacketIds = require("./PacketIds");
const InternetAddress = require("../utils/InternetAddress");
const RakNet = require("../RakNet");

class ConnectionRequestAccepted extends Packet {

    address;

    systemAddresses = [];

    sendPingTime;

    sendPongTime;

    constructor(buffer = "", offset = 0) {
        super(buffer, offset);
        this.systemAddresses.push(new InternetAddress("127.0.0.1", 0, 4));
    }

    getId() {
        return PacketIds.CONNECTION_REQUEST_ACCEPTED;
    }

    encodePayload() {
        this.putAddress(this.address);
        this.putShort(0);

        let dummy = new InternetAddress("0.0.0.0", 0, 4);
        for(let i = 0; i < RakNet.SYSTEM_ADDRESS_COUNT; i++) {
            this.putAddress(this.systemAddresses[i] || dummy);
        }

        this.putLong(this.sendPingTime);
        this.putLong(this.sendPongTime);
    }

    decodePayload() {
        this.address = this.getAddress();
        this.getShort(); // ?

        let length = this.buffer.length;
        let dummy = new InternetAddress("0.0.0.0", 0, 4);

        for(let i = 0; i < RakNet.SYSTEM_ADDRESS_COUNT; i++) {
            this.systemAddresses[i] = (this.offset + 16 < length) ? this.getAddress() : dummy;
        }

        this.sendPingTime = this.getLong();
        this.sendPongTime = this.getLong();
    }

}