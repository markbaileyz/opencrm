
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  children?: MindMapNode[];
}

const data: MindMapNode = {
  id: 'root',
  label: 'OpenSRM',
  description: 'Customer Relationship Management Platform',
  children: [
    {
      id: 'public',
      label: 'Public Pages',
      children: [
        { id: 'home', label: 'Home Page', description: 'Landing page with product information' },
        { id: 'pricing', label: 'Pricing', description: 'Service pricing tiers' },
        { id: 'roadmap', label: 'Roadmap', description: 'Future development plans' },
        { id: 'mindmap', label: 'Mind Map', description: 'Visual site structure overview' },
        { id: 'healthcare-crm', label: 'Healthcare CRM', description: 'Healthcare CRM Enhancement Strategies' },
        { id: 'open-crm-roadmap', label: 'OpenCRM Roadmap', description: 'Comprehensive development plan for HIPAA-compliant CRM' },
      ]
    },
    {
      id: 'auth',
      label: 'Authentication',
      children: [
        { id: 'login', label: 'Login', description: 'User authentication' },
        { id: 'signup', label: 'Sign Up', description: 'New account creation' },
      ]
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Main user interface after login',
      children: [
        { id: 'stats', label: 'Statistics', description: 'Performance metrics and analytics' },
        { id: 'appointments', label: 'Appointments', description: 'Upcoming meetings and events' },
        { id: 'messages', label: 'Messages', description: 'Communication with clients' },
      ]
    },
    {
      id: 'contacts',
      label: 'Contacts',
      description: 'Customer contact management',
      children: [
        { id: 'contact-list', label: 'Contact List', description: 'View all customer contacts' },
        { id: 'contact-details', label: 'Contact Details', description: 'In-depth customer information' },
        { id: 'create-contact', label: 'Create Contact', description: 'Add new customer contacts' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'User profile and app preferences',
      children: [
        { id: 'profile', label: 'Profile Settings', description: 'Personal information and preferences' },
        { id: 'notifications', label: 'Notifications', description: 'Communication preferences' },
        { id: 'security', label: 'Security', description: 'Password and security settings' },
      ]
    },
    {
      id: 'healthcare',
      label: 'Healthcare CRM',
      description: 'Healthcare-specific CRM features',
      children: [
        { id: 'security', label: 'Data Security', description: 'HIPAA compliance and patient data protection' },
        { id: 'engagement', label: 'Community Engagement', description: 'Patient feedback and education' },
        { id: 'payments', label: 'Payment Optimization', description: 'Streamlined healthcare billing' },
        { id: 'advanced', label: 'Advanced Enhancements', description: 'AI and automation features' },
      ]
    },
  ]
};

interface MindMapProps {
  className?: string;
}

const MindMap = ({ className }: MindMapProps) => {
  const renderNode = (node: MindMapNode, level: number = 0) => {
    const baseStyles = 'transition-all duration-300 hover:shadow-md';
    
    let colorClasses;
    if (level === 0) {
      colorClasses = 'border-l-primary bg-primary/10';
    } else if (level === 1) {
      colorClasses = 'border-l-secondary bg-secondary/20';
    } else {
      colorClasses = 'border-l-muted bg-muted/10';
    }
    
    return (
      <div key={node.id} className={`mb-4 ${level > 0 ? 'ml-6' : ''}`}>
        <Card className={`${baseStyles} ${colorClasses} border-l-4`}>
          <CardHeader className="py-3">
            <CardTitle className="text-lg">{node.label}</CardTitle>
            {node.description && <CardDescription>{node.description}</CardDescription>}
          </CardHeader>
        </Card>
        
        {node.children && node.children.length > 0 && (
          <div className="mt-2 border-l-2 border-dashed border-muted-foreground/20 pl-4">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`p-4 ${className}`}>
      {renderNode(data)}
    </div>
  );
};

export default MindMap;
