export interface UserDetails {
  name: string | null;
  username: string;
  user_id: string;
  email: string | null;
}

export type Card = {
  id: number;
  issuer: string;
  name: string;
  expDate: string;
  lastDigits: number;
  balance: string;
  currency: string;
};

export type Transaction = {
  id: number;
  title: string;
  amount: string;
  transactionType: "SUS" | "CASH_IN" | "CASH_OUT";
  date: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
