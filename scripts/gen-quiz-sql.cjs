const fs = require("fs");

let raw = fs.readFileSync("src/lib/quiz-data.ts", "utf-8");

raw = raw.replace(/export interface QuizQuestion[\s\S]*?\n\}/m, "");
raw = raw.replace("export const BOOTCAMP_QUIZZES: Record<number, QuizQuestion[]> = ", "BOOTCAMP_QUIZZES = ");
raw += ";\nmodule.exports = { BOOTCAMP_QUIZZES };";

fs.writeFileSync("/tmp/quiz-data.cjs", raw);
const mod = require("/tmp/quiz-data.cjs");
const BOOTCAMP_QUIZZES = mod.BOOTCAMP_QUIZZES;

function esc(val) {
  if (typeof val === "string") {
    return "'" + val.replace(/'/g, "''") + "'";
  }
  return String(val);
}

const entries = Object.entries(BOOTCAMP_QUIZZES);
const rows = [];
let total = 0;

for (const [sessionKey, questions] of entries) {
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const session = Number(sessionKey);
    const sortOrder = i;
    const questionText = esc(q.question);
    const imageUrl = esc(q.image || "");
    const explanation = esc(q.explanation || "");
    const opts = q.options.map(o => esc(o)).join(", ");
    const correctAnswer = q.correctAnswer;

    rows.push(
      "(" + session + ", " + sortOrder + ", " + questionText + ", ARRAY[" + opts + "], " + correctAnswer + ", " + imageUrl + ", " + explanation + ")"
    );
    total++;
  }
}

let sql = "CREATE TABLE IF NOT EXISTS quiz_questions (\n";
sql += "  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n";
sql += "  session_key INTEGER NOT NULL,\n";
sql += "  sort_order INTEGER NOT NULL,\n";
sql += "  question_text TEXT NOT NULL,\n";
sql += "  options TEXT[] NOT NULL,\n";
sql += "  correct_answer INTEGER NOT NULL,\n";
sql += "  image_url TEXT DEFAULT '',\n";
sql += "  explanation TEXT DEFAULT '',\n";
sql += "  created_at TIMESTAMPTZ DEFAULT NOW()\n";
sql += ");\n\n";
sql += "TRUNCATE TABLE quiz_questions RESTART IDENTITY;\n\n";
sql += "INSERT INTO quiz_questions (session_key, sort_order, question_text, options, correct_answer, image_url, explanation) VALUES\n";
sql += rows.join(",\n") + ";\n";

fs.writeFileSync("supabase/migrations/20250523_quiz_questions.sql", sql);
console.log("Generated " + total + " question inserts");
