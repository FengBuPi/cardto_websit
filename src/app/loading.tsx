export default function Loading() {
  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 design-gradient rounded-lg flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 bg-white rounded-sm transform rotate-12"></div>
        </div>
        <div className="text-sm text-muted-foreground">加载中...</div>
      </div>
    </div>
  );
}
