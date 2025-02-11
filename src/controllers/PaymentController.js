//import fetch from 'node-fetch';
import db from "../models/index.js";
import Sequelize from "sequelize";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const addTransaction = async (req, res) => {
  try {
    const { id, account, isSuccess, order_id, pay_method, fullName } = req.body;
    await db.Transaction.create({
      id,
      account,
      isSuccess,
      fullName,
      order_id,
      pay_method,
    });
    return res.status(200).json({ message: "Thêm mới thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Thêm giao dich thất bại" });
  }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, orderInfo, listCart } = req.body;
    const customer = await stripe.customers.create({
      metadata: {
        orderInfo: JSON.stringify(orderInfo),
        listCart: JSON.stringify(listCart),
      },
    });
    if (!customer || !customer?.id)
      return res.status(400).json({ message: "Invalid stripe customer" });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products?.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round((product.price * 100) / 25000),
        },
        quantity: 1,
      })),
      mode: "payment",
      customer: customer.id,
      success_url: process.env.CLIENT_URL + "/order-confirmed",
      cancel_url: process.env.CLIENT_URL + "/cart",
    });
    return res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Thêm giao dich thất bại" });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const api_url = req.protocol + "://" + req.get("host") + "/api";
  try {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret = process.env.WEBHOOK_SECRET;
    console.log(req.body);

    if (!webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      const customer = await stripe.customers.retrieve(data.customer);
      if (customer) {
        const { metadata, email } = customer;
        const headers = new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        });
        const response = await fetch(api_url + "/order/add", {
          method: "POST",
          body: new URLSearchParams(JSON.parse(metadata.orderInfo)),
          headers,
        });
        const data = await response.json();
        console.log("data: ", data);

        if (!data || data?.type === "error")
          return res
            .status(400)
            .json({ type: "error", message: "Failed transaction" });
        JSON.parse(metadata.listCart).forEach(async (cartItem) => {
          const orderDetail = {
            order_id: data.result.id,
            product_id: cartItem.id,
            price: cartItem.price * cartItem.quantity,
            quantity: cartItem.quantity,
          };
          await fetch(api_url + "/orderDetail/add", {
            method: "POST",
            body: new URLSearchParams(orderDetail),
            headers,
          });
        });
        await fetch(api_url + "/payment", {
          method: "POST",
          body: new URLSearchParams({
            id: req.body.id,
            order_id: data?.result.id,
            account: email,
            isSuccess: req.body.type === "checkout.session.completed",
            pay_method: 3,
          }),
          headers,
        });
        res.status(200).end();
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Thêm giao dich thất bại", error });
  }
};

//stripe listen --forward-to localhost:8000/api/payment/webhooks
