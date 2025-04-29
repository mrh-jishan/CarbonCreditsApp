import { useUser } from "@clerk/clerk-expo";

export const useRoles = () => {
  const { user } = useUser();

  // Extract roles from organization memberships
  const roles =
    user?.organizationMemberships?.map((membership) => membership.role) || [];

  // Define role checks
  const isAdmin = roles.includes("org:carbon_credits_admin");
  const isEmployee = roles.includes("org:carbon_credits_employee");
  const isEmployer = roles.includes("org:carbon_credits_employer");
  const isBank = roles.includes("org:carbon_credits_bank");

  const roleName =
    (isAdmin && "Admin") ||
    (isEmployee && "Employee") ||
    (isEmployer && "Employer") ||
    (isBank && "Bank") ||
    "Unknown";

  return { roles, isAdmin, isEmployee, isEmployer, isBank, roleName };
};
