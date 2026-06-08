import { profile, profileText } from "./profileData";

const projectFiles = Object.fromEntries(
  profile.projects.map((project) => [
    `${project.name.replaceAll(" ", "_").replaceAll("-", "_")}.md`,
    {
      type: "file",
      content: `${project.name}\n${project.period}\n${project.stack}\n\n${project.summary}`,
    },
  ])
);

export const createInitialFilesystem = () => ({
  home: {
    type: "folder",
    children: {
      sadia: {
        type: "folder",
        children: {
          Desktop: {
            type: "folder",
            children: {
              "About.desktop": { type: "file", app: "about", content: profileText() },
              "Projects.desktop": { type: "file", app: "projects", content: "Open Projects" },
              "Resume.pdf": { type: "file", app: "resume", content: profileText() },
              "Contact.desktop": { type: "file", app: "contact", content: profile.email },
            },
          },
          Documents: {
            type: "folder",
            children: {
              "About_Sadia.txt": { type: "file", app: "about", content: profileText() },
              Projects: { type: "folder", app: "projects", children: projectFiles },
              Experience: {
                type: "folder",
                app: "experience",
                children: Object.fromEntries(
                  profile.experience.map((job) => [
                    `${job.role.replaceAll(" ", "_")}.md`,
                    { type: "file", content: `${job.role}\n${job.org}\n${job.period}\n\n- ${job.points.join("\n- ")}` },
                  ])
                ),
              },
              Certifications: {
                type: "folder",
                app: "certifications",
                children: Object.fromEntries(
                  profile.certifications.map((cert, index) => [`Certification_${index + 1}.md`, { type: "file", content: cert }])
                ),
              },
              "Resume.pdf": { type: "file", app: "resume", content: profileText() },
              "Contact.txt": { type: "file", app: "contact", content: `${profile.email}\n${profile.phone}\n${profile.location}` },
              "Achievements.log": { type: "file", app: "achievements", content: profile.achievements.join("\n") },
            },
          },
        },
      },
    },
  },
});

export const pathToString = (path) => {
  if (!path.length) return "/";
  if (path.join("/") === "home/sadia") return "~";
  if (path[0] === "home" && path[1] === "sadia") return `~/${path.slice(2).join("/")}`.replace(/\/$/, "");
  return `/${path.join("/")}`;
};

export const normalizePath = (currentPath, target = "") => {
  if (!target || target === "~") return ["home", "sadia"];
  const parts = target.startsWith("/")
    ? target.split("/").filter(Boolean)
    : target.startsWith("~/")
      ? ["home", "sadia", ...target.slice(2).split("/").filter(Boolean)]
      : [...currentPath, ...target.split("/").filter(Boolean)];

  return parts.reduce((acc, part) => {
    if (part === ".") return acc;
    if (part === "..") return acc.slice(0, -1);
    return [...acc, part];
  }, []);
};

export const getNodeAtPath = (filesystem, path) =>
  path.reduce((node, part) => node?.children?.[part], { children: filesystem });

export const listDirectory = (filesystem, path) => {
  const node = getNodeAtPath(filesystem, path);
  if (!node || node.type === "file") return null;
  return Object.entries(node.children || {}).map(([name, value]) => ({ name, ...value }));
};

export const createEntry = (filesystem, currentPath, name, type) => {
  const cleanName = name?.trim();
  if (!cleanName || cleanName.includes("/")) {
    return { filesystem, message: `Usage: ${type === "file" ? "touch" : "mkdir"} [name]` };
  }

  const clone = structuredClone(filesystem);
  const directory = getNodeAtPath(clone, currentPath);
  if (!directory || directory.type === "file") return { filesystem, message: "Not a directory" };
  if (directory.children[cleanName]) return { filesystem, message: `${cleanName}: already exists` };

  directory.children[cleanName] = type === "file" ? { type: "file", content: "" } : { type: "folder", children: {} };
  return { filesystem: clone, message: type === "file" ? `File '${cleanName}' created` : `Directory '${cleanName}' created` };
};
