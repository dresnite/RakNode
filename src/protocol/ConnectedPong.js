/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const PacketIds = require("./PacketIds");

class ConnectedPong extends Packet {

    sendPingTime;

    sendPongTime;

    getId() {
        return PacketIds.CONNECTED_PONG;
    }

    encodePayload() {
        this.putLong(this.sendPingTime);
        this.putLong(this.sendPongTime);
    }

    decodePayload() {
        this.sendPingTime = this.getLong();
        this.sendPongTime = this.getLong();
    }

}