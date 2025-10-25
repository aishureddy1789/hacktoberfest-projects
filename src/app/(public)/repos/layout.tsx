// app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '../_components/sidebar';
import { Header } from '../_components/header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:fixed lg:top-[86px] lg:w-[350px] min-h-[calc(100vh-64px)] lg:flex flex-col bg-muted border-r p-4">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto lg:ml-[350px]">
        <Header />
        {children}
      </main>
    </div>
  );
}
