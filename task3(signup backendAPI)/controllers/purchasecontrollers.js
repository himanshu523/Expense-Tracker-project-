const Razorpay = require('razorpay');
const Order = require('../model/orders')

// purchase premium
const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_rMidd2cC9D5Umn',
            key_secret: 'B6f0vEghAig1EkFS0B7yC7Fj'
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
 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({ispremium: True});
                console.log(req.user);
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
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