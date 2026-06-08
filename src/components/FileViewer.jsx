import React from "react";
import WindowFrame from "./WindowFrame";
import { profile } from "../utils/profileData";

const SectionTitle = ({ children }) => <h3 className="mb-2 text-base font-semibold text-cyan-400">{children}</h3>;

const FileViewer = ({ fileName, node, onClose, zIndex }) => {
  const renderContent = () => {
    if (node?.app === "about") {
      return (
        <div className="space-y-3 text-sm text-cyan-100">
          <SectionTitle>About Sadia</SectionTitle>
          <p>{profile.objective}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {profile.education.map((item) => (
              <div key={item.degree} className="rounded border border-cyan-900 bg-black/30 p-3">
                <p className="text-cyan-300">{item.degree}</p>
                <p>{item.school}</p>
                <p className="text-green-300">{item.period} | {item.score}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (node?.app === "projects") {
      return (
        <div className="space-y-3 text-sm text-cyan-100">
          <SectionTitle>Projects</SectionTitle>
          {profile.projects.map((project) => (
            <article key={project.name} className="rounded border border-cyan-900 bg-black/30 p-3">
              <h4 className="font-semibold text-cyan-300">{project.name}</h4>
              <p className="text-xs text-green-300">{project.period} | {project.stack}</p>
              <p className="mt-2">{project.summary}</p>
            </article>
          ))}
        </div>
      );
    }

    if (node?.app === "experience") {
      return (
        <div className="space-y-3 text-sm text-cyan-100">
          <SectionTitle>Experience</SectionTitle>
          {profile.experience.map((job) => (
            <article key={job.role} className="rounded border border-cyan-900 bg-black/30 p-3">
              <h4 className="font-semibold text-cyan-300">{job.role}</h4>
              <p className="text-xs text-green-300">{job.org} | {job.period}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      );
    }

    if (node?.app === "certifications") {
      return (
        <div className="space-y-3 text-sm text-cyan-100">
          <SectionTitle>Certifications</SectionTitle>
          <ul className="list-disc space-y-2 pl-5">{profile.certifications.map((cert) => <li key={cert}>{cert}</li>)}</ul>
        </div>
      );
    }

    if (node?.app === "resume") {
      return (
        <div className="space-y-4 text-sm text-cyan-100">
          <SectionTitle>Resume</SectionTitle>
          <div className="rounded border border-cyan-900 bg-black/40 p-4">
            <h4 className="text-lg font-semibold text-cyan-300">{profile.name}</h4>
            <p>{profile.email} | {profile.phone} | {profile.location}</p>
            <p className="mt-3">{profile.objective}</p>
          </div>
          <div>
            <h4 className="mb-2 text-cyan-300">Skills</h4>
            <div className="flex flex-wrap gap-2">{profile.skills.map((skill) => <span key={skill} className="rounded border border-green-800 bg-green-950/40 px-2 py-1 text-xs text-green-200">{skill}</span>)}</div>
          </div>
          <div>
            <h4 className="mb-2 text-cyan-300">Achievements</h4>
            <ul className="list-disc space-y-1 pl-5">{profile.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      );
    }

    if (node?.app === "contact") {
      return (
        <div className="space-y-3 text-sm text-cyan-100">
          <SectionTitle>Contact</SectionTitle>
          <p>Email: <a className="text-blue-400 underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>Phone: {profile.phone}</p>
          <p>Location: {profile.location}</p>
          <p>GitHub: <a className="text-blue-400 underline" href="https://github.com/sadiasakharkar" target="_blank" rel="noreferrer">github.com/sadiasakharkar</a></p>
        </div>
      );
    }

    if (node?.app === "achievements") {
      return <ul className="list-disc space-y-2 pl-5 text-sm text-cyan-100">{profile.achievements.map((item) => <li key={item}>{item}</li>)}</ul>;
    }

    return <pre className="whitespace-pre-wrap text-sm text-cyan-100">{node?.content || "(empty file)"}</pre>;
  };

  return (
    <WindowFrame
      title={fileName}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={() => {}}
      isActive
      zIndex={zIndex || 120}
      defaultPosition={{ x: 120, y: 96 }}
      defaultSize={{ width: 560, height: 420 }}
      className="bg-[#1e1e1e] text-cyan-300"
      contentClassName="bg-[#111827] p-4"
    >
      {renderContent()}
    </WindowFrame>
  );
};

export default FileViewer;
