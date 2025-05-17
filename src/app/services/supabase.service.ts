import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://vedfbaqwhhugsiwkxyno.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZGZiYXF3aGh1Z3Npd2t4eW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODUwOTAsImV4cCI6MjA2MzA2MTA5MH0.KVOz8Z0V9dhJlS2djza8S6kt5IBS2EvzPVpDW9qrQqI',
      { auth: { persistSession: false } }
    );
  }

  async uploadImage(file: File, fileName: string, userId: string): Promise<string> {
    console.log(fileName);
    const filePath = `user-images/${fileName}`;
    const { error } = await this.supabase.storage
      .from('product-images')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    const { data } = this.supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}