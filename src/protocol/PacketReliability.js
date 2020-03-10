/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

class PacketReliability {

    static UNRELIABLE = 0;
    static UNRELIABLE_SEQUENCED = 1;
    static RELIABLE = 2;
    static RELIABLE_ORDERED = 3;
    static RELIABLE_SEQUENCED = 4;
    static UNRELIABLE_WITH_ACK_RECEIPT = 5;
    static RELIABLE_WITH_ACK_RECEIPT = 6;
    static RELIABLE_ORDERED_WITH_ACK_RECEIPT = 7;

    static isReliable(reliability) {
        return reliability === this.RELIABLE || reliability === this.RELIABLE_ORDERED || reliability === this.RELIABLE_SEQUENCED || reliability === this.RELIABLE_WITH_ACK_RECEIPT || reliability === this.RELIABLE_ORDERED_WITH_ACK_RECEIPT;
    }

    static isSequenced(reliability) {
        return reliability === this.RELIABLE_SEQUENCED || reliability === this.UNRELIABLE_SEQUENCED;
    }

    static isOrdered(reliability) {
        return reliability === this.RELIABLE_ORDERED || reliability === this.RELIABLE_ORDERED_WITH_ACK_RECEIPT;
    }

    static isSequencedOrOrdered(reliability) {
        return this.isSequenced(reliability) || this.isOrdered(reliability);
    }
    
}

module.exports = PacketReliability;