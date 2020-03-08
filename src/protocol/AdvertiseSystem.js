/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const PacketIds = require("./PacketIds");

class AdvertiseSystem extends Packet {

    serverName;

    getId() {
        return PacketIds.ADVERTISE_SYSTEM;
    }

    encodePayload() {
        this.putString(this.serverName);
    }

    decodePayload() {
        this.serverName = this.getString();
    }

}

module.exports = AdvertiseSystem;