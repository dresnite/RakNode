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
    /** @type {InternetAddress} */
    _address;
    /** @type {SessionManager} */
    _sessionManager = new SessionManager();

    constructor(address) {
        this._address = address;
        this.start();
    }

    start() {
        this._socket = dgram.createSocket("udp4");
        this._socket.bind(this._address.port, this._address.ip);

        this._socket.on("message", function(payload, remoteInfo) {
            this._sessionManager.handleMessage(payload, new InternetAddress(remoteInfo.ip, remoteInfo.port, 4));
        });
    }

    close() {
        this._socket.close();
    }

}

module.exports = RakNetServer;