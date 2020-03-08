/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

class Session {

    constructor(manager, address) {
        this.manager = manager;
        this.address = address;
        this.closed = true;
    }

    handleMessage(message) {
        if(this.closed) {
            this.manager.closeSession(this.address);
        } else {

        }
    }

}

module.exports = Session;