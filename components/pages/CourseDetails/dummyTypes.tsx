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
