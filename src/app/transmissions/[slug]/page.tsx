import { getSortedTransmissionsData, getTransmissionData } from '@/lib/transmissions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const postData = await getTransmissionData(slug);
    return {
      title: `${postData.title} | Transmissions`,
      description: postData.excerpt,
    };
  } catch {
    return {
      title: 'Transmission Not Found',
    };
  }
}

export async function generateStaticParams() {
  const posts = getSortedTransmissionsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function TransmissionPost({ params }: Props) {
  const { slug } = await params;
  let postData;
  try {
    postData = await getTransmissionData(slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen pt-48 pb-24 px-6 max-w-3xl mx-auto flex flex-col">
      <div className="mb-16 border-b border-[rgba(255,255,255,0.05)] pb-12">
        <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs mb-6 text-center">
          <time>{postData.date}</time>
        </p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-white text-center leading-tight mb-8">
          {postData.title}
        </h1>
        <p className="text-gray-500 text-sm tracking-[0.1em] font-mono text-center italic">
          &quot;{postData.excerpt}&quot;
        </p>
      </div>

      <div 
        className="prose prose-invert prose-p:text-gray-300 prose-p:tracking-wide prose-p:leading-relaxed prose-headings:text-white prose-headings:font-serif prose-headings:tracking-wide prose-a:text-[var(--color-gold)] prose-strong:text-white max-w-none font-sans"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
      />
      
      <div className="mt-24 pt-8 border-t border-[rgba(255,255,255,0.05)] text-center">
        <Link 
          href="/transmissions" 
          className="inline-flex items-center text-[0.65rem] tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors"
        >
          <span>←</span> <span className="ml-2">Return to Archive</span>
        </Link>
      </div>
    </article>
  );
}
