import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Eye,
  Filter,
  Star,
  Calendar,
  FileText,
  ShoppingCart,
  Archive
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NormsLibrary = () => {
  const norms = [
    {
      id: 1,
      code: "NF-ALI-001",
      title: "Sécurité alimentaire dans la restauration collective",
      description: "Exigences de sécurité sanitaire pour les établissements de restauration collective, incluant les procédures HACCP...",
      sector: "Alimentaire",
      status: "published",
      publishDate: "2024-01-15",
      version: "2.1",
      price: 45.00,
      downloads: 1250,
      rating: 4.8,
      isFree: false,
      isNew: true
    },
    {
      id: 2,
      code: "NF-TEX-003",
      title: "Standard de qualité pour textiles biologiques",
      description: "Critères de qualité et méthodes d'essai pour les produits textiles issus de l'agriculture biologique...",
      sector: "Textile",
      status: "published",
      publishDate: "2023-12-20",
      version: "1.0",
      price: 35.00,
      downloads: 890,
      rating: 4.6,
      isFree: false,
      isNew: false
    },
    {
      id: 3,
      code: "NF-CON-012",
      title: "Tests environnementaux matériaux construction",
      description: "Méthodes standardisées pour évaluer l'impact environnemental des matériaux de construction...",
      sector: "Construction",
      status: "published",
      publishDate: "2023-11-10",
      version: "3.0",
      price: 0,
      downloads: 2100,
      rating: 4.9,
      isFree: true,
      isNew: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Publié</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Brouillon</Badge>;
      case "archived":
        return <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted">Archivé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bibliothèque des normes</h1>
          <p className="text-muted-foreground">Catalogue complet des normes publiées et archivées</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Gérer archives
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Publier une norme
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">Normes publiées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">45K</p>
                <p className="text-xs text-muted-foreground">Téléchargements total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-xs text-muted-foreground">Note moyenne</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">€12K</p>
                <p className="text-xs text-muted-foreground">Ventes ce mois</p>
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
                  placeholder="Rechercher par code, titre ou description..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les secteurs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  <SelectItem value="alimentaire">Alimentaire</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="environnement">Environnement</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date de publication</SelectItem>
                  <SelectItem value="downloads">Téléchargements</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="title">Titre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des normes */}
      <div className="grid grid-cols-1 gap-4">
        {norms.map((norm) => (
          <Card key={norm.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{norm.title}</CardTitle>
                    {norm.isNew && <Badge className="bg-primary">Nouveau</Badge>}
                    {norm.isFree && <Badge variant="outline" className="bg-success/10 text-success border-success">Gratuit</Badge>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span className="font-mono font-semibold text-foreground">{norm.code}</span>
                    <span>v{norm.version}</span>
                    <Badge variant="outline">{norm.sector}</Badge>
                    {getStatusBadge(norm.status)}
                  </div>
                  <CardDescription className="text-base">
                    {norm.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  {norm.isFree ? (
                    <p className="text-lg font-bold text-success">Gratuit</p>
                  ) : (
                    <p className="text-lg font-bold">{norm.price.toFixed(2)} €</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Publié le {new Date(norm.publishDate).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <Download className="mr-1 h-4 w-4" />
                    {norm.downloads.toLocaleString()} téléchargements
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(norm.rating)}
                    <span className="ml-1">({norm.rating})</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    Aperçu
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    {norm.isFree ? 'Télécharger' : 'Acheter'}
                  </Button>
                  <Button size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de 1 à 10 sur 127 normes
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Précédent</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Publier une norme</h3>
            <p className="text-sm text-muted-foreground">
              Ajouter une nouvelle norme au catalogue
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Archive className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gérer les archives</h3>
            <p className="text-sm text-muted-foreground">
              Organiser les normes obsolètes
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Évaluations</h3>
            <p className="text-sm text-muted-foreground">
              Gérer les retours utilisateurs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};