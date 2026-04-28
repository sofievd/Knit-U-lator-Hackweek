import { createFileRoute } from "@tanstack/react-router";
import { HatsInputPage } from "../components/HatsInputPage";

export const Route = createFileRoute("/patterns/hats-input")({
  component: HatsInputPage,
});
