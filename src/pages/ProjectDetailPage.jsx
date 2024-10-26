import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  PanelLeftClose, PanelLeftOpen, Wrench, ArrowLeft, Settings, Users, Calendar, MessageSquare, Plus, TextIcon, ImageIcon, ChartBarIcon, Sun, Moon, X, Info
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ProjectDetailPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock project data - in a real app, you'd fetch this based on the ID
  const project = {
    id,
    title: "Hospital Project",
    description: "834 Main Street",
    status: "Active",
    dueDate: "2024-12-31",
    team: ["John Doe", "Jane Smith", "Bob Wilson"],
    updates: [
      { date: "2024-10-20", message: "Initial sketches completed" },
      { date: "2024-10-18", message: "Kickoff meeting held" }
    ]
  };

  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 3, h: 2 },
    { i: '2', x: 3, y: 0, w: 3, h: 2 },
    { i: '3', x: 6, y: 0, w: 3, h: 2 },
    { i: '4', x: 9, y: 0, w: 3, h: 2 },
  ]);
  
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };
  const [containerWidth, setContainerWidth] = useState(1200);
  const [items, setItems] = useState([
    { i: '1', x: 0, y: 0, w: 3, h: 2, type: 'text', content: 'Text Block 1' },
    { i: '2', x: 3, y: 0, w: 3, h: 2, type: 'chart', content: 'Chart 1' },
  ]);
  
  const containerRef = useRef(null);

  // Calculate container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Function to add new items
  const addItem = (type) => {
    const newId = (items.length + 1).toString();
    const newItem = {
      i: newId,
      x: (items.length * 3) % 12,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      type,
      content: `${type} ${newId}`
    };
    
    setItems([...items, newItem]);
  };

  // Render different types of content
  const renderContent = (item) => {
    switch (item.type) {
      case 'text':
        return (
          <div className="p-4">
            <textarea 
              className="w-full h-full p-2 border rounded text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
              defaultValue={item.content}
              placeholder="Enter text..."
            />
          </div>
        );
      case 'chart':
        return (
          <div className="p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <ChartBarIcon className="w-8 h-8 text-gray-400" />
            <span className="ml-2">Chart Placeholder</span>
          </div>
        );
      default:
        return <div>Unknown Type</div>;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="h-16 border-b flex items-center px-4 justify-between bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 dark:text-gray-400" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            {isPanelOpen ? <PanelLeftClose className="h-4 w-4 dark:text-gray-400" /> : <PanelLeftOpen className="h-4 w-4 dark:text-gray-400" />}
          </Button>
          <div>
            <h1 className="text-xl font-semibold dark:text-gray-200">{project.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="mr-2"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2 dark:text-gray-400" />
            <span className="dark:text-gray-200">Share</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Wrench className="w-4 h-4 mr-2 dark:text-gray-400" />
                <span className="dark:text-gray-200">Tools</span>
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
          <div className="w-80 border-r bg-white dark:bg-gray-800 dark:border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Project Info */}
              <div>
                <h2 className="font-semibold mb-2 dark:text-gray-200">Project Details</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
              </div>

              <Separator />

              {/* Due Date */}
              <div>
                <h3 className="font-semibold mb-2 dark:text-gray-200">Due Date</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.dueDate}</p>
              </div>

              <Separator />

              {/* Team Members */}
              <div>
                <h3 className="font-semibold mb-2 dark:text-gray-200">Team Members</h3>
                <div className="space-y-2">
                  {project.team.map((member, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {member}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Recent Updates */}
              <div>
                <h3 className="font-semibold mb-2 dark:text-gray-200">Recent Updates</h3>
                <div className="space-y-3">
                  {project.updates.map((update, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="text-gray-500 dark:text-gray-400">{update.date}</p>
                      <p className="text-gray-600 dark:text-gray-400">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
        {/* Add Items Toolbar */}
        <div className="mb-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addItem('text')}
            >
              <TextIcon className="w-4 h-4 mr-2 dark:text-gray-400" />
              <span className="dark:text-gray-200">Add Text</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addItem('chart')}
            >
              <ChartBarIcon className="w-4 h-4 mr-2 dark:text-gray-400" />
              <span className="dark:text-gray-200">Add Chart</span>
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg h-full border dark:border-gray-700 shadow-sm p-6" ref={containerRef}>
            {/* Grid Container */}
            <GridLayout
              className="layout"
              layout={items}
              cols={12}
              rowHeight={100}
              width={containerWidth}
              draggableHandle=".drag-handle"
              draggableCancel=".pointer-events-auto"  // Add this line
              onLayoutChange={(newLayout) => {
                const updatedItems = items.map(item => {
                  const layoutItem = newLayout.find(l => l.i === item.i);
                  return { ...item, ...layoutItem };
                });
                setItems(updatedItems);
              }}
            >
             {items.map((item) => (
                <div 
                  key={item.i}
                  className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center dark:text-gray-200">
                  {/* Separate drag handle from the rest of the header */}
                    <div className="drag-handle cursor-move flex items-center">
                      <span className="px-2">⋮</span>
                      <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                    </div>
                    {/* Buttons container */}
                    <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Info button */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Prevent drag from starting
                        setSelectedItem(item);
                      }}
                    >
                      <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  {/* Close button */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        e.preventDefault();
                        e.stopPropagation();
                        setItems(items.filter(i => i.i !== item.i));
                      }}
                    >
                      <X className="h-2 w-2 text-gray-600 dark:text-gray-400" /> 
                    </Button>
                    </div>
                  </div>
                  {renderContent(item)}
                </div>
              ))}
            </GridLayout>
            <Sheet 
              open={selectedItem !== null}
              onOpenChange={(open) => !open && setSelectedItem(null)}
              side="right"
            >
              <SheetContent className="w-[400px] sm:w-[540px] dark:bg-gray-800 dark:text-gray-100">
                <SheetHeader>
                  <SheetTitle className="dark:text-gray-100">
                    Item Details
                  </SheetTitle>
                </SheetHeader>
                
                {selectedItem && (
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium dark:text-gray-200">Type</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                      </p>
                    </div>

                    <Separator className="dark:border-gray-700" />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium dark:text-gray-200">Position</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Column: {selectedItem.x + 1}, Row: {selectedItem.y + 1}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Size: {selectedItem.w} x {selectedItem.h}
                      </p>
                    </div>

                    <Separator className="dark:border-gray-700" />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium dark:text-gray-200">Settings</h3>
                      {/* Add specific settings based on item type */}
                      {selectedItem.type === 'text' && (
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">
                              Background Color
                            </label>
                            <select 
                              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                              defaultValue="white"
                            >
                              <option value="white">White</option>
                              <option value="light">Light Gray</option>
                              <option value="dark">Dark Gray</option>
                            </select>
                          </div>
                        </div>
                      )}
                      {selectedItem.type === 'chart' && (
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">
                              Chart Type
                            </label>
                            <select 
                              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                              defaultValue="bar"
                            >
                              <option value="bar">Bar Chart</option>
                              <option value="line">Line Chart</option>
                              <option value="pie">Pie Chart</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;