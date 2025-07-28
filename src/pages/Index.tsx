import { useState } from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { PromoteurDashboard } from "@/components/Dashboard/PromoteurDashboard";
import { NormalisateurDashboard } from "@/components/Dashboard/NormalisateurDashboard";
import { DirectionDashboard } from "@/components/Dashboard/DirectionDashboard";
import { MembreGTDashboard } from "@/components/Dashboard/MembreGTDashboard";
import { DocumentationDashboard } from "@/components/Dashboard/DocumentationDashboard";
import { CommunicationDashboard } from "@/components/Dashboard/CommunicationDashboard";
import { MyProposalsPage } from "@/components/Proposals/MyProposalsPage";
import { FeasibilitySheetsPage } from "@/components/Feasibility/FeasibilitySheetsPage";
import { NormProjectsPage } from "@/components/Norms/NormProjectsPage";
import { ApprovalQueuePage } from "@/components/Approval/ApprovalQueuePage";
import { ActiveNormsPage } from "@/components/Norms/ActiveNormsPage";
import { MyCommentsPage } from "@/components/Comments/MyCommentsPage";
import { MyMeetingsPage } from "@/components/Meetings/MyMeetingsPage";
import { ProposeNormForm } from "@/components/Forms/ProposeNormForm";
import { PublicSurveyPortal } from "@/components/PublicSurvey/PublicSurveyPortal";
import { TechnicalBodiesManagement } from "@/components/TechnicalBodies/TechnicalBodiesManagement";
import { NormsLibrary } from "@/components/Library/NormsLibrary";
import { MeetingsManagement } from "@/components/Meetings/MeetingsManagement";
import { StatisticsPage } from "@/components/Statistics/StatisticsPage";
import { UserManagementPage } from "@/components/UserManagement/UserManagementPage";

const Index = () => {
  const [user, setUser] = useState<{role: string, name: string} | null>(null);
  const [currentRoute, setCurrentRoute] = useState("dashboard");

  const handleLogin = (role: string, name: string) => {
    setUser({ role, name });
    setCurrentRoute("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRoute("dashboard");
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  // Vue publique pour l'enquête publique
  if (currentRoute === "public-survey") {
    return <PublicSurveyPortal />;
  }

  // Si pas connecté, afficher le formulaire de connexion
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    // Routes communes
    switch (currentRoute) {
      case "dashboard":
        switch (user.role) {
          case "promoteur":
            return <PromoteurDashboard onNavigate={handleNavigate} />;
          case "normalisateur":
            return <NormalisateurDashboard onNavigate={handleNavigate} />;
          case "direction":
            return <DirectionDashboard onNavigate={handleNavigate} />;
          case "membre_gt":
            return <MembreGTDashboard onNavigate={handleNavigate} />;
          case "documentation":
            return <DocumentationDashboard onNavigate={handleNavigate} />;
          case "communication":
            return <CommunicationDashboard onNavigate={handleNavigate} />;
          default:
            return <div className="p-6">Dashboard pour {user.role} en cours de développement...</div>;
        }
      
      case "propose-norm":
        return <ProposeNormForm onBack={() => handleNavigate("dashboard")} />;
      
      case "technical-bodies":
        return <TechnicalBodiesManagement />;
      
      case "library":
        return <NormsLibrary />;
      
      case "meetings":
        return <MeetingsManagement />;
      
      case "public-surveys":
        return <PublicSurveyPortal />;
      
      case "statistics":
        return <StatisticsPage />;
      
      case "user-management":
        return <UserManagementPage />;
      
      case "my-proposals":
        return <MyProposalsPage />;
      
      case "feasibility-sheets":
        return <FeasibilitySheetsPage />;
      
      case "norm-projects":
        return <NormProjectsPage />;
      
      case "approval-queue":
        return <ApprovalQueuePage />;
      
      case "active-norms":
        return <ActiveNormsPage />;
      
      case "my-comments":
        return <MyCommentsPage />;
      
      case "my-meetings":
        return <MyMeetingsPage />;
      
      case "approved-norms":
        return <div className="p-6"><h1 className="text-2xl font-bold">Normes Homologuées</h1><p>Interface en développement...</p></div>;
      
      case "communications":
        return <div className="p-6"><h1 className="text-2xl font-bold">Communications</h1><p>Interface en développement...</p></div>;
      
      case "broadcast-stats":
        return <div className="p-6"><h1 className="text-2xl font-bold">Statistiques Diffusion</h1><p>Interface en développement...</p></div>;
      
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Page: {currentRoute}</h1>
            <p className="text-muted-foreground">Cette interface est en cours de développement.</p>
            <button 
              onClick={() => handleNavigate("dashboard")}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-hover"
            >
              Retour au tableau de bord
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={user.role} userName={user.name} />
      <div className="flex">
        <Sidebar 
          userRole={user.role} 
          activeRoute={currentRoute} 
          onNavigate={handleNavigate} 
        />
        <main className="flex-1">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
