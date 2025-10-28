import { cookies } from "next/headers";

export function setLoginSession() {
  cookies().set("isLoggedIn", "true", { httpOnly: true, path: "/" });
}

export function clearLoginSession() {
  cookies().delete("isLoggedIn");
}

export function isLoggedIn() {
  return cookies().get("isLoggedIn")?.value === "true";
}
