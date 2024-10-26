import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';  


const ProjectsPage = () => {
  // Example projects data - in a real app, this would come from your backend
  const navigate = useNavigate();  // Add this inside the component

  const projects = [
    {
      id: 1,
      title: "Hospital Project",
      description: "834 Main Street",
      lastUpdated: "2024-10-20",
      status: "Active"
    },
    {
      id: 2,
      title: "City Hall Expansion",
      description: "902 Smithson Avenue",
      lastUpdated: "2024-10-19",
      status: "In Progress"
    },
  ];

  const handleProjectClick = (projectId) => {
    // We'll implement routing here later
    navigate(`/project/${projectId}`);  // This handles the navigation
  };

  return (
    <div className="bg-gray-50 p-6 h-screen w-screen flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parch</h1>
            <p className="text-gray-500 mt-1">Manage and organize your projects</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;