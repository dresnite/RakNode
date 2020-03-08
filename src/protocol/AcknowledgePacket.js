/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const Packet = require("./Packet");
const BinaryStream = require("./BinaryStream");

class AcknowledgePacket extends Packet {

    RECORD_TYPE_RANGE = 0;
    RECORD_TYPE_SINGLE = 1;

    packets = [];

    encodePayload() {
        let stream = new BinaryStream();
        this.packets.sort(function(a, b) {
            return a - b;
        });
        let length = this.packets.length;
        let records = 0;

        if(length > 0) {
            let pointer = 1;
            let start = this.packets[0];
            let last = this.packets[0];

            while(pointer < length) {
                let current = this.packets[pointer++];
                let diff = current - last;
                if(diff === 1) {
                    last = current;
                } else if(diff > 1) {
                    if(start === last) {
                        stream.putByte(this.RECORD_TYPE_SINGLE);
                        stream.putLTriad(last);
                        start = last = current;
                    } else {
                        stream.putByte(this.RECORD_TYPE_RANGE);
                        stream.putLTriad(start);
                        stream.putLTriad(last);
                        start = last = current;
                    }
                    records++;
                }
            }

            if(start === last) {
                stream.putByte(this.RECORD_TYPE_SINGLE);
                stream.putLTriad(start);
            } else {
                stream.putByte(this.RECORD_TYPE_RANGE);
                stream.putLTriad(start);
                stream.putLTriad(last);
            }

            ++records;
        }

        this.putShort(records);
        this.buffer.put(stream);
    }

    decodePayload() {
        let count = this.getShort();
        this.packets = [];
        let cnt = 0;
        for(let i = 0; i < count && this.hasOffsetReachedEnd() && cnt < 4096; ++i) {
            if(this.getByte() === this.RECORD_TYPE_RANGE) {
                let start = this.getLTriad();
                let end = this.getLTriad();
                if((end - start) > 512) {
                    end = start + 512;
                }
                for(let c = start; c < end; ++c) {
                    this.packets[cnt++] = c;
                }
            } else {
                this.packets[cnt++] = this.getLTriad();
            }
        }
    }

}

module.exports = AcknowledgePacket;