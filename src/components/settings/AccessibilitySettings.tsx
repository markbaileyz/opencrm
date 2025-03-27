
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SettingsCard from "./SettingsCard";
import { Accessibility, ZoomIn, Contrast, MousePointer } from "lucide-react";

interface AccessibilityOptions {
  highContrast: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  textZoom: number;
  cursorSize: number;
}

const AccessibilitySettings = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<AccessibilityOptions>({
    highContrast: false,
    reducedMotion: false,
    focusIndicators: true,
    textZoom: 100,
    cursorSize: 1,
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleChange = (field: keyof AccessibilityOptions) => {
    setOptions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSliderChange = (field: keyof AccessibilityOptions, value: number[]) => {
    setOptions((prev) => ({
      ...prev,
      [field]: value[0],
    }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Accessibility settings saved",
        description: "Your accessibility settings have been updated.",
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <SettingsCard
        title="Accessibility Settings"
        description="Make the application easier to use based on your needs"
        icon={<Accessibility className="h-5 w-5" />}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="font-medium">
                High Contrast Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better readability
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={options.highContrast}
              onCheckedChange={() => handleToggleChange("highContrast")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduced-motion" className="font-medium">
                Reduced Motion
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations throughout the application
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={options.reducedMotion}
              onCheckedChange={() => handleToggleChange("reducedMotion")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="focus-indicators" className="font-medium">
                Enhanced Focus Indicators
              </Label>
              <p className="text-sm text-muted-foreground">
                Make it clearer which element is currently focused
              </p>
            </div>
            <Switch
              id="focus-indicators"
              checked={options.focusIndicators}
              onCheckedChange={() => handleToggleChange("focusIndicators")}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-zoom" className="font-medium flex items-center">
                <ZoomIn className="h-4 w-4 mr-2" />
                Text Zoom
              </Label>
              <span className="text-sm font-medium">{options.textZoom}%</span>
            </div>
            <Slider
              id="text-zoom"
              min={75}
              max={150}
              step={5}
              value={[options.textZoom]}
              onValueChange={(value) => handleSliderChange("textZoom", value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Adjust the size of text throughout the application
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cursor-size" className="font-medium flex items-center">
                <MousePointer className="h-4 w-4 mr-2" />
                Cursor Size
              </Label>
              <span className="text-sm font-medium">
                {options.cursorSize === 1 ? "Normal" : 
                 options.cursorSize === 1.5 ? "Large" : "Extra Large"}
              </span>
            </div>
            <Slider
              id="cursor-size"
              min={1}
              max={2}
              step={0.5}
              value={[options.cursorSize]}
              onValueChange={(value) => handleSliderChange("cursorSize", value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Adjust the size of your cursor for better visibility
            </p>
          </div>
        </div>
      </SettingsCard>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Accessibility Settings"}
        </Button>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
