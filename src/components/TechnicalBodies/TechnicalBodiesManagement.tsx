import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search,
  Settings,
  UserPlus,
  Calendar,
  FileText,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TechnicalBodiesManagement = () => {
  const technicalBodies = [
    {
      id: 1,
      name: "Groupe de Travail Sécurité Alimentaire",
      type: "GT",
      sector: "Alimentaire",
      members: 12,
      status: "actif",
      currentProject: "Norme restauration collective",
      nextMeeting: "2024-01-20",
      coordinator: "Dr. Martin Dubois"
    },
    {
      id: 2,
      name: "Sous-Comité Textile Biologique",
      type: "SC",
      sector: "Textile",
      members: 8,
      status: "actif",
      currentProject: "Standard textiles bio",
      nextMeeting: "2024-01-22",
      coordinator: "Mme. Sophie Laurent"
    },
    {
      id: 3,
      name: "Comité Technique Construction Durable",
      type: "CT",
      sector: "Construction",
      members: 15,
      status: "en_pause",
      currentProject: "Tests matériaux écologiques",
      nextMeeting: null,
      coordinator: "Ing. Pierre Moreau"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Actif</Badge>;
      case "en_pause":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">En pause</Badge>;
      case "termine":
        return <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted">Terminé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      GT: "bg-primary/10 text-primary border-primary",
      SC: "bg-accent/10 text-accent-foreground border-accent",
      CT: "bg-secondary/10 text-secondary-foreground border-secondary"
    };
    return <Badge variant="outline" className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organes techniques</h1>
          <p className="text-muted-foreground">Gestion des Groupes de Travail, Sous-Comités et Comités Techniques</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Créer un organe technique
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Organes actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Membres total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Réunions prévues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Projets en cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche et filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un organe technique..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Tous les types</Button>
              <Button variant="outline">Tous les secteurs</Button>
              <Button variant="outline">Statut</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des organes techniques */}
      <div className="grid grid-cols-1 gap-4">
        {technicalBodies.map((body) => (
          <Card key={body.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{body.name}</CardTitle>
                    {getTypeBadge(body.type)}
                    {getStatusBadge(body.status)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Secteur: {body.sector}</span>
                    <span>Coordinateur: {body.coordinator}</span>
                    <span>{body.members} membres</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Gérer les membres
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Planifier réunion
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Documents
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Projet en cours:</p>
                  <p className="text-sm text-muted-foreground">{body.currentProject}</p>
                </div>
                
                {body.nextMeeting && (
                  <div>
                    <p className="text-sm font-medium">Prochaine réunion:</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(body.nextMeeting).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Users className="mr-2 h-3 w-3" />
                      Membres ({body.members})
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-3 w-3" />
                      Documents
                    </Button>
                  </div>
                  <Button size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Créer un GT</h3>
            <p className="text-sm text-muted-foreground">
              Nouveau Groupe de Travail
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Planifier réunions</h3>
            <p className="text-sm text-muted-foreground">
              Organiser les rencontres
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gérer les experts</h3>
            <p className="text-sm text-muted-foreground">
              Base de données des experts
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};