import React from 'react';
import ChangeInput from '../ChangeInput';
import { render, fireEvent, cleanup } from '@testing-library/react';
describe('ChangeInput Component', () => {
    afterEach(cleanup);

    test("display correct greetings message", () => {
        const { getByLabelText, getByTestId } = render(<ChangeInput />);

        const input = getByLabelText('user-name');
        const greeting = getByTestId('change-input-greeting');
        
        // Initially, the greeting should be empty
        expect(input.value).toBe('');
        expect(greeting.textContent).toBe('Welcome, Anonymous User!');

        // Simulate user typing a name
        fireEvent.change(input, { target: { value: 'Bobo' } });
        expect(greeting.textContent).toBe('Welcome, Bobo!');
    });
})
