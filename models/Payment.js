const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userid'
    },
    amount:{
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        default: null
    },
    to_date: {
        type: String,
        default: null
    },
    stripe_checkout_session_id: {
        type: String,
        required: true
    },
    stripe_customer_details:{
        type: Object,
        required: true
    },
    stripe_cus_id: {
        type: String,
        required: true
    },
    invoice_id: {
        type: String,
        required: true
    },
    stripe_subscription_id: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Payment = mongoose.model('payment', PaymentSchema);