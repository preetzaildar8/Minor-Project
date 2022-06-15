import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams , useNavigate} from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import "./bookinfo.css";

const BookInfo = () => {

    const navigate = useNavigate()

  let getLocalStorage = localStorage.getItem("user")
  if(getLocalStorage) {

    getLocalStorage = JSON.parse(getLocalStorage)
  }
  

    const [inputs, setInputs] = useState();
    const id = useParams().id;
    useEffect(() => {
      const fetchHandler = async () => {
        await axios
          .get(`/books/${id}`)
          .then((res) => res.data)
          .then((data) => setInputs(data.book));
      };
      fetchHandler();
    }, [id]);

    async function handleToken(token) {
      const response = await axios.post('/books/purchaseBook',{token,product:inputs,id:getLocalStorage?._id})
      if(response?.status === 200) {
        alert('Payment successfull')
      } else {
        alert('Payment Failed')
      }
    }


  return <div>
      {inputs && (
      <>
      <div className="book-main">
        <div className="left">
          <img src={inputs.image} alt={inputs.name} />
        </div>
        <div className="right">
          <h2>{inputs.name}</h2>
          <h3>{inputs.author}</h3>
          <h3>{inputs.department}</h3>
          <p>{inputs.description}</p>
          <h2>₹ {inputs.price}</h2>
        </div>
      </div></>)}
      <center>{getLocalStorage ? <StripeCheckout 
      stripeKey="pk_test_51L7iujFgj2yb4nAN46LMCrHPruDR6iJ17nVAlCoSfYq6YrNm9vkNvU3oHUx5QL9nxo9lpLHGKCdug1utEsQgXJAN00Lz4WOTys"
      token={handleToken}
      currency="INR"
      shippingAddress
      amount={inputs?.price * 100}
      name={inputs?.name}
      /> : <button 
      onClick={() => navigate("/login")}
      style={{
        backgroundImage: 'linear-gradient(rgb(125, 197, 238), rgb(0, 140, 221) 85%, rgb(48, 162, 228))',
        fontSize: '14px',
        position: 'relative',
        padding: '0px 12px',
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        color: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        boxShadow: 'rgb(255 255 255 / 25%) 0px 1px 0px inset',
        textShadow: 'rgb(0 0 0 / 25%) 0px -1px 0px',
        borderRadius: '4px',

      }}> Pay with Card</button>}</center>
      </div>;
};

export default BookInfo;
