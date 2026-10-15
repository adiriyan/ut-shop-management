import { ReactNode } from 'react';
import { requireUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ShellUI from './ShellUI';

export default async function Shell({ children }: { children: ReactNode }) {
  try {
    const u = await requireUser();
    return (
      <ShellUI role={u.role} username={u.username}>
        {children}
      </ShellUI>
    );
  } catch {
    redirect('/login');
  }
}