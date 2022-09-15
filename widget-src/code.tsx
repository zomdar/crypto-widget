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

const Stock = {
  name: String,
  fullName: String,
  price: Number,
  change: Number,
  changePercent: Number,
  lastUpdated: Date,
};

function Widget() {

  usePropertyMenu(
    [
     {
        itemType: 'action',
        tooltip: 'Refresh',
        propertyName: 'refresh',
      },
      {
        itemType: 'action',
        tooltip: 'Edit',
        propertyName: 'edit',
      },
    ],
    ({propertyName, propertyValue}) => {
      console.log(propertyName, propertyValue)
    },
  )
  const [stock, setStock] = useSyncedState("stock", {
    name: "BTC",
    fullName: "Bitcoin",
    price: 239.91,
    change: 0,
    changePercent: 0.1589,
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
      <AutoLayout name="stock name and actions" overflow="visible" spacing={16}>
        <AutoLayout name="stock name" overflow="visible" direction="vertical">
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
            {stock.fullName.toUpperCase()}
          </Text>
        </AutoLayout>
        <AutoLayout name="action icons" strokeWidth={0.771} overflow="visible">
          <Frame
            name="refresh"
            strokeWidth={0.771}
            width={18.5}
            height={18.5}
            onClick={() => console.log("clicked refresh")}
          >
            <SVG
              name="Vector"
              x={{
                type: "horizontal-scale",
                leftOffsetPercent: 16.6,
                rightOffsetPercent: 16.667,
              }}
              y={{
                type: "vertical-scale",
                topOffsetPercent: 16.667,
                bottomOffsetPercent: 16.667,
              }}
              height={12}
              width={12}
              src="<svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M6.24614 0.0833379C5.09241 0.0817566 3.96137 0.403867 2.98158 1.01306C2.00179 1.62225 1.21255 2.49409 0.703564 3.52948C0.194576 4.56487 -0.0137429 5.72228 0.102285 6.87016C0.218312 8.01805 0.654033 9.11036 1.35992 10.023C2.06581 10.9355 3.01355 11.6318 4.09543 12.0326C5.17731 12.4334 6.34993 12.5227 7.48001 12.2902C8.61009 12.0578 9.6523 11.513 10.4882 10.7178C11.3241 9.92255 11.9201 8.90877 12.2085 7.79167H10.6044C10.3218 8.59118 9.82473 9.29758 9.16766 9.83365C8.51059 10.3697 7.71878 10.7148 6.8788 10.8312C6.03883 10.9476 5.18301 10.8309 4.40493 10.4937C3.62684 10.1565 2.95644 9.61186 2.46701 8.91935C1.97758 8.22684 1.68796 7.4131 1.62982 6.56709C1.57168 5.72108 1.74726 4.87537 2.13736 4.12242C2.52745 3.36947 3.11705 2.73826 3.8417 2.29781C4.56634 1.85735 5.39814 1.6246 6.24614 1.625C6.85269 1.62589 7.45298 1.74769 8.01191 1.98328C8.57084 2.21887 9.07719 2.56352 9.50137 2.99709L7.02083 5.47917H12.4167V0.0833379L10.6044 1.8948C10.0334 1.32028 9.3543 0.864441 8.6063 0.553546C7.8583 0.242651 7.05618 0.0828457 6.24614 0.0833379V0.0833379Z' fill='black'/>
</svg>
"
            />
          </Frame>
          <Frame
            name="edit"
            strokeWidth={0.771}
            width={18.5}
            height={18.5}
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
            <SVG
              name="Vector"
              x={{
                type: "horizontal-scale",
                leftOffsetPercent: 16.649,
                rightOffsetPercent: 16.685,
              }}
              y={{
                type: "vertical-scale",
                topOffsetPercent: 16.907,
                bottomOffsetPercent: 16.667,
              }}
              height={12}
              width={12}
              src="<svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M12.4542 2.65791L10.3421 0.54583C10.0664 0.286904 9.70522 0.138336 9.32715 0.128387C8.94909 0.118438 8.58056 0.247803 8.29167 0.491872L1.35417 7.42937C1.10501 7.68064 0.949872 8.00997 0.914795 8.36208L0.583337 11.5765C0.572953 11.6894 0.587603 11.8032 0.626242 11.9098C0.664882 12.0163 0.726559 12.1131 0.806879 12.1931C0.878905 12.2646 0.964326 12.3211 1.05824 12.3594C1.15216 12.3978 1.25272 12.4173 1.35417 12.4167H1.42355L4.63792 12.1237C4.99003 12.0887 5.31936 11.9335 5.57063 11.6844L12.5081 4.74687C12.7774 4.46241 12.9229 4.08281 12.9128 3.69124C12.9027 3.29968 12.7378 2.9281 12.4542 2.65791V2.65791ZM4.49917 10.5821L2.18667 10.7979L2.3948 8.48541L6.75 4.18416L8.83125 6.26541L4.49917 10.5821ZM9.83334 5.2325L7.7675 3.16666L9.27063 1.625L11.375 3.72937L9.83334 5.2325Z' fill='black'/>
</svg>
"
            />
          </Frame>
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
    </AutoLayout>
  );
}

widget.register(Widget);
