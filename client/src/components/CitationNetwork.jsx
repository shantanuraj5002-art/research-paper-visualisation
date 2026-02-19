import { useState, useEffect, useRef } from 'react';
import { getCitationNetwork, getCitationSummary } from '../services/api';
import * as d3 from 'd3';

function CitationNetwork({ paperId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeSummary, setNodeSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const svgRef = useRef();

  useEffect(() => {
    loadNetwork();
  }, [paperId]);

  const loadNetwork = async () => {
    setLoading(true);
    try {
      const result = await getCitationNetwork(paperId);
      setData(result);
    } catch (error) {
      console.error('Failed to load citation network:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && svgRef.current) {
      renderNetwork();
    }
  }, [data]);

  const renderNetwork = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;

    svg.attr('width', width).attr('height', height);

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.edges).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    const link = svg.append('g')
      .selectAll('line')
      .data(data.edges)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', d => d.type === 'main' ? 20 : 15)
      .attr('fill', d => d.type === 'main' ? '#3b82f6' : '#10b981')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    node.append('text')
      .text(d => d.label.substring(0, 30) + (d.label.length > 30 ? '...' : ''))
      .attr('x', 0)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#374151')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  };

  const handleNodeClick = async (node) => {
    setSelectedNode(node);
    setNodeSummary('');

    if (node.type === 'citation') {
      setLoadingSummary(true);
      try {
        const result = await getCitationSummary(node.label, node.authors, node.year);
        setNodeSummary(result.summary);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
        setNodeSummary('Failed to generate summary');
      } finally {
        setLoadingSummary(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading citation network...</p>
      </div>
    );
  }

  if (!data || data.nodes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No citations found in this paper</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Interactive Network:</strong> Click and drag nodes to explore. Click on citation nodes to fetch AI-generated summaries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <svg ref={svgRef}></svg>
          </div>
        </div>

        <div>
          {selectedNode ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Selected Paper</h4>
              <p className="text-sm text-gray-700 mb-2">{selectedNode.label}</p>
              
              {selectedNode.authors && (
                <p className="text-xs text-gray-500 mb-1">
                  <strong>Authors:</strong> {selectedNode.authors}
                </p>
              )}
              
              {selectedNode.year && (
                <p className="text-xs text-gray-500 mb-3">
                  <strong>Year:</strong> {selectedNode.year}
                </p>
              )}

              {selectedNode.type === 'citation' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-semibold text-sm text-gray-900 mb-2">AI Summary</h5>
                  {loadingSummary ? (
                    <p className="text-sm text-gray-500">Generating summary...</p>
                  ) : nodeSummary ? (
                    <p className="text-sm text-gray-700 leading-relaxed">{nodeSummary}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Click "Fetch Summary" to generate</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Click on a node to view details</p>
            </div>
          )}

          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">Main Paper</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Citations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitationNetwork;
