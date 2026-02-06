import type { DiagramNode } from "../types/diagram";

export const dotnetWebAPIArchitecture: DiagramNode = {
    label: "DotnetWebAPI",
    children: [
        {
            label: "Domain",
            children: [
                { label: "User" },
                { label: "Order" },
                { label: "OrderItem" },
                { label: "OrderStatus" },
            ],
        },
        {
            label: "Application",
            children: [
                { label: "AuthService" },
                { label: "OrderService" },
                { label: "EmailService" },
                { label: "OrderExportService" },
                { label: "Contracts (Interfaces)" },
            ],
        },
        {
            label: "Persistence",
            children: [
                { label: "AppDbContext (EF Core)" },
                { label: "SQL Server" },
                { label: "Migrations" },
            ],
        },
        {
            label: "Presentation",
            children: [
                { label: "Controllers (HTTP only)" },
                { label: "SignalR Hub" },
                { label: "DTOs" },
            ],
        },
    ],
};
