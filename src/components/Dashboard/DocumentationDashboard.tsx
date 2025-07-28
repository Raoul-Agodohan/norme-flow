import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Archive, 
  FileText, 
  Search,
  Download,
  Upload,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

interface DocumentationDashboardProps {
  onNavigate: (route: string) => void;
}

export const DocumentationDashboard = ({ onNavigate }: DocumentationDashboardProps) => {
  const recentNorms = [
    {
      id: 1,
      title: "NF ISO 22000:2024 - Sécurité alimentaire",
      category: "Alimentaire",
      date: "2024-01-20",
      downloads: 45,
      status: "published"
    },
    {
      id: 2,
      title: "NF EN 14476:2024 - Tests textiles",
      category: "Textile",
      date: "2024-01-18",
      downloads: 23,
      status: "published"
    },
    {
      id: 3,
      title: "NF X30-500:2024 - Environnement",
      category: "Environnement",
      date: "2024-01-15",
      downloads: 67,
      status: "published"
    }
  ];

  const pendingArchival = [
    {
      id: 1,
      title: "Protocole de tests environnementaux",
      submittedBy: "Direction",
      date: "2024-01-22"
    },
    {
      id: 2,
      title: "Standard qualité produits bio",
      submittedBy: "CT-BIO-001",
      date: "2024-01-21"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Documentation</h1>
          <p className="text-muted-foreground">Gestion de la bibliothèque des normes</p>
        </div>
        <Button onClick={() => onNavigate("library")} className="flex items-center space-x-2">
          <Archive className="h-4 w-4" />
          <span>Accéder à la bibliothèque</span>
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Archive className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-muted-foreground">Normes archivées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">2,340</p>
                <p className="text-xs text-muted-foreground">Téléchargements (mois)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">En attente d'archivage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-xs text-muted-foreground">Croissance consultations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Normes récemment publiées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Normes récemment homologuées</span>
          </CardTitle>
          <CardDescription>
            Dernières normes ajoutées à la bibliothèque
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNorms.map((norm) => (
              <div key={norm.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{norm.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline">{norm.category}</Badge>
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Publié
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(norm.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    <Download className="inline h-3 w-3 mr-1" />
                    {norm.downloads}
                  </span>
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate("approved-norms")}
            >
              Voir toutes les normes homologuées
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* En attente d'archivage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>En attente d'archivage</span>
          </CardTitle>
          <CardDescription>
            Normes validées à intégrer dans la bibliothèque
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingArchival.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Soumis par {item.submittedBy} le {new Date(item.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Button size="sm">
                  Archiver
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("library")}>
          <CardContent className="p-6 text-center">
            <Search className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Rechercher dans la bibliothèque</h3>
            <p className="text-sm text-muted-foreground">
              Recherchez et consultez les normes archivées
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("approved-norms")}>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gérer les normes</h3>
            <p className="text-sm text-muted-foreground">
              Administrer les normes homologuées et leur diffusion
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};