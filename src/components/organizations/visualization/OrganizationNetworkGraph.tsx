import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, Filter, Network } from "lucide-react";
import { useOrganizations } from "@/context/OrganizationsContext";

interface Relationship {
  source: string;
  target: string;
  type: string;
  strength: number;
}

interface Node {
  id: string;
  name: string;
  size: number;
  category: string;
}

const RELATIONSHIP_TYPES = [
  "Partner", "Customer", "Supplier", "Competitor", "Affiliate", "Investor"
];

const RELATIONSHIP_COLORS: Record<string, string> = {
  "Partner": "#8B5CF6",
  "Customer": "#10B981",
  "Supplier": "#F59E0B",
  "Competitor": "#EF4444",
  "Affiliate": "#3B82F6",
  "Investor": "#EC4899",
  "default": "#6B7280"
};

const OrganizationNetworkGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { organizations } = useOrganizations();
  const [relationshipFilter, setRelationshipFilter] = useState<string>("all");
  const [strengthFilter, setStrengthFilter] = useState<number[]>([0]);
  const [zoom, setZoom] = useState<number>(1);
  
  // Generate mock relationship data based on organizations
  const generateRelationships = (): Relationship[] => {
    const relationships: Relationship[] = [];
    
    organizations.forEach((org, i) => {
      // Create 1-3 random relationships for each organization
      const numRelationships = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numRelationships; j++) {
        // Choose a random target organization (that's not the current one)
        const potentialTargets = organizations.filter((_, index) => index !== i);
        if (potentialTargets.length === 0) continue;
        
        const targetIndex = Math.floor(Math.random() * potentialTargets.length);
        const target = potentialTargets[targetIndex];
        
        // Random relationship type and strength
        const type = RELATIONSHIP_TYPES[Math.floor(Math.random() * RELATIONSHIP_TYPES.length)];
        const strength = Math.floor(Math.random() * 10) + 1;
        
        relationships.push({
          source: org.id,
          target: target.id,
          type,
          strength
        });
      }
    });
    
    return relationships;
  };
  
  const relationships = generateRelationships();
  
  // Convert organizations to graph nodes
  const nodes: Node[] = organizations.map(org => ({
    id: org.id,
    name: org.name,
    size: 10 + (org.employees ? Math.min(org.employees / 100, 20) : 10),
    category: org.industry || "Other"
  }));
  
  const filteredRelationships = relationships.filter(rel => {
    if (relationshipFilter !== "all" && rel.type !== relationshipFilter) return false;
    return rel.strength >= strengthFilter[0];
  });
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate node positions (simple force-directed layout simulation)
    const nodePositions: Record<string, { x: number, y: number }> = {};
    
    // Initialize random positions
    nodes.forEach(node => {
      nodePositions[node.id] = {
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50
      };
    });
    
    // Simple force-directed layout simulation (just a few iterations)
    for (let iteration = 0; iteration < 50; iteration++) {
      // Repulsive forces between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const posA = nodePositions[nodeA.id];
          const posB = nodePositions[nodeB.id];
          
          const dx = posB.x - posA.x;
          const dy = posB.y - posA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 1) continue;
          
          const repulsiveForce = 500 / (distance * distance);
          const fx = dx / distance * repulsiveForce;
          const fy = dy / distance * repulsiveForce;
          
          posA.x -= fx;
          posA.y -= fy;
          posB.x += fx;
          posB.y += fy;
        }
      }
      
      // Attractive forces along edges
      filteredRelationships.forEach(rel => {
        const sourcePos = nodePositions[rel.source];
        const targetPos = nodePositions[rel.target];
        
        if (!sourcePos || !targetPos) return;
        
        const dx = targetPos.x - sourcePos.x;
        const dy = targetPos.y - sourcePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 1) return;
        
        const attractiveForce = distance / 50;
        const fx = dx / distance * attractiveForce;
        const fy = dy / distance * attractiveForce;
        
        sourcePos.x += fx;
        sourcePos.y += fy;
        targetPos.x -= fx;
        targetPos.y -= fy;
      });
      
      // Boundary forces to keep nodes in view
      nodes.forEach(node => {
        const pos = nodePositions[node.id];
        const padding = 50;
        
        // Left boundary
        if (pos.x < padding) pos.x += (padding - pos.x) * 0.1;
        // Right boundary
        if (pos.x > canvas.width - padding) pos.x -= (pos.x - (canvas.width - padding)) * 0.1;
        // Top boundary
        if (pos.y < padding) pos.y += (padding - pos.y) * 0.1;
        // Bottom boundary
        if (pos.y > canvas.height - padding) pos.y -= (pos.y - (canvas.height - padding)) * 0.1;
      });
    }
    
    // Apply zoom
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(canvas.width * (1 - zoom) / (2 * zoom), canvas.height * (1 - zoom) / (2 * zoom));
    
    // Draw edges first (so they're under the nodes)
    filteredRelationships.forEach(rel => {
      const sourcePos = nodePositions[rel.source];
      const targetPos = nodePositions[rel.target];
      
      if (!sourcePos || !targetPos) return;
      
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      
      // Style based on relationship type and strength
      const color = RELATIONSHIP_COLORS[rel.type] || RELATIONSHIP_COLORS.default;
      ctx.strokeStyle = color;
      ctx.lineWidth = rel.strength / 5 + 0.5;
      ctx.stroke();
      
      // Draw relationship type label
      const labelX = (sourcePos.x + targetPos.x) / 2;
      const labelY = (sourcePos.y + targetPos.y) / 2;
      
      ctx.fillStyle = color;
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(rel.type, labelX, labelY - 6);
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const pos = nodePositions[node.id];
      
      // Determine if this node is part of a filtered relationship
      const isPartOfFilteredRelationship = filteredRelationships.some(
        rel => rel.source === node.id || rel.target === node.id
      );
      
      // Skip non-connected nodes when filtering is active
      if (relationshipFilter !== 'all' && !isPartOfFilteredRelationship) return;
      
      // Draw node
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, node.size * zoom, 0, Math.PI * 2);
      ctx.fillStyle = isPartOfFilteredRelationship ? '#3B82F6' : '#6B7280';
      ctx.fill();
      
      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, pos.x, pos.y);
    });
    
    ctx.restore();
  }, [nodes, filteredRelationships, zoom]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Organization Network
            </CardTitle>
            <CardDescription>
              Interactive visualization of organization relationships
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">Relationship Type</label>
            <Select value={relationshipFilter} onValueChange={setRelationshipFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Relationships</SelectItem>
                {RELATIONSHIP_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: RELATIONSHIP_COLORS[type] }}
                      />
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">
              Relationship Strength (Min: {strengthFilter[0]})
            </label>
            <Slider
              value={strengthFilter}
              onValueChange={setStrengthFilter}
              min={0}
              max={10}
              step={1}
              className="py-4"
            />
          </div>
        </div>
        
        <div className="relative border rounded-md" style={{ height: '500px' }}>
          <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
            style={{ cursor: 'move' }}
          />
          
          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm p-2 rounded border">
            <div className="text-xs font-medium mb-1">Relationship Types</div>
            <div className="grid grid-cols-2 gap-1">
              {RELATIONSHIP_TYPES.map(type => (
                <div key={type} className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: RELATIONSHIP_COLORS[type] }}
                  />
                  <span className="text-xs">{type}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm p-2 rounded border">
            <div className="text-xs">
              Showing {filteredRelationships.length} relationships
              {relationshipFilter !== 'all' && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {relationshipFilter}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationNetworkGraph;
