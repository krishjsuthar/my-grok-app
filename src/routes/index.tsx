import { createFileRoute } from "@tanstack/react-router";
import { StationView } from "@/components/station/station-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <StationView />;
}
