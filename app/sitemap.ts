import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        { url: site.url, priority: 1.0 },
        { url: `${site.url}/projects`, priority: 0.9 },
        { url: `${site.url}/about`, priority: 0.8 },
        { url: `${site.url}/contact`, priority: 0.7 },
    ].map(({ url, priority }) => ({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
    }));

    const projectPages = projects.map((p) => ({
        url: `${site.url}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...projectPages];
}
