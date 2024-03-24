import axios from "axios";
import * as publicHolidsaysService from "../../src/services/public-holidays.service";
import * as helpers from "../../src/helpers";

const holidays = [
  {
    date: "31-12-2024",
    localName: "Christmas",
    name: "Christmas",
    countryCode: "GB",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 336,
    types: [],
  },
  {
    date: "31-03-2024",
    localName: "Easter",
    name: "Easter",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: 325,
    types: [],
  },
];
const shortenedHolidays = [
  {
    date: "31-12-2024",
    localName: "Christmas",
    name: "Christmas",
  },
  { date: "31-03-2024", localName: "Easter", name: "Easter" },
];

describe("Get list of public holidays test", () => {
  test("Should return an array of shortened holidays", async () => {
    const mockValidation = jest
      .spyOn(helpers, "validateInput")
      .mockImplementation(() => true);
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: holidays }));

    const getListOfPublicHolidaysResult = await publicHolidsaysService.getListOfPublicHolidays(
      2024,
      "GB"
    );

    expect(mockValidation).toBeCalledWith({ year: 2024, country: "GB" });
    expect(getListOfPublicHolidaysResult).toEqual(shortenedHolidays);
  });

  test("Should return an empty array if an error occured", async () => {
    const mockValidation = jest
      .spyOn(helpers, "validateInput")
      .mockImplementation(() => true);
    jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());

    const getListOfPublicHolidaysResult = await publicHolidsaysService.getListOfPublicHolidays(
      2024,
      "GB"
    );

    expect(mockValidation).toBeCalledWith({ year: 2024, country: "GB" });
    expect(getListOfPublicHolidaysResult).toEqual([]);
  });
});

describe("Check if today is a public holiday test", () => {
  test("Should return true if status is 200", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    const checkIfTodayIsPublicHolidayResult = await publicHolidsaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(checkIfTodayIsPublicHolidayResult).toBe(true);
  });

  test("Should return false if status is not 200", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 400 }));

    const checkIfTodayIsPublicHolidayResult = await publicHolidsaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(checkIfTodayIsPublicHolidayResult).toBe(false);
  });

  test("Should return false if an error occured", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());

    const checkIfTodayIsPublicHolidayResult = await publicHolidsaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(checkIfTodayIsPublicHolidayResult).toBe(false);
  });
});

describe("Get next public holidays test", () => {
  test("Should return an array of shortened next holidays", async () => {
    const mockValidation = jest
      .spyOn(helpers, "validateInput")
      .mockImplementation(() => true);
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: holidays }));

    const getListOfPublicHolidaysResult = await publicHolidsaysService.getNextPublicHolidays(
      "GB"
    );

    expect(mockValidation).toBeCalledWith({ country: "GB" });
    expect(getListOfPublicHolidaysResult).toEqual(shortenedHolidays);
  });

  test("Should return an empty array if an error occured", async () => {
    const mockValidation = jest
      .spyOn(helpers, "validateInput")
      .mockImplementation(() => true);
    jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());

    const getListOfPublicHolidaysResult = await publicHolidsaysService.getNextPublicHolidays(
      "GB"
    );

    expect(mockValidation).toBeCalledWith({ country: "GB" });
    expect(getListOfPublicHolidaysResult).toEqual([]);
  });
});
