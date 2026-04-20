import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const transmissionsDirectory = path.join(process.cwd(), 'src/content/transmissions');

export interface TransmissionData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml?: string;
}

export function getSortedTransmissionsData(): TransmissionData[] {
  // Get file names under /src/content/transmissions
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(transmissionsDirectory);
  } catch {
    return [];
  }
  
  const allTransmissionsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(transmissionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || 'Unknown Transmissions',
        date: matterResult.data.date || '2000-01-01',
        excerpt: matterResult.data.excerpt || '',
      };
    });

  // Sort transmissions by date
  return allTransmissionsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getTransmissionData(slug: string): Promise<TransmissionData> {
  const fullPath = path.join(transmissionsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || 'Unknown Transmissions',
    date: matterResult.data.date || '2000-01-01',
    excerpt: matterResult.data.excerpt || '',
  };
}
