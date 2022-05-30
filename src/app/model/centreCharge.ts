import { UAP } from "./uap";

export class centreCharge {
    idCC!: number;
    ccname!: string;
    ccdescription!: string;
    uap! : {
        idUAP: number;
        uapName: string;
        uapDescription: string;
    }
}