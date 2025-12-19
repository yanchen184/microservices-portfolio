import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">專案不存在</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          返回首頁
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl">{project.icon}</div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold gradient-text mb-4">{project.name}</h1>
              <p className="text-xl text-gray-300">{project.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-primary-400" />
            核心功能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-colors"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-6">技術棧詳細</h2>
          <div className="space-y-6">
            {project.techStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-primary-400 mb-4">
                  【{stack.category}】
                </h3>
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-gray-300 rounded-lg border border-primary-500/30 hover:border-primary-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Flow Description Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-6">系統流程</h2>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-primary-500/30">
            <div className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {project.flowDescription.split('→').map((step, index, array) => (
                <span key={index}>
                  <span className="text-primary-300">{step.trim()}</span>
                  {index < array.length - 1 && (
                    <span className="text-secondary-400 mx-2">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Challenges Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            挑戰與解決方案
          </h2>
          <div className="space-y-6">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-400 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">
                      {challenge.title}
                    </h3>
                  </div>
                </div>

                <div className="ml-14 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-semibold text-red-400">挑戰</span>
                    </div>
                    <p className="text-gray-300 pl-6">{challenge.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">解決方案</span>
                    </div>
                    <p className="text-gray-300 pl-6">{challenge.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProjectDetail;
