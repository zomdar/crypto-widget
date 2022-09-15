import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: "bitcoin" }, "*");
    }
    console.log(parent)
    console.log('hey')
    // if (typeof parent !== undefined) {
    //   parent?.postMessage?.({ pluginMessage: "bitcoin" }, "*");
    // }
  }, []);


  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  return (
    <div className="App">
      <input id="name" type="text" placeholder="Stock Name" />
      <button
        onClick={() => {
          const name = document.getElementById("name") as HTMLInputElement;

          fetch("https://api.coingecko.com/api/v3/coins/" + name.value)
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
                        changePercent: result.market_data.price_change_percentage_24h,
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
        Add Stock
      </button>
    </div>
  );
}

export default App;
