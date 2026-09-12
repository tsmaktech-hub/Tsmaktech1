export type Page = 'home' | 'portfolio' | 'about' | 'get-started';
export type TrackType = 'client' | 'student';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  image: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  category?: string;
  client?: string;
  year?: string;
  metric?: string;
  highlights?: string[];
  architecture?: string;
}

