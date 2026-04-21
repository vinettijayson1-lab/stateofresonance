'use client';

import { useEffect, useState } from 'react';

const SHOP_DOMAIN = 'uscedz-sm.myshopify.com';
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
    <div style={{ marginTop: '2rem' }}>
      {rating && (
        <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          ★ {rating.rating.toFixed(1)} / 5 · {rating.reviews_count} reviews
        </div>
      )}
      {reviews.map((review) => (
        <div key={review.id} style={{
          borderTop: '1px solid #e5e5e5',
          padding: '1rem 0',
        }}>
          <strong>{review.reviewer.name}</strong>
          <span style={{ marginLeft: '8px', color: '#FFD700' }}>
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </span>
          <p style={{ marginTop: '0.5rem', color: '#444' }}>{review.body}</p>
        </div>
      ))}
    </div>
  );
}
