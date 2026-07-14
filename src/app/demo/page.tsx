import { DashboardDemo } from "@/components/DashboardDemo";

export const metadata = {
  title: "AIRISKS | Dashboard Demo",
  description:
    "Interactive sandboxed preview of the AIRISKS dashboard. Explore a mock AI risk overview, assessment, and use-case inventory.",
};

export default function DemoRoute() {
  return <DashboardDemo />;
}
