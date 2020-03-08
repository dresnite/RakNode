/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

class InternetAddress {

    constructor(ip, port, version) {
        this.ip = ip;
        this.port = port;
        this.version = version;
    }

    toString() {
        return this.ip + ":" + this.port;
    }

    equals(address) {
        return address.ip === this.ip && address.port === this.port;
    }

}

module.exports = InternetAddress;