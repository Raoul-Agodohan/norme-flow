import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search,
  Filter,
  Plus,
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Eye,
  Edit
} from "lucide-react";

export const MyProposalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const proposals = [
    {
      id: 1,
      title: "Norme sur la sécurité alimentaire dans les restaurants",
      description: "Établissement de standards de sécurité pour la manipulation et conservation des aliments",
      status: "en_cours",
      date: "2024-01-15",
      progress: 45,
      committee: "CT-FOOD-001",
      comments: 12,
      lastUpdate: "2024-01-20"
    },
    {
      id: 2,
      title: "Standard de qualité textile pour vêtements de travail",
      description: "Normes de résistance et durabilité pour équipements de protection individuelle",
      status: "validé",
      date: "2024-01-10",
      progress: 100,
      committee: "GT-TEXTILE-002",
      comments: 8,
      lastUpdate: "2024-01-18"
    },
    {
      id: 3,
      title: "Protocole de tests environnementaux pour matériaux de construction",
      description: "Méthodes d'évaluation de l'impact environnemental des matériaux",
      status: "rejeté",
      date: "2024-01-05",
      progress: 20,
      committee: null,
      comments: 5,
      lastUpdate: "2024-01-12"
    },
    {
      id: 4,
      title: "Norme de sécurité pour équipements électroniques",
      description: "Standards de sécurité électrique et compatibilité électromagnétique",
      status: "attente_revision",
      date: "2023-12-20",
      progress: 75,
      committee: "CT-ELEC-003",
      comments: 15,
      lastUpdate: "2024-01-08"
    },
    {
      id: 5,
      title: "Standard qualité des produits bio",
      description: "Critères de certification et contrôle qualité pour l'agriculture biologique",
      status: "en_cours",
      date: "2023-12-15",
      progress: 60,
      committee: "GT-BIO-001",
      comments: 9,
      lastUpdate: "2024-01-19"
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
      case "attente_revision":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300"><AlertCircle className="mr-1 h-3 w-3" />Révision demandée</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="mr-1 h-3 w-3" />Inconnu</Badge>;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Propositions</h1>
          <p className="text-muted-foreground">Gérez et suivez toutes vos propositions de normes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle proposition</span>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{proposals.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{proposals.filter(p => p.status === "en_cours").length}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{proposals.filter(p => p.status === "validé").length}</p>
            <p className="text-xs text-muted-foreground">Validées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{proposals.filter(p => p.status === "attente_revision").length}</p>
            <p className="text-xs text-muted-foreground">Révision</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold">{proposals.filter(p => p.status === "rejeté").length}</p>
            <p className="text-xs text-muted-foreground">Rejetées</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtres et recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="validé">Validé</SelectItem>
                <SelectItem value="attente_revision">Révision demandée</SelectItem>
                <SelectItem value="rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des propositions */}
      <Card>
        <CardHeader>
          <CardTitle>Propositions ({filteredProposals.length})</CardTitle>
          <CardDescription>
            Liste détaillée de vos propositions de normes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                    <p className="text-muted-foreground mb-3">{proposal.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      {getStatusBadge(proposal.status)}
                      {proposal.committee && (
                        <Badge variant="outline">{proposal.committee}</Badge>
                      )}
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Proposé le {new Date(proposal.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {proposal.comments} commentaires
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{proposal.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${proposal.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Mis à jour le {new Date(proposal.lastUpdate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Consulter
                    </Button>
                    {(proposal.status === "attente_revision" || proposal.status === "en_cours") && (
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProposals.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune proposition trouvée</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Essayez de modifier vos critères de recherche"
                    : "Vous n'avez pas encore de propositions"
                  }
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une nouvelle proposition
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};