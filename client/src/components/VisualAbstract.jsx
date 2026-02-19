import { useState, useEffect, useRef } from 'react';
import { generateVisualAbstract } from '../services/api';
import * as d3 from 'd3';

function VisualAbstract({ paperId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const svgRef = useRef();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateVisualAbstract(paperId);
      setData(result);
    } catch (error) {
      console.error('Failed to generate visual abstract:', error);
      alert(`Error: ${error.response?.data?.error || error.message || 'Failed to generate visual abstract. Check console for details.'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && svgRef.current) {
      renderVisualization();
    }
  }, [data]);

  const renderVisualization = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    
    svg.attr('width', width).attr('height', height);

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1f2937')
      .text(data.title);

    // Methodology box
    const methodBox = svg.append('g').attr('transform', 'translate(50, 80)');
    methodBox.append('rect')
      .attr('width', 300)
      .attr('height', 100)
      .attr('fill', '#dbeafe')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('rx', 8);
    
    methodBox.append('text')
      .attr('x', 150)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', '#1e40af')
      .text('Methodology');
    
    const methodWords = data.methodology.split(' ');
    let line = '';
    let lineNumber = 0;
    methodWords.forEach((word) => {
      const testLine = line + word + ' ';
      if (testLine.length > 35) {
        methodBox.append('text')
          .attr('x', 150)
          .attr('y', 50 + lineNumber * 18)
          .attr('text-anchor', 'middle')
          .attr('font-size', '14px')
          .attr('fill', '#374151')
          .text(line);
        line = word + ' ';
        lineNumber++;
      } else {
        line = testLine;
      }
    });
    if (line) {
      methodBox.append('text')
        .attr('x', 150)
        .attr('y', 50 + lineNumber * 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', '#374151')
        .text(line);
    }

    // Data points
    const dataGroup = svg.append('g').attr('transform', 'translate(450, 80)');
    dataGroup.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-weight', 'bold')
      .attr('font-size', '18px')
      .attr('fill', '#1f2937')
      .text('Key Data Points');

    data.keyDataPoints.forEach((point, i) => {
      const pointGroup = dataGroup.append('g').attr('transform', `translate(0, ${30 + i * 60})`);
      
      pointGroup.append('circle')
        .attr('cx', 15)
        .attr('cy', 0)
        .attr('r', 12)
        .attr('fill', '#10b981');
      
      pointGroup.append('text')
        .attr('x', 35)
        .attr('y', 5)
        .attr('font-weight', 'bold')
        .attr('fill', '#1f2937')
        .text(point.label);
      
      pointGroup.append('text')
        .attr('x', 35)
        .attr('y', 25)
        .attr('font-size', '20px')
        .attr('font-weight', 'bold')
        .attr('fill', '#059669')
        .text(point.value);
    });

    // Conclusion box
    const conclusionBox = svg.append('g').attr('transform', 'translate(50, 220)');
    conclusionBox.append('rect')
      .attr('width', 700)
      .attr('height', 120)
      .attr('fill', '#fef3c7')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('rx', 8);
    
    conclusionBox.append('text')
      .attr('x', 350)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', '#92400e')
      .text('Conclusion');
    
    const conclusionWords = data.conclusion.split(' ');
    line = '';
    lineNumber = 0;
    conclusionWords.forEach((word) => {
      const testLine = line + word + ' ';
      if (testLine.length > 70) {
        conclusionBox.append('text')
          .attr('x', 350)
          .attr('y', 50 + lineNumber * 20)
          .attr('text-anchor', 'middle')
          .attr('font-size', '14px')
          .attr('fill', '#374151')
          .text(line);
        line = word + ' ';
        lineNumber++;
      } else {
        line = testLine;
      }
    });
    if (line) {
      conclusionBox.append('text')
        .attr('x', 350)
        .attr('y', 50 + lineNumber * 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', '#374151')
        .text(line);
    }
  };

  const exportSVG = () => {
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'visual-abstract.svg';
    link.click();
  };

  const exportPNG = () => {
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'visual-abstract.png';
        link.click();
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div>
      {!data ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Generate an AI-powered visual abstract of this paper</p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading ? 'Generating...' : 'Generate Visual Abstract'}
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex gap-2">
            <button
              onClick={exportSVG}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              Export SVG
            </button>
            <button
              onClick={exportPNG}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              Export PNG
            </button>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Regenerate
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white overflow-auto">
            <svg ref={svgRef}></svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisualAbstract;
