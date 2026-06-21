/* ============================================================
   CGPA Placement Eligibility Checker — Logic
   ============================================================ */

// ── Company Database ──────────────────────────────────────────
const COMPANIES = [
  // Tier 1 — Mass Recruiters
  {
    name: "TCS",
    logo: "🔵",
    cutoff: 60,
    type: "Mass Recruiter",
    note: "Any stream, 60% throughout",
    borderlineBuffer: 2,
  },
  {
    name: "Infosys",
    logo: "🟣",
    cutoff: 65,
    type: "Mass Recruiter",
    note: "65% / 6.5 CGPA minimum",
    borderlineBuffer: 2,
  },
  {
    name: "Wipro",
    logo: "🟤",
    cutoff: 60,
    type: "Mass Recruiter",
    note: "60% in 10th, 12th & Degree",
    borderlineBuffer: 2,
  },
  {
    name: "HCL Technologies",
    logo: "🔴",
    cutoff: 60,
    type: "Mass Recruiter",
    note: "60%+ across all academics",
    borderlineBuffer: 2,
  },
  {
    name: "Tech Mahindra",
    logo: "🟠",
    cutoff: 60,
    type: "Mass Recruiter",
    note: "60% in all qualifications",
    borderlineBuffer: 2,
  },
  {
    name: "Cognizant (CTS)",
    logo: "🔷",
    cutoff: 60,
    type: "Mass Recruiter",
    note: "No backlogs, 60% overall",
    borderlineBuffer: 2,
  },
  // Tier 2 — Mid-Tier
  {
    name: "Capgemini",
    logo: "🟦",
    cutoff: 60,
    type: "Mid-Tier",
    note: "60%+ preferred",
    borderlineBuffer: 3,
  },
  {
    name: "Accenture",
    logo: "🟧",
    cutoff: 65,
    type: "Mid-Tier",
    note: "65%+ across all qualifications",
    borderlineBuffer: 2,
  },
  {
    name: "IBM India",
    logo: "🔵",
    cutoff: 65,
    type: "Mid-Tier",
    note: "65%+ preferred, no backlogs",
    borderlineBuffer: 3,
  },
  {
    name: "L&T Infotech (LTIMindtree)",
    logo: "🟩",
    cutoff: 60,
    type: "Mid-Tier",
    note: "60% in all qualifications",
    borderlineBuffer: 2,
  },
  // Tier 3 — Product/Startup
  {
    name: "Zoho Corporation",
    logo: "🟡",
    cutoff: 60,
    type: "Product Company",
    note: "Skill-based; 60% preferred",
    borderlineBuffer: 5,
  },
  {
    name: "Mphasis",
    logo: "🟪",
    cutoff: 60,
    type: "Service Company",
    note: "60% across all academics",
    borderlineBuffer: 2,
  },
  {
    name: "Hexaware Technologies",
    logo: "🔶",
    cutoff: 60,
    type: "Service Company",
    note: "60% aggregate required",
    borderlineBuffer: 2,
  },
  {
    name: "Mindtree",
    logo: "🌱",
    cutoff: 60,
    type: "Service Company",
    note: "60%+ with no backlogs",
    borderlineBuffer: 2,
  },
];

// ── Grade Definitions ─────────────────────────────────────────
const GRADES = [
  {
    min: 90, max: 100,
    icon: "🏆", text: "Outstanding",
    sub: "You're in the top bracket for all companies",
    color: "#10B981",
  },
  {
    min: 75, max: 89.99,
    icon: "⭐", text: "Excellent",
    sub: "Strong profile — eligible for most opportunities",
    color: "#3B82F6",
  },
  {
    min: 65, max: 74.99,
    icon: "✅", text: "Good",
    sub: "Eligible for most mass recruiters",
    color: "#8B5CF6",
  },
  {
    min: 60, max: 64.99,
    icon: "📊", text: "Eligible",
    sub: "Meets the baseline for major companies",
    color: "#F59E0B",
  },
  {
    min: 50, max: 59.99,
    icon: "⚠️", text: "Below Cutoff",
    sub: "Most companies require 60%+ — focus on upskilling",
    color: "#EF4444",
  },
  {
    min: 0, max: 49.99,
    icon: "📚", text: "Keep Improving",
    sub: "Focus on skills & certifications alongside academics",
    color: "#EF4444",
  },
];

// ── Tips ──────────────────────────────────────────────────────
function getTips(percentage) {
  if (percentage >= 75) {
    return [
      "Apply confidently to product companies and startups — your profile is competitive.",
      "Focus on DSA (LeetCode 150+) and system design for top tech interviews.",
      "Build 2–3 strong GitHub projects to back up your academic profile.",
      "Prepare for CTC negotiation — with strong CGPA you have leverage.",
    ];
  } else if (percentage >= 65) {
    return [
      "You're eligible for TCS, Infosys, Wipro, Accenture and most mass recruiters.",
      "Work on a standout GitHub profile — strong projects compensate for mid-range CGPA.",
      "Get at least 1 internship certificate before campus placements open.",
      "Practice aptitude + verbal for TCS NQT and similar assessments.",
    ];
  } else if (percentage >= 60) {
    return [
      "You meet the minimum cutoff for TCS, Wipro, HCL, Tech Mahindra & more.",
      "Focus on clearing all backlogs immediately — any pending backlog is a disqualifier.",
      "Upskill with free certifications: AWS Cloud Practitioner, Google IT Support, etc.",
      "Compensate with strong DSA skills and internship experience.",
    ];
  } else {
    return [
      "Most campus drives require 60%+ — use remaining semesters to boost your CGPA.",
      "Focus on off-campus opportunities on LinkedIn and Internshala.",
      "Skill-based companies like Zoho evaluate on aptitude + coding, not CGPA alone.",
      "Get certifications on Coursera, NPTEL, or Simplilearn to strengthen your resume.",
      "Look for service-based company walkins that have flexible CGPA criteria.",
    ];
  }
}

// ── Main Calculate Function ───────────────────────────────────
function calculate() {
  const input = document.getElementById("cgpa");
  const errorEl = document.getElementById("cgpa-error");
  const resultsEl = document.getElementById("results");

  const cgpa = parseFloat(input.value);

  // Validate
  input.classList.remove("error");
  errorEl.classList.remove("visible");

  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    input.classList.add("error");
    errorEl.classList.add("visible");
    resultsEl.style.display = "none";
    return;
  }

  // Get formula
  const formula = document.querySelector('input[name="university"]:checked').value;
  let percentage;

  if (formula === "aktu") {
    percentage = (cgpa - 0.75) * 10;
  } else if (formula === "generic") {
    percentage = cgpa * 9.5;
  } else {
    percentage = cgpa * 10;
  }

  percentage = Math.min(Math.max(percentage, 0), 100);
  percentage = Math.round(percentage * 100) / 100;

  // Show results
  showResults(cgpa, percentage);
}

function showResults(cgpa, percentage) {
  const resultsEl = document.getElementById("results");

  // Show the results section
  resultsEl.style.display = "block";
  resultsEl.classList.remove("animate-in");
  void resultsEl.offsetWidth; // reflow
  resultsEl.classList.add("animate-in");

  // Scroll into view
  setTimeout(() => {
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);

  // Update percentage display
  document.getElementById("percentage-display").textContent = percentage.toFixed(2) + "%";
  document.getElementById("cgpa-display").textContent = "CGPA: " + cgpa.toFixed(2) + " / 10.0";

  // Animate meter
  const meter = document.getElementById("meter-fill");
  meter.style.width = "0%";
  setTimeout(() => {
    meter.style.width = percentage + "%";
  }, 80);

  // Grade
  const grade = GRADES.find(g => percentage >= g.min && percentage <= g.max) || GRADES[GRADES.length - 1];
  document.getElementById("grade-icon").textContent = grade.icon;
  document.getElementById("grade-text").textContent = grade.text;
  document.getElementById("grade-sub").textContent = grade.sub;
  document.getElementById("grade-text").style.color = grade.color;

  // Companies
  renderCompanies(percentage);

  // Tier summary
  renderTierSummary(percentage);

  // Tips
  renderTips(percentage);
}

function renderCompanies(percentage) {
  const grid = document.getElementById("companies-grid");
  grid.innerHTML = "";

  COMPANIES.forEach((company, i) => {
    const gap = percentage - company.cutoff;
    let statusClass, statusLabel, rowClass;

    if (gap >= 0) {
      rowClass = "eligible";
      statusClass = "status-eligible";
      statusLabel = "✓ Eligible";
    } else if (gap >= -company.borderlineBuffer) {
      rowClass = "borderline";
      statusClass = "status-borderline";
      statusLabel = "~ Borderline";
    } else {
      rowClass = "not-eligible";
      statusClass = "status-not";
      statusLabel = "✗ Below Cutoff";
    }

    const row = document.createElement("div");
    row.className = `company-row ${rowClass}`;
    row.style.animationDelay = `${i * 0.04}s`;
    row.innerHTML = `
      <div class="company-logo">${company.logo}</div>
      <div class="company-info">
        <div class="company-name">${company.name}</div>
        <div class="company-cutoff">${company.type} · Min ${company.cutoff}% · ${company.note}</div>
      </div>
      <div class="company-status ${statusClass}">${statusLabel}</div>
    `;
    grid.appendChild(row);
  });
}

function renderTierSummary(percentage) {
  const eligible = COMPANIES.filter(c => percentage >= c.cutoff).length;
  const borderline = COMPANIES.filter(c => percentage >= c.cutoff - c.borderlineBuffer && percentage < c.cutoff).length;
  const notEligible = COMPANIES.filter(c => percentage < c.cutoff - c.borderlineBuffer).length;
  const total = COMPANIES.length;

  const tierGrid = document.getElementById("tier-grid");
  tierGrid.innerHTML = `
    <div class="tier-item">
      <div class="tier-count" style="color:#10B981">${eligible}</div>
      <div class="tier-label">Eligible Companies</div>
    </div>
    <div class="tier-item">
      <div class="tier-count" style="color:#F59E0B">${borderline}</div>
      <div class="tier-label">Borderline</div>
    </div>
    <div class="tier-item">
      <div class="tier-count" style="color:#EF4444">${notEligible}</div>
      <div class="tier-label">Below Cutoff</div>
    </div>
    <div class="tier-item">
      <div class="tier-count" style="color:#3B82F6">${total}</div>
      <div class="tier-label">Total Checked</div>
    </div>
  `;
}

function renderTips(percentage) {
  const tips = getTips(percentage);
  const list = document.getElementById("tips-list");
  list.innerHTML = tips.map(t => `<li>${t}</li>`).join("");
}

// ── Allow Enter key to trigger calculate ──────────────────────
document.getElementById("cgpa").addEventListener("keydown", function (e) {
  if (e.key === "Enter") calculate();
});

// ── Live validation ───────────────────────────────────────────
document.getElementById("cgpa").addEventListener("input", function () {
  this.classList.remove("error");
  document.getElementById("cgpa-error").classList.remove("visible");
});
