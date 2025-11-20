export default function EducationLoading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-neutral-200 rounded-lg mb-2 w-1/2 animate-pulse"></div>
          <div className="h-6 bg-neutral-200 rounded-lg w-3/4 animate-pulse"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
              <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden">
              <div className="h-40 bg-neutral-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
