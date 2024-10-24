import {render, screen, waitFor} from '@testing-library/react'
import {describe, test, vi} from "vitest"
import Widget from "@hexlet/chatbot-v2";
import {validSteps} from "../__fixtures__/validSteps.js";
import WidgetPage from "./pages/widgetPage.js";
import userEvent from "@testing-library/user-event";
import invalidSteps from "../__fixtures__/invalidSteps.js";
import emptySteps from "../__fixtures__/emptySteps.js";


let widgetPage;
let mockScroll;

describe('ChatBot', () => {
    describe('Позитивные кейсы', () => {
        beforeEach(() => {
            render(Widget(validSteps));
            widgetPage = new WidgetPage()
            mockScroll = Element.prototype.scrollIntoView = vi.fn();
        })

        test('Корректный рендер виджета', async () => {
            await widgetPage.checkRenderWidget()
        })

        test('Блок - welcome', async () => {
            await widgetPage.checkIdWelcomeBlock();
        })

        test('Проверка, что чат закрыт', async () => {
            await widgetPage.checkChatWasClosed()
        })

        test('Блок - start', async () => {
            await widgetPage.checkIdStartBlock();
        })


        test('Блок - switch', async () => {
            await widgetPage.checkIdSwitchBlock();
        })

        test('Блок - details', async () => {
            await widgetPage.checkIdDetailsBlock()
        })

        test('Блок - try', async () => {
            await widgetPage.checkIdTryBlock()
        })

        test('Блок - advanced', async () => {
            await widgetPage.checkIdAdvancedBlock()
        })

        test('После клика по кнопке "Интересно" попадаем на id details', async () => {
            await widgetPage.checkIdDetailsBlock()
        })

        test('Блок - subscribe', async () => {
            await widgetPage.checkIdSubscribeBlock()
        })

        test('После клика "Верни меня в начало" редирект на id start', async () => {
            await widgetPage.checkIdStartAfterClickReturnToStart()
        })

        test('Проверка скролла', async () => {
            await waitFor(async () => {
                await userEvent.click(screen.getByText('Открыть Чат'))
                await userEvent.click(screen.getByText('Начать разговор'))
                await userEvent.click(screen.getByText('Сменить профессию или трудоустроиться'))
            })
            await expect(mockScroll).toHaveBeenCalled();
        })
    })
})

describe('Негативные кейсы', () => {
    test.only("Приложение падает с невалидными шагами", async () => {
        await waitFor(() => {
            expect(() => {
                render(Widget(invalidSteps));
            }).toThrow(/e is not iterable/i);
        });
    });

    test('С пустыми шагами нет кнопки "Начать разговор" и сообщения "Привет...', async () => {
        await render(Widget(emptySteps));
        Element.prototype.scrollIntoView = vi.fn();

        await userEvent.click(screen.getByText('Открыть Чат'))
        expect(screen.queryByText('Начать разговор')).not.toBeInTheDocument()
        expect(screen.queryByText(/Привет.*/)).not.toBeInTheDocument()
    });
})