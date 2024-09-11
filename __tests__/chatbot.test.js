import { render, screen, WaitFor } from '@testing-library/react';
import Widget from '@hexlet/chatbot-v2';
import steps from './__fixtures__/chatbotFixture.js';
import { expect, test, describe } from '@jest/globals';

describe('ChatBot', () => {
  test('Correct render', async () => {
    render(<Widget steps={steps} />);

    await WaitFor(() => {
        expect(screen.getByText(/Привет! Я ваш виртуальный помощник/i)).toBeInTheDocument();
      });
  });
});
