import { v4 as uuidv4 } from "uuid";
import { WalletProps } from "../../types";

export class Wallet {
  id: string;
  userId: string;
  name: string;
  percentage: string;

  constructor(wallet: WalletProps) {
    this.id = uuidv4();
    this.userId = wallet.userId;
    this.name = wallet.name;
    this.percentage = wallet.percentage;
  }
}
