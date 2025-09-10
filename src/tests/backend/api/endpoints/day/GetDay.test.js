import { describe, beforeEach, test, expect } from "vitest";
import MockResponse from "../../helper/MockResponse.js";

describe("GET /api/day/:day_id", () => {
  let req, res;

  beforeEach(() => {
    res = MockResponse();
    req = { query: {} };
  });

  test("should return 400 if day_id is missing", async () => {
    await import(
      "../../../../backend/api/endpoints/day/endpoints/GetDay.js"
    ).then(async ({ default: GetDay }) => {
      await GetDay(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Invalid or missing day_id",
        result: null,
      });
    });
  });
});
