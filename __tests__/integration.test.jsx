import {render, waitFor, screen} from "@testing-library/react";
import {describe, test, vi} from 'vitest';
import App from "../src/App.jsx";
import WidgetPage from "./pages/widgetPage.js";
import {getRegistrationData} from "../__fixtures__/registrationData.js";
import RegistrationPage from "./pages/registrationPage.js";

let registrationPage;
let registrationData;
let widgetPage;


describe('Интеграционные тесты', () => {
  beforeEach(() => {
    render(<App />);
    widgetPage = new WidgetPage()
    registrationPage = new RegistrationPage()
    Element.prototype.scrollIntoView = vi.fn();
  });

  test('Рендер виджета в App компоненте', async () => {
    await widgetPage.navigateToIdWelcome();
    await widgetPage.checkWelcomeBlock();
  });

  test('Чек блока Start', async () => {
    await widgetPage.navigateToIdStart()
    await widgetPage.checkStartBlock();
  });

  test('Регистрация в хост приложении', async () => {
    registrationData = getRegistrationData();
    await waitFor(async () => {
      await registrationPage.fillForm(registrationData);
      await registrationPage.submitForm();
    })
    expect(document.querySelector('.table')).toMatchSnapshot();
  });

  test('Видимость формы регистрации', async () => {
    expect(screen.getByRole('form')).toBeVisible()
  });
})