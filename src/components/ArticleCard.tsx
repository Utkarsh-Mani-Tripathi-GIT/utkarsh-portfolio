import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowUpRight, Pin } from 'lucide-react';

// Basic interface definition for portfolio use
export interface ArticleData {
  slug: string;
  type: 'judgment' | 'policy' | 'research' | 'opinion';
  title: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  readingTime?: string;
  abstract?: string;
  caseSummary?: string;
  policyOverview?: string;
  authorDetails?: {
    name: string;
    avatar?: string;
  };
}

export default function ArticleCard({ article, searchTerm }: { article: ArticleData; searchTerm?: string }) {
  // Map internal database folders to correct URL routes
  const typeMapping: Record<string, string> = {
    judgment: 'judgments',
    policy: 'policies',
    research: 'research',
    opinion: 'opinions',
  };

  const folder = typeMapping[article.type] || 'research';
  const articleUrl = `https://legal-observatory.vercel.app/publications/${folder}/${article.slug}`;

  // Format dates beautifully
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group relative flex flex-col justify-between p-6 bg-white/5 border border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between text-xs mb-3 text-white/50">
          <span className="px-2.5 py-0.5 rounded-full font-semibold bg-spidey-red/20 text-spidey-red uppercase tracking-wider text-[10px]">
            {article.type}
          </span>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTime || '5 min read'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-white mt-1 group-hover:text-spidey-red transition-colors">
          <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
            {article.title}
          </a>
        </h3>

        {/* Abstract / Summary */}
        <p className="text-sm text-white/70 mt-2 line-clamp-3 leading-relaxed">
          {article.abstract || article.caseSummary || article.policyOverview || 'Click to read full legal publication, including case summaries, legislative objectives, references, and citations.'}
        </p>

        {/* Categories / Tags badges */}
        <div className="flex flex-wrap gap-1 mt-4">
          {article.categories.map((cat) => (
            <span key={cat} className="text-[10px] uppercase font-semibold text-white/40 border border-white/10 px-1.5 py-0.5 rounded">
              #{cat.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            {article.authorDetails?.avatar ? (
              <img
                src={article.authorDetails.avatar}
                alt={article.authorDetails.name}
                className="w-6 h-6 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="font-medium text-white/80">
              {article.authorDetails?.name || 'Observatory Editor'}
            </span>
          </div>

          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-spidey-red hover:underline flex items-center"
          >
            Read Paper <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
