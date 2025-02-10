import burgerConstructorSlice, {
    addFilling,
    clearConstructor,
    initialState,
    moveFillingElement,
    removeFillingElement,
    setBun
} from "./constructor-slice";

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

describe("Burger Constructor Reducer", () => {
    test("Assign Bun", () => {
        expect(burgerConstructorSlice(initialState, setBun(sampleBun)))
            .toEqual({
                ...initialState,
                bun: sampleBun,
            });
    });
    
    test("Insert Filling", () => {
        expect(burgerConstructorSlice(initialState, addFilling(ingredientOne)))
            .toEqual({
                ...initialState,
                filling: [ingredientOne]
            });
    });
    
    test("Include Second Filling", () => {
        expect(
            burgerConstructorSlice(
                { ...initialState, filling: [ingredientOne] },
                addFilling(ingredientTwo)
            )
        )
            .toEqual({
                ...initialState,
                filling: [ingredientOne, ingredientTwo]
            });
    });
    
    test("Reorder Filling Items", () => {
        expect(
            burgerConstructorSlice(
                { ...initialState, filling: [ingredientOne, ingredientTwo] },
                moveFillingElement({
                    indexFrom: 1,
                    indexTo: 0,
                    ingredient: ingredientTwo
                })
            )
        )
            .toEqual({
                ...initialState,
                filling: [ingredientTwo, ingredientOne]
            });
    });
    
    test("Delete Filling Item", () => {
        expect(
            burgerConstructorSlice(
                { ...initialState, filling: [ingredientOne, ingredientTwo] },
                removeFillingElement(1)
            )
        )
            .toEqual({
                ...initialState,
                filling: [ingredientOne]
            });
    });
    
    test("Reset Constructor", () => {
        expect(
            burgerConstructorSlice(
                { ...initialState, filling: [ingredientOne] },
                clearConstructor()
            )
        )
            .toEqual({
                ...initialState
            });
    });
});