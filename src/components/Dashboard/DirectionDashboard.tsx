import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  FileText, 
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Eye,
  UserPlus,
  Settings,
  Download
} from "lucide-react";

interface DirectionDashboardProps {
  onNavigate: (route: string) => void;
}

export const DirectionDashboard = ({ onNavigate }: DirectionDashboardProps) => {
  const pendingApprovals = [
    {
      id: 1,
      title: "Norme sur la sécurité alimentaire",
      normalisateur: "Dr. Martin",
      phase: "Avant-projet finalisé",
      date: "2024-01-15",
      priority: "haute"
    },
    {
      id: 2,
      title: "Standard de qualité textile",
      normalisateur: "Mme. Dubois",
      phase: "Enquête publique terminée",
      date: "2024-01-12",
      priority: "moyenne"
    }
  ];

  const monthlyStats = {
    newProposals: 12,
    approvedNorms: 8,
    activeProjects: 25,
    averageDelay: 8.5
  };

  const sectorStats = [
    { sector: "Alimentaire", norms: 15, percentage: 30 },
    { sector: "Construction", norms: 12, percentage: 24 },
    { sector: "Environnement", norms: 10, percentage: 20 },
    { sector: "Technologie", norms: 8, percentage: 16 },
    { sector: "Autre", norms: 5, percentage: 10 }
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
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Direction</h1>
          <p className="text-muted-foreground">Vue d'ensemble et pilotage stratégique</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate("user-management")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Gérer utilisateurs
          </Button>
          <Button onClick={() => onNavigate("statistics")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Rapports détaillés
          </Button>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{monthlyStats.newProposals}</p>
                <p className="text-xs text-muted-foreground">Nouvelles propositions</p>
                <p className="text-xs text-success">+20% vs mois dernier</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{monthlyStats.approvedNorms}</p>
                <p className="text-xs text-muted-foreground">Normes approuvées</p>
                <p className="text-xs text-success">+15% vs mois dernier</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{monthlyStats.activeProjects}</p>
                <p className="text-xs text-muted-foreground">Projets en cours</p>
                <p className="text-xs text-muted-foreground">Stable</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">{monthlyStats.averageDelay}</p>
                <p className="text-xs text-muted-foreground">Délai moyen (mois)</p>
                <p className="text-xs text-destructive">+0.5 vs objectif</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projets en attente d'approbation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>En attente d'approbation</span>
            </CardTitle>
            <CardDescription>
              Projets nécessitant votre validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">Par {project.normalisateur}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{project.phase}</Badge>
                      {getPriorityBadge(project.priority)}
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
              onClick={() => onNavigate("approval-queue")}
            >
              Voir tous les projets en attente
            </Button>
          </CardContent>
        </Card>

        {/* Répartition par secteur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Répartition par secteur</span>
            </CardTitle>
            <CardDescription>
              Distribution des normes par domaine d'activité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.sector}</span>
                    <span className="text-muted-foreground">{stat.norms} normes</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("statistics")}
            >
              Voir statistiques détaillées
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Taux d'approbation</span>
                <span className="font-bold text-success">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Délai moyen</span>
                <span className="font-bold text-warning">8.5 mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Satisfaction parties prenantes</span>
                <span className="font-bold text-success">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alertes système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span>3 projets en retard</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-destructive" />
                <span>2 enquêtes publiques expirées</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-warning" />
                <span>5 nouveaux utilisateurs en attente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Exporter rapport mensuel
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres système
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gérer les accès
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions stratégiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("approval-queue")}>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Approuver projets</h3>
            <p className="text-sm text-muted-foreground">
              Valider les projets finalisés
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("statistics")}>
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Analyses détaillées</h3>
            <p className="text-sm text-muted-foreground">
              Rapports et indicateurs
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("user-management")}>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gestion utilisateurs</h3>
            <p className="text-sm text-muted-foreground">
              Accès et permissions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};