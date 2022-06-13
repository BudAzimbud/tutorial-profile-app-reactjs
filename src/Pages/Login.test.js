import { render, expect, screen } from "@testing-library/react"
import Login from "./Login"

describe(('testing login page', () => {
    test('test container login ', () => {
        render(<Login />)
    })
}))