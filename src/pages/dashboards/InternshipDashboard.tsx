
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Edit, Trash2, Plus, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const InternshipDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock internships data - in a real app, this would be fetched from an API
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions",
      location: "Mumbai",
      type: "Remote",
      duration: "3 months",
      stipend: "₹15,000/month",
      description: "Looking for a Frontend Developer Intern with knowledge of HTML, CSS, JavaScript, and React.",
      requirements: "Bachelor's degree in Computer Science or related field. Strong understanding of web technologies.",
      applicationLink: "https://example.com/apply",
      postedDate: "May 28, 2023",
      deadline: "June 20, 2023",
      hasAttachments: true
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Analytics Pro",
      location: "Bangalore",
      type: "Hybrid",
      duration: "6 months",
      stipend: "₹20,000/month",
      description: "Seeking a Data Analyst Intern to help analyze and interpret complex data sets.",
      requirements: "Knowledge of SQL, Python, and data visualization tools. Statistics background preferred.",
      applicationLink: "https://example.com/apply-analytics",
      postedDate: "May 25, 2023",
      deadline: "June 15, 2023",
      hasAttachments: false
    }
  ]);

  const handleCreateInternship = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would make an API call to create the internship
    const newInternship = {
      id: internships.length + 1,
      title: "New Internship",
      company: "Example Company",
      location: "Delhi",
      type: "On-site",
      duration: "2 months",
      stipend: "₹12,000/month",
      description: "Description for the new internship opportunity.",
      requirements: "Requirements for the new internship position.",
      applicationLink: "https://example.com/apply-new",
      postedDate: "June 1, 2023",
      deadline: "June 30, 2023",
      hasAttachments: false
    };
    
    setInternships([...internships, newInternship]);
    setIsDialogOpen(false);
    
    toast({
      title: "Internship Created",
      description: "Your internship opportunity has been successfully created.",
    });
  };

  const handleDeleteInternship = (id: number) => {
    // In a real app, we would make an API call to delete the internship
    setInternships(internships.filter(internship => internship.id !== id));
    
    toast({
      title: "Internship Deleted",
      description: "Your internship opportunity has been successfully deleted.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Internship Cell Dashboard</h1>
            <p className="text-gray-600">Manage internship opportunities</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} /> Post New Internship
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateInternship}>
                <DialogHeader>
                  <DialogTitle>Post New Internship</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to post a new internship opportunity.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" placeholder="Internship title" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company
                    </Label>
                    <Input id="company" placeholder="Company name" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input id="location" placeholder="Work location" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Input id="type" placeholder="Remote, On-site, or Hybrid" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      Duration
                    </Label>
                    <Input id="duration" placeholder="e.g., 3 months" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stipend" className="text-right">
                      Stipend
                    </Label>
                    <Input id="stipend" placeholder="e.g., ₹15,000/month" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">
                      Deadline
                    </Label>
                    <Input id="deadline" type="date" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="application" className="text-right">
                      Application Link
                    </Label>
                    <Input 
                      id="application" 
                      placeholder="Link to apply" 
                      className="col-span-3" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Internship description" 
                      className="col-span-3 h-24" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="requirements" className="text-right pt-2">
                      Requirements
                    </Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="Skills and qualifications required" 
                      className="col-span-3 h-24" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Attachments
                    </Label>
                    <div className="col-span-3">
                      <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2">
                        <Upload size={16} /> Upload Documents
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload PDFs, brochures, or additional information
                      </p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Post Internship</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Internships</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {internships.map(internship => (
                <Card key={internship.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{internship.title}</CardTitle>
                        <CardDescription className="mt-1">{internship.company} • {internship.location}</CardDescription>
                      </div>
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{internship.type}</Badge>
                      <Badge variant="outline">{internship.duration}</Badge>
                      <Badge variant="outline">{internship.stipend}</Badge>
                      {internship.hasAttachments && (
                        <Badge variant="secondary">Has Attachments</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Description:</h4>
                        <p className="text-sm text-gray-700 line-clamp-2">{internship.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Requirements:</h4>
                        <p className="text-sm text-gray-700 line-clamp-2">{internship.requirements}</p>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Posted: {internship.postedDate}</span>
                        <span className="font-medium">Deadline: {internship.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Edit size={14} /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteInternship(internship.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="text-center py-12">
              <p className="text-gray-500">Displaying active internships...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="expired">
            <div className="text-center py-12">
              <p className="text-gray-500">Displaying expired internships...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InternshipDashboard;
