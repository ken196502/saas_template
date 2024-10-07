import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allWikis, Wiki } from "contentlayer/generated";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function PostCard(wiki: Wiki) {
  return (
    <div className="my-8">
      <h2 className="text-xl">
        <Link
          href={wiki.url}
          className="text-blue-700 hover:text-blue-900"
          legacyBehavior
        >
          {wiki.title}
        </Link>
      </h2>
      <time dateTime={wiki.lastUpdated} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(wiki.lastUpdated), "LLLL d, yyyy")}
      </time>
      <div className="prose prose-sm">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{wiki.body.raw}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = allWikis.sort((a, b) =>
    compareDesc(new Date(a.lastUpdated), new Date(b.lastUpdated))
  );

  return (
    <div className="mt-12 max-w-xl py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Next.js+Contentlayer Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
