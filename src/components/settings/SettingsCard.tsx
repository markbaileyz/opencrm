
import React, { ReactNode } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
  headerAction?: ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ 
  title, 
  description, 
  icon, 
  children,
  collapsible,
  headerAction 
}) => {
  return (
    <Card>
      <CardHeader className={headerAction ? "flex flex-row items-center justify-between" : ""}>
        <div>
          <CardTitle className={icon ? "flex items-center" : ""}>
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        {headerAction}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
