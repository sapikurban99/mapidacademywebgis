import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types ───────────────────────────────────────────────────

export interface AttendanceRow {
  participant: string;
  session_no: number;
  attended: boolean;
}

export interface TaskSubmissionRow {
  id?: string;
  participant: string;
  task_id: number;
  task_number: string;
  task_title: string;
  url: string;
  submitted_at?: string;
}

export interface QuizScoreRow {
  id?: string;
  participant: string;
  email?: string;
  session_key: number;
  score: number;
  attempt_no?: number;
  completed_at?: string;
}

export interface FinalProjectRow {
  participant: string;
  url: string;
  submitted_at?: string;
  updated_at?: string;
}
