export type ProjectUsage = {
  title: string;
  steps: string[];
  example?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tech: string[];
  tags?: string[];
  featured?: boolean;
  usage?: ProjectUsage;
};

export const PROJECTS: Project[] = [
  {
    slug: "broadcastio",
    title: "broadcastio",
    subtitle: "Multi-channel messaging orchestration for backend-driven automation",
    tech: ["python", "django", "docker", "whatsapp-web", "telegram"],
    tags: ["backend", "automation"],
    featured: true,
    usage: {
      title: "Send a notification to multiple channels",
      steps: [
        "Register channels (WhatsApp, Telegram, Email)",
        "Define message payload",
        "Dispatch via backend API",
        "Monitor delivery status"
      ],
      example: `
POST /api/broadcast
{
  "channels": ["whatsapp", "telegram"],
  "message": "Service is down"
}
`
    }
  },
  {
    slug: "directio",
    title: "directio",
    subtitle: "Natural-language to maps API using local LLMs and open map data",
    tech: ["python", "fastapi", "ollama", "openstreetmap", "osrm", "docker"],
    tags: ["infrastructure", "monitoring"],
    featured: true,
  },
  {
    slug: "dotnetwebapi",
    title: "dotnetwebapi",
    subtitle:
      "ASP.NET Core Web API implementing Clean Architecture, JWT authentication, and order ownership",
    tech: [
      "dotnet",
      "aspnet-core",
      "entity-framework-core",
      "sql-server",
      "jwt",
      "signalr",
    ],
    tags: ["backend", "clean-architecture", "training"],
  }
];
