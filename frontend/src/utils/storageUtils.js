// Function to store stock data in local storage
export const storeStockData = (data) => {
    localStorage.setItem('stockData', JSON.stringify(data));
  };
  
  // Function to retrieve stock data from local storage
  export const getStockData = () => {
    const data = localStorage.getItem('stockData');
    return data ? JSON.parse(data) : null;
  };
  
  // Function to clear stock data from local storage
  export const clearStockData = () => {
    localStorage.removeItem('stockData');
  };
  