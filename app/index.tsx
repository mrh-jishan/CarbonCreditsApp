import { useRoles } from "@/hooks/useRoles";
import { Redirect } from "expo-router";

export default function PageRedirect() {
  const { isAdmin, isEmployee, isEmployer, isBank } = useRoles();

  if (isAdmin) {
    return <Redirect href={"/admin/(tabs)/home"} />;
  }

  if (isEmployer) {
    return <Redirect href={"/employer/(tabs)/home"} />;
  }

  if (isEmployee) {
    return <Redirect href={"/employee/(tabs)/home"} />;
  }

  if (isBank) {
    return <Redirect href={"/bank/(tabs)/home"} />;
  }

  return <Redirect href="/auth/sign-in" />;
}
