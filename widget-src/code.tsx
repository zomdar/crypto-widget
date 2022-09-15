const { widget } = figma;
const {
  AutoLayout,
  Ellipse,
  Frame,
  Image,
  Rectangle,
  SVG,
  Text,
  useSyncedState,
  useEffect,
  waitForTask,
  usePropertyMenu,
} = widget;

interface Stock {
  name: String;
  symbol: String;
  price: Number;
  change: Number;
  changePercent: Number;
  lastUpdated: Date;
}

function Widget() {
  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Refresh",
        propertyName: "refresh",
      },
      {
        itemType: "action",
        tooltip: "Edit",
        propertyName: "edit",
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "edit") {
        return new Promise((resolve) => {
          figma.showUI(__html__);
          figma.ui.on("message", (msg) => {
            if (msg.type === "stock") {
              setStock(msg.value);
            }
            if (msg.type === "close") {
              figma.closePlugin();
            }
          });
        });
      } else if (propertyName === "refresh") {
        console.log("refresh");
      }
    }
  );

  useEffect(() => {
    if (stock.name.length <= 0) {
      console.log("iniitialized");
    }
  });

  const [stock, setStock] = useSyncedState("stock", {
    name: "",
    symbol: "",
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: new Date(),
  });

  return (
    <AutoLayout
      name="Widget"
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 0,
          y: 6,
        },
        blur: 10,
        showShadowBehindNode: false,
      }}
      fill="#FFF"
      cornerRadius={19}
      overflow="visible"
      direction="vertical"
      spacing={24}
      padding={{
        vertical: 24,
        horizontal: 30,
      }}
    >
      {stock.name === "" ? (
        <Text
          name="Start Here"
          fill="#000"
          fontFamily="Inter"
          fontSize={26}
          fontWeight={700}
          onClick={async () => {
            await new Promise((resolve) => {
              figma.showUI(__html__);
              figma.ui.on("message", (msg) => {
                if (msg.type === "stock") {
                  setStock(msg.value);
                }
                if (msg.type === "close") {
                  figma.closePlugin();
                }
              });
            });
          }}
        >
          Start Here
        </Text>
      ) : (
        <>
          <AutoLayout
            name="stock name and actions"
            overflow="visible"
            spacing={16}
          >
            <AutoLayout
              name="stock name"
              overflow="visible"
              direction="vertical"
            >
              <Text
                name={stock.name}
                fill={"#000000"}
                hoverStyle={{
                  fill: "#FFF",
                }}
                fontFamily="Inter"
                fontSize={19}
                fontWeight={700}
              >
                {stock.name}
              </Text>
              <Text name="Tesla Inc" fill="#A6A6A6" fontFamily="Inter">
                {stock.symbol.toUpperCase()}
              </Text>
            </AutoLayout>
          </AutoLayout>
          <AutoLayout
            name="stock details"
            overflow="visible"
            direction="vertical"
            height={61}
          >
            <Text
              name="price"
              fill="#000"
              fontFamily="Inter"
              fontSize={32}
              fontWeight={700}
            >
              ${stock.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Text>
            <AutoLayout
              name="price"
              overflow="visible"
              spacing="auto"
              width="fill-parent"
              height="fill-parent"
              verticalAlignItems="center"
            >
              <Text
                name="priceChange"
                fill={stock.changePercent > 0 ? "#00C48C" : "#FF4D4F"}
                fontFamily="Inter"
                fontSize={18}
              >
                {stock.changePercent.toFixed(2)}%
              </Text>
              <Frame
                name="trending icons"
                overflow="visible"
                width={24}
                height={24}
              >
                <Frame
                  name="bx:trending-up"
                  width={24}
                  height={24}
                  hidden={Math.sign(stock.changePercent) == 1 ? false : true}
                >
                  <SVG
                    name="Vector"
                    x={{
                      type: "horizontal-scale",
                      leftOffsetPercent: 9.554,
                      rightOffsetPercent: 8.333,
                    }}
                    y={{
                      type: "vertical-scale",
                      topOffsetPercent: 20.833,
                      bottomOffsetPercent: 30.387,
                    }}
                    height={12}
                    width={20}
                    src="<svg width='20' height='12' viewBox='0 0 20 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M8 5.414L12 9.414L17.707 3.707L20 6V0H14L16.293 2.293L12 6.586L8 2.586L0.292999 10.293L1.707 11.707L8 5.414Z' fill='#00C48C'/>
</svg>
"
                  />
                </Frame>
                <Frame
                  hidden={Math.sign(stock.changePercent) == -1 ? false : true}
                  name="bx:trending-down"
                  x={{
                    type: "horizontal-scale",
                    leftOffsetPercent: 0,
                    rightOffsetPercent: 0,
                  }}
                  y={{
                    type: "vertical-scale",
                    topOffsetPercent: 0,
                    bottomOffsetPercent: 0,
                  }}
                  width={24}
                  height={24}
                >
                  <SVG
                    name="Vector"
                    x={{
                      type: "horizontal-scale",
                      leftOffsetPercent: 9.554,
                      rightOffsetPercent: 8.333,
                    }}
                    y={{
                      type: "vertical-scale",
                      topOffsetPercent: 30.388,
                      bottomOffsetPercent: 20.833,
                    }}
                    height={12}
                    width={20}
                    src="<svg width='20' height='12' viewBox='0 0 20 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M12 2.586L8 6.586L1.707 0.292999L0.292999 1.707L8 9.414L12 5.414L16.293 9.707L14 12H20V6L17.707 8.293L12 2.586Z' fill='#FB3434'/>
</svg>
"
                  />
                </Frame>
              </Frame>
            </AutoLayout>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
