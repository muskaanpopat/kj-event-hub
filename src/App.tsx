
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Events from "./pages/Events";
import Internships from "./pages/Internships";
import ExamCell from "./pages/ExamCell";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import CommitteeDashboard from "./pages/dashboards/CommitteeDashboard";
import InternshipDashboard from "./pages/dashboards/InternshipDashboard";
import ExamCellDashboard from "./pages/dashboards/ExamCellDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/exam-cell" element={<ExamCell />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes with Role-Based Access */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/committee" 
              element={
                <ProtectedRoute allowedRoles={["committee-head"]}>
                  <CommitteeDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/internship" 
              element={
                <ProtectedRoute allowedRoles={["internship-cell"]}>
                  <InternshipDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/exam-cell" 
              element={
                <ProtectedRoute allowedRoles={["exam-cell"]}>
                  <ExamCellDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
