'use client';

import { useEffect, useState } from 'react';

const SHOP_DOMAIN = 'state-of-resonance.myshopify.com';
const JUDGEME_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_TOKEN!;

interface Review {
  id: number;
  rating: number;
  body: string;
  reviewer: { name: string };
}

interface RatingSummary {
  rating: number;
  reviews_count: number;
}

interface ProductReviewsProps {
  shopifyProductId: number;
}

export function ProductReviews({ shopifyProductId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<RatingSummary | null>(null);

  useEffect(() => {
    fetch(
      `https://judge.me/api/v1/reviews?api_token=${JUDGEME_TOKEN}&shop_domain=${SHOP_DOMAIN}&product_id=${shopifyProductId}`
    )
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews ?? []));

    fetch(
      `https://judge.me/api/v1/products/-1?api_token=${JUDGEME_TOKEN}&shop_domain=${SHOP_DOMAIN}&external_id=${shopifyProductId}`
    )
      .then((r) => r.json())
      .then((data) => setRating(data.product ?? null));
  }, [shopifyProductId]);

  if (!reviews.length) return null;

  return (
    <div className="mt-8 space-y-0">
      {rating && (
        <div className="mb-6 flex items-center gap-2 text-[var(--color-gold)] font-mono text-sm tracking-widest">
          <span>{'★'.repeat(Math.round(rating.rating))}</span>
          <span className="text-gray-400">{rating.rating.toFixed(1)} / 5 · {rating.reviews_count} reviews</span>
        </div>
      )}
      {reviews.map((review) => (
        <div key={review.id} className="border-t border-[rgba(255,255,255,0.06)] py-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white font-sans text-sm font-semibold tracking-wide">{review.reviewer.name}</span>
            <span className="text-[var(--color-gold)] text-xs">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
          </div>
          <p className="text-gray-400 text-sm font-sans leading-relaxed tracking-wide">{review.body}</p>
        </div>
      ))}
    </div>
  );
}
