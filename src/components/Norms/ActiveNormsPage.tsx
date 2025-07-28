import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Search,
  MessageSquare,
  Calendar,
  Users,
  Clock,
  Eye,
  Edit,
  Send,
  Download
} from "lucide-react";

export const ActiveNormsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNorm, setSelectedNorm] = useState<any>(null);
  const [newComment, setNewComment] = useState("");

  const activeNorms = [
    {
      id: 1,
      title: "NF ISO 22000:2024 - Sécurité alimentaire",
      description: "Systèmes de management de la sécurité des denrées alimentaires",
      committee: "CT-FOOD-001",
      workingGroup: "GT-HACCP-002",
      phase: "redaction",
      myRole: "Expert technique",
      deadline: "2024-04-15",
      lastUpdate: "2024-01-20",
      myComments: 3,
      totalComments: 23,
      documents: [
        { name: "Avant-projet v2.1", type: "pdf", size: "2.3 MB", date: "2024-01-20" },
        { name: "Annexe technique", type: "docx", size: "1.8 MB", date: "2024-01-18" }
      ],
      nextMeeting: "2024-01-25 14:00",
      status: "active"
    },
    {
      id: 2,
      title: "NF EN 14476:2024 - Tests textiles",
      description: "Méthodes d'essai pour la résistance des textiles techniques",
      committee: "CT-TEXTILE-001",
      workingGroup: "GT-RESIST-001",
      phase: "enquete_publique",
      myRole: "Rapporteur adjoint",
      deadline: "2024-02-20",
      lastUpdate: "2024-01-19",
      myComments: 1,
      totalComments: 45,
      documents: [
        { name: "Projet de norme v3.0", type: "pdf", size: "3.1 MB", date: "2024-01-19" },
        { name: "Commentaires publics", type: "xlsx", size: "890 KB", date: "2024-01-18" }
      ],
      nextMeeting: "2024-01-28 10:00",
      status: "public_inquiry"
    },
    {
      id: 3,
      title: "NF X30-500:2024 - Tests environnementaux",
      description: "Protocoles d'évaluation de l'impact environnemental",
      committee: "CT-ENV-001",
      workingGroup: "GT-ECO-003",
      phase: "validation",
      myRole: "Expert environnement",
      deadline: "2024-01-30",
      lastUpdate: "2024-01-21",
      myComments: 5,
      totalComments: 12,
      documents: [
        { name: "Version finale", type: "pdf", size: "4.2 MB", date: "2024-01-21" },
        { name: "Rapport technique", type: "pdf", size: "2.7 MB", date: "2024-01-20" }
      ],
      nextMeeting: null,
      status: "validation"
    }
  ];

  const getPhaseInfo = (phase: string) => {
    switch (phase) {
      case "redaction":
        return { label: "Rédaction", color: "orange" };
      case "enquete_publique":
        return { label: "Enquête publique", color: "purple" };
      case "validation":
        return { label: "Validation", color: "green" };
      default:
        return { label: "Inconnu", color: "gray" };
    }
  };

  const filteredNorms = activeNorms.filter(norm =>
    norm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    norm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log(`Nouveau commentaire pour norme ${selectedNorm?.id}:`, newComment);
      setNewComment("");
      setSelectedNorm(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Normes en Cours</h1>
          <p className="text-muted-foreground">Normes où votre expertise est requise</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeNorms.length}</p>
            <p className="text-xs text-muted-foreground">Normes actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeNorms.reduce((sum, n) => sum + n.myComments, 0)}</p>
            <p className="text-xs text-muted-foreground">Mes commentaires</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeNorms.filter(n => n.nextMeeting).length}</p>
            <p className="text-xs text-muted-foreground">Réunions à venir</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeNorms.filter(n => new Date(n.deadline) <= new Date(Date.now() + 7*24*60*60*1000)).length}</p>
            <p className="text-xs text-muted-foreground">Échéances (7 jours)</p>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des normes */}
      <div className="space-y-4">
        {filteredNorms.map((norm) => {
          const phaseInfo = getPhaseInfo(norm.phase);
          const isUrgent = new Date(norm.deadline) <= new Date(Date.now() + 7*24*60*60*1000);
          
          return (
            <Card key={norm.id} className={`hover:shadow-md transition-shadow ${isUrgent ? 'border-orange-300 bg-orange-50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{norm.title}</CardTitle>
                      <Badge variant="outline" className={`bg-${phaseInfo.color}-100 text-${phaseInfo.color}-800 border-${phaseInfo.color}-300`}>
                        {phaseInfo.label}
                      </Badge>
                      {isUrgent && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                          Échéance proche
                        </Badge>
                      )}
                    </div>
                    
                    <CardDescription className="mb-3">{norm.description}</CardDescription>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge variant="outline">{norm.committee}</Badge>
                      <Badge variant="outline">{norm.workingGroup}</Badge>
                      <span className="text-sm text-muted-foreground">
                        <strong>Mon rôle:</strong> {norm.myRole}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span className={isUrgent ? 'text-orange-600 font-medium' : ''}>
                          Échéance: {new Date(norm.deadline).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Mis à jour: {new Date(norm.lastUpdate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        <span>{norm.myComments}/{norm.totalComments} commentaires</span>
                      </div>
                      {norm.nextMeeting && (
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>Réunion: {new Date(norm.nextMeeting).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>

                    {/* Documents récents */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Documents récents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {norm.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs bg-muted p-2 rounded">
                            <FileText className="h-3 w-3" />
                            <span>{doc.name}</span>
                            <span className="text-muted-foreground">({doc.size})</span>
                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Consulter
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex items-center" onClick={() => setSelectedNorm(norm)}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Commenter
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Ajouter un commentaire</DialogTitle>
                          <DialogDescription>
                            Norme: {norm.title}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Votre commentaire</label>
                            <Textarea
                              placeholder="Partagez votre expertise et vos observations..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              rows={6}
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Vous avez déjà {norm.myComments} commentaires sur cette norme
                            </span>
                            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                              <Send className="mr-2 h-4 w-4" />
                              Envoyer
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
        
        {filteredNorms.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune norme trouvée</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? "Essayez de modifier vos critères de recherche"
                  : "Vous n'avez aucune norme active en ce moment"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};