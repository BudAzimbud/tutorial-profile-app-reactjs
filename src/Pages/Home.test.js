import { render, screen } from "@testing-library/react"
import Home from "./Home"
import axios from 'axios';

jest.mock('axios');
describe('Home will render', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('Home has container', () => {
        const mockedAxios = jest.spyOn(axios, 'get')
        mockedAxios.mockResolvedValue([
            {
                id: 1,
                name: "azim",
                age: "20"
            }
        ])
        render(<Home />)
        const homeContainer = screen.getByTestId("home")
        const rowprofile = screen.getByTestId("row-profile")
        expect(homeContainer).toHaveClass("container  text-dark")
        expect(rowprofile).toHaveClass("row row-cols-6 gap-4")
        expect(mockedAxios).toBeCalled()
    })
})