/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const PacketIds = require("./PacketIds");

class ConnectedPing extends Packet {

    sendPingTime;

    getId() {
        return PacketIds.CONNECTED_PING;
    }

    encodePayload() {
        this.putLong(this.sendPingTime);
    }

    decodePayload() {
        this.sendPingTime = this.getLong();
    }

}