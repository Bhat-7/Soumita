export interface ProjectExperience {
  type: "cp" | "wip";
  title: string;
  client?: string;
  designation?: string;
  companyName?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  projectUrl?: string;
  githubUrl?: string;
  description: string;
  technologies: string[];
  projectThumbnail?: string;
  projectImages?: string;
}

export interface CareerExperience {
  id: string | number;
  companyName: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string; // Use 'Present' or similar for ongoing roles
  description: string[];
  skills: string[];
  companyLogo?: string;
  projects: ProjectExperience[];
}
