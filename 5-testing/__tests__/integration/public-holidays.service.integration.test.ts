import * as publicHolidsaysService from "../../src/services/public-holidays.service";

describe("Get list of public holidays test", () => {
  test("Should return an array", async () => {
    const getListOfPublicHolidaysResult = await publicHolidsaysService.getListOfPublicHolidays(
      2024,
      "GB"
    );

    expect(getListOfPublicHolidaysResult).toBeTruthy();
  });

  test("Should throw an error if a year is incorrect", () => {
    expect(
      async () =>
        await publicHolidsaysService.getListOfPublicHolidays(1992, "GB")
    ).rejects.toThrow("Year provided not the current, received: 1992");
  });

  test("Should throw an error if a country is not valid", () => {
    expect(
      async () =>
        await publicHolidsaysService.getListOfPublicHolidays(1992, "AU")
    ).rejects.toThrow("Country provided is not supported, received: AU");
  });
});

describe("Check if today is a public holiday test", () => {
  test("Should throw an error if a country is not valid", () => {
    expect(
      async () => await publicHolidsaysService.checkIfTodayIsPublicHoliday("AU")
    ).rejects.toThrow("Country provided is not supported, received: AU");
  });
});

describe("Get next public holidays test", () => {
  test("Should return an array", async () => {
    const getNextPublicHolidaysResult = await publicHolidsaysService.getNextPublicHolidays(
      "GB"
    );

    expect(getNextPublicHolidaysResult).toBeTruthy();
  });

  test("Should throw an error if a country is not valid", () => {
    expect(
      async () => await publicHolidsaysService.getNextPublicHolidays("AU")
    ).rejects.toThrow("Country provided is not supported, received: AU");
  });
});
