'use client';

const SHOP_DOMAIN = 'state-of-resonance.myshopify.com';
const JUDGEME_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_TOKEN!;

export async function getProductRating(shopifyProductId: number) {
  const res = await fetch(
    `https://judge.me/api/v1/products/-1?api_token=${JUDGEME_TOKEN}&shop_domain=${SHOP_DOMAIN}&external_id=${shopifyProductId}`
  );
  const data = await res.json();
  return {
    rating: data.product?.rating ?? 0,
    count: data.product?.reviews_count ?? 0,
  };
}

interface StarBadgeProps {
  rating: number;
  count: number;
}

export function StarBadge({ rating, count }: StarBadgeProps) {
  if (!count) return null;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ position: 'relative', display: 'inline-block', color: '#ccc' }}>
        <span>{'★'.repeat(5)}</span>
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          width: `${(rating / 5) * 100}%`,
          color: '#FFD700',
          whiteSpace: 'nowrap',
        }}>
          {'★'.repeat(5)}
        </span>
      </div>
      <span style={{ fontSize: '0.85em', color: '#888' }}>({count})</span>
    </div>
  );
}
