import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl mb-2">{project.icon}</div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ x: 5 }}
          >
            <ArrowRight className="w-6 h-6 text-primary-400" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-500 group-hover:bg-clip-text transition-all duration-300">
          {project.name}
        </h3>

        <p className="text-gray-400 mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack[0].technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600"
            >
              {tech}
            </span>
          ))}
          {project.techStack[0].technologies.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 rounded-full border border-primary-500/30">
              +{project.techStack[0].technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Features Preview */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-semibold">核心功能：</p>
          <ul className="space-y-1">
            {project.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover Effect Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

export default ProjectCard;
