import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Clock, 
  FileText, 
  Upload,
  Download,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  MessageSquare
} from "lucide-react";

export const ExpertPortalPage = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [newComment, setNewComment] = useState("");

  // Mock data - missions assignées à l'expert
  const assignments = [
    {
      id: 1,
      title: "Évaluation norme sécurité alimentaire",
      description: "Analyse technique du projet EN-2024-001",
      deadline: "2024-02-20",
      priority: "haute",
      status: "en_cours",
      progress: 60,
      documents: [
        { name: "Projet_norme_v2.pdf", size: "1.2 MB" },
        { name: "Specifications_techniques.docx", size: "890 KB" }
      ],
      deliverables: [
        { name: "Rapport d'analyse", required: true, submitted: false },
        { name: "Recommandations", required: true, submitted: true }
      ]
    },
    {
      id: 2,
      title: "Révision standard textile",
      description: "Mise à jour des critères de qualité pour les EPI",
      deadline: "2024-02-25",
      priority: "moyenne",
      status: "nouveau",
      progress: 0,
      documents: [
        { name: "Standard_actuel.pdf", size: "756 KB" }
      ],
      deliverables: [
        { name: "Analyse comparative", required: true, submitted: false }
      ]
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "haute":
        return <Badge variant="destructive">Haute</Badge>;
      case "moyenne":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Moyenne</Badge>;
      case "basse":
        return <Badge variant="secondary">Basse</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nouveau":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Nouveau</Badge>;
      case "en_cours":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">En cours</Badge>;
      case "terminé":
        return <Badge className="bg-success/10 text-success border-success">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmitDeliverable = (assignmentId: number, deliverableName: string) => {
    console.log("Soumission livrable:", { assignmentId, deliverableName });
    // Ici on ferait l'appel API
  };

  const handleAddComment = (assignmentId: number) => {
    if (newComment.trim()) {
      console.log("Nouveau commentaire:", { assignmentId, comment: newComment });
      setNewComment("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portail Expert</h1>
          <p className="text-muted-foreground">Gérez vos missions d'expertise</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-medium">Dr. Marie Dubois</p>
            <p className="text-sm text-muted-foreground">Expert Sécurité Alimentaire</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
            MD
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{assignments.length}</p>
            <p className="text-xs text-muted-foreground">Missions actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{assignments.filter(a => a.status === "en_cours").length}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Urgentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "assignments" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("assignments")}
        >
          Missions assignées
        </Button>
        <Button
          variant={activeTab === "deliverables" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("deliverables")}
        >
          Livrables
        </Button>
        <Button
          variant={activeTab === "communications" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("communications")}
        >
          Communications
        </Button>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === "assignments" && (
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center space-x-3">
                      <span>{assignment.title}</span>
                      {getPriorityBadge(assignment.priority)}
                      {getStatusBadge(assignment.status)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {assignment.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations de base */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Échéance</p>
                      <p className="font-medium">{new Date(assignment.deadline).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Progression</p>
                      <p className="font-medium">{assignment.progress}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avancement</p>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                </div>

                {/* Documents de référence */}
                <div>
                  <h4 className="font-medium mb-2">Documents de référence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {assignment.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Livrables attendus */}
                <div>
                  <h4 className="font-medium mb-2">Livrables attendus</h4>
                  <div className="space-y-2">
                    {assignment.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-3">
                          {deliverable.submitted ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-muted-foreground rounded"></div>
                          )}
                          <div>
                            <p className="font-medium">{deliverable.name}</p>
                            {deliverable.required && <p className="text-xs text-muted-foreground">Obligatoire</p>}
                          </div>
                        </div>
                        
                        {!deliverable.submitted ? (
                          <Button 
                            size="sm"
                            onClick={() => handleSubmitDeliverable(assignment.id, deliverable.name)}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Soumettre
                          </Button>
                        ) : (
                          <Badge className="bg-success/10 text-success border-success">
                            Soumis
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section commentaires */}
                <div>
                  <h4 className="font-medium mb-2">Commentaires et questions</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Ajoutez un commentaire ou posez une question..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button 
                        size="sm"
                        onClick={() => handleAddComment(assignment.id)}
                        disabled={!newComment.trim()}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "deliverables" && (
        <Card>
          <CardHeader>
            <CardTitle>Historique des livrables</CardTitle>
            <CardDescription>Tous vos livrables soumis et en attente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fonctionnalité en développement</h3>
              <p className="text-muted-foreground">
                L'historique détaillé des livrables sera bientôt disponible
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "communications" && (
        <Card>
          <CardHeader>
            <CardTitle>Communications</CardTitle>
            <CardDescription>Messages et notifications des organisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun message</h3>
              <p className="text-muted-foreground">
                Les communications apparaîtront ici
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};