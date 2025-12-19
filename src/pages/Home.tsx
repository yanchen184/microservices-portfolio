import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Home = () => {
  const scrollToArchitecture = () => {
    document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">微服務專案作品集</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-4"
          >
            智能倉儲生態系統 - 微服務架構實戰
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-400 mb-8"
          >
            展示 5 個微服務系統透過 <span className="text-primary-400 font-semibold">REST API</span> 與{' '}
            <span className="text-secondary-400 font-semibold">RabbitMQ</span> 協作
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center text-sm text-gray-400"
          >
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Spring Boot
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></span>
              React + TypeScript
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Kubernetes
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              RabbitMQ
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={scrollToArchitecture}
          className="absolute bottom-10 p-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-110"
          aria-label="向下滾動"
        >
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </section>

      {/* Architecture Diagram Section */}
      <section id="architecture" className="min-h-screen py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              微服務架構圖
            </h2>
            <p className="text-gray-400 text-lg">
              點擊節點查看技術棧 · Hover 連接線查看 API 類型
            </p>
          </div>

          <ArchitectureDiagram />
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              專案展示
            </h2>
            <p className="text-gray-400 text-lg">
              點擊卡片查看詳細資訊
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
