import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Calendar,
  BarChart3,
  Archive,
  Settings,
  Home
} from "lucide-react";

interface SidebarProps {
  userRole: string;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

const getMenuItems = (userRole: string) => {
  const commonItems = [
    { icon: Home, label: "Tableau de bord", route: "dashboard" },
  ];

  switch (userRole) {
    case "promoteur":
      return [
        ...commonItems,
        { icon: FileText, label: "Proposer une norme", route: "propose-norm" },
        { icon: ClipboardList, label: "Mes propositions", route: "my-proposals" },
      ];
    
    case "normalisateur":
      return [
        ...commonItems,
        { icon: ClipboardList, label: "Fiches de faisabilité", route: "feasibility-sheets" },
        { icon: Users, label: "Organes techniques", route: "technical-bodies" },
        { icon: FileText, label: "Projets de normes", route: "norm-projects" },
        { icon: Calendar, label: "Réunions", route: "meetings" },
        { icon: MessageSquare, label: "Enquêtes publiques", route: "public-surveys" },
      ];
    
    case "direction":
      return [
        ...commonItems,
        { icon: ClipboardList, label: "Projets à approuver", route: "approval-queue" },
        { icon: BarChart3, label: "Statistiques", route: "statistics" },
        { icon: Users, label: "Gestion des utilisateurs", route: "user-management" },
      ];
    
    case "membre_gt":
      return [
        ...commonItems,
        { icon: FileText, label: "Normes en cours", route: "active-norms" },
        { icon: MessageSquare, label: "Mes commentaires", route: "my-comments" },
        { icon: Calendar, label: "Mes réunions", route: "my-meetings" },
      ];
    
    case "documentation":
      return [
        ...commonItems,
        { icon: Archive, label: "Bibliothèque", route: "library" },
        { icon: FileText, label: "Normes homologuées", route: "approved-norms" },
      ];
    
    case "communication":
      return [
        ...commonItems,
        { icon: MessageSquare, label: "Communiqués", route: "communications" },
        { icon: BarChart3, label: "Statistiques diffusion", route: "broadcast-stats" },
      ];
    
    default:
      return commonItems;
  }
};

export const Sidebar = ({ userRole, activeRoute, onNavigate }: SidebarProps) => {
  const menuItems = getMenuItems(userRole);

  return (
    <aside className="w-64 bg-card border-r border-border p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.route;
          
          return (
            <Button
              key={item.route}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-primary text-primary-foreground"
              )}
              onClick={() => onNavigate(item.route)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};