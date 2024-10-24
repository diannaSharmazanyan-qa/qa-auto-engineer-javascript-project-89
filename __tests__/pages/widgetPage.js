import userEvent from "@testing-library/user-event";
import {validSteps} from "../../__fixtures__/validSteps.js";
import {screen, waitFor} from "@testing-library/react";
import {expect} from "vitest";


export default class WidgetPage {
    async checkRenderWidget() {
        expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
    }

    async checkChatWasClosed() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(document.querySelector('.btn-close'))
        })
        await expect(document.querySelector('.modal-title')).not.toBeInTheDocument()
    }

    async checkIdWelcomeBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'));
        })
        await expect(screen.getByText(validSteps[0].messages[0])).toBeVisible
        await expect(screen.getByText(validSteps[0].buttons[0].text)).toBeVisible()
    }

    async checkIdStartBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
        })
        await expect(screen.getByText(validSteps[1].messages[0])).toBeVisible
        await expect(screen.getByText(validSteps[1].buttons[0].text)).toBeVisible()
        await expect(screen.getByText(validSteps[1].buttons[1].text)).toBeVisible()
        await expect(screen.getByText(validSteps[1].buttons[2].text)).toBeVisible()
    }


    async checkIdSwitchBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
        })

        await expect(validSteps[3].messages[0]).toBeVisible
        await expect(screen.getByText(validSteps[3].buttons[0].text)).toBeVisible()
        await expect(screen.getByText(validSteps[3].buttons[1].text)).toBeVisible()
        await expect(screen.getByText(validSteps[3].buttons[2].text)).toBeVisible()
    }

    async checkIdTryBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
            await userEvent.click(screen.getByText('А есть что-нибудь попроще'))
        })
        await expect(screen.getByText(validSteps[2].messages[0])).toBeVisible
        await expect(screen.getByText(validSteps[2].buttons[0].text)).toBeVisible()
        await expect(screen.getByText(validSteps[2].buttons[1].text)).toBeVisible()
        await expect(screen.getByText(validSteps[2].buttons[2].text)).toBeVisible()
    }

    async checkIdAdvancedBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Я разработчик, хочу углубить свои знания'))
        })
        await expect(screen.getByText(validSteps[5].messages[0])).toBeVisible
        await expect(screen.getByText(validSteps[5].buttons[0].text)).toBeVisible()
        await expect(screen.getByText(validSteps[5].buttons[1].text)).toBeVisible()
    }

    async checkIdDetailsBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
            await userEvent.click(screen.getByText('А есть что-нибудь попроще'))
            await userEvent.click(screen.getByText('Интересно'))
        })
        expect(screen.getByText(validSteps[4].messages[0])).toBeVisible()
        expect(screen.getByText(validSteps[4].buttons[0].text)).toBeVisible()
        expect(screen.getByText(validSteps[4].buttons[1].text)).toBeVisible()
    }

    async checkIdSubscribeBlock() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
            await userEvent.click(screen.getByText('Расскажи подробнее'))
            await userEvent.click(screen.getByText('Останусь здесь, запишусь на курс'))
        })
        expect(screen.getByText(validSteps[6].messages[0])).toBeVisible()
        expect(document.querySelectorAll('.btn-outline-primary').item(0).textContent)
            .equals(validSteps[6].buttons[0].text)
        expect(screen.getByText(validSteps[6].buttons[1].text)).toBeVisible()
    }

    async checkIdStartAfterClickReturnToStart() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Открыть Чат'))
            await userEvent.click(screen.getByText('Начать разговор'))
            await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
            await userEvent.click(screen.getByText('Расскажи подробнее'))
            await userEvent.click(screen.getByText('Останусь здесь, запишусь на курс'))
            await userEvent.click(screen.getByText('Верни меня в начало'))
        })
        expect(document.querySelectorAll('.message').item(10).textContent).equals(
            validSteps[1].messages[0]
        )
    }
}
