import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  BarChart3, 
  Send,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  Bell
} from "lucide-react";

interface CommunicationDashboardProps {
  onNavigate: (route: string) => void;
}

export const CommunicationDashboard = ({ onNavigate }: CommunicationDashboardProps) => {
  const recentCommunications = [
    {
      id: 1,
      title: "Nouvelle norme sécurité alimentaire disponible",
      type: "newsletter",
      status: "sent",
      date: "2024-01-20",
      views: 1250,
      clicks: 89
    },
    {
      id: 2,
      title: "Enquête publique - Standards textiles",
      type: "communique",
      status: "scheduled",
      date: "2024-01-25",
      views: 0,
      clicks: 0
    },
    {
      id: 3,
      title: "Rapport annuel normalisation 2023",
      type: "rapport",
      status: "draft",
      date: "2024-01-15",
      views: 0,
      clicks: 0
    }
  ];

  const upcomingCampaigns = [
    {
      id: 1,
      title: "Lancement enquête publique textile",
      date: "2024-01-25",
      channels: ["Email", "LinkedIn", "Site web"]
    },
    {
      id: 2,
      title: "Webinaire nouvelles normes ISO",
      date: "2024-02-01",
      channels: ["Email", "Twitter", "Newsletter"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Envoyé</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Programmé</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Brouillon</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Communication</h1>
          <p className="text-muted-foreground">Gérez les communications et la diffusion</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Send className="h-4 w-4" />
          <span>Nouveau communiqué</span>
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Communications ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-xs text-muted-foreground">Vues totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">3.2K</p>
                <p className="text-xs text-muted-foreground">Abonnés newsletter</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">+18%</p>
                <p className="text-xs text-muted-foreground">Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communications récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Communications récentes</span>
          </CardTitle>
          <CardDescription>
            Aperçu de vos dernières campagnes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div key={comm.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{comm.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline">{comm.type}</Badge>
                    {getStatusBadge(comm.status)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(comm.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {comm.views}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {comm.clicks}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Éditer
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate("communications")}
            >
              Voir toutes les communications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campagnes à venir */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Campagnes programmées</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                <div>
                  <h4 className="font-medium">{campaign.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(campaign.date).toLocaleDateString('fr-FR')} - {campaign.channels.join(", ")}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("communications")}>
          <CardContent className="p-6 text-center">
            <Send className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Créer un communiqué</h3>
            <p className="text-sm text-muted-foreground">
              Rédigez et programmez une nouvelle communication
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("broadcast-stats")}>
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Statistiques diffusion</h3>
            <p className="text-sm text-muted-foreground">
              Analysez les performances de vos campagnes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};