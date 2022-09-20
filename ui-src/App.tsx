import React, { useEffect, useState } from "react";
import "./App.css";

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
      <input id="name" type="text" placeholder="Stock Name" />
      <button
        className="primary-btn"
        onClick={() => {
          const name = document.getElementById("name") as HTMLInputElement;
          const value = name.value.toLowerCase();

          fetch("https://api.coingecko.com/api/v3/coins/" + value)
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
                        lastUpdated: result.last_updated,
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
