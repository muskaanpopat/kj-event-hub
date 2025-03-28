
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-kj-blue">KJ CONNECT</span>
        </Link>
        
        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            <div className={cn(
              "fixed inset-0 bg-white z-40 flex flex-col pt-16 px-4 transition-transform duration-300 ease-in-out",
              isOpen ? "transform translate-x-0" : "transform translate-x-full"
            )}>
              <nav className="flex flex-col space-y-4 mt-4">
                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/events" onClick={toggleMenu}>Events</NavLink>
                <NavLink to="/internships" onClick={toggleMenu}>Internships</NavLink>
                <NavLink to="/exam-cell" onClick={toggleMenu}>Exam Cell</NavLink>
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Button asChild className="w-full">
                    <Link to="/login">
                      <UserCircle className="mr-2 h-4 w-4" /> Login / Register
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/events">Events</NavLink>
              <NavLink to="/internships">Internships</NavLink>
              <NavLink to="/exam-cell">Exam Cell</NavLink>
            </nav>
            <Button asChild>
              <Link to="/login">
                <UserCircle className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-gray-700 hover:text-kj-blue font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
