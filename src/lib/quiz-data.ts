export interface QuizQuestion {
  id: number;
  question: string;
  image?: string; // optional image URL
  options: string[];
  correctAnswer: number; // index 0 to 3
  explanation: string;
}
