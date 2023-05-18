import { Medicine } from "./medicine.model";

export class OrderItem {
    constructor(
        public medicineDto:Medicine,
        public quantity:number
    ){}
}
