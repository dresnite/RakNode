/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

class InternetAddress {
    /** @type {string} */
    ip;
    /** @type {number} */
    port;
    /** @type {number} */
    version;

    /**
     * @param ip {string}
     * @param port {number}
     * @param version {number}
     */
    constructor(ip, port, version) {
        if (port < 0 || port > 65535) {
            throw new Error(`Invalid port: ${port}, allowed range 0 - 65535`);
        }
        this.ip = ip;
        this.port = port;
        this.version = version;
    }

    /**
     * @return {string}
     */
    getIp() {
        return this.ip;
    }

    /**
     * @return {number}
     */
    getPort() {
        return this.port;
    }

    /**
     * @return {number}
     */
    getVersion() {
        return this.version;
    }

    /**
     * TODO: function to hash them
     *
     * @deprecated
     * @return {string}
     */
    toString() {
        return this.ip + ":" + this.port;
    }

    /**
     * @param address {InternetAddress}
     * @return {boolean}
     */
    equals(address) {
        return address.ip === this.ip && address.port === this.port;
    }

}
module.exports = InternetAddress;