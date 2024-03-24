import request from "supertest";

import { PUBLIC_HOLIDAYS_API_URL } from "../../src/config";

describe("Country information", () => {
  test("Should return 200 and information about a country", async () => {
    const countryCode = "GL";

    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/CountryInfo/${countryCode}`
    );

    expect(status).toEqual(200);
    expect(body).toEqual({
      commonName: expect.any(String),
      officialName: expect.any(String),
      countryCode: expect.any(String),
      region: expect.any(String),
      borders: expect.any(Array),
    });
  });
});

describe("Is today a public holiday", () => {
  test("Should return 200 or 204 for a valid country code", async () => {
    const countryCode = "FR";

    const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/IsTodayPublicHoliday/${countryCode}`
    );

    expect(status.toString()).toMatch(/200|204/);
  });
});
