import { Serial } from "../records/serial";


export class SerialsContainer {
    private serialById: Map<number, Serial> = new Map();
    private serials: Array<Serial> = new Array();

    public addOrUpdate(id: number, name: string, off_site: string, mark: number): void {
        let serial: Serial = this.serialById.get(id);
        if (serial) {
            serial.name = name;
            serial.official_site = off_site;
            serial.mark = mark;
        }
        else {
            this.add(new Serial(id, name, off_site, mark));
        }
    }

    public getSerial(id: number): Serial {
        let serial: Serial = this.serialById.get(id);
        if (!serial) {
            serial = new Serial(id);
            this.add(serial);
        }
        return serial;
    }

    private add(serial: Serial): void {
        this.serialById.set(serial.id, serial);
        this.serials.push(serial);
    }

    public removeById(id: number): Serial {
        let serial: Serial = this.serialById.get(id);
        this.serialById.delete(id);
        let index = this.serials.indexOf(serial);
        if (index >= 0) this.serials.splice(index, 1);
        return serial;
    }

    public isExists(id: number): boolean {
        return this.serialById.get(id) ? true : false;
    }

    public getSerials(): Array<Serial> {
        return this.serials;
    }
}