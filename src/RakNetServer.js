/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const SessionManager = require("./session/SessionManager");
const InternetAddress = require("./utils/InternetAddress");
const dgram = require("dgram");

class RakNetServer {

    constructor(address) {
        this.address = address;
        this.sessionManager = new SessionManager();
        this.start();
    }

    start() {
        this.socket = dgram.createSocket("udp4");
        this.socket.bind(this.address.port, this.address.ip);

        this.socket.on("message", function(payload, remoteInfo) {
            this.sessionManager.handleMessage(payload, new InternetAddress(remoteInfo.ip, remoteInfo.port));
        });
    }

    close() {
        this.socket.close();
    }

}

module.exports = RakNetServer;