import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Search,
  Filter,
  Calendar,
  FileText,
  Edit,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock
} from "lucide-react";

export const MyCommentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [editContent, setEditContent] = useState("");

  const myComments = [
    {
      id: 1,
      normTitle: "NF ISO 22000:2024 - Sécurité alimentaire",
      normId: "N001",
      section: "4.2.3 - Analyse des risques",
      content: "Je recommande d'ajouter une procédure spécifique pour les allergènes émergents. Les méthodes actuelles ne couvrent pas suffisamment les nouvelles sources d'allergies alimentaires.",
      date: "2024-01-20",
      status: "en_discussion",
      likes: 3,
      responses: 2,
      committee: "CT-FOOD-001",
      type: "technique",
      priority: "haute"
    },
    {
      id: 2,
      normTitle: "NF EN 14476:2024 - Tests textiles",
      normId: "N002",
      section: "3.1 - Méthodologie d'essai",
      content: "La température de test proposée (85°C) me semble trop élevée pour certains textiles synthétiques. Suggère de réduire à 75°C ou prévoir une alternative.",
      date: "2024-01-18",
      status: "accepté",
      likes: 5,
      responses: 1,
      committee: "CT-TEXTILE-001",
      type: "methodologique",
      priority: "moyenne"
    },
    {
      id: 3,
      normTitle: "NF X30-500:2024 - Tests environnementaux",
      normId: "N003",
      section: "2.4 - Critères d'évaluation",
      content: "Il manque des indicateurs pour l'impact carbone indirect. Proposons d'inclure l'analyse du cycle de vie complet, pas seulement la phase d'utilisation.",
      date: "2024-01-15",
      status: "en_revision",
      likes: 8,
      responses: 4,
      committee: "CT-ENV-001",
      type: "conceptuel",
      priority: "haute"
    },
    {
      id: 4,
      normTitle: "NF ISO 22000:2024 - Sécurité alimentaire",
      normId: "N001",
      section: "5.1 - Documentation",
      content: "Format de documentation trop complexe pour les PME. Suggère une version simplifiée ou des modèles prêts à l'emploi.",
      date: "2024-01-12",
      status: "rejeté",
      likes: 2,
      responses: 3,
      committee: "CT-FOOD-001",
      type: "pratique",
      priority: "basse"
    },
    {
      id: 5,
      normTitle: "NF EN 14476:2024 - Tests textiles",
      normId: "N002",
      section: "6.3 - Interprétation des résultats",
      content: "Les seuils de conformité doivent être alignés avec les standards européens EN 343. Écart actuel de 15% qui peut créer des problèmes d'harmonisation.",
      date: "2024-01-10",
      status: "en_discussion",
      likes: 6,
      responses: 2,
      committee: "CT-TEXTILE-001",
      type: "reglementaire",
      priority: "critique"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_discussion":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">En discussion</Badge>;
      case "accepté":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Accepté</Badge>;
      case "en_revision":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">En révision</Badge>;
      case "rejeté":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejeté</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "technique":
        return <Badge variant="secondary">Technique</Badge>;
      case "methodologique":
        return <Badge variant="outline">Méthodologique</Badge>;
      case "conceptuel":
        return <Badge variant="outline">Conceptuel</Badge>;
      case "pratique":
        return <Badge variant="outline">Pratique</Badge>;
      case "reglementaire":
        return <Badge variant="destructive">Réglementaire</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critique":
        return <Badge variant="destructive">Critique</Badge>;
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

  const filteredComments = myComments.filter(comment => {
    const matchesSearch = comment.normTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditComment = () => {
    if (editContent.trim()) {
      console.log(`Commentaire ${selectedComment?.id} modifié:`, editContent);
      setEditContent("");
      setSelectedComment(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Commentaires</h1>
          <p className="text-muted-foreground">Historique de vos contributions aux normes</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{myComments.length}</p>
            <p className="text-xs text-muted-foreground">Total commentaires</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ThumbsUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myComments.filter(c => c.status === "accepté").length}</p>
            <p className="text-xs text-muted-foreground">Acceptés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myComments.filter(c => c.status === "en_discussion" || c.status === "en_revision").length}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ThumbsDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myComments.filter(c => c.status === "rejeté").length}</p>
            <p className="text-xs text-muted-foreground">Rejetés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myComments.reduce((sum, c) => sum + c.likes, 0)}</p>
            <p className="text-xs text-muted-foreground">Likes reçus</p>
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
                  placeholder="Rechercher par norme, section ou contenu..."
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
                <SelectItem value="en_discussion">En discussion</SelectItem>
                <SelectItem value="accepté">Accepté</SelectItem>
                <SelectItem value="en_revision">En révision</SelectItem>
                <SelectItem value="rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <Card key={comment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{comment.normTitle}</CardTitle>
                    {getPriorityBadge(comment.priority)}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {getStatusBadge(comment.status)}
                    {getTypeBadge(comment.type)}
                    <Badge variant="outline">{comment.committee}</Badge>
                  </div>

                  <div className="mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Section: </span>
                    <span className="text-sm">{comment.section}</span>
                  </div>

                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm">{comment.content}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(comment.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        {comment.likes} likes
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        {comment.responses} réponses
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir contexte
                  </Button>
                  
                  {(comment.status === "en_discussion" || comment.status === "en_revision") && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex items-center" onClick={() => {
                          setSelectedComment(comment);
                          setEditContent(comment.content);
                        }}>
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Modifier le commentaire</DialogTitle>
                          <DialogDescription>
                            Norme: {comment.normTitle} - Section: {comment.section}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Contenu du commentaire</label>
                            <Textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              rows={6}
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setSelectedComment(null)}>
                              Annuler
                            </Button>
                            <Button onClick={handleEditComment} disabled={!editContent.trim()}>
                              Sauvegarder
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        
        {filteredComments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun commentaire trouvé</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Essayez de modifier vos critères de recherche"
                  : "Vous n'avez pas encore de commentaires"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};