import { within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default class RegistrationPage {
    emailInput = screen.getByLabelText('Email');
    passwordInput = screen.getByLabelText('Пароль');
    addressInput = screen.getByLabelText('Адрес');
    cityInput = screen.getByLabelText('Город');
    countryInput = screen.getByLabelText('Страна');
    confirmationCheckBox = screen.getByLabelText('Принять правила');
    signupButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

    async fillForm({
                       email,
                       password,
                       address,
                       city,
                       country,
                       confirmationCheckBox,
                   }) {
        await userEvent.type(this.emailInput, email);
        await userEvent.type(this.passwordInput, password);
        await userEvent.type(this.addressInput, address);
        await userEvent.type(this.cityInput, city);
        await userEvent.selectOptions(this.countryInput, country);
        if (confirmationCheckBox === 'true') {
            await userEvent.click(this.confirmationCheckBox);
        }
    }

    async submitForm() {
        await userEvent.click(this.signupButton);
    }

    getTableRows() {
        const rows = screen.getAllByRole('row');
        return rows.map((row) => ({
            cells: within(row).getAllByRole('cell'),
        }));
    }

    verifyRegistrationFormIsVisible() {
        expect(this.emailInput).toHaveAttribute('placeholder', 'Email');
        expect(this.passwordInput).toHaveAttribute('placeholder', 'Пароль');
        expect(this.addressInput).toHaveAttribute('placeholder', 'Невский проспект, 12');
        expect(this.cityInput).not.toHaveAttribute('placeholder');
        expect(this.countryInput).toHaveValue('');
        expect(this.confirmationCheckBox).not.toBeChecked();
        expect(this.signupButton).toBeVisible();
        expect(this.signupButton).toBeEnabled();
    }
}
