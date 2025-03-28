
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, Briefcase, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // In a real application, we would fetch this data from an API
  const recentEvents = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      date: "June 15, 2023",
      organizer: "Computer Society",
      category: "Workshop"
    },
    {
      id: 2,
      title: "AI/ML Workshop",
      date: "June 10, 2023",
      organizer: "AI Club",
      category: "Workshop"
    }
  ];

  const recentInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions",
      postedDate: "May 28, 2023",
      deadline: "June 20, 2023"
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Analytics Pro",
      postedDate: "May 25, 2023",
      deadline: "June 15, 2023"
    }
  ];

  const examUpdates = [
    {
      id: 1,
      title: "End Semester Examination - Spring 2023",
      type: "Timetable",
      date: "Posted on May 15, 2023"
    },
    {
      id: 2,
      title: "Mid Semester Results - Spring 2023",
      type: "Result",
      date: "Posted on April 5, 2023"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at KJ CONNECT.</p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Updates</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="exams">Exam Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="bg-blue-50 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Recent Events</CardTitle>
                    <CalendarClock className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {recentEvents.map(event => (
                    <div key={event.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                      <p className="text-sm text-gray-600">By {event.organizer}</p>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link to="/events">View All Events</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-green-50 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Latest Internships</CardTitle>
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {recentInternships.map(internship => (
                    <div key={internship.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <h3 className="font-medium">{internship.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">at {internship.company}</p>
                      <p className="text-sm text-gray-600">Posted: {internship.postedDate}</p>
                      <p className="text-sm text-gray-600">Apply by: {internship.deadline}</p>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link to="/internships">View All Internships</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-amber-50 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Exam Updates</CardTitle>
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {examUpdates.map(update => (
                    <div key={update.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{update.title}</h3>
                        <Badge variant="outline">{update.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{update.date}</p>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link to="/exam-cell">View All Exam Updates</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...recentEvents, ...recentEvents].map((event, index) => (
                <Card key={`event-${index}`}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.organizer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Badge variant="outline">{event.category}</Badge>
                      <span className="text-sm text-gray-600">{event.date}</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="internships">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...recentInternships, ...recentInternships].map((internship, index) => (
                <Card key={`internship-${index}`}>
                  <CardHeader>
                    <CardTitle>{internship.title}</CardTitle>
                    <CardDescription>{internship.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">Posted: {internship.postedDate}</p>
                      <p className="text-sm text-gray-600">Apply by: {internship.deadline}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link to={`/internships/${internship.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...examUpdates, ...examUpdates].map((update, index) => (
                <Card key={`exam-${index}`}>
                  <CardHeader>
                    <CardTitle>{update.title}</CardTitle>
                    <CardDescription>{update.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Badge variant="outline">{update.type}</Badge>
                    </div>
                    <Button asChild className="w-full">
                      <Link to="/exam-cell">View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
