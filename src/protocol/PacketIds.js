/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

class PacketIds {

    static CONNECTED_PING = 0x00;
    static UNCONNECTED_PING = 0x01;
    static UNCONNECTED_PING_OPEN_CONNECTIONS = 0x02;
    static CONNECTED_PONG = 0x03;
    static OPEN_CONNECTION_REQUEST_1 = 0x05;
    static OPEN_CONNECTION_REPLY_1 = 0x06;
    static OPEN_CONNECTION_REQUEST_2 = 0x07;
    static OPEN_CONNECTION_REPLY_2 = 0x08;
    static CONNECTION_REQUEST = 0x09;
    static CONNECTION_REQUEST_ACCEPTED = 0x10;
    static NEW_INCOMING_CONNECTION = 0x13;
    static DISCONNECTION_NOTIFICATION = 0x15;
    static INCOMPATIBLE_PROTOCOL_VERSION = 0x19;
    static UNCONNECTED_PONG = 0x1c;
    static ADVERTISE_SYSTEM = 0x1d;
    static USER_PACKET_ENUM = 0x86;

}

module.exports = PacketIds;