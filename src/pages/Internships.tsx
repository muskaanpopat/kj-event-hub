
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Building, ExternalLink, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

// Mock internship data
const mockInternships = [
  {
    id: 1,
    title: "Web Developer Intern",
    company: "TechSolutions Inc.",
    location: "Mumbai, Maharashtra",
    type: "Part-time",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "We are looking for a web developer intern to help build responsive websites and web applications using HTML, CSS, JavaScript, and React.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    applyLink: "https://example.com/apply",
    postedOn: "2 days ago",
    deadlineDate: "June 30, 2023"
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Hub",
    location: "Remote",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹20,000/month",
    description: "Join our data science team to work on real-world projects involving data analysis, machine learning model development, and data visualization.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    applyLink: "https://example.com/apply",
    postedOn: "1 week ago",
    deadlineDate: "July 15, 2023"
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Designs",
    location: "Pune, Maharashtra",
    type: "Part-time",
    duration: "4 months",
    stipend: "₹12,000/month",
    description: "Looking for a UI/UX design intern to assist in creating user-centered designs, wireframes, and prototypes for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
    applyLink: "https://example.com/apply",
    postedOn: "3 days ago",
    deadlineDate: "June 25, 2023"
  },
  {
    id: 4,
    title: "Software Development Intern",
    company: "InnovateTech",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹18,000/month",
    description: "Join our development team to work on building and testing software applications using Java, Spring Boot, and related technologies.",
    skills: ["Java", "Spring Boot", "Git", "SQL"],
    applyLink: "https://example.com/apply",
    postedOn: "5 days ago",
    deadlineDate: "July 5, 2023"
  }
];

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("all");

  const filteredInternships = mockInternships.filter((internship) => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = 
      locationType === "all" || 
      (locationType === "remote" && internship.location.toLowerCase() === "remote") || 
      (locationType === "onsite" && internship.location.toLowerCase() !== "remote");
    
    return matchesSearch && matchesLocation;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Internship Opportunities</h1>
            <p className="text-gray-600">Find internships posted by companies and college committees</p>
          </div>
          <Button asChild>
            <Link to="/login">Post an Internship</Link>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={locationType} onValueChange={setLocationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Location Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="onsite">Onsite Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Internships List */}
        <div className="space-y-6">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No internships match your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchTerm(""); setLocationType("all"); }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

interface InternshipCardProps {
  internship: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    duration: string;
    stipend: string;
    description: string;
    skills: string[];
    applyLink: string;
    postedOn: string;
    deadlineDate: string;
  };
}

const InternshipCard = ({ internship }: InternshipCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{internship.title}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <Building className="h-4 w-4 mr-2" />
            <span>{internship.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{internship.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            {internship.type}
          </Badge>
          <div className="text-lg font-medium text-kj-blue">{internship.stipend}</div>
          <div className="text-sm text-gray-500">Apply by: {internship.deadlineDate}</div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{internship.description}</p>
      
      <div className="mb-4">
        <div className="font-medium mb-2">Required Skills:</div>
        <div className="flex flex-wrap gap-2">
          {internship.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-500">
          Posted {internship.postedOn}
        </div>
        <Button asChild>
          <a href={internship.applyLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Internships;
