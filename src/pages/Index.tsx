
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock, Briefcase, FileText, Users } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect, Learn, and Grow with KJ CONNECT
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Your central hub for college events, internships, and academic information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-kj-blue hover:bg-kj-darkblue">
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Committee Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<CalendarClock className="h-10 w-10 text-kj-blue" />}
              title="Events & Hackathons"
              description="Discover upcoming hackathons, workshops, and technical events organized by various college committees."
              linkTo="/events"
            />
            
            <FeatureCard 
              icon={<Briefcase className="h-10 w-10 text-kj-blue" />}
              title="Internship Opportunities"
              description="Access the latest internship postings and career opportunities for students."
              linkTo="/internships"
            />
            
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-kj-blue" />}
              title="Exam Information"
              description="Stay updated with exam timetables and access your results through our Exam Cell."
              linkTo="/exam-cell"
            />
            
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-kj-blue" />}
              title="Committee Portal"
              description="Committee heads can log in to post events, upload materials, and manage registrations."
              linkTo="/login"
            />
          </div>
        </div>
      </section>
      
      {/* Recent Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Events</h2>
            <Button asChild variant="outline">
              <Link to="/events">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard 
              title="Web Development Bootcamp"
              date="June 15, 2023"
              organizer="Computer Society"
              image="/placeholder.svg"
            />
            
            <EventCard 
              title="AI/ML Workshop"
              date="June 10, 2023"
              organizer="AI Club"
              image="/placeholder.svg"
            />
            
            <EventCard 
              title="Startup Pitch Competition"
              date="June 5, 2023"
              organizer="E-Cell"
              image="/placeholder.svg"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-kj-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join KJ CONNECT today to stay updated with all college events, internships, and academic information.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
}

const FeatureCard = ({ icon, title, description, linkTo }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={linkTo} className="text-kj-blue hover:text-kj-darkblue font-medium inline-flex items-center">
        Learn More <span className="ml-1">→</span>
      </Link>
    </div>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  organizer: string;
  image: string;
}

const EventCard = ({ title, date, organizer, image }: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-gray-600 mb-4">
          <p className="mb-1">{date}</p>
          <p>Organized by {organizer}</p>
        </div>
        <Button asChild>
          <Link to="/events">View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
