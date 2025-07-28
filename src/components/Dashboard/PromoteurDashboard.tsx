import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Calendar
} from "lucide-react";

interface PromoteurDashboardProps {
  onNavigate: (route: string) => void;
}

export const PromoteurDashboard = ({ onNavigate }: PromoteurDashboardProps) => {
  const proposals = [
    {
      id: 1,
      title: "Norme sur la sécurité alimentaire",
      status: "en_cours",
      date: "2024-01-15",
      progress: 45
    },
    {
      id: 2,
      title: "Standard de qualité textile",
      status: "validé",
      date: "2024-01-10",
      progress: 100
    },
    {
      id: 3,
      title: "Protocole de tests environnementaux",
      status: "rejeté",
      date: "2024-01-05",
      progress: 20
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning"><Clock className="mr-1 h-3 w-3" />En cours</Badge>;
      case "validé":
        return <Badge variant="outline" className="bg-success/10 text-success border-success"><CheckCircle className="mr-1 h-3 w-3" />Validé</Badge>;
      case "rejeté":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive"><XCircle className="mr-1 h-3 w-3" />Rejeté</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="mr-1 h-3 w-3" />Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Promoteur</h1>
          <p className="text-muted-foreground">Gérez vos propositions de normes</p>
        </div>
        <Button onClick={() => onNavigate("propose-norm")} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Proposer une norme</span>
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Propositions totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Validées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">67%</p>
                <p className="text-xs text-muted-foreground">Taux de succès</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mes propositions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Mes propositions de normes</span>
          </CardTitle>
          <CardDescription>
            Suivez l'avancement de vos propositions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{proposal.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    {getStatusBadge(proposal.status)}
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(proposal.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium">{proposal.progress}%</p>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${proposal.progress}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate("my-proposals")}
            >
              Voir toutes mes propositions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("propose-norm")}>
          <CardContent className="p-6 text-center">
            <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Nouvelle proposition</h3>
            <p className="text-sm text-muted-foreground">
              Proposez une nouvelle norme en remplissant la fiche de faisabilité
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("my-proposals")}>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gérer mes propositions</h3>
            <p className="text-sm text-muted-foreground">
              Consultez et modifiez vos propositions existantes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};