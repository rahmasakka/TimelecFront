import { Time } from "@angular/common";

export class mechanicalAssembly {
    idMechanicalAssembly!: number;
    serialNo!: string;
    partNo!: string
    revision!: string
    productName!: string
    maDate!: Date
    maStartTime!: Time
    manufactoringOrder!: string
    packingStatus!: boolean
    nbReworks!: number
    packingOperator!: string
    nbRepacks!: number
}