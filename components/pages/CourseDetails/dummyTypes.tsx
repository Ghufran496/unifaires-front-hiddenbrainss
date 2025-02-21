export const paymentGateways: any = {
  Germany: {
    card: "Stripe Germany",
    bank: "Stripe Germany Bank",
    currency: "EUR",
  },
  France: {
    card: "Stripe France",
    bank: "Stripe France Bank",
    currency: "EUR",
  },
  USA: { card: "Stripe USA", bank: "Stripe USA Bank", currency: "USD" },
  Canada: {
    card: "Stripe Canada",
    bank: "Stripe Canada Bank",
    currency: "CAD",
  },
  Brazil: {
    card: "Stripe Brazil",
    bank: "Stripe Brazil Bank",
    currency: "BRL",
  },
};

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  EXPIRED = "expired",
}

export enum TransactionType {
  PAYFUNDS = "payfunds",
  ADDFUNDS = "addfunds",
  SENDFUNDS = "sendfunds",
  WITHDRAWFUNDS = "withdrawfunds",
  TRANSFERFUNDS = "transferfunds",
}

type BillingAddress = {
  city: string;
  country: string;
  postalCode: string;
  stateProvince: string;
  streetAddress: string;
};

export type TransactionResponse = {
  id: string;
  paymentStatus: PaymentStatus;
  transactionAmount: string;
  transactionId: string;
  transactionType: TransactionType;
  billingAddress: BillingAddress;
  createdAt: string;
  updatedAt: string;
};

export const transactionDetails: TransactionResponse[] = [
  {
    id: "1",
    transactionAmount: "243.00",
    paymentStatus: PaymentStatus.SUCCESS,
    transactionId: "txn_1",
    transactionType: TransactionType.PAYFUNDS,
    createdAt: "2025-02-19T23:38:23.000Z",
    updatedAt: "2025-02-19T23:38:23.000Z",
    billingAddress: {
      city: "New York",
      country: "USA",
      postalCode: "10001",
      stateProvince: "NY",
      streetAddress: "123 Main St",
    },
  },
  {
    id: "2",
    transactionAmount: "150.00",
    paymentStatus: PaymentStatus.PENDING,
    transactionId: "txn_2",
    transactionType: TransactionType.ADDFUNDS,
    createdAt: "2025-02-20T10:15:00.000Z",
    updatedAt: "2025-02-20T10:15:00.000Z",
    billingAddress: {
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
      stateProvince: "CA",
      streetAddress: "456 Elm St",
    },
  },
  {
    id: "3",
    transactionAmount: "89.99",
    paymentStatus: PaymentStatus.FAILED,
    transactionId: "txn_3",
    transactionType: TransactionType.SENDFUNDS,
    createdAt: "2025-02-21T15:45:30.000Z",
    updatedAt: "2025-02-21T15:45:30.000Z",
    billingAddress: {
      city: "Chicago",
      country: "USA",
      postalCode: "60601",
      stateProvince: "IL",
      streetAddress: "789 Oak St",
    },
  },
  {
    id: "4",
    transactionAmount: "500.00",
    paymentStatus: PaymentStatus.EXPIRED,
    transactionId: "txn_4",
    transactionType: TransactionType.WITHDRAWFUNDS,
    createdAt: "2025-02-22T08:20:45.000Z",
    updatedAt: "2025-02-22T08:20:45.000Z",
    billingAddress: {
      city: "San Francisco",
      country: "USA",
      postalCode: "94101",
      stateProvince: "CA",
      streetAddress: "101 Pine St",
    },
  },
];
