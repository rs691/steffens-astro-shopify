// src/utils/events.ts
import fs from 'node:fs/promises';
import path from 'node:path';

// Define the shape of your event data
export interface Event {
  slug: string;
  title: string;
  date: string; // ISO string 'YYYY-MM-DDTHH:MM:SS'
  locationName: string;
  address: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}

// Function to get all events (from a JSON file for this example)
export async function getEvents(): Promise<Event[]> {
  try {
    const filePath = path.resolve(process.cwd(), 'src/data/events.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const events: Event[] = JSON.parse(fileContents);
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error reading events data:", error);
    return [];
  }
}

// Function to get a single event by its slug
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find(event => event.slug === slug);
}