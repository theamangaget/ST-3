import React from 'react';
import '../../Styles/details.css';
import axios from 'axios';
import queryString from 'query-string';
import GooglePayButton from '@google-pay/button-react';
// Class Component
class Details extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          restaurantData: {}
      }
  }

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const restaurantId = qs.restaurant;
    axios(
        {
            method: 'GET',
            url: `https://6310844d826b98071a4364d5.mockapi.io/restaurants/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }
    ).then(response => this.setState({ restaurantData: response.data })).catch()
}

  render(){
    const { restaurantData } = this.state;
    return (<div>
        <div className='d-flex justify-content-center'>
            <img src={restaurantData.image} className="detailMainPic" alt="" />
        </div>
        <div className='DetailHeader d-flex justify-content-between flex-wrap'>
            {restaurantData.name}
            <GooglePayButton
                buttonType='order'
                environment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    }
                    ],
                    merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant',
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: '100.00',
                        currencyCode: 'INR',
                        countryCode: 'IN',
                    },
                }}
                onLoadPaymentData={paymentRequest => {
                    console.log(paymentRequest);
                }}
            />
        </div> 
        <div className='tabs'>
            <div className='tab'>
                <input id="tab-1" type="radio" checked name="tab-group-1" />
                <label for="tab-1">Overview</label>
                <div className="content">
                    <div className="about">About this place</div>
                    <div className="Detailhead">Cuisine</div>
                    <div className="Detailvalue">{restaurantData.cuisine}</div>
                    <div className="Detailhead">Average Cost</div>
                    <div className="Detailvalue">{`${restaurantData.min_price} for two people (approx)`}</div>
                </div>
            </div>
            <div className='tab'>
                <input id="tab-2" type="radio" name="tab-group-1" />
                <label for="tab-2">Contact</label>
                <div className="content">
                    <div className="Detailhead">Phone</div>
                    <div className="Detailvalue">{restaurantData.contact}</div>
                    <div className="Detailhead">Locality</div>
                    <div className="Detailvalue">{`${restaurantData.locality}, ${restaurantData.address}`}</div>
                    <div className="Detailhead">City</div>
                    <div className="Detailvalue">{`${restaurantData.city}`}</div>
                </div>
            </div>
        </div>
    </div>)
   }
}

export default Details;
