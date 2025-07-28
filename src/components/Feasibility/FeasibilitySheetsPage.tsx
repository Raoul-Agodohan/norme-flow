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
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  User,
  Building
} from "lucide-react";

export const FeasibilitySheetsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const feasibilitySheets = [
    {
      id: 1,
      title: "Norme sécurité alimentaire restaurants",
      promoter: "Ministère de la Santé",
      promoterType: "ministere",
      submissionDate: "2024-01-15",
      status: "en_cours",
      priority: "haute",
      sector: "Alimentaire",
      deadline: "2024-02-15",
      assignedTo: "Sarah Martin"
    },
    {
      id: 2,
      title: "Standard qualité textile EPI",
      promoter: "Syndicat Textile National",
      promoterType: "association",
      submissionDate: "2024-01-12",
      status: "attente_info",
      priority: "moyenne",
      sector: "Textile",
      deadline: "2024-02-10",
      assignedTo: "Marc Dubois"
    },
    {
      id: 3,
      title: "Protocole tests environnementaux",
      promoter: "EcoBuild Construction",
      promoterType: "entreprise",
      submissionDate: "2024-01-10",
      status: "validé",
      priority: "moyenne",
      sector: "Environnement",
      deadline: "2024-02-08",
      assignedTo: "Julie Lenoir"
    },
    {
      id: 4,
      title: "Sécurité équipements électroniques",
      promoter: "TechCorp Industries",
      promoterType: "entreprise",
      submissionDate: "2024-01-08",
      status: "rejeté",
      priority: "basse",
      sector: "Électronique",
      deadline: "2024-02-05",
      assignedTo: "Pierre Lambert"
    },
    {
      id: 5,
      title: "Certification produits bio",
      promoter: "Fédération Bio France",
      promoterType: "association",
      submissionDate: "2024-01-05",
      status: "nouveau",
      priority: "haute",
      sector: "Agriculture",
      deadline: "2024-02-02",
      assignedTo: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nouveau":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300"><AlertCircle className="mr-1 h-3 w-3" />Nouveau</Badge>;
      case "en_cours":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning"><Clock className="mr-1 h-3 w-3" />En cours</Badge>;
      case "attente_info":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300"><AlertCircle className="mr-1 h-3 w-3" />Attente infos</Badge>;
      case "validé":
        return <Badge variant="outline" className="bg-success/10 text-success border-success"><CheckCircle className="mr-1 h-3 w-3" />Validé</Badge>;
      case "rejeté":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive"><XCircle className="mr-1 h-3 w-3" />Rejeté</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "haute":
        return <Badge variant="destructive">Haute</Badge>;
      case "moyenne":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Moyenne</Badge>;
      case "basse":
        return <Badge variant="secondary">Basse</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getPromoterIcon = (type: string) => {
    switch (type) {
      case "ministere":
        return <Building className="h-4 w-4" />;
      case "entreprise":
        return <Building className="h-4 w-4" />;
      case "association":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const filteredSheets = feasibilitySheets.filter(sheet => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sheet.promoter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sheet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fiches de Faisabilité</h1>
          <p className="text-muted-foreground">Examinez et validez les propositions de normes</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.filter(s => s.status === "nouveau").length}</p>
            <p className="text-xs text-muted-foreground">Nouveau</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.filter(s => s.status === "en_cours").length}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.filter(s => s.status === "attente_info").length}</p>
            <p className="text-xs text-muted-foreground">Attente infos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.filter(s => s.status === "validé").length}</p>
            <p className="text-xs text-muted-foreground">Validées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold">{feasibilitySheets.filter(s => s.status === "rejeté").length}</p>
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
                  placeholder="Rechercher par titre ou promoteur..."
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
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="attente_info">Attente infos</SelectItem>
                <SelectItem value="validé">Validé</SelectItem>
                <SelectItem value="rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des fiches */}
      <Card>
        <CardHeader>
          <CardTitle>Fiches de faisabilité ({filteredSheets.length})</CardTitle>
          <CardDescription>
            Propositions de normes soumises pour évaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSheets.map((sheet) => (
              <div key={sheet.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{sheet.title}</h3>
                      {getPriorityBadge(sheet.priority)}
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        {getPromoterIcon(sheet.promoterType)}
                        <span>{sheet.promoter}</span>
                      </div>
                      <Badge variant="outline">{sheet.sector}</Badge>
                      {getStatusBadge(sheet.status)}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Soumis le {new Date(sheet.submissionDate).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Échéance: {new Date(sheet.deadline).toLocaleDateString('fr-FR')}
                      </span>
                      {sheet.assignedTo && (
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          Assigné à {sheet.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      Examiner
                    </Button>
                    {sheet.status === "nouveau" && (
                      <Button size="sm">
                        Traiter
                      </Button>
                    )}
                    {sheet.status === "attente_info" && (
                      <Button variant="outline" size="sm">
                        Relancer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredSheets.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune fiche trouvée</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Essayez de modifier vos critères de recherche"
                    : "Aucune fiche de faisabilité en attente"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};