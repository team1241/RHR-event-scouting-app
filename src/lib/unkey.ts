import { Unkey } from "@unkey/api";

const unkeyClientSingleton = () => {
  return new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY! });
};

declare const globalThis: {
  unkeyGlobal: ReturnType<typeof unkeyClientSingleton>;
} & typeof global;

const unkey = globalThis.unkeyGlobal ?? unkeyClientSingleton();

export default unkey;

if (process.env.NODE_ENV !== "production") globalThis.unkeyGlobal = unkey;
