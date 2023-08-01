import { FieldValue } from "firebase/firestore";

export class User {
  id: string;
  name: string | null;
  totalAccountPercentage: {
    lastUpdated: FieldValue;
    value: number;
  };

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.totalAccountPercentage = user.totalAccountPercentage;
  }
}
