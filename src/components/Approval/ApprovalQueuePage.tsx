import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react";

export const ApprovalQueuePage = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");

  const projectsToApprove = [
    {
      id: 1,
      title: "Norme sécurité alimentaire NF ISO 22000:2024",
      description: "Systèmes de management de la sécurité des denrées alimentaires",
      rapporteur: "Dr. Sarah Martin",
      committee: "CT-FOOD-001",
      submissionDate: "2024-01-20",
      deadline: "2024-01-27",
      priority: "haute",
      phase: "validation_finale",
      documentsCount: 15,
      publicComments: 23,
      technicalVotes: { for: 8, against: 1, abstain: 1 },
      estimatedImpact: "Secteur alimentaire national",
      budget: "450 000 €"
    },
    {
      id: 2,
      title: "Standard textile NF EN 14476:2024",
      description: "Méthodes d'essai pour la résistance des textiles techniques",
      rapporteur: "Marc Dubois",
      committee: "CT-TEXTILE-001",
      submissionDate: "2024-01-18",
      deadline: "2024-01-25",
      priority: "moyenne",
      phase: "post_enquete_publique",
      documentsCount: 12,
      publicComments: 45,
      technicalVotes: { for: 6, against: 2, abstain: 0 },
      estimatedImpact: "Industrie textile européenne",
      budget: "320 000 €"
    },
    {
      id: 3,
      title: "Protocole environnemental NF X30-500:2024",
      description: "Protocoles d'évaluation de l'impact environnemental des matériaux",
      rapporteur: "Julie Lenoir",
      committee: "CT-ENV-001",
      submissionDate: "2024-01-15",
      deadline: "2024-01-30",
      priority: "haute",
      phase: "revision_technique",
      documentsCount: 18,
      publicComments: 67,
      technicalVotes: { for: 9, against: 0, abstain: 2 },
      estimatedImpact: "Secteur construction et environnement",
      budget: "680 000 €"
    },
    {
      id: 4,
      title: "Norme électrique NF C15-100:2024",
      description: "Installations électriques basse tension - Règles de sécurité",
      rapporteur: "Pierre Lambert",
      committee: "CT-ELEC-001",
      submissionDate: "2024-01-12",
      deadline: "2024-02-05",
      priority: "critique",
      phase: "validation_finale",
      documentsCount: 22,
      publicComments: 89,
      technicalVotes: { for: 12, against: 1, abstain: 0 },
      estimatedImpact: "Secteur électrique national",
      budget: "850 000 €"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critique":
        return <Badge variant="destructive" className="bg-red-600">Critique</Badge>;
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

  const getPhaseBadge = (phase: string) => {
    switch (phase) {
      case "validation_finale":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Validation finale</Badge>;
      case "post_enquete_publique":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Post enquête publique</Badge>;
      case "revision_technique":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Révision technique</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleApproval = (projectId: number, approved: boolean) => {
    console.log(`Projet ${projectId} ${approved ? 'approuvé' : 'rejeté'}`);
    console.log('Commentaires:', comments);
    setComments("");
    setSelectedProject(null);
  };

  const isUrgent = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">File d'Approbation</h1>
          <p className="text-muted-foreground">Projets en attente de validation direction</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            {projectsToApprove.filter(p => isUrgent(p.deadline)).length} urgents
          </Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{projectsToApprove.length}</p>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{projectsToApprove.filter(p => isUrgent(p.deadline)).length}</p>
            <p className="text-xs text-muted-foreground">Urgents (≤3 jours)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{projectsToApprove.filter(p => p.priority === "critique" || p.priority === "haute").length}</p>
            <p className="text-xs text-muted-foreground">Priorité élevée</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{projectsToApprove.reduce((sum, p) => sum + p.publicComments, 0)}</p>
            <p className="text-xs text-muted-foreground">Commentaires publics</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des projets */}
      <div className="space-y-4">
        {projectsToApprove.map((project) => (
          <Card key={project.id} className={`hover:shadow-md transition-shadow ${isUrgent(project.deadline) ? 'border-red-300 bg-red-50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {getPriorityBadge(project.priority)}
                    {isUrgent(project.deadline) && (
                      <Badge variant="destructive" className="bg-red-600 animate-pulse">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        URGENT
                      </Badge>
                    )}
                  </div>
                  
                  <CardDescription className="mb-3">{project.description}</CardDescription>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {getPhaseBadge(project.phase)}
                    <Badge variant="outline">{project.committee}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {project.rapporteur}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Soumis: {new Date(project.submissionDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span className={isUrgent(project.deadline) ? 'text-red-600 font-medium' : ''}>
                        Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-3 w-3" />
                      <span>{project.documentsCount} documents</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      <span>{project.publicComments} commentaires publics</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Votes techniques:</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        {project.technicalVotes.for}
                      </Badge>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        <ThumbsDown className="mr-1 h-3 w-3" />
                        {project.technicalVotes.against}
                      </Badge>
                      <Badge variant="outline">Abstention: {project.technicalVotes.abstain}</Badge>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium">Impact estimé:</span> {project.estimatedImpact} | 
                    <span className="font-medium"> Budget:</span> {project.budget}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Examiner
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setSelectedProject(project)}>
                        Décider
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Décision d'approbation</DialogTitle>
                        <DialogDescription>
                          Projet: {project.title}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Rapporteur:</span> {project.rapporteur}
                          </div>
                          <div>
                            <span className="font-medium">Comité:</span> {project.committee}
                          </div>
                          <div>
                            <span className="font-medium">Budget:</span> {project.budget}
                          </div>
                          <div>
                            <span className="font-medium">Échéance:</span> {new Date(project.deadline).toLocaleDateString('fr-FR')}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Commentaires de la direction</label>
                          <Textarea
                            placeholder="Ajoutez vos commentaires et justifications..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(project.id, true)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleApproval(project.id, false)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {projectsToApprove.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun projet en attente</h3>
            <p className="text-muted-foreground">
              Tous les projets ont été traités
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};