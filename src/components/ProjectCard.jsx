import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const ProjectCard = ({ project, onClick }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Last updated: {project.lastUpdated}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"/>
            <span className="text-sm">{project.status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;