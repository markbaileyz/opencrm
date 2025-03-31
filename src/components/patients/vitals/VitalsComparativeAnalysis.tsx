
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, Thermometer, Droplet, Scale, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useVitalsData } from "@/hooks/useVitalsData";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface VitalsComparativeAnalysisProps {
  patientId: string;
}

const VitalsComparativeAnalysis: React.FC<VitalsComparativeAnalysisProps> = ({ patientId }) => {
  const { vitals, isLoading, error, getComparativeAnalysis } = useVitalsData(patientId);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !vitals) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-destructive">Failed to load comparative analysis data.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const analysis = getComparativeAnalysis(timeRange);
  
  if (!analysis) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground">Not enough data for comparative analysis.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Define normal range thresholds for vital signs
  const normalRanges = {
    systolic: { min: 90, max: 130 },
    diastolic: { min: 60, max: 85 },
    heartRate: { min: 60, max: 100 },
    temperature: { min: 97.0, max: 99.0 },
    oxygenSaturation: { min: 95, max: 100 },
    weight: { min: analysis.weight.average * 0.95, max: analysis.weight.average * 1.05 } // 5% range
  };

  // Helper to check if a value is outside normal range
  const isOutlier = (value: number, type: keyof typeof normalRanges) => {
    return value < normalRanges[type].min || value > normalRanges[type].max;
  };

  // Helper to check if a metric has any outliers
  const hasOutliers = (metricName: string) => {
    if (metricName === 'bloodPressure') {
      return isOutlier(analysis.bloodPressure.min.systolic, 'systolic') || 
             isOutlier(analysis.bloodPressure.max.systolic, 'systolic') ||
             isOutlier(analysis.bloodPressure.min.diastolic, 'diastolic') || 
             isOutlier(analysis.bloodPressure.max.diastolic, 'diastolic');
    } 
    // Convert other metric names to match the keys in normalRanges
    const key = metricName as keyof typeof normalRanges;
    if (normalRanges[key]) {
      return isOutlier(analysis[metricName].min, key) || isOutlier(analysis[metricName].max, key);
    }
    return false;
  };

  // Calculate trend indicators
  const getTrendIndicator = (current: number, prev: number) => {
    const percentChange = ((current - prev) / prev) * 100;
    
    if (Math.abs(percentChange) < 1) return "stable";
    return percentChange > 0 ? "up" : "down";
  };

  // Get trend for each metric
  const getTrend = (metricName: string) => {
    const readings = vitals.readings;
    if (readings.length < 2) return "stable";

    if (metricName === 'bloodPressure') {
      const [currentSystolic] = readings[0].bloodPressure.split('/').map(Number);
      const [prevSystolic] = readings[1].bloodPressure.split('/').map(Number);
      return getTrendIndicator(currentSystolic, prevSystolic);
    }
    
    const current = readings[0][metricName as keyof typeof readings[0]] as number;
    const prev = readings[1][metricName as keyof typeof readings[1]] as number;
    return getTrendIndicator(current, prev);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Comparative Analysis</CardTitle>
            <CardDescription>
              Compare vital statistics over time
            </CardDescription>
          </div>
          <div>
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)} className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger value="week" className="flex-1">Last Week</TabsTrigger>
                <TabsTrigger value="month" className="flex-1">Last Month</TabsTrigger>
                <TabsTrigger value="year" className="flex-1">Last Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Blood Pressure */}
          <Card className={`${hasOutliers('bloodPressure') ? 'border-red-300 dark:border-red-700' : ''} transition-all hover:shadow-md`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-primary" />
                  <CardTitle className="text-sm">Blood Pressure</CardTitle>
                </div>
                {hasOutliers('bloodPressure') && (
                  <Tooltip content="Contains readings outside normal range">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </Tooltip>
                )}
                {getTrend('bloodPressure') !== 'stable' && (
                  <Tooltip content={`Trending ${getTrend('bloodPressure')}`}>
                    {getTrend('bloodPressure') === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    )}
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground mb-1">Avg Systolic</div>
                    <div className="text-xl font-semibold">
                      {analysis.bloodPressure.average.systolic}
                      {isOutlier(analysis.bloodPressure.average.systolic, 'systolic') && (
                        <Badge variant="destructive" className="ml-1 text-xs">!</Badge>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground mb-1">Avg Diastolic</div>
                    <div className="text-xl font-semibold">
                      {analysis.bloodPressure.average.diastolic}
                      {isOutlier(analysis.bloodPressure.average.diastolic, 'diastolic') && (
                        <Badge variant="destructive" className="ml-1 text-xs">!</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <div className="text-xs text-muted-foreground mb-1">Min/Max Systolic</div>
                    <div className="text-sm">
                      {analysis.bloodPressure.min.systolic} - {analysis.bloodPressure.max.systolic}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <div className="text-xs text-muted-foreground mb-1">Min/Max Diastolic</div>
                    <div className="text-sm">
                      {analysis.bloodPressure.min.diastolic} - {analysis.bloodPressure.max.diastolic}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Normal: 90-130/60-85 mmHg
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate */}
          <Card className={`${hasOutliers('heartRate') ? 'border-red-300 dark:border-red-700' : ''} transition-all hover:shadow-md`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-red-500" />
                  <CardTitle className="text-sm">Heart Rate</CardTitle>
                </div>
                {hasOutliers('heartRate') && (
                  <Tooltip content="Contains readings outside normal range">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </Tooltip>
                )}
                {getTrend('heartRate') !== 'stable' && (
                  <Tooltip content={`Trending ${getTrend('heartRate')}`}>
                    {getTrend('heartRate') === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    )}
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">
                    {analysis.heartRate.average} <span className="text-sm font-normal">bpm</span>
                    {isOutlier(analysis.heartRate.average, 'heartRate') && (
                      <Badge variant="destructive" className="ml-1 text-xs">!</Badge>
                    )}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.heartRate.min} - {analysis.heartRate.max} bpm</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Normal: 60-100 bpm
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className={`${hasOutliers('temperature') ? 'border-red-300 dark:border-red-700' : ''} transition-all hover:shadow-md`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
                  <CardTitle className="text-sm">Temperature</CardTitle>
                </div>
                {hasOutliers('temperature') && (
                  <Tooltip content="Contains readings outside normal range">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </Tooltip>
                )}
                {getTrend('temperature') !== 'stable' && (
                  <Tooltip content={`Trending ${getTrend('temperature')}`}>
                    {getTrend('temperature') === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    )}
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">
                    {analysis.temperature.average.toFixed(1)} <span className="text-sm font-normal">°F</span>
                    {isOutlier(analysis.temperature.average, 'temperature') && (
                      <Badge variant="destructive" className="ml-1 text-xs">!</Badge>
                    )}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.temperature.min.toFixed(1)} - {analysis.temperature.max.toFixed(1)} °F</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Normal: 97.0-99.0 °F
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oxygen Saturation */}
          <Card className={`${hasOutliers('oxygenSaturation') ? 'border-red-300 dark:border-red-700' : ''} transition-all hover:shadow-md`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                  <CardTitle className="text-sm">O₂ Saturation</CardTitle>
                </div>
                {hasOutliers('oxygenSaturation') && (
                  <Tooltip content="Contains readings outside normal range">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </Tooltip>
                )}
                {getTrend('oxygenSaturation') !== 'stable' && (
                  <Tooltip content={`Trending ${getTrend('oxygenSaturation')}`}>
                    {getTrend('oxygenSaturation') === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-amber-500" />
                    )}
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">
                    {analysis.oxygenSaturation.average} <span className="text-sm font-normal">%</span>
                    {isOutlier(analysis.oxygenSaturation.average, 'oxygenSaturation') && (
                      <Badge variant="destructive" className="ml-1 text-xs">!</Badge>
                    )}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.oxygenSaturation.min} - {analysis.oxygenSaturation.max} %</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Normal: 95-100 %
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight */}
          <Card className={`${hasOutliers('weight') ? 'border-amber-300 dark:border-amber-700' : ''} transition-all hover:shadow-md`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Scale className="h-4 w-4 mr-2 text-purple-500" />
                  <CardTitle className="text-sm">Weight</CardTitle>
                </div>
                {hasOutliers('weight') && (
                  <Tooltip content="Contains significant weight changes">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </Tooltip>
                )}
                {getTrend('weight') !== 'stable' && (
                  <Tooltip content={`Trending ${getTrend('weight')}`}>
                    {getTrend('weight') === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    )}
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">
                    {analysis.weight.average.toFixed(1)} <span className="text-sm font-normal">kg</span>
                    {isOutlier(analysis.weight.average, 'weight') && (
                      <Badge variant="outline" className="ml-1 text-xs border-amber-500 text-amber-500">!</Badge>
                    )}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.weight.min.toFixed(1)} - {analysis.weight.max.toFixed(1)} kg</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {`Expected: ${normalRanges.weight.min.toFixed(1)}-${normalRanges.weight.max.toFixed(1)} kg (±5%)`}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsComparativeAnalysis;
