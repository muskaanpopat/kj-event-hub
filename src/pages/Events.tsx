
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    type: "workshop",
    date: "June 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Computer Lab 1",
    organizer: "Computer Society",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript in this intensive bootcamp.",
    registrationLink: "https://forms.google.com",
    materials: [
      { name: "Workshop Agenda", url: "#" },
      { name: "Prerequisites", url: "#" }
    ],
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Hack Somaiya 2023",
    type: "hackathon",
    date: "July 10-12, 2023",
    time: "48 Hours",
    location: "Main Auditorium",
    organizer: "Tech Club",
    description: "A 48-hour hackathon where students work in teams to build innovative solutions for real-world problems.",
    registrationLink: "https://forms.google.com",
    materials: [
      { name: "Rules & Guidelines", url: "#" },
      { name: "Resources", url: "#" }
    ],
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "AI/ML Workshop",
    type: "workshop",
    date: "June 25, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Seminar Hall",
    organizer: "AI Club",
    description: "Introduction to machine learning concepts and practical implementation using Python and TensorFlow.",
    registrationLink: "https://forms.google.com",
    materials: [
      { name: "Workshop Materials", url: "#" }
    ],
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Blockchain Technology Seminar",
    type: "seminar",
    date: "July 5, 2023",
    time: "11:00 AM - 1:00 PM",
    location: "Conference Room",
    organizer: "Blockchain Club",
    description: "Learn about blockchain technology, cryptocurrencies, and their applications in various industries.",
    registrationLink: "https://forms.google.com",
    materials: [
      { name: "Presentation Slides", url: "#" }
    ],
    image: "/placeholder.svg"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesType = selectedType === "all" || event.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Events & Workshops</h1>
            <p className="text-gray-600">Discover and register for upcoming events at KJ Somaiya</p>
          </div>
          <Button asChild>
            <Link to="/login">Post an Event</Link>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedType === "all" ? "default" : "outline"} 
                onClick={() => setSelectedType("all")}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={selectedType === "hackathon" ? "default" : "outline"} 
                onClick={() => setSelectedType("hackathon")}
                size="sm"
              >
                Hackathons
              </Button>
              <Button 
                variant={selectedType === "workshop" ? "default" : "outline"} 
                onClick={() => setSelectedType("workshop")}
                size="sm"
              >
                Workshops
              </Button>
              <Button 
                variant={selectedType === "seminar" ? "default" : "outline"} 
                onClick={() => setSelectedType("seminar")}
                size="sm"
              >
                Seminars
              </Button>
            </div>
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events match your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchTerm(""); setSelectedType("all"); }}
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

interface EventCardProps {
  event: {
    id: number;
    title: string;
    type: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    description: string;
    registrationLink: string;
    materials: { name: string; url: string }[];
    image: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "hackathon":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "workshop":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "seminar":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover aspect-video md:aspect-auto" 
          />
        </div>
        <div className="p-6 md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={getTypeBadgeColor(event.type)}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 mb-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-kj-blue" />
              <span>{event.date}</span>
            </div>
            <div>{event.time}</div>
            <div>{event.location}</div>
          </div>
          
          <p className="text-gray-700 mb-4">{event.description}</p>
          
          <p className="text-sm text-gray-600 mb-4">Organized by <span className="font-medium">{event.organizer}</span></p>
          
          <Tabs defaultValue="details">
            <TabsList className="mb-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Button asChild className="w-full sm:w-auto">
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register Now <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </TabsContent>
            <TabsContent value="materials" className="space-y-2">
              {event.materials.map((material, index) => (
                <Button key={index} variant="outline" asChild className="w-full sm:w-auto">
                  <a href={material.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <span>{material.name}</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
