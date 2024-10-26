import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  PanelLeft, 
  PanelRight, 
  Wrench, 
  ArrowLeft, 
  Settings,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Mock project data - in a real app, you'd fetch this based on the ID
  const project = {
    id,
    title: "Website Redesign",
    description: "Complete overhaul of company website",
    status: "Active",
    dueDate: "2024-12-31",
    team: ["John Doe", "Jane Smith", "Bob Wilson"],
    updates: [
      { date: "2024-10-20", message: "Initial wireframes completed" },
      { date: "2024-10-18", message: "Kickoff meeting held" }
    ]
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="h-16 border-b flex items-center px-4 justify-between bg-white">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            {isPanelOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{project.title}</h1>
            <p className="text-sm text-gray-500">{project.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Tool className="w-4 h-4 mr-2" />
                Tools
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Project Tools</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Project Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" /> Timeline
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> Comments
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Side Panel */}
        {isPanelOpen && (
          <div className="w-80 border-r bg-white p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Project Info */}
              <div>
                <h2 className="font-semibold mb-2">Project Details</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>

              <Separator />

              {/* Due Date */}
              <div>
                <h3 className="font-semibold mb-2">Due Date</h3>
                <p className="text-sm text-gray-600">{project.dueDate}</p>
              </div>

              <Separator />

              {/* Team Members */}
              <div>
                <h3 className="font-semibold mb-2">Team Members</h3>
                <div className="space-y-2">
                  {project.team.map((member, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {member}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Recent Updates */}
              <div>
                <h3 className="font-semibold mb-2">Recent Updates</h3>
                <div className="space-y-3">
                  {project.updates.map((update, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-gray-500">{update.date}</p>
                      <p className="text-gray-600">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-6">
          <div className="bg-white rounded-lg h-full border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Project Canvas</h2>
            <p className="text-gray-600">This is where your main project content will go.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;