import type { DiagramNode } from "../types/diagram";

export const broadcastioArchitecture: DiagramNode = {
    label: "Application / Backend",
    children: [
        {
            label: "broadcastio Orchestrator",
            emphasis: true,
            children: [
                {
                    label: "Provider Adapter(s)",
                    children: [
                        { label: "WhatsApp" },
                        { label: "Email" },
                        { label: "Others" },
                    ],
                },
                { label: "Retry & Fallback Logic" },
                { label: "Delivery Result Model" },
            ],
        },
    ],
};