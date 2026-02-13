import { describe, it, expect, vi, beforeEach } from "vitest";  
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'


import GameSetup from "../../src/pages/GameSetup";


describe("GameSetup", () =>{
    //mock fetch categories data
    const fakeCategories = {
        trivia_categories: [
            { id: 9, name: 'General Knowledge' },
            { id: 21, name: 'Sports' }
        ]
    }
    beforeEach(()=>{
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            json: async () =>fakeCategories
        }))
    })

    it("loads and displays categories", async () =>{
        render(<GameSetup />);

        // waiting for the dropdown 
        expect(await screen.findByText(/General Knowledge/i)).toBeInTheDocument();
        expect(await screen.findByText(/Sports/i)).toBeInTheDocument();

        // fetch functions have been called
        expect(fetch).toHaveBeenCalledTimes(1);

    })
})