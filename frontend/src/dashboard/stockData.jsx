import React, { useEffect } from 'react';
import axios from 'axios';

const StockData = () => {
  useEffect(() => {
    const fetchStockData = async () => {
        const response = await axios.get('http://localhost:5000/api/fetch-stocks');
        // console.log(response);
        return response;
    };

    fetchStockData().then((data)=>{
      // console.log(data)
      // console.log(data.data);
      return data.data;
    }).then((data)=>{
      // console.log(data);
      data.map((data)=>{
        console.log(`(Date: ${data.date}, Close: ${data.close})`);
      })
    })
  }, []);
};

export default StockData;
