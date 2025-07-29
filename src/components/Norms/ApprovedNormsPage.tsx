import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Download,
  Eye,
  Archive,
  Edit,
  Calendar,
  FileText,
  Building,
  Users,
  BarChart3,
  CheckCircle,
  Filter
} from "lucide-react";

export const ApprovedNormsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - normes homologuées
  const approvedNorms = [
    {
      id: 1,
      reference: "NF EN 2024-001",
      title: "Sécurité alimentaire pour restaurants",
      category: "Alimentaire",
      publicationDate: "2024-02-15",
      effectiveDate: "2024-03-01",
      status: "active",
      version: "1.0",
      price: 45.00,
      downloads: 1250,
      language: "fr",
      pages: 68,
      fileSize: "2.3 MB",
      isPublic: true,
      description: "Standard de sécurité alimentaire pour les établissements de restauration incluant les procédures HACCP et la formation du personnel."
    },
    {
      id: 2,
      reference: "NF EN 2024-002",
      title: "Qualité textile pour EPI",
      category: "Textile",
      publicationDate: "2024-02-10",
      effectiveDate: "2024-02-25",
      status: "active",
      version: "2.1",
      price: 32.00,
      downloads: 890,
      language: "fr",
      pages: 45,
      fileSize: "1.8 MB",
      isPublic: true,
      description: "Critères de qualité et tests de conformité pour les équipements de protection individuelle en textile."
    },
    {
      id: 3,
      reference: "NF EN 2023-028",
      title: "Tests environnementaux construction",
      category: "Environnement",
      publicationDate: "2023-12-20",
      effectiveDate: "2024-01-15",
      status: "archived",
      version: "1.3",
      price: 58.00,
      downloads: 2100,
      language: "fr",
      pages: 92,
      fileSize: "3.1 MB",
      isPublic: false,
      description: "Protocoles de tests environnementaux pour les matériaux de construction durable."
    },
    {
      id: 4,
      reference: "NF EN 2024-003",
      title: "Sécurité électronique IoT",
      category: "Électronique",
      publicationDate: "2024-01-30",
      effectiveDate: "2024-02-15",
      status: "active",
      version: "1.0",
      price: 67.00,
      downloads: 445,
      language: "fr",
      pages: 134,
      fileSize: "4.2 MB",
      isPublic: true,
      description: "Standards de sécurité pour les dispositifs IoT et systèmes électroniques connectés."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success">Active</Badge>;
      case "archived":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Archivée</Badge>;
      case "superseded":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Remplacée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredNorms = approvedNorms.filter(norm => {
    const matchesSearch = norm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         norm.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || norm.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || norm.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalDownloads = approvedNorms.reduce((sum, norm) => sum + norm.downloads, 0);
  const activeNorms = approvedNorms.filter(norm => norm.status === "active").length;
  const publicNorms = approvedNorms.filter(norm => norm.isPublic).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Normes Homologuées</h1>
          <p className="text-muted-foreground">Catalogue des normes officiellement publiées</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Nouvelle publication
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{approvedNorms.length}</p>
            <p className="text-xs text-muted-foreground">Total normes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeNorms}</p>
            <p className="text-xs text-muted-foreground">Actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{publicNorms}</p>
            <p className="text-xs text-muted-foreground">Publiques</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalDownloads.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Téléchargements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">€{approvedNorms.reduce((sum, norm) => sum + norm.price, 0).toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Valeur catalogue</p>
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
                  placeholder="Rechercher par titre ou référence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Alimentaire">Alimentaire</SelectItem>
                <SelectItem value="Textile">Textile</SelectItem>
                <SelectItem value="Électronique">Électronique</SelectItem>
                <SelectItem value="Environnement">Environnement</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archivée</SelectItem>
                <SelectItem value="superseded">Remplacée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des normes */}
      <Card>
        <CardHeader>
          <CardTitle>Normes homologuées ({filteredNorms.length})</CardTitle>
          <CardDescription>
            Normes officiellement publiées et disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNorms.map((norm) => (
              <div key={norm.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{norm.reference}</h3>
                      {getStatusBadge(norm.status)}
                      <Badge variant="outline">{norm.category}</Badge>
                      {norm.isPublic && <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Public</Badge>}
                    </div>
                    
                    <h4 className="font-medium mb-2">{norm.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {norm.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Publié le {new Date(norm.publicationDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{norm.pages} pages • {norm.fileSize}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{norm.downloads} téléchargements</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">€{norm.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Gérer
                    </Button>
                    {norm.status === "active" && (
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver
                      </Button>
                    )}
                  </div>
                </div>

                {/* Métriques détaillées */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm font-bold text-primary">v{norm.version}</p>
                    <p className="text-xs text-muted-foreground">Version</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-success">{new Date(norm.effectiveDate).toLocaleDateString('fr-FR')}</p>
                    <p className="text-xs text-muted-foreground">En vigueur</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-warning">{norm.downloads}</p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-purple-600">€{(norm.downloads * norm.price).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenus</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredNorms.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune norme trouvée</h3>
                <p className="text-muted-foreground">
                  {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                    ? "Essayez de modifier vos critères de recherche"
                    : "Aucune norme homologuée disponible"
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