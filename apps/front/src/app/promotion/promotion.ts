import { PromotionStudent } from '../Interface/interface';

export class Promotion {
  constructor(
    public id: number,
    public name: string,
    public startDate: Date,
    public endDate: Date,
    public students: PromotionStudent[],
  ) {}
}
