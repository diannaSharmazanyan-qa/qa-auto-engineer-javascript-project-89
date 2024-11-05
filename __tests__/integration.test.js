import {render, waitFor} from "@testing-library/react";
import {describe, test, vi} from 'vitest';
import App from "../src/App.jsx";
import WidgetPage from "./pages/widgetPage.js";
import {getRegistrationData} from "../__fixtures__/registrationData.js";
import RegistrationPage from "./pages/registrationPage.js";

let registrationPage;
let registrationData;
let widgetPage;

describe('', () => {
  beforeEach(() => {
    render(<App />);
    widgetPage = new WidgetPage()
    registrationPage = new RegistrationPage()
    Element.prototype.scrollIntoView = vi.fn();
  });

  test('Рендер виджета в App компоненте', async () => {
    await widgetPage.checkIdWelcomeBlock();
  });

  test('Чек блока Start', async () => {
    await widgetPage.checkIdStartBlock();
  });

  test('Регистрация в хост приложении', async () => {
    registrationData = getRegistrationData();
    await waitFor(async () => {
      await registrationPage.fillForm(registrationData);
      await registrationPage.submitForm();
    })
    expect(document.querySelector('.table')).toMatchSnapshot();
  });
})