import { Category } from "./category.model";

export class Medicine {
  constructor(
    public id: number,
    public name: string,
    public brand: string,
    public price: number,
    public imageName:string,
    public category:Category
  ) {}
}
