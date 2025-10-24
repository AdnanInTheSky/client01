// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(), // Short summary
    date: z.date(),
    author: z.string().optional(),
    cover_image: z.string().optional(), // e.g., /images/article-cover.jpg
    tags: z.array(z.string()).optional(),
    body: z.string(), // The main content
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    price: z.string(),
    description: z.string(),
    featured: z.boolean().default(true),
    icon_image: z.string().optional(), // e.g., /images/service-icon.png
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    photo: z.string().optional(), // e.g., /images/alex.jpg
    email: z.string().email().optional(),
  }),
});

export const collections = { articles, services, team };