import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock timetable data
const mockTimetables = [
  {
    id: 1,
    title: "End Semester Examination - Spring 2023",
    department: "Computer Engineering",
    semester: "6",
    date: "May 15, 2023",
    fileUrl: "#",
    fileSize: "1.2 MB"
  },
  {
    id: 2,
    title: "Mid Semester Examination - Spring 2023",
    department: "Information Technology",
    semester: "4",
    date: "March 10, 2023",
    fileUrl: "#",
    fileSize: "980 KB"
  },
  {
    id: 3,
    title: "End Semester Examination - Fall 2022",
    department: "Electronics Engineering",
    semester: "8",
    date: "December 5, 2022",
    fileUrl: "#",
    fileSize: "1.5 MB"
  },
  {
    id: 4,
    title: "Mid Semester Examination - Fall 2022",
    department: "Mechanical Engineering",
    semester: "2",
    date: "October 12, 2022",
    fileUrl: "#",
    fileSize: "1.1 MB"
  }
];

// Mock results data
const mockResults = [
  {
    id: 1,
    title: "End Semester Results - Spring 2023",
    department: "Computer Engineering",
    semester: "6",
    date: "June 20, 2023",
    fileUrl: "#",
    fileSize: "2.1 MB"
  },
  {
    id: 2,
    title: "Mid Semester Results - Spring 2023",
    department: "Information Technology",
    semester: "4",
    date: "April 5, 2023",
    fileUrl: "#",
    fileSize: "1.8 MB"
  },
  {
    id: 3,
    title: "End Semester Results - Fall 2022",
    department: "Electronics Engineering",
    semester: "8",
    date: "January 10, 2023",
    fileUrl: "#",
    fileSize: "2.5 MB"
  },
  {
    id: 4,
    title: "Mid Semester Results - Fall 2022",
    department: "Mechanical Engineering",
    semester: "2",
    date: "November 15, 2022",
    fileUrl: "#",
    fileSize: "1.7 MB"
  }
];

const ExamCell = () => {
  const [activeTab, setActiveTab] = useState("timetables");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === "all" || 
        item.department === selectedDepartment;
      
      const matchesSemester = 
        selectedSemester === "all" || 
        item.semester === selectedSemester;
      
      return matchesSearch && matchesDepartment && matchesSemester;
    });
  };

  const filteredTimetables = filterItems(mockTimetables);
  const filteredResults = filterItems(mockResults);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Exam Cell</h1>
            <p className="text-gray-600">Access exam timetables and results</p>
          </div>
          <Button asChild>
            <Link to="/login">Upload Documents</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="timetables" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-6">
            <TabsTrigger value="timetables">Timetables</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              
              <div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Engineering">Computer Engineering</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Electronics Engineering">Electronics Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="1">Semester 1</SelectItem>
                    <SelectItem value="2">Semester 2</SelectItem>
                    <SelectItem value="3">Semester 3</SelectItem>
                    <SelectItem value="4">Semester 4</SelectItem>
                    <SelectItem value="5">Semester 5</SelectItem>
                    <SelectItem value="6">Semester 6</SelectItem>
                    <SelectItem value="7">Semester 7</SelectItem>
                    <SelectItem value="8">Semester 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <TabsContent value="timetables" className="space-y-6">
            {filteredTimetables.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTimetables.map((timetable) => (
                  <DocumentCard 
                    key={timetable.id} 
                    document={timetable} 
                    type="timetable" 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No timetables match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setSearchTerm(""); 
                    setSelectedDepartment("all"); 
                    setSelectedSemester("all"); 
                  }}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((result) => (
                  <DocumentCard 
                    key={result.id} 
                    document={result} 
                    type="result" 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setSearchTerm(""); 
                    setSelectedDepartment("all"); 
                    setSelectedSemester("all"); 
                  }}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface DocumentCardProps {
  document: {
    id: number;
    title: string;
    department: string;
    semester: string;
    date: string;
    fileUrl: string;
    fileSize: string;
  };
  type: "timetable" | "result";
}

const DocumentCard = ({ document, type }: DocumentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-2">{document.title}</CardTitle>
        <CardDescription>
          {document.department} - Semester {document.semester}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-start gap-2 mb-4">
          <Badge className={type === "timetable" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
            {type === "timetable" ? "Timetable" : "Result"}
          </Badge>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Uploaded on {document.date}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FileText className="h-4 w-4 mr-2" />
          <span>PDF - {document.fileSize}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <a href={document.fileUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" /> Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCell;
