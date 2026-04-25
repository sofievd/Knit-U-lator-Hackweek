import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../components/Home";
import react from 'react'

export const Route = createFileRoute("/")({ component: Home });
