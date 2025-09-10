import { vi } from "vitest";

export default function MockResponse() {
  let res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
}
