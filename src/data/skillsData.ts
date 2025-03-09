export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages' | 'other';
  icon?: string;
}

export interface SkillData {
  id: string;
  color: string;
  darkColor: string;
  percentage: number;
}

const skillsData: SkillData[] = [
  {
    id: 'react',
    color: 'from-cyan-500 to-cyan-700',
    darkColor: 'from-cyan-400 to-cyan-600',
    percentage: 92,
  },
  {
    id: 'nodejs',
    color: 'from-green-500 to-green-700',
    darkColor: 'from-green-400 to-green-600',
    percentage: 88,
  },
  {
    id: 'python',
    color: 'from-blue-500 to-blue-700',
    darkColor: 'from-blue-400 to-blue-600',
    percentage: 85,
  },
  {
    id: 'golang',
    color: 'from-cyan-500 to-cyan-700',
    darkColor: 'from-cyan-400 to-cyan-600',
    percentage: 75,
  },
  {
    id: 'database',
    color: 'from-yellow-500 to-yellow-700',
    darkColor: 'from-yellow-400 to-yellow-600',
    percentage: 90,
  },
  {
    id: 'lua',
    color: 'from-indigo-500 to-indigo-700',
    darkColor: 'from-indigo-400 to-indigo-600',
    percentage: 70,
  },
  {
    id: 'docker',
    color: 'from-blue-500 to-blue-700',
    darkColor: 'from-blue-400 to-blue-600',
    percentage: 82,
  },
  {
    id: 'architecture',
    color: 'from-purple-500 to-purple-700',
    darkColor: 'from-purple-400 to-purple-600',
    percentage: 87,
  },
  {
    id: 'testing',
    color: 'from-teal-500 to-teal-700',
    darkColor: 'from-teal-400 to-teal-600',
    percentage: 80,
  },
];

export default skillsData;
