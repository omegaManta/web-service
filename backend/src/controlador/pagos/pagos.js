const { response } = require('express');
const request = require('request');
const client = 'ARbGsLq6Zgkv1j3KnPxS-1ahjlpQ9S63ts2aCX723LFU-TTZQ0T_Xqgtg269hKU0TnNwURwp-rsewDhF';
const secret = 'EBroB7ImaFk_zeZh-AUv8y2JAt2qh6Va3O_ehiYGyiAgtU4oet3iuW7pigw_hAInJ_5AXK9D_FL8i_ay';
const paypal_api = 'https://api-m.sandbox.paypal.com';
const auth = {user: client, pass: secret};







const crearorden = async(req,res) => {
    //const {plata} = req.body;
    const  body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '115' 
            }
        }],
        application_context: {
            brand_name: 'SAOS',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: '',
            cancel_url: ''
        }
    }
    request.post(paypal_api + '/v2/checkout/orders', {
        auth,
        body,
        json: true        
    }
    , (err,response)=>{
        res.json({data: response.body})
    }
)
}



const ejecutarpago = async(req,res) => {
    const token = req.query.token;
    request.post(paypal_api+'/v2/checkout/orders/'+token+'/capture',{
     auth,
     body: {},
     json: true
    }, (err, response) => {
        res.json({data: response.body})
    }
)
}


  
module.exports = {
    crearorden,
    ejecutarpago
}







