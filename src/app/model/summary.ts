import { mechanicalAssembly } from "./mechanicalAssembly";

export class summary {
    IdSummary!: number;
    testerID!: number;
    testStatus!: boolean;
    siteCode!: String;
    operatorName!: string;
    vlo!: string;
    testSoftVersion!: string;
    testStartTime!: Date;
    clientSerialNo!: string;
    testIndex!: number;
    reworkIndex!: number;
    mechanicalAssembly!: mechanicalAssembly
}