export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'Web App' | 'Website' | 'Mobile App' | 'Backend';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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
}
