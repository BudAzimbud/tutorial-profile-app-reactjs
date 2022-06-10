import formatDate from "./formatDate"
import getAge from "./getAge"

describe('test helper function', () => {
    test('test formatDate', () => {
        const date = new Date('2022-12-12')
        const format = formatDate(date)
        expect(format).toEqual("12 desember 2022")
    })

    test('test getAge', () => {
        const age = getAge(new Date("2003-01-01"))
        expect(age).toEqual(19)
    })
})