import { useState } from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { PromoteurDashboard } from "@/components/Dashboard/PromoteurDashboard";
import { NormalisateurDashboard } from "@/components/Dashboard/NormalisateurDashboard";
import { DirectionDashboard } from "@/components/Dashboard/DirectionDashboard";
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
