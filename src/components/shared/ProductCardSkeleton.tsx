export default function ProductCardSkeleton() {
  return (
    <div className="w-full flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-[3/4] w-full skeleton" />
      
      {/* Text skeletons */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 skeleton" />
        <div className="h-4 w-1/4 skeleton" />
      </div>
    </div>
  );
}
