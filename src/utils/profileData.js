export const profile = {
  name: "Sadia Sakharkar",
  email: "sakharkarsadia@gmail.com",
  location: "Pune, India",
  objective:
    "Second-year Computer Engineering student with knowledge of Java, Python, OOP, Data Structures, Networking, and Machine Learning. Eager to apply technical skills, gain industry experience, and contribute as a Software Engineering Intern.",
  education: [
    {
      degree: "Bachelor of Technology (B.Tech), Computer Science & Engineering",
      school: "Cummins College of Engineering for Women, Pune",
      period: "2025 - 2028",
      score: "CGPA: 8.90/10",
    },
    {
      degree: "Diploma, Computer Science & Engineering",
      school: "Dr. Babasaheb Ambedkar Technological University, Lonere",
      period: "2022 - 2025",
      score: "CGPA: 9.66/10",
    },
  ],
  experience: [
    {
      role: "Machine Learning Intern",
      org: "Konect U, Virtual",
      period: "Jun 2024 - Jul 2024",
      points: [
        "Engineered Decision Tree Regression models for crop-yield forecasting using multi-source real-time data.",
        "Automated ML pipelines for cleaning, transformation, validation, and deployment readiness.",
        "Collaborated on AI model integration for scalable web and mobile applications.",
      ],
    },
    {
      role: "Machine Learning Research & Reproducibility",
      org: "Atlas Research, Virtual",
      period: "Jul 2025 - Present",
      points: [
        "Implement and validate machine learning research workflows.",
        "Build Python experimentation pipelines and manage version-controlled datasets.",
        "Improve reliability through testing, documentation, and workflow standardization.",
      ],
    },
  ],
  certifications: [
    "AWS Foundations - Machine Learning Basics, AWS, Jun 2025 - Jul 2025",
    "Ethical Hacking Mastery: From Zero To Hacker, Udemy, Jun 2025",
    "Introduction to Cybersecurity, Cisco, Jun 2025 - Jul 2025",
    "Machine Learning Research & Reproducibility, Atlas Research, Jul 2025 - Present",
  ],
  projects: [
    {
      name: "WiseTrack - AI-Powered Platform",
      stack: "ReactJS, NodeJS, Firebase, Capacitor",
      period: "Aug 2024 - May 2025",
      summary:
        "Education management platform with dropout prediction, smart attendance, academic integrity checks, mental health monitoring, gamification, and multilingual support.",
    },
    {
      name: "AgriYield Pro - Advanced Crop Yield Prediction System",
      stack: "Python, Decision Tree Regression, Streamlit",
      period: "Jun 2024 - Jul 2024",
      summary:
        "Crop-yield forecasting system that analyzes historical trends and sensor data, with a Streamlit interface for farmer-friendly recommendations.",
    },
    {
      name: "Evento - Real-Time Event Management Mobile App",
      stack: "React Native, Firebase",
      period: "Nov 2024 - Jan 2025",
      summary:
        "Mobile app for event registration, QR attendance, Discord API integration, live buzzer communication, and realtime backend workflows.",
    },
    {
      name: "TrustSphere - Explainable SOC Decision Support System",
      stack: "Python, FastAPI, React, Machine Learning",
      period: "Feb 2026 - Present",
      summary:
        "Security operations decision-support system with log processing, risk scoring, incident analysis, and scalable cybersecurity APIs.",
    },
  ],
  skills: [
    "HTML",
    "CSS",
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Java",
    "Python",
    "SQL",
    "C Programming",
    "C#",
    "Streamlit",
    "Android",
    "MySQL",
    "MongoDB",
    "SQLite",
    "Machine Learning",
    "Decision Trees",
    "Random Forest",
    "XGBoost",
    "Matplotlib",
    "Seaborn",
    "GitHub",
    "Networking",
    "Cybersecurity",
  ],
  achievements: [
    "Awarded 1st Rank for Best Project Presentation at DBATU for innovative AI-based solutions, April 2025.",
    "Finalist in Barclays Hack-O-Hire and participant in multiple national-level hackathons.",
    "Maintained strong academic record with 8.90 CGPA in B.Tech and 9.66 CGPA in Diploma.",
    "Recognized for leadership, technical expertise, communication, and delivery under tight deadlines.",
  ],
};

export const profileText = () =>
  `${profile.name}\n${profile.email} | ${profile.location}\n\nCAREER OBJECTIVE\n${profile.objective}\n\nEDUCATION\n${profile.education
    .map((item) => `${item.degree}\n${item.school}\n${item.period} | ${item.score}`)
    .join("\n\n")}\n\nSKILLS\n${profile.skills.join(" | ")}`;
