import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useCurrentUser() {
  const { user } = useUser();
  const convexUser = useQuery(api.users.get, user ? { clerkId: user.id } : "skip");
  return convexUser;
}
