import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  Users, 
  FileText, 
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Eye
} from "lucide-react";

interface NormalisateurDashboardProps {
  onNavigate: (route: string) => void;
}

export const NormalisateurDashboard = ({ onNavigate }: NormalisateurDashboardProps) => {
  const pendingProposals = [
    {
      id: 1,
      title: "Norme sur la sécurité alimentaire",
      promoter: "Ministère de la Santé",
      date: "2024-01-15",
      priority: "haute"
    },
    {
      id: 2,
      title: "Standard de qualité textile",
      promoter: "Association Textile",
      date: "2024-01-12",
      priority: "moyenne"
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "Protocole de tests environnementaux",
      phase: "Rédaction avant-projet",
      progress: 65,
      nextMeeting: "2024-01-20"
    },
    {
      id: 2,
      title: "Norme qualité construction",
      phase: "Enquête publique",
      progress: 80,
      nextMeeting: "2024-01-18"
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "GT Sécurité alimentaire",
      date: "2024-01-20",
      time: "14:00",
      participants: 8
    },
    {
      id: 2,
      title: "SC Construction",
      date: "2024-01-22",
      time: "09:00",
      participants: 12
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "haute":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Haute</Badge>;
      case "moyenne":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Moyenne</Badge>;
      case "basse":
        return <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted">Basse</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Normalisateur</h1>
          <p className="text-muted-foreground">Coordination des projets de normalisation</p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Fiches en attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Projets actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Organes techniques</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Réunions cette semaine</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Enquêtes publiques</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fiches de faisabilité en attente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Fiches de faisabilité en attente</span>
            </CardTitle>
            <CardDescription>
              Propositions nécessitant votre validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingProposals.map((proposal) => (
                <div key={proposal.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{proposal.title}</h4>
                    <p className="text-xs text-muted-foreground">{proposal.promoter}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getPriorityBadge(proposal.priority)}
                      <span className="text-xs text-muted-foreground">
                        {new Date(proposal.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("feasibility-sheets")}
            >
              Voir toutes les fiches
            </Button>
          </CardContent>
        </Card>

        {/* Projets actifs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Projets de normes actifs</span>
            </CardTitle>
            <CardDescription>
              Suivi de l'avancement des projets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{project.phase}</span>
                    <span className="text-muted-foreground">
                      Prochaine réunion: {new Date(project.nextMeeting).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("norm-projects")}
            >
              Voir tous les projets
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Réunions à venir */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Prochaines réunions</span>
          </CardTitle>
          <CardDescription>
            Planification des réunions des organes techniques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{meeting.title}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(meeting.date).toLocaleDateString('fr-FR')} à {meeting.time}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <UserCheck className="h-3 w-3 mr-1" />
                    {meeting.participants} participants
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Détails
                </Button>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onNavigate("meetings")}
          >
            Gérer toutes les réunions
          </Button>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("feasibility-sheets")}>
          <CardContent className="p-6 text-center">
            <ClipboardList className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Valider les fiches</h3>
            <p className="text-sm text-muted-foreground">
              Examiner les nouvelles propositions
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("technical-bodies")}>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Organes techniques</h3>
            <p className="text-sm text-muted-foreground">
              Gérer les GT, SC et CT
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("meetings")}>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Organiser réunions</h3>
            <p className="text-sm text-muted-foreground">
              Planifier et animer
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("public-surveys")}>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Enquêtes publiques</h3>
            <p className="text-sm text-muted-foreground">
              Lancer et gérer
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};