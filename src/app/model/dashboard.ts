import { Time } from "@angular/common";

export class dashboard{
  id !: number;
  date!: Date;
  testeurId!: number;
  quantiteConforme !: number;
  quantiteNonConforme !: number;
  dureeFonctionnementSeconde !: number;
  dureeDisfonctionnementSeconde !: number;
  dureeFonctionnement !: Time;
  dureeDisfonctionnement!: Time;
  database !: string;
  startTime !: Date;
  finishTime !: Date;
}