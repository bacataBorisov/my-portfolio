import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date(site.contentUpdated);

    const staticPages = [
        { url: site.url, priority: 1.0 },
        { url: `${site.url}/projects`, priority: 0.9 },
        { url: `${site.url}/experience`, priority: 0.85 },
        { url: `${site.url}/about`, priority: 0.8 },
        { url: `${site.url}/contact`, priority: 0.7 },
    ].map(({ url, priority }) => ({
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
    }));

    const projectPages = projects.map((p) => ({
        url: `${site.url}/projects/${p.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...projectPages];
}
