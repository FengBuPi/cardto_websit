'use client';

export default function MainContent({ children }: { children: React.ReactNode }) {

  return (
    <main className="flex-1 bg-background p-6">
      {children}
    </main>
  );
}
