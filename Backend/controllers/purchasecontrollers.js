const Razorpay = require('razorpay');
const Order = require('../model/orders')
require('dotenv').config();
const userControllers=require('./usercontrollers');

// purchase premium
const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RZP_key_id,
            key_secret: process.env.RZP_key_id
        })
        const amount =200000;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                console.log(err);
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

// update Transaction Status
 const updateTransactionStatus = async(req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
         const order = await Order.findOne({where : {orderid : order_id}});
         const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL'});
         const promise2 = req.user.update({ispremium:true});
        
         Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success: true, message: "Transaction Successful",token:userControllers.generateAccessToken(userId,undefined,true)});
         })
         .catch((err)=> {
                throw new Error(err);
            })
        
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}