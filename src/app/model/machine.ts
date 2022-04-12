import { category } from "./category";
import { LaodCharge } from "./LaodCharge";

export class machine {
    idMachine!: number;
    machineName!: string;
    machineDescription!: string;
    machineCategory!: category;
    loadCharge! : LaodCharge
}