import { Tabs } from "expo-router/tabs";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const { user } = useUser();
  const roles =
    user?.organizationMemberships?.map((membership) => membership.role) || [];

  const isAdmin = roles.includes("org:carbon_credits_admin");
  const isEmployee = roles.includes("org:carbon_credits_employee");
  const isEmployer = roles.includes("org:carbon_credits_employer");
  const isRepresentative = roles.includes("org:carbon_credits_representative");

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Employee-Specific Tabs */}
      <Tabs.Screen
        name="employee"
        options={{
          title: "Profile",
          href: isEmployee ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="commute"
        options={{
          title: "Commute",
          href: isEmployee ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="credits"
        options={{
          title: "Credits",
          href: isEmployee ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Employer-Specific Tabs */}
      <Tabs.Screen
        name="employer"
        options={{
          title: "Dashboard",
          href: isEmployer ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: "Employees",
          href: isEmployer ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="trading"
        options={{
          title: "Trading",
          href: isEmployer ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="swap-horizontal-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          href: isEmployer ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Admin-Specific Tabs */}
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="fraud"
        options={{
          title: "Fraud",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="shield-checkmark-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-full-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Representative-Specific Tabs */}
      <Tabs.Screen
        name="representative"
        options={{
          title: "Dashboard",
          href: isRepresentative ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Validation",
          href: isRepresentative ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="audit"
        options={{
          title: "Audit",
          href: isRepresentative ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
