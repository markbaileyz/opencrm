
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Activity, FileText, GitBranch } from "lucide-react";
import { healthcareBranchPatterns } from "../workflows/templates/templateUtils";

const BranchingPatternsPreview = () => {
  const patternCount = Object.keys(healthcareBranchPatterns).length;
  
  // Calculate total branches across all patterns
  const totalBranches = Object.values(healthcareBranchPatterns)
    .reduce((sum, pattern) => sum + pattern.branches.length, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="h-5 w-5 mr-2 text-primary" />
          Healthcare Branching Patterns
        </CardTitle>
        <CardDescription>
          Route patients based on clinical conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Test Results Routing</h3>
                <p className="text-xs text-muted-foreground">
                  {healthcareBranchPatterns.testResults.branches.length} possible paths
                </p>
              </div>
            </div>
            <Badge variant="outline">Clinical</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 text-red-700">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Vital Signs Monitoring</h3>
                <p className="text-xs text-muted-foreground">
                  3 possible paths
                </p>
              </div>
            </div>
            <Badge variant="outline">Monitoring</Badge>
          </div>
          
          <div className="p-3 border border-dashed rounded-lg text-center text-sm text-muted-foreground">
            <p>
              {patternCount - 2} more branching patterns available
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Total branching patterns:</span>
            <Badge variant="secondary">{patternCount}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <span>Total conditional branches:</span>
            <Badge variant="secondary">{totalBranches}</Badge>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to="/workflows">View All Branching Patterns</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BranchingPatternsPreview;
