import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import WeatherForm from "../WeatherForm.jsx";
import { handleClickLocation } from "../../utils/getCurrentLocation";

// mock context
const mockAddFav = vi.fn();

vi.mock("../../context/WeatherContext.jsx", () => ({
	useWeather: () => ({
		currentUser: 1,
		addFav: mockAddFav,
		setFavCities: vi.fn(),
	}),
}));

// mock location util
vi.mock("../../utils/getCurrentLocation.js", () => ({
	handleClickLocation: vi.fn(),
}));

afterEach(() => {
	cleanup();
});

describe("WeatherForm", () => {
	const mockOnCitySubmit = vi.fn();
	const mockOnLocationSubmit = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders input and button", () => {
		render(
			<WeatherForm
				onCitySubmit={mockOnCitySubmit}
				onLocationSubmit={mockOnLocationSubmit}
			/>,
		);

		expect(screen.getByPlaceholderText(/Enter city name/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add to favorite/i }),
		).toBeInTheDocument();
	});

	it("calls onCitySubmit when user submits a city", async () => {
		const user = userEvent.setup();
		render(
			<WeatherForm
				onCitySubmit={mockOnCitySubmit}
				onLocationSubmit={mockOnLocationSubmit}
			/>,
		);
		const input = screen.getByPlaceholderText(/enter city name/i);
		await user.type(input, "Boston{enter}");
		expect(mockOnCitySubmit).toHaveBeenCalledWith("Boston");
	});

	it("does not call onCitySubmit when input is empty", async () => {
		const user = userEvent.setup();

		render(
			<WeatherForm
				onCitySubmit={mockOnCitySubmit}
				onLocationSubmit={mockOnLocationSubmit}
			/>,
		);

		const input = screen.getByPlaceholderText(/enter city name/i);
		await user.click(input);
		await user.keyboard("{Enter}");

		expect(mockOnCitySubmit).not.toHaveBeenCalled();
	});
	it("calls addFav and clears input", async () => {
		const user = userEvent.setup();

		render(
			<WeatherForm
				onCitySubmit={mockOnCitySubmit}
				onLocationSubmit={mockOnLocationSubmit}
			/>,
		);

		const input = screen.getByPlaceholderText(/enter city name/i);
		const button = screen.getByRole("button", { name: /add to favorite/i });

		await user.type(input, "Seattle");
		await user.click(button);

		expect(mockAddFav).toHaveBeenCalledWith(1, "Seattle");
		expect(input).toHaveValue("");
	});
});
