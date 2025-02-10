
import orderInfoSlice, { initialState as orderInitialState } from "./order-info-handler-slice";

const sampleBun = {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
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
    __v: 0
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
    __v: 0
};

const mockIngredientsList = {
    success: true,
    data: [sampleBun, ingredientOne, ingredientTwo]
};

const mockOrderInfo = {
    success: true,
    orders: [{
        _id: "65d0b04397ede0001d05c948",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093c"
        ],
        owner: "658556a887899c001b824aff",
        status: "done",
        name: "Краторный люминесцентный бургер",
        createdAt: "2024-02-17T13:10:27.612Z",
        updatedAt: "2024-02-17T13:10:28.088Z",
        number: 34391,
        __v: 0
    }]
};

describe("Order Info Reducer", () => {
    test("Fetch Order Information Successfully", () => {
        expect(orderInfoSlice(orderInitialState, {
            type: "orderInfo/get/fulfilled",
            payload: mockOrderInfo
        }))
        .toEqual({
            info: mockOrderInfo.orders[0] ?? null
        });
    });
});