import { FieldValue } from "firebase/firestore";

export class Account {
  userId: string;
  userName: string | null;
  totalPercentage: {
    lastUpdated: FieldValue;
    value: number;
  };

  constructor(account: Account) {
    this.userId = account.userId;
    this.userName = account.userName;
    this.totalPercentage = account.totalPercentage;
  }
}
