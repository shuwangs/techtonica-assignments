import React from 'react';
import FocusInput from '../FocusInput';
import { render, fireEvent, cleanup, getByLabelText } from '@testing-library/react';

describe('FocusInput Component', () => {
   afterEach(cleanup);
   
    test('handle matching snapshot content', () => {
        const { container } = render(<FocusInput />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('focuses the input when the button is clicked', () => {
        const { getByText, getByLabelText } = render(<FocusInput />);
        const button = getByText('Click to Focus');
        const input = getByLabelText('focus-input');

        // Ensure the input is not focused initially
        expect(document.activeElement).not.toBe(input);

        // Click the button to focus the input
        fireEvent.click(button);

        // Assert that the input is now focused
        expect(document.activeElement).toBe(input);
    });


})