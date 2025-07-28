import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus, 
  Search,
  Settings,
  Shield,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Ban,
  CheckCircle,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserManagementPage = () => {
  const users = [
    {
      id: 1,
      name: "Dr. Martin Dubois",
      email: "m.dubois@codinorm.bj",
      role: "normalisateur",
      status: "actif",
      lastLogin: "2024-01-19",
      createdAt: "2023-06-15",
      phone: "+229 97 XX XX XX",
      organization: "CODINORM",
      permissions: ["read", "write", "validate"]
    },
    {
      id: 2,
      name: "Mme. Sophie Laurent",
      email: "sophie.laurent@textile-assoc.bj",
      role: "membre_gt",
      status: "actif",
      lastLogin: "2024-01-18",
      createdAt: "2023-08-20",
      phone: "+229 96 XX XX XX",
      organization: "Association Textile",
      permissions: ["read", "comment"]
    },
    {
      id: 3,
      name: "Ing. Pierre Moreau",
      email: "p.moreau@construction.bj",
      role: "expert",
      status: "en_attente",
      lastLogin: null,
      createdAt: "2024-01-15",
      phone: "+229 95 XX XX XX",
      organization: "Bureau d'études construction",
      permissions: ["read"]
    },
    {
      id: 4,
      name: "Jean Akpakpan",
      email: "j.akpakpan@ministere.bj",
      role: "promoteur",
      status: "suspendu",
      lastLogin: "2024-01-10",
      createdAt: "2023-04-10",
      phone: "+229 97 XX XX XX",
      organization: "Ministère du Commerce",
      permissions: ["read", "submit"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge variant="outline" className="bg-success/10 text-success border-success"><CheckCircle className="mr-1 h-3 w-3" />Actif</Badge>;
      case "en_attente":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning"><Clock className="mr-1 h-3 w-3" />En attente</Badge>;
      case "suspendu":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive"><Ban className="mr-1 h-3 w-3" />Suspendu</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      promoteur: { label: "Promoteur", color: "bg-primary/10 text-primary border-primary" },
      normalisateur: { label: "Normalisateur", color: "bg-accent/10 text-accent-foreground border-accent" },
      direction: { label: "Direction", color: "bg-secondary/10 text-secondary-foreground border-secondary" },
      membre_gt: { label: "Membre GT", color: "bg-muted/10 text-muted-foreground border-muted" },
      expert: { label: "Expert", color: "bg-warning/10 text-warning border-warning" },
      documentation: { label: "Documentation", color: "bg-success/10 text-success border-success" },
      communication: { label: "Communication", color: "bg-destructive/10 text-destructive border-destructive" }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig];
    return <Badge variant="outline" className={config?.color}>{config?.label || role}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Administration des comptes et permissions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Inviter un utilisateur
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Utilisateurs totaux</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">142</p>
                <p className="text-xs text-muted-foreground">Comptes actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">En attente validation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Nouveaux ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par nom, email ou organisation..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="promoteur">Promoteurs</SelectItem>
                  <SelectItem value="normalisateur">Normalisateurs</SelectItem>
                  <SelectItem value="direction">Direction</SelectItem>
                  <SelectItem value="membre_gt">Membres GT</SelectItem>
                  <SelectItem value="expert">Experts</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actifs</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="suspendu">Suspendus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des utilisateurs */}
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    {getStatusBadge(user.status)}
                    {getRoleBadge(user.role)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {user.phone}
                    </div>
                    <span>{user.organization}</span>
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
                      <Shield className="mr-2 h-4 w-4" />
                      Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Envoyer email
                    </DropdownMenuItem>
                    {user.status === "actif" ? (
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Suspendre
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-success">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Activer
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Inscription:</span>
                    <span className="ml-2">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Dernière connexion:</span>
                    <span className="ml-2">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais connecté'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Permissions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Shield className="mr-2 h-3 w-3" />
                    Permissions
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="mr-2 h-3 w-3" />
                    Contacter
                  </Button>
                </div>
                <Button size="sm">
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Inviter utilisateur</h3>
            <p className="text-sm text-muted-foreground">
              Ajouter un nouveau membre
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Rôles et permissions</h3>
            <p className="text-sm text-muted-foreground">
              Configurer les accès
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Communication</h3>
            <p className="text-sm text-muted-foreground">
              Envoyer des messages
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Audit de sécurité</h3>
            <p className="text-sm text-muted-foreground">
              Vérifier les accès
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};