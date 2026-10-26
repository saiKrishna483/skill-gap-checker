"use client";
 
import { useState } from "react";
 
/* ------------------------------------------------------------------
   1. DATA: the roles, the skills for each role, and the words we look
      for in a job description.
      - "titles" are phrases that show a job is for this role.
      - each skill has a "name" (shown on the button) and "terms"
        (the words we search for in the job description, lowercase).
   ------------------------------------------------------------------ */
 
type Skill = { name: string; terms: string[] };
type Role = { titles: string[]; skills: Skill[] };
 
const ROLE_NAMES = [
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "Full Stack Developer",
  "Web Developer",
  "Business Analyst",
  "Java Developer",
  "ML / AI Engineer",
] as const;
 
type RoleName = (typeof ROLE_NAMES)[number];
 
const ROLES: Record<RoleName, Role> = {
  "Data Analyst": {
    titles: [
      "data analyst",
      "bi analyst",
      "business intelligence analyst",
      "reporting analyst",
    ],
    skills: [
      { name: "SQL", terms: ["sql", "mysql", "postgresql"] },
      { name: "Excel", terms: ["excel", "spreadsheet", "spreadsheets"] },
      { name: "Power BI", terms: ["power bi", "powerbi"] },
      { name: "Tableau", terms: ["tableau"] },
      { name: "Python", terms: ["python"] },
      { name: "Pandas", terms: ["pandas"] },
      {
        name: "Data Cleaning",
        terms: ["data cleaning", "data cleansing", "data wrangling", "data preparation"],
      },
      {
        name: "Data Visualization",
        terms: ["data visualization", "data visualisation", "visualization", "visualisation"],
      },
      { name: "Statistics", terms: ["statistics", "statistical"] },
      { name: "Dashboards", terms: ["dashboard", "dashboards", "reporting"] },
      { name: "Communication", terms: ["communication", "stakeholder", "stakeholders"] },
    ],
  },
 
  "Data Scientist": {
    titles: [
      "data scientist",
      "applied scientist",
      "research scientist",
    ],
    skills: [
      { name: "Python", terms: ["python"] },
      { name: "SQL", terms: ["sql", "mysql", "postgresql"] },
      { name: "Pandas", terms: ["pandas"] },
      { name: "NumPy", terms: ["numpy"] },
      { name: "Machine Learning", terms: ["machine learning"] },
      { name: "Scikit-learn", terms: ["scikit-learn", "scikit learn", "sklearn"] },
      { name: "Deep Learning", terms: ["deep learning", "neural network", "neural networks", "tensorflow", "pytorch"] },
      { name: "Statistics", terms: ["statistics", "statistical"] },
      { name: "Feature Engineering", terms: ["feature engineering"] },
      {
        name: "Model Evaluation",
        terms: ["model evaluation", "model validation", "cross-validation", "cross validation"],
      },
      {
        name: "Data Visualization",
        terms: ["data visualization", "data visualisation", "visualization", "visualisation"],
      },
    ],
  },
 
  "Data Engineer": {
    titles: ["data engineer", "analytics engineer", "etl developer", "big data engineer"],
    skills: [
      { name: "SQL", terms: ["sql", "mysql", "postgresql"] },
      { name: "Python", terms: ["python"] },
      { name: "ETL", terms: ["etl", "elt"] },
      { name: "Data Pipelines", terms: ["data pipeline", "data pipelines", "pipeline", "pipelines"] },
      {
        name: "Data Warehousing",
        terms: ["data warehouse", "data warehousing", "snowflake", "redshift", "bigquery"],
      },
      { name: "Apache Spark", terms: ["spark", "pyspark"] },
      { name: "Airflow", terms: ["airflow"] },
      { name: "Kafka", terms: ["kafka"] },
      { name: "Cloud", terms: ["aws", "azure", "gcp", "google cloud", "cloud"] },
      { name: "Databases", terms: ["database", "databases", "nosql", "mongodb"] },
      { name: "Git", terms: ["git", "github"] },
    ],
  },
 
  "Full Stack Developer": {
    titles: ["full stack", "full-stack", "fullstack"],
    skills: [
      { name: "HTML", terms: ["html"] },
      { name: "CSS", terms: ["css"] },
      { name: "JavaScript", terms: ["javascript"] },
      { name: "TypeScript", terms: ["typescript"] },
      { name: "React", terms: ["react", "reactjs"] },
      { name: "Next.js", terms: ["next.js", "nextjs"] },
      { name: "Node.js", terms: ["node.js", "nodejs", "node js", "express"] },
      { name: "REST APIs", terms: ["rest api", "rest apis", "restful", "api", "apis"] },
      { name: "Databases", terms: ["database", "databases", "sql", "mongodb", "postgresql", "mysql"] },
      { name: "Git", terms: ["git", "github"] },
    ],
  },
 
  "Web Developer": {
    titles: ["web developer", "front end", "front-end", "frontend", "ui developer", "react developer"],
    skills: [
      { name: "HTML", terms: ["html"] },
      { name: "CSS", terms: ["css"] },
      { name: "JavaScript", terms: ["javascript"] },
      { name: "TypeScript", terms: ["typescript"] },
      { name: "React", terms: ["react", "reactjs"] },
      { name: "Responsive Design", terms: ["responsive", "mobile-first", "mobile first"] },
      { name: "CSS Frameworks", terms: ["tailwind", "bootstrap"] },
      { name: "Accessibility", terms: ["accessibility", "wcag"] },
      { name: "APIs", terms: ["api", "apis", "rest"] },
      { name: "Git", terms: ["git", "github"] },
    ],
  },
 
  "Business Analyst": {
    titles: ["business analyst", "business systems analyst", "functional analyst", "systems analyst"],
    skills: [
      {
        name: "Requirements Gathering",
        terms: [
          "requirements gathering",
          "requirement gathering",
          "requirements analysis",
          "gather requirements",
          "business requirements",
        ],
      },
      { name: "Documentation", terms: ["documentation", "brd", "frd", "documenting"] },
      { name: "User Stories", terms: ["user stories", "user story", "use cases"] },
      { name: "Process Mapping", terms: ["process mapping", "process flow", "process flows", "flowchart", "flowcharts", "bpmn"] },
      { name: "Stakeholder Communication", terms: ["stakeholder", "stakeholders", "communication"] },
      { name: "Agile / Scrum", terms: ["agile", "scrum", "jira"] },
      { name: "Excel", terms: ["excel", "spreadsheet", "spreadsheets"] },
      { name: "SQL", terms: ["sql", "mysql", "postgresql"] },
      { name: "Power BI", terms: ["power bi", "powerbi"] },
      { name: "Problem Solving", terms: ["problem solving", "problem-solving"] },
    ],
  },
 
  "Java Developer": {
    titles: ["java developer", "java engineer", "spring boot developer", "java backend"],
    skills: [
      { name: "Java", terms: ["java"] },
      { name: "Spring Boot", terms: ["spring boot", "spring"] },
      { name: "OOP", terms: ["oop", "oops", "object-oriented", "object oriented"] },
      { name: "Hibernate / JPA", terms: ["hibernate", "jpa"] },
      { name: "SQL", terms: ["sql", "mysql", "postgresql", "oracle"] },
      { name: "REST APIs", terms: ["rest api", "rest apis", "restful", "api", "apis"] },
      { name: "Microservices", terms: ["microservice", "microservices"] },
      { name: "Maven / Gradle", terms: ["maven", "gradle"] },
      { name: "JUnit", terms: ["junit", "unit testing"] },
      { name: "Git", terms: ["git", "github"] },
    ],
  },
 
  "ML / AI Engineer": {
    titles: [
      "ml engineer",
      "machine learning engineer",
      "ai engineer",
      "ai/ml engineer",
      "ai ml engineer",
      "generative ai engineer",
      "gen ai engineer",
      "llm engineer",
    ],
    skills: [
      { name: "Python", terms: ["python"] },
      { name: "Machine Learning", terms: ["machine learning"] },
      { name: "Deep Learning", terms: ["deep learning", "neural network", "neural networks"] },
      { name: "TensorFlow / PyTorch", terms: ["tensorflow", "pytorch"] },
      { name: "Scikit-learn", terms: ["scikit-learn", "scikit learn", "sklearn"] },
      { name: "NLP", terms: ["nlp", "natural language processing"] },
      { name: "Generative AI", terms: ["generative ai", "gen ai", "genai"] },
      { name: "LLMs", terms: ["llm", "llms", "large language model", "large language models"] },
      { name: "Prompt Engineering", terms: ["prompt engineering", "prompt"] },
      { name: "Model Deployment", terms: ["mlops", "model deployment", "deploy models", "docker"] },
      { name: "Git", terms: ["git", "github"] },
    ],
  },
};
 
/* ------------------------------------------------------------------
   2. HELPER FUNCTIONS: the matching logic.
   ------------------------------------------------------------------ */
 
// Makes a word safe to use inside a regular expression (for example "next.js").
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
// True if the job description contains the term as a whole word.
// "sql" matches "SQL," but "react" does not match "reaction".
function hasTerm(text: string, term: string): boolean {
  const pattern = new RegExp("(^|[^a-z0-9])" + escapeRegex(term) + "($|[^a-z0-9])");
  return pattern.test(text);
}
 
// The skills of a role that the job description asks for.
function findSkills(text: string, role: Role): Skill[] {
  return role.skills.filter((skill) => skill.terms.some((term) => hasTerm(text, term)));
}
 
// How strongly the job description looks like this role.
// A role title in the text counts a lot (6 points), and each role skill counts 1 point.
function scoreRole(text: string, role: Role): number {
  const titleScore = role.titles.some((title) => hasTerm(text, title)) ? 6 : 0;
  return titleScore + findSkills(text, role).length;
}
 
/* ------------------------------------------------------------------
   3. THE RESULT: the four things the app can tell the user.
   ------------------------------------------------------------------ */
 
type Result =
  | { kind: "need-input"; message: string }
  | { kind: "wrong-role"; selected: RoleName; detected: RoleName }
  | { kind: "unclear"; selected: RoleName }
  | { kind: "ok"; role: RoleName; have: string[]; missing: string[]; percent: number };
 
/* ------------------------------------------------------------------
   4. THE PAGE
   ------------------------------------------------------------------ */
 
export default function Home() {
  const [role, setRole] = useState<RoleName | null>(null);
  const [jobText, setJobText] = useState("");
  const [mySkills, setMySkills] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
 
  // Choose a role. Keep only the selected skills that also exist in the new role.
  function chooseRole(name: RoleName) {
    const names = ROLES[name].skills.map((skill) => skill.name);
    setRole(name);
    setMySkills((current) => current.filter((skill) => names.includes(skill)));
    setResult(null);
  }
 
  // Click a skill button to select it, click again to unselect it.
  function toggleSkill(name: string) {
    setMySkills((current) =>
      current.includes(name) ? current.filter((skill) => skill !== name) : [...current, name]
    );
    setResult(null);
  }
 
  function checkSkillGap() {
    if (!role) {
      setResult({ kind: "need-input", message: "Step 1: choose the role you are applying for." });
      return;
    }
    if (jobText.trim().length < 30) {
      setResult({ kind: "need-input", message: "Step 2: paste the full job description (at least a few lines)." });
      return;
    }
    if (mySkills.length === 0) {
      setResult({ kind: "need-input", message: "Step 3: select the skills you already have." });
      return;
    }
 
    const text = jobText.toLowerCase();
 
    // Score the job description against all five roles.
    const scores = ROLE_NAMES.map((name) => ({ name, score: scoreRole(text, ROLES[name]) }));
    const best = scores.reduce((a, b) => (b.score > a.score ? b : a));
    const selectedScore = scores.find((item) => item.name === role)?.score ?? 0;
 
    // The job fits the selected role if it scores at least 3
    // and is not clearly closer to another role.
    if (selectedScore >= 3 && selectedScore >= best.score - 1) {
      const required = findSkills(text, ROLES[role]).map((skill) => skill.name);
      const have = required.filter((skill) => mySkills.includes(skill));
      const missing = required.filter((skill) => !mySkills.includes(skill));
      const percent = required.length === 0 ? 0 : Math.round((have.length / required.length) * 100);
      setResult({ kind: "ok", role, have, missing, percent });
    } else if (best.score >= 3 && best.name !== role) {
      setResult({ kind: "wrong-role", selected: role, detected: best.name });
    } else {
      setResult({ kind: "unclear", selected: role });
    }
  }
 
  const buttonBase =
    "rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700";
 
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">Fresher Skill Gap Checker</h1>
        <p className="mt-2 text-slate-600">
          Choose your role, paste a job description, select the skills you have, and see what you are missing.
        </p>
 
        {/* Step 1: role */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">1. Which role are you applying for?</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROLE_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={role === name}
                onClick={() => chooseRole(name)}
                className={
                  buttonBase +
                  (role === name
                    ? " border-emerald-700 bg-emerald-700 text-white"
                    : " border-slate-300 bg-white text-slate-800 hover:border-emerald-700")
                }
              >
                {name}
              </button>
            ))}
          </div>
        </section>
 
        {/* Step 2: job description */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">2. Paste the job description</h2>
          <textarea
            value={jobText}
            onChange={(event) => {
              setJobText(event.target.value);
              setResult(null);
            }}
            rows={8}
            placeholder="Paste the full job description here..."
            className="mt-3 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          />
        </section>
 
        {/* Step 3: skills (they appear after a role is chosen) */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">3. Select the skills you already have</h2>
          {role ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {ROLES[role].skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  aria-pressed={mySkills.includes(skill.name)}
                  onClick={() => toggleSkill(skill.name)}
                  className={
                    buttonBase +
                    (mySkills.includes(skill.name)
                      ? " border-emerald-700 bg-emerald-100 text-emerald-900"
                      : " border-slate-300 bg-white text-slate-800 hover:border-emerald-700")
                  }
                >
                  {skill.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-slate-600">Choose a role in step 1 to see its skills.</p>
          )}
        </section>
 
        <button
          type="button"
          onClick={checkSkillGap}
          className="mt-8 rounded-md bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 focus-visible:ring-offset-2"
        >
          Check my skill gap
        </button>
 
        {/* Result */}
        <div aria-live="polite" className="mt-8">
          {result?.kind === "need-input" && (
            <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-900">{result.message}</p>
          )}
 
          {result?.kind === "wrong-role" && (
            <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-900">
              <p className="font-semibold">This job is not about {result.selected}.</p>
              <p className="mt-1">It looks like a {result.detected} role.</p>
              <button
                type="button"
                onClick={() => chooseRole(result.detected)}
                className="mt-3 rounded-md border border-red-700 bg-white px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-100"
              >
                Check it as {result.detected} instead
              </button>
            </div>
          )}
 
          {result?.kind === "unclear" && (
            <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-900">
              I could not recognise a {result.selected} job in this text. Make sure you pasted the full job
              description, including the skills section.
            </p>
          )}
 
          {result?.kind === "ok" && (
            <div className="rounded-md border border-slate-300 bg-white p-5">
              <p className="text-sm text-slate-600">This is a {result.role} job.</p>
              <p className="mt-1 text-3xl font-bold text-emerald-800">{result.percent}% match</p>
 
              <h3 className="mt-5 font-semibold">Skills you have for this job</h3>
              {result.have.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {result.have.map((skill) => (
                    <li key={skill} className="rounded-md bg-emerald-100 px-3 py-1 text-sm text-emerald-900">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-slate-600">None of the skills this job asks for.</p>
              )}
 
              <h3 className="mt-5 font-semibold">Skills you are missing</h3>
              {result.missing.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {result.missing.map((skill) => (
                    <li key={skill} className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-900">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-slate-600">Nothing missing. You have every skill this job asks for.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}