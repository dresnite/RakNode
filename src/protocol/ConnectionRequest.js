/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const PacketIds = require("./PacketIds");

class ConnectedRequest extends Packet {

    clientId;

    sendPingTime;

    useSecurity = false;

    getId() {
        return PacketIds.CONNECTION_REQUEST;
    }

    encodePayload() {
        this.putLong(this.clientId);
        this.putLong(this.sendPingTime);
        this.putBoolean(this.useSecurity);
    }

    decodePayload() {
        this.clientId = this.getLong();
        this.sendPingTime = this.getLong();
        this.useSecurity = this.getBoolean();
    }

}