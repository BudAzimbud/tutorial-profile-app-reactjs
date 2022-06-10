import { getByAltText, render, screen } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import router from './index'
import Home from "../Pages/Home"
import ProfileDetail from "../Pages/ProfileDetail"

describe('its testing route', () => {
    test('route / will redirect to home', () => {
        const history = createMemoryHistory()
        const route = '/'
        history.push(route)
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        expect(screen.getByTestId("home")).toBeInTheDocument()
        expect(route).toEqual(router[0].path)
    })
    test('route /profile/:id will redirect to detail profile', () => {
        const history = createMemoryHistory()
        const route = '/profile/1'
        history.push(route)
        render(
            <Router location={history.location} navigator={history}>
                <ProfileDetail />
            </Router>
        )

        expect(screen.getByTestId("profile-detail")).toBeInTheDocument()
    })
})

