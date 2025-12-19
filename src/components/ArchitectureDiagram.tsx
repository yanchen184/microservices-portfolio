import { useCallback, useState, useMemo, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, NodeProps, OnConnect } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, serviceConnections } from '../data/projects';

// Custom Node Component
const CustomNode = ({ data }: NodeProps) => {
  return (
    <div className="px-6 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-primary-500/50 rounded-xl shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 min-w-[200px]">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{data.icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-100">{data.label}</h3>
          <p className="text-xs text-gray-400">{data.type}</p>
        </div>
      </div>
      {data.selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pt-3 border-t border-gray-700"
        >
          <p className="text-xs text-gray-500 mb-2 font-semibold">技術棧：</p>
          <div className="flex flex-wrap gap-1">
            {data.techStack?.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-primary-500/20 text-primary-300 rounded border border-primary-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Define nodeTypes outside component to avoid recreation
const nodeTypes = {
  custom: CustomNode,
};

const ArchitectureDiagram = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  // Initialize nodes from projects data - useMemo to prevent recreation
  const initialNodes: Node[] = useMemo(
    () =>
      projects.map((project, index) => ({
        id: project.id,
        type: 'custom',
        position: {
          x: (index % 3) * 300 + 100,
          y: Math.floor(index / 3) * 250 + 50,
        },
        data: {
          label: project.name,
          icon: project.icon,
          type: '微服務',
          techStack: project.techStack[0].technologies,
          selected: false,
        },
      })),
    []
  );

  // Initialize edges from serviceConnections
  const initialEdges: Edge[] = useMemo(
    () =>
      serviceConnections.map((conn) => ({
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'default',
        label: conn.type,
        animated: conn.animated,
        style: {
          stroke: conn.type === 'RabbitMQ' ? '#8B5CF6' : '#3B82F6',
          strokeWidth: 2,
        },
      })),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update edge styles when hoveredEdge changes
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        labelStyle: {
          fill: hoveredEdge === edge.id ? '#fff' : '#9CA3AF',
          fontWeight: hoveredEdge === edge.id ? 600 : 400,
          fontSize: 12,
        },
        labelBgStyle: {
          fill: hoveredEdge === edge.id ? '#374151' : '#1F2937',
          fillOpacity: 0.9,
        },
      }))
    );
  }, [hoveredEdge, setEdges]);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id === selectedNode ? null : node.id);

      // Update nodes to show/hide tech stack
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            selected: n.id === node.id && node.id !== selectedNode,
          },
        }))
      );
    },
    [selectedNode, setNodes]
  );

  const onEdgeMouseEnter = useCallback((_: React.MouseEvent, edge: Edge) => {
    setHoveredEdge(edge.id);
  }, []);

  const onEdgeMouseLeave = useCallback(() => {
    setHoveredEdge(null);
  }, []);

  return (
    <div className="relative">
      {/* Info Panel */}
      <AnimatePresence>
        {hoveredEdge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 right-4 z-10 bg-gray-800 border border-primary-500/50 rounded-lg p-4 shadow-xl max-w-xs"
          >
            <h4 className="text-sm font-semibold text-primary-400 mb-2">連接資訊</h4>
            <p className="text-xs text-gray-300">
              {serviceConnections.find((c) => c.id === hoveredEdge)?.description}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded ${
                  serviceConnections.find((c) => c.id === hoveredEdge)?.type === 'RabbitMQ'
                    ? 'bg-secondary-500/20 text-secondary-300 border border-secondary-500/30'
                    : 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                }`}
              >
                {serviceConnections.find((c) => c.id === hoveredEdge)?.type}
              </span>
              {serviceConnections.find((c) => c.id === hoveredEdge)?.animated && (
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded border border-green-500/30">
                  非同步
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* React Flow Canvas */}
      <div className="h-[600px] bg-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseLeave={onEdgeMouseLeave}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#374151" />
          <Controls className="bg-gray-800 border border-gray-700" />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="w-8 h-0.5 bg-primary-500"></div>
          <span className="text-sm text-gray-300">REST API</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="w-8 h-0.5 bg-secondary-500 relative">
            <motion.div
              className="absolute inset-0 bg-secondary-300"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            ></motion.div>
          </div>
          <span className="text-sm text-gray-300">RabbitMQ（非同步）</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          <span className="text-sm text-gray-400">💡 點擊節點查看技術棧</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
