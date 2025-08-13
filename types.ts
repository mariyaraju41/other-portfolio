
export enum Section {
  Home = 'HOME',
  About = 'ABOUT',
  Projects = 'PROJECTS',
  Contact = 'CONTACT',
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
  details: string;
}

export interface Skill {
  category: string;
  items: string[];
}
