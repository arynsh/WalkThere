import { lifeExpectancy } from '../src/lifeExpectancy';

describe("Life expectancy", ()=> {

    test("should correctly return life expectances depending on user country and sex", ()=> {
        expect(lifeExpectancy('female', 'Russia')).toEqual("76.3");
        expect(lifeExpectancy('male', 'Angola')).toEqual("50.9");
        expect(lifeExpectancy('male', 'Japan')).toEqual("80.5");
    }) 
})