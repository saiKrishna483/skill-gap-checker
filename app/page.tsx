"use client";

import { useState } from "react";

const SKILLS = [
  "Python", "SQL", "Excel", "Power BI", "Tableau", "Pandas", "NumPy",
  "Machine Learning", "Statistics", "Data Visualization", "React",
  "Next.js", "JavaScript", "HTML", "CSS", "Git", "GitHub", "Communication",
];

function hasSkill(text: string, skill: string) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i").test(text);
}

export default function Home() {
  const [jobText, setJobText] = useState("");
  const [mySkills, setMySkills] = useState<string[]>([]);
  const [result, setResult] = useState<{ have: string[]; missing: string[] } | null>(null);

  function toggleSkill(skill: string) {
    setMySkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function checkGap() {
    const required = SKILLS.filter((s) => hasSkill(jobText, s));
    setResult({
      have: required.filter((s) => mySkills.includes(s)),
      missing: required.filter((s) => !mySkills.includes(s)),
    });
  }

  const total = result ? result.have.length + result.missing.length : 0;
  const percent = result && total > 0 ? Math.round((result.have.length / total) * 100) : 0;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Fresher Skill Gap Checker</h1>
      <p className="mt-2 text-gray-600">
        Paste a job description and pick the skills you have. See what you are missing.
      </p>

      <h2 className="mt-6 font-semibold">1. Paste the job description</h2>
      <textarea
        className="mt-2 h-40 w-full rounded border p-3 text-black"
        placeholder="Paste the job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />

      <h2 className="mt-6 font-semibold">2. Select your skills</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`rounded-full border px-3 py-1 text-sm ${
              mySkills.includes(skill) ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <button
        onClick={checkGap}
        className="mt-6 rounded bg-black px-5 py-2 font-semibold text-white"
      >
        Check my skill gap
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          {total === 0 ? (
            <p className="text-gray-600">
              No known skills found in this job description. Try pasting a longer one.
            </p>
          ) : (
            <>
              <div>
                <p className="text-2xl font-bold">{percent}% match</p>
                <div className="mt-2 h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-green-600"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  You have {result.have.length} of {total} required skills.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-600">
                  You have ({result.have.length})
                </h3>
                <p>{result.have.join(", ") || "None of the required skills yet"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-red-600">
                  You are missing ({result.missing.length})
                </h3>
                <p>{result.missing.join(", ") || "Nothing, you match everything!"}</p>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}