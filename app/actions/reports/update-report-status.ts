'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '@/lib/server';

export async function updateReportStatus(
  id: string,
  status: 'pending' | 'process' | 'done'
) {
  const supabase = createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // proteksi admin
  if (!user) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  const { error } = await supabase
    .from('reports')
    .update({
      status,
    })
    .eq('id', id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath('/admin/reports');

  return {
    success: true,
  };
}