import * as helpers from "../../src/helpers";

describe("Input validation test", () => {
  test("Should return false for an unsupported country and a correct year", () => {
    const country = "AU";
    const year = 2024;

    expect(() => helpers.validateInput({ year, country })).toThrow(
      "Country provided is not supported, received: AU"
    );
  });

  test("Should return false for a supported country and an incorrect year", () => {
    const country = "FR";
    const year = 1992;

    expect(() => helpers.validateInput({ year, country })).toThrow(
      "Year provided not the current, received: 1992"
    );
  });

  test("Should return true for a supported country and a correct year", () => {
    const country = "FR";
    const year = 2024;

    const validationResult = helpers.validateInput({ year, country });

    expect(validationResult).toBe(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("Shorten public holiday test", () => {
  test("Should return a shortened version of a holiday", () => {
    const holiday = {
      date: "31-12-2024",
      localName: "Christmas",
      name: "Christmas",
      countryCode: "UK",
      fixed: true,
      global: true,
      counties: null,
      launchYear: 336,
      types: [],
    };
    const sortenedHoliday = {
      date: "31-12-2024",
      localName: "Christmas",
      name: "Christmas",
    };

    const validationResult = helpers.shortenPublicHoliday(holiday);

    expect(validationResult).toEqual(sortenedHoliday);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
