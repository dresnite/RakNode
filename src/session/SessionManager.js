/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const InternetAddress = require("../utils/InternetAddress");
const Session = require("./Session");

class SessionManager {

    sessions = [];

    /**
     * @param {InternetAddress} address
     */
    openSession(address) {
        this.sessions[address.toString()] = new Session(address);
    }

    /**
     * @param {InternetAddress} address
     */
    closeSession(address) {
        delete this.sessions[address.toString()];
    }

    /**
     * @param message
     * @param address {InternetAddress}
     */
    handleMessage(message, address) {
        let sessionIndex = address.toString();
        let session = this.sessions[sessionIndex];
        if(session instanceof Session) {
            session.handleMessage(message);
        } else {
            this.openSession(address);
        }
    }

}

module.exports = SessionManager;