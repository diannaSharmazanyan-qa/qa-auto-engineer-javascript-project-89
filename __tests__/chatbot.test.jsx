import {render, waitFor} from '@testing-library/react'
import {describe, test, vi} from "vitest"
import Widget from "@hexlet/chatbot-v2";
import {validSteps} from "../__fixtures__/validSteps.js";
import WidgetPage from "./pages/widgetPage.js";
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
            await widgetPage.navigateToIdWelcome();
            await widgetPage.checkWelcomeBlock();
        })

        test('Проверка, что чат закрыт', async () => {
            await widgetPage.checkChatWasClosed()
        })

        test('Блок - start', async () => {
            await widgetPage.navigateToIdStart();
            await widgetPage.checkStartBlock();
        })


        test('Блок - switch', async () => {
            await widgetPage.navigateToIdSwitch();
            await widgetPage.checkIdSwitchBlock();
        })

        test('Блок - details', async () => {
            await widgetPage.navigateToIdDetails()
            await widgetPage.checkIdDetailsBlock()
        })

        test('Блок - try', async () => {
            await widgetPage.navigateIdTry()
            await widgetPage.checkIdTryBlock()
        })

        test('Блок - advanced', async () => {
            await widgetPage.navigateToIdAdvanced()
            await widgetPage.checkIdAdvancedBlock()
        })

        test('После клика по кнопке "Интересно" попадаем на id details', async () => {
            await widgetPage.navigateToIdDetailsThroughClickInteresting()
            await widgetPage.checkReturnToDetailsIdBlock()
        })

        test('Блок - subscribe', async () => {
            await widgetPage.navigateToIdSubscribe()
            await widgetPage.checkIdSubscribeBlock()
        })

        test('После клика "Верни меня в начало" редирект на id start', async () => {
            await widgetPage.navigateToIdStartThroughClickReturnMe()
            await widgetPage.checkIdStartAfterClickReturnToStart()
        })

        test('Проверка скролла', async () => {
            await widgetPage.navigateToIdSwitch()
            await expect(mockScroll).toHaveBeenCalled();
        })
    })

describe('Негативные кейсы', () => {
    beforeEach(() => {
        widgetPage = new WidgetPage()
        mockScroll = Element.prototype.scrollIntoView = vi.fn();
     })

    test("Приложение падает с невалидными шагами", async () => {
        await waitFor(() => {
            expect(() => {
                render(Widget(invalidSteps));
            }).toThrow(/e is not iterable/i);
        });
    });

        test('С пустыми шагами нет кнопки "Начать разговор" и сообщения "Привет...', async () => {
            await render(Widget(emptySteps));

            await widgetPage.openChat()
            await widgetPage.checkIsVisibleElementsWithEmptySteps()
        });
    })
})