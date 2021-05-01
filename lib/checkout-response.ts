export interface CheckoutResponse {
  type: string;
  message?: string;
  sessionId?: string;
  connectStripeAccountId?: string;
  customerEmail?: string;
}
