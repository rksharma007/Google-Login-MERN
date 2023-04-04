const express = require("express");
const router = express.Router();
const moment = require('moment');
const config = require('config');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


const User = require('../../models/User');
const Payment = require('../../models/Payment');
const auth = require('../../middleware/auth');

const publicKey = config.get('STRIPE_PUBLIC_KEY');
const secretKey = config.get('STRIPE_SECRET_KEY');
const frontendUrl = config.get('FRONTEND_URL');


const stripe = require('stripe')(secretKey);

router.post('/checkout', auth, async(req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: "Quickreel Pro 1 Month",
        },
    });

    const session = await stripe.checkout.sessions.create({
        // phone_number_collection: {
        //     enabled: true,
        // },
        billing_address_collection: 'required',
        line_items: [
            {
                price: 'price_1Mqi8PSFbBtx5JSwDaEgYgU0',
                quantity: 1
            },
        ],
        mode: 'subscription',
        customer: customer.id,
        currency: 'INR',
        success_url: `${frontendUrl}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/paymentcancelled`,
    });
    
    // res.json(session);    
    // res.status(303).redirect(session.url);
    res.send({ url: session.url });
});

// Save to mongodb
const saveToDB = async (customer, data) => {

  const userId = ObjectId(customer.metadata.userId);
  const user = await User.findById(userId);

  const from_date = moment().format('L');
  const to_date = moment().add(30, 'days').format('L');

  const newPayment = new Payment({
    userid: userId,
    amount: Number(data.amount_total/100),
    currency: data.currency,
    from_date: from_date,
    to_date: to_date,
    stripe_checkout_session_id: data.id,
    stripe_customer_details: data.customer_details,
    stripe_cus_id: customer.id,
    invoice_id: data.invoice,
    stripe_subscription_id: data.subscription,
    payment_status: data.payment_status
  });

  await newPayment.save();
  user.usertype = 'pro';
  user.validTill = to_date,
  await user.save();
}

// Stripe webhoook
router.post('/webhook', async (req, res) => {
      let data;
      let eventType;
      let webhookSecret;
      webhookSecret = config.get('STRIPE_WEBHOOK_ENDPOINT_SECRET');
  
      if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];
  
        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            webhookSecret
          );
        } catch (err) {
          console.log(`⚠️ Webhook signature verification failed:  ${err}`);
          return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
      }
      // Handle the checkout.session.completed event
      if (eventType === "checkout.session.completed") {
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
              // SAVE TO MONGO
              await saveToDB(customer, data);
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => console.log(err.message));
      }
      res.status(200).end();
    }
  );

module.exports = router;