
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, Briefcase, FileText, Users, School } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-kj-blue mb-4">About KJ CONNECT</h1>
            <p className="text-xl text-gray-600">
              Your central hub for college events, internships, and academic information
            </p>
          </div>

          <Card className="mb-10 shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                KJ CONNECT was created to streamline communication between college committees, 
                the exam cell, and students at K.J. Somaiya College. We aim to provide a centralized 
                platform where information about events, internships, and academic updates can be 
                shared easily and efficiently.
              </p>
              <p className="text-gray-600">
                By bringing together all these resources in one place, we hope to enhance the student 
                experience, foster greater participation in college activities, and ensure that 
                important academic information is accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-kj-blue" />}
              title="Events & Workshops"
              description="Access information about upcoming hackathons, workshops, and technical events organized by various college committees."
            />
            
            <FeatureCard 
              icon={<Briefcase className="h-8 w-8 text-kj-blue" />}
              title="Internship Opportunities"
              description="Discover the latest internship postings and career opportunities available to students."
            />
            
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-kj-blue" />}
              title="Exam Information"
              description="Stay updated with exam timetables and access your results through our Exam Cell portal."
            />
            
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-kj-blue" />}
              title="Committee Portal"
              description="Committee heads can log in to post events, upload materials, and manage registrations."
            />
          </div>

          <Card className="mb-10 shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">For Students</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  As a student, KJ CONNECT helps you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Stay informed about all college events</li>
                  <li>Access internship opportunities</li>
                  <li>Receive instant notifications about exam schedules and results</li>
                  <li>Download event materials and resources</li>
                  <li>Register for events through direct links</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-10 shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">For Committee Heads</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Committee heads can utilize KJ CONNECT to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Announce and manage events</li>
                  <li>Upload event materials and registration forms</li>
                  <li>Reach the entire student body efficiently</li>
                  <li>Post internship opportunities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <School className="h-12 w-12 text-kj-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Join KJ CONNECT Today</h2>
            <p className="text-gray-600">
              Connect with your college community and never miss an important update!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="mt-1">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
