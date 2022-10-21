import React, { useEffect, useState } from "react";
import "./App.css";

// url to hit
// price: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true
// list of coin info: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc
// list of coin symbols: https://api.coingecko.com/api/v3/simple/supported_vs_currencies
// list of price changes to plot on graph: https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1

function App() {
  useEffect(() => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: "bitcoin" }, "*");
    }
  }, []);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  return (
    <div className="App">
      <input className="crypto-name-input" id="name" type="text" placeholder="Crypto Name" />
      <button
        className="primary-btn"
        onClick={() => {
          const name = document.getElementById("name") as HTMLInputElement;
          const value = name.value.toLowerCase();


          fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=usd&include_24hr_change=true`)
            .then((res) => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setItems(result);
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "stock",
                      value: {
                        name: result.name,
                        symbol: result.symbol,
                        price: result.market_data.current_price.usd,
                        change: result.market_data.price_change_24h,
                        changePercent:
                          result.market_data.price_change_percentage_24h,
                        lastUpdated: Date.now(),
                      },
                    },
                  },
                  "*"
                );
                parent.postMessage({ pluginMessage: { type: "close" } }, "*");
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            );
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
