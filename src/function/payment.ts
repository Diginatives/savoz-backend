import Stripe from 'stripe';
import User from '../database/model/User';

const DEFAULT_CURRENCY = 'pkr';

const stripeKey = process.env.STRIPE_KEY || '';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2020-08-27',
});

const createCustomer = async (user: User) => {
  return new Promise<string>((resolve, reject) => {
    const fn = async () => {
      try {
        const customer: Stripe.Customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });

        if (customer) {
          resolve(customer.id);
        }
      } catch (err) {
        reject(err);
      }
    };
    fn();
  });
};
const attachCard = async (paymentMethodId: string, customer: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const fn = async () => {
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer,
        });
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    fn();
  });
};

const detachCard = async (cardId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const fn = async () => {
      try {
        await stripe.paymentMethods.detach(cardId);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    fn();
  });
};

const getAllCardData = async (stripeId: string) => {
  return await stripe.customers.listPaymentMethods(stripeId, { type: 'card' });
};

const chargePayment = async (user: any, cardId: string, amount: number) => {
  return new Promise((resolve, reject) => {
    const fn = async () => {
      try {
        const params: any = {
          amount,
          currency: DEFAULT_CURRENCY,
          customer: user.stripeId,
          payment_method: cardId,
          error_on_requires_action: true,
          confirm: true,
        };
        const paymentIntent = await stripe.paymentIntents.create(params);
        resolve(paymentIntent);
      } catch (err) {
        reject(err);
      }
    };
    fn();
  });
};

const createPaymentMethod = async () => {
  return new Promise<boolean>((resolve, reject) => {
    const fn = async () => {
      try {
        const paymentMethod: any = await stripe.paymentMethods.create({
          type: 'card',
          card: {
            number: '4242424242424242',
            exp_month: 3,
            exp_year: 2023,
            cvc: '314',
          },
        });
        if (paymentMethod) {
          console.log('payment method in payment.ts', paymentMethod);
          resolve(paymentMethod.id);
        }
      } catch (err) {
        reject(err);
      }
    };
    fn();
  });
};
export default {
  createCustomer,
  attachCard,
  createPaymentMethod,
  getAllCardData,
  chargePayment,
  detachCard,
};
