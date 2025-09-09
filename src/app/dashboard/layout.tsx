import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeItem="shared" />
        <main className="flex-1 bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
