export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tech: string[];
  tags?: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "broadcastio",
    title: "broadcastio",
    subtitle:
      "Multi-channel messaging orchestration for backend-driven automation",
    tech: ["python", "django", "docker", "whatsapp-web", "telegram"],
    tags: ["backend", "automation", "orchestration"],
    featured: true,
  },
  {
    slug: "directio",
    title: "directio",
    subtitle: "Natural-language to maps API using local LLMs and open map data",
    tech: ["fastapi", "ollama", "openstreetmap", "osrm", "docker"],
    tags: ["infrastructure", "monitoring"],
    featured: true,
  },
];
