import userEvent from "@testing-library/user-event";
import {screen, waitFor} from "@testing-library/react";
import {expect} from "vitest";


export default class WidgetPage {
    constructor() {
        waitFor(() => {
            this.openChatButton = screen.getByText('Открыть Чат')
            this.startConversationButton = screen.getByText('Начать разговор')
            this.changeProfessionButton = screen.getByText('Сменить профессию или трудоустроиться')
        }).then()
    }


    async openChat() {
        await waitFor(async () => {
            await userEvent.click(this.openChatButton)
        })
    }

    async closeChat() {
        await waitFor(async () => {
            await userEvent.click(screen.getByLabelText('Close'))
        })
    }

    async startConversation() {
        await waitFor(async () => {
            await userEvent.click(this.startConversationButton)
        })
    }

    async changeProfession() {
        await waitFor(async () => {
            await userEvent.click(this.changeProfessionButton)
        })
    }

    async tellMore() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Расскажи подробнее'))
        })
    }

    async signUpToCourse() {
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Останусь здесь, запишусь на курс'))
        })
    }

    async checkRenderWidget() {
        expect(this.openChatButton).toBeInTheDocument()
    }

    async checkChatWasClosed() {
        await this.openChat()
        this.modalTitle = screen.getByText('Виртуальный помощник')
        await this.closeChat()
        await expect(this.modalTitle).not.toBeVisible()
    }

    async navigateToIdWelcome() {
        await this.openChat()
    }

    async checkWelcomeBlock() {
        await expect(screen.getByText(/Привет.*/)).toBeVisible()
        await expect(screen.getByText('Начать разговор')).toBeVisible()
    }

    async navigateToIdStart() {
        await this.openChat()
        await this.startConversation()
    }

    async checkStartBlock() {
        await expect(screen.getByText(/Помогу вам.*/)).toBeVisible()
        await expect(screen.getByText('Сменить профессию или трудоустроиться')).toBeVisible()
        await expect(screen.getByText(/Попробовать себя.*/)).toBeVisible()
        await expect(screen.getByText(/Я разработчик.*/)).toBeVisible()
    }

    async navigateToIdSwitch() {
        await this.openChat()
        await this.startConversation()
        await this.changeProfession()
    }

    async checkIdSwitchBlock() {
        await expect(/У нас есть программы.*/).toBeVisible
        await expect(screen.getByText(/Расскажи.*/)).toBeVisible()
        await expect(screen.getByText('А есть что-нибудь попроще')).toBeVisible()
        await expect(screen.getByText(/Вернуться.*/)).toBeVisible()
    }

    async navigateIdTry() {
        await this.navigateToIdSwitch()
        await waitFor(async () => {
            await userEvent.click(screen.getByText('А есть что-нибудь попроще'))
        })
    }

    async checkIdTryBlock() {
        await expect(screen.queryAllByAltText(/У нас есть.*/)).toBeVisible
        await expect(screen.getByText(/Интересно.*/)).toBeVisible()
        await expect(screen.getByText(/А что.*/)).toBeVisible()
        await expect(screen.getByText(/Вернуться.*/)).toBeVisible()
    }

    async navigateToIdAdvanced() {
        await this.navigateToIdStart()
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Я разработчик, хочу углубить свои знания'))
        })
    }

    async checkIdAdvancedBlock() {
        await expect(screen.getByText(/Отлично.*/)).toBeVisible
        await expect(screen.getByText(/Расскажи.*/)).toBeVisible()
        await expect(screen.getByText(/Верни.*/)).toBeVisible()
    }

    async navigateToIdDetails() {
        await this.navigateToIdSwitch()
        await this.tellMore()
    }

    async checkIdDetailsBlock() {
        expect(screen.getByText(/В Хекслете.*/)).toBeVisible()
        expect(screen.getByText(/Останусь.*/)).toBeVisible()
        expect(screen.getByText(/Вернуться.*/)).toBeVisible()
    }

    async navigateToIdDetailsThroughClickInteresting() {
        await this.openChat()
        await this.startConversation()
        await this.changeProfession()

        await waitFor(async () => {
            await userEvent.click(screen.getByText('А есть что-нибудь попроще'))
            await userEvent.click(screen.getByText('Интересно'))
        })
    }

    async checkReturnToDetailsIdBlock() {
        expect(screen.getByText(/В Хекслете.*/)).toBeVisible()
        expect(screen.getByText(/Останусь.*/)).toBeVisible()
        expect(screen.getByText(/Вернуться.*/)).toBeVisible()
    }

    async navigateToIdSubscribe() {
        await this.navigateToIdDetails()
        await this.signUpToCourse()
    }

    async checkIdSubscribeBlock() {
        expect(screen.getByText(/Ага, дублирую ссылку.*/)).toBeVisible()
        expect(screen.getByRole('button', {name: 'Останусь здесь, запишусь на курс'})).toBeVisible()
        expect(screen.getByText(/Верни меня в начало/)).toBeVisible()
    }

    async navigateToIdStartThroughClickReturnMe() {
        await this.navigateToIdSubscribe()
        await waitFor(async () => {
            await userEvent.click(screen.getByText('Верни меня в начало'))
        })

    }

    async checkIdStartAfterClickReturnToStart() {
        expect(screen.getByRole('button', {name: /Сменить профессию.*/})).toBeVisible()
        expect(screen.getByRole('button', {name: /Попробовать.*/})).toBeVisible()
    }

    async checkIsVisibleElementsWithEmptySteps() {
        expect(screen.queryByText(/Начать разговор/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Привет.*/)).not.toBeInTheDocument()
    }
}
