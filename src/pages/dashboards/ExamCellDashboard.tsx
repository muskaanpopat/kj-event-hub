
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ExamCellDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentType, setDocumentType] = useState("timetable");
  const { toast } = useToast();
  
  // Mock documents data - in a real app, this would be fetched from an API
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "End Semester Examination - Spring 2023",
      department: "Computer Engineering",
      semester: "6",
      type: "timetable",
      description: "Timetable for the End Semester Examination for Spring 2023",
      date: "May 15, 2023"
    },
    {
      id: 2,
      title: "Mid Semester Results - Spring 2023",
      department: "Information Technology",
      semester: "4",
      type: "result",
      description: "Results for the Mid Semester Examination for Spring 2023",
      date: "April 5, 2023"
    },
    {
      id: 3,
      title: "End Semester Examination - Fall 2022",
      department: "Electronics Engineering",
      semester: "8",
      type: "timetable",
      description: "Timetable for the End Semester Examination for Fall 2022",
      date: "December 5, 2022"
    },
    {
      id: 4,
      title: "Mid Semester Results - Fall 2022",
      department: "Mechanical Engineering",
      semester: "2",
      type: "result",
      description: "Results for the Mid Semester Examination for Fall 2022",
      date: "November 15, 2022"
    }
  ]);

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would make an API call to create the document
    const newDocument = {
      id: documents.length + 1,
      title: `New ${documentType === "timetable" ? "Timetable" : "Result"}`,
      department: "Computer Engineering",
      semester: "6",
      type: documentType,
      description: `Description for the new ${documentType}`,
      date: "June 1, 2023"
    };
    
    setDocuments([...documents, newDocument]);
    setIsDialogOpen(false);
    
    toast({
      title: "Document Created",
      description: `Your ${documentType} has been successfully created.`,
    });
  };

  const handleDeleteDocument = (id: number) => {
    // In a real app, we would make an API call to delete the document
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: "Document Deleted",
      description: "Your document has been successfully deleted.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Exam Cell Dashboard</h1>
            <p className="text-gray-600">Manage exam timetables and results</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} /> Post New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <form onSubmit={handleCreateDocument}>
                <DialogHeader>
                  <DialogTitle>Post New Document</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to post a new exam document.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doc-type" className="text-right">
                      Document Type
                    </Label>
                    <Select 
                      defaultValue={documentType}
                      onValueChange={(value) => setDocumentType(value)}
                    >
                      <SelectTrigger id="doc-type" className="col-span-3">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="timetable">Exam Timetable</SelectItem>
                        <SelectItem value="result">Exam Result</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" placeholder="Document title" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select defaultValue="computer-engineering">
                      <SelectTrigger id="department" className="col-span-3">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-engineering">Computer Engineering</SelectItem>
                        <SelectItem value="information-technology">Information Technology</SelectItem>
                        <SelectItem value="electronics">Electronics Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="all">All Departments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="semester" className="text-right">
                      Semester
                    </Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="semester" className="col-span-3">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                        <SelectItem value="all">All Semesters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Document description" 
                      className="col-span-3 h-24" 
                      required 
                    />
                  </div>
                  
                  {documentType === "result" && (
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="content" className="text-right pt-2">
                        Content
                      </Label>
                      <Textarea 
                        id="content" 
                        placeholder="Paste results content here" 
                        className="col-span-3 h-48" 
                        required 
                      />
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button type="submit">Post Document</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="timetables">Timetables</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map(doc => (
                <Card key={doc.id}>
                  <CardHeader className={`pb-2 ${doc.type === 'timetable' ? 'bg-blue-50' : 'bg-green-50'}`}>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{doc.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {doc.department} • Semester {doc.semester}
                        </CardDescription>
                      </div>
                      {doc.type === 'timetable' ? (
                        <Calendar className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <Badge variant={doc.type === 'timetable' ? 'default' : 'secondary'}>
                          {doc.type === 'timetable' ? 'Timetable' : 'Result'}
                        </Badge>
                        <span className="text-sm text-gray-600">Posted: {doc.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{doc.description}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Edit size={14} /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timetables">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents
                .filter(doc => doc.type === 'timetable')
                .map(doc => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-2 bg-blue-50">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{doc.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {doc.department} • Semester {doc.semester}
                          </CardDescription>
                        </div>
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4">
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <Badge>Timetable</Badge>
                          <span className="text-sm text-gray-600">Posted: {doc.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{doc.description}</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Edit size={14} /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-1"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents
                .filter(doc => doc.type === 'result')
                .map(doc => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-2 bg-green-50">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{doc.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {doc.department} • Semester {doc.semester}
                          </CardDescription>
                        </div>
                        <FileText className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4">
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <Badge variant="secondary">Result</Badge>
                          <span className="text-sm text-gray-600">Posted: {doc.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{doc.description}</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Edit size={14} /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-1"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ExamCellDashboard;
