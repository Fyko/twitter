import ava from "ava";
import { Client } from "../src";
import { config } from "./config";

ava("attempt settings fetch", async (test) => {
  const client = new Client(config);
  try {
    const res = await client.get<any>("/account/settings");
    console.dir(res);

    if (res.errors?.length) throw Error(res.errors[0].message);
    test.pass("fetched settings successfully");
  } catch (err) {
    test.fail(err);
  }
});
