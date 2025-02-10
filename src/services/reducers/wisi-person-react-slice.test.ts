import wsUserSlice, {
  initialState as wsInitialState,
  wsUserOpen,
  wsUserError,
  wsUserRequest,
  wsUserClose,
} from "./wisi-person-react-slice";

const sampleBun = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const ingredientOne = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
};

const ingredientTwo = {
  _id: "643d69a5c3f7b9001cfa0940",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v: 0,
};

const mockIngredientsList = {
  success: true,
  data: [sampleBun, ingredientOne, ingredientTwo],
};

const mockOrderInfo = {
  success: true,
  orders: [
    {
      _id: "65d0b04397ede0001d05c948",
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093c",
      ],
      owner: "658556a887899c001b824aff",
      status: "done",
      name: "Краторный люминесцентный бургер",
      createdAt: "2024-02-17T13:10:27.612Z",
      updatedAt: "2024-02-17T13:10:28.088Z",
      number: 34391,
      __v: 0,
    },
  ],
};

const mockWSOrders = {
  success: true,
  orders: [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0944",
        "643d69a5c3f7b9001cfa093d",
      ],
      _id: "65d4eeda97ede0001d05d146",
      status: "done",
      number: 34642,
      name: "Space флюоресцентный традиционный-галактический био-марсианский бургер",
      createdAt: "2024-02-20T18:26:34.135Z",
      updatedAt: "2024-02-20T18:26:34.468Z",
    },
  ],
  total: 34272,
  totalToday: 48,
};

describe("WS Orders Reducer", () => {
  test("WebSocket Open", () => {
    expect(wsUserSlice(wsInitialState, wsUserOpen())).toEqual({
      ...wsInitialState,
      wsConnected: true,
      error: undefined,
    });
  });
  test("WebSocket Error", () => {
    expect(wsUserSlice(wsInitialState, wsUserError("error"))).toEqual({
      ...wsInitialState,
      wsConnected: false,
      error: "error",
    });
  });
  test("WebSocket Request", () => {
    expect(wsUserSlice(wsInitialState, wsUserRequest(mockWSOrders))).toEqual({
      wsConnected: true,
      orders: mockWSOrders.orders,
      error: undefined,
    });
  });
  test("WebSocket Close", () => {
    expect(
      wsUserSlice(
        {
          wsConnected: true,
          orders: mockWSOrders.orders,
          error: undefined,
        },
        wsUserClose()
      )
    ).toEqual(wsInitialState);
  });
});
