
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, Edit, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CommitteeDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock events data - in a real app, this would be fetched from an API
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Web Development Bootcamp",
      date: "June 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Auditorium A",
      description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
      category: "Workshop",
      registrationLink: "https://forms.google.com/example"
    },
    {
      id: 2,
      title: "AI/ML Workshop",
      date: "June 10, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Lab 301",
      description: "Introduction to Machine Learning algorithms and practical applications.",
      category: "Workshop",
      registrationLink: "https://forms.google.com/example2"
    }
  ]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would make an API call to create the event
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      date: "June 30, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "Online",
      description: "Description for the new event",
      category: "Hackathon",
      registrationLink: "https://forms.google.com/new-event"
    };
    
    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
    
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    });
  };

  const handleDeleteEvent = (id: number) => {
    // In a real app, we would make an API call to delete the event
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "Your event has been successfully deleted.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Committee Dashboard</h1>
            <p className="text-gray-600">Manage your events and activities</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} /> Create New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <form onSubmit={handleCreateEvent}>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new event.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" placeholder="Event title" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" type="date" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input id="time" placeholder="e.g., 10:00 AM - 2:00 PM" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input id="location" placeholder="Event location" className="col-span-3" required />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select defaultValue="workshop">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="registration" className="text-right">
                      Registration Link
                    </Label>
                    <Input 
                      id="registration" 
                      placeholder="Google Form URL for registration" 
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Event description" 
                      className="col-span-3 h-24" 
                      required 
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Create Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-1">{event.date}, {event.time}</CardDescription>
                      </div>
                      <CalendarClock className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <span className="text-sm text-gray-600">{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Registration:</span>{" "}
                      <a 
                        href={event.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {event.registrationLink.length > 30 
                          ? `${event.registrationLink.substring(0, 30)}...` 
                          : event.registrationLink}
                      </a>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Edit size={14} /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-1"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="text-center py-12">
              <p className="text-gray-500">Displaying upcoming events...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="text-center py-12">
              <p className="text-gray-500">Displaying past events...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CommitteeDashboard;
