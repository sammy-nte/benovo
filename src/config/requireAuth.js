import { redirect } from "react-router-dom";

export async function requireAuth() {
  const loggedIn = JSON.parse(localStorage.getItem("in"));

  if (!loggedIn) {
    throw redirect("/sign-in?message=you must sign in first");
  }
}
