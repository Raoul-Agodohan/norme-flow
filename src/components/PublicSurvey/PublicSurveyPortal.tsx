import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Download, 
  Calendar,
  Clock,
  Users,
  FileText,
  Send,
  Search,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PublicSurveyPortal = () => {
  const openSurveys = [
    {
      id: 1,
      title: "Norme sur la sécurité alimentaire dans la restauration collective",
      description: "Cette norme vise à établir les exigences minimales de sécurité sanitaire pour les établissements de restauration collective...",
      sector: "Alimentaire",
      endDate: "2024-02-15",
      daysLeft: 12,
      comments: 45,
      downloads: 128
    },
    {
      id: 2,
      title: "Standard de qualité pour les textiles biologiques",
      description: "Définition des critères de qualité et de certification pour les produits textiles issus de l'agriculture biologique...",
      sector: "Textile",
      endDate: "2024-02-20",
      daysLeft: 17,
      comments: 23,
      downloads: 89
    },
    {
      id: 3,
      title: "Protocole de tests environnementaux pour matériaux de construction",
      description: "Méthodes standardisées pour évaluer l'impact environnemental des matériaux utilisés dans la construction...",
      sector: "Construction",
      endDate: "2024-02-10",
      daysLeft: 7,
      comments: 67,
      downloads: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header public */}
      <header className="bg-card border-b border-border px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">CODINORM</h1>
              <p className="text-muted-foreground">Consultation publique des projets de normes</p>
            </div>
            <Button variant="outline">
              Se connecter
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Participez à la consultation publique</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Votre avis compte ! Consultez les projets de normes en cours d'élaboration et partagez vos commentaires. 
                Votre participation contribue à l'amélioration de la qualité des normes nationales.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher une norme..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
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
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date de fin</SelectItem>
                  <SelectItem value="comments">Nombre de commentaires</SelectItem>
                  <SelectItem value="downloads">Nombre de téléchargements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des enquêtes ouvertes */}
        <div className="space-y-4">
          {openSurveys.map((survey) => (
            <Card key={survey.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{survey.title}</CardTitle>
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge variant="outline">{survey.sector}</Badge>
                      <Badge 
                        variant="outline" 
                        className={survey.daysLeft <= 7 ? "bg-destructive/10 text-destructive border-destructive" : "bg-warning/10 text-warning border-warning"}
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {survey.daysLeft} jours restants
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {survey.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Fin le {new Date(survey.endDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {survey.comments} commentaires
                    </div>
                    <div className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      {survey.downloads} téléchargements
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Commenter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formulaire de commentaire (exemple pour une norme) */}
        <Card>
          <CardHeader>
            <CardTitle>Soumettre un commentaire</CardTitle>
            <CardDescription>
              Partagez vos observations sur le projet de norme "Sécurité alimentaire dans la restauration collective"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" placeholder="Jean Dupont" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="jean.dupont@example.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organization">Organisation</Label>
                <Input id="organization" placeholder="Nom de votre organisation (optionnel)" />
              </div>
              <div>
                <Label htmlFor="role">Qualité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Votre rôle/fonction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professionnel du secteur</SelectItem>
                    <SelectItem value="expert">Expert technique</SelectItem>
                    <SelectItem value="academic">Universitaire/Chercheur</SelectItem>
                    <SelectItem value="consumer">Consommateur/Citoyen</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="section">Section concernée (optionnel)</Label>
              <Input id="section" placeholder="Ex: Article 3.2, Annexe B..." />
            </div>
            
            <div>
              <Label htmlFor="comment">Commentaire *</Label>
              <Textarea 
                id="comment"
                placeholder="Décrivez votre commentaire, suggestion ou observation..."
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <Label htmlFor="justification">Justification</Label>
              <Textarea 
                id="justification"
                placeholder="Motivez votre commentaire (références, expérience, données techniques...)"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="anonymous" className="rounded" />
              <Label htmlFor="anonymous" className="text-sm">
                Publier ce commentaire de manière anonyme
              </Label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                Sauvegarder brouillon
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Envoyer le commentaire
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques de participation */}
        <Card>
          <CardHeader>
            <CardTitle>Participation du public</CardTitle>
            <CardDescription>
              Impact de la consultation publique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">135</p>
                <p className="text-sm text-muted-foreground">Commentaires reçus</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">89</p>
                <p className="text-sm text-muted-foreground">Participants uniques</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">373</p>
                <p className="text-sm text-muted-foreground">Documents téléchargés</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Jours restants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};