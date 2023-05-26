import { OrderItem } from "./order-item.model";
import { userDto } from "./userDto";

export class OrderForm {
    constructor(
        public orderItemDtos:OrderItem[],
        public currentUser:userDto
    ){}
}
