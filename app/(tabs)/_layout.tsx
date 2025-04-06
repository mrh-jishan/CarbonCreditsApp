import { Tabs } from "expo-router/tabs";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

type UserRole = "employee" | "employer" | "admin" | "representative";

const userRole: UserRole = "representative";

export default function Layout() {
  const { user } = useUser();
  console.log("user---------", user);
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
          title: "Dashboard",
          href: userRole === "employee" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="commute"
        options={{
          title: "Commute",
          href: userRole === "employee" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="credits"
        options={{
          title: "Credits",
          href: userRole === "employee" ? undefined : null,
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
          href: userRole === "employer" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: "Employees",
          href: userRole === "employer" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="trading"
        options={{
          title: "Trading",
          href: userRole === "employer" ? undefined : null,
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
          href: userRole === "employer" ? undefined : null,
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
          href: userRole === "admin" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="fraud"
        options={{
          title: "Fraud",
          href: userRole === "admin" ? undefined : null,
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
          href: userRole === "admin" ? undefined : null,
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
          href: userRole === "representative" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Validation",
          href: userRole === "representative" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="audit"
        options={{
          title: "Audit",
          href: userRole === "representative" ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
