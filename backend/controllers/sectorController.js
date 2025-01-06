const symbols = [
  "AAPL", "MSFT", "GOOGL", "NVDA", "ADBE",
  // "JNJ", "PFE", "UNH", "ABT", "MRK",
  // "JPM", "BAC", "V", "BRK.B", "MA",       
  // "XOM", "CVX", "COP", "SLB", "BP",    
  // "AMZN", "TSLA", "HD", "NKE", "SBUX",
  // "PG", "KO", "PEP", "WMT", "CL",         
  // "BA", "CAT", "MMM", "GE", "LMT",      
  // "PLD", "AMT", "SPG", "AVB", "O",       
  // "DD", "FCX", "LIN", "NEM", "ALB",        
  // "NEE", "DUK", "D", "SO", "AEP" 
];

const apikey = "JU3TLRGGEI9NMYHW";

async function fetchData() {
  const stockdata = [];
  for (let i = 0; i < symbols.length; i++) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbols[i]}&apikey=${apikey}`
    );
    stockdata.push(response);
  }

  return stockdata; 
}

fetchData()
  .then((data) => {
    console.log(data[0]);  
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });