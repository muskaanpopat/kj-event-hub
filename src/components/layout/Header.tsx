
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard/student';
    
    switch (user.role) {
      case 'student':
        return '/dashboard/student';
      case 'committee-head':
        return '/dashboard/committee';
      case 'internship-cell':
        return '/dashboard/internship';
      case 'exam-cell':
        return '/dashboard/exam-cell';
      default:
        return '/dashboard/student';
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
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
                
                {isAuthenticated && (
                  <NavLink to={getDashboardLink()} onClick={toggleMenu}>Dashboard</NavLink>
                )}
                
                <div className="pt-4 border-t border-gray-200 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-sm text-gray-600">{user?.email}</span>
                        <span className="text-xs text-gray-500 mt-1 capitalize">
                          {user?.role.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full flex gap-2 items-center"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} /> Logout
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link to="/login" onClick={toggleMenu}>
                        <UserCircle className="mr-2 h-4 w-4" /> Login / Register
                      </Link>
                    </Button>
                  )}
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
              
              {isAuthenticated && (
                <NavLink to={getDashboardLink()}>Dashboard</NavLink>
              )}
            </nav>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="capitalize">
                    Role: {user?.role.replace('-', ' ')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate(getDashboardLink())}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/login">
                  <UserCircle className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
            )}
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
