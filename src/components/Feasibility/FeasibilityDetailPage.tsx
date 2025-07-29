import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  Building,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Send
} from "lucide-react";

interface FeasibilityDetailPageProps {
  feasibilityId: number;
  onBack: () => void;
}

export const FeasibilityDetailPage = ({ feasibilityId, onBack }: FeasibilityDetailPageProps) => {
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");

  // Mock data - en réalité viendrait d'une API
  const feasibility = {
    id: feasibilityId,
    title: "Norme sécurité alimentaire restaurants",
    promoter: "Ministère de la Santé",
    promoterType: "ministere",
    submissionDate: "2024-01-15",
    status: "en_cours",
    priority: "haute",
    sector: "Alimentaire",
    deadline: "2024-02-15",
    assignedTo: "Sarah Martin",
    description: "Cette proposition de norme vise à établir des standards de sécurité alimentaire pour les restaurants, incluant les procédures HACCP, la formation du personnel, et les contrôles qualité.",
    justification: "Suite aux récents incidents sanitaires dans le secteur de la restauration, il est nécessaire d'harmoniser les pratiques de sécurité alimentaire pour protéger la santé publique.",
    scope: "Restaurants, cafétérias, établissements de restauration collective",
    documents: [
      { name: "Proposition_initiale.pdf", size: "2.3 MB", type: "PDF" },
      { name: "Etude_impact.xlsx", size: "1.1 MB", type: "Excel" },
      { name: "Benchmarking_international.pdf", size: "3.8 MB", type: "PDF" }
    ]
  };

  const handleValidate = () => {
    console.log("Validé:", { decision, comments });
    // Ici on ferait l'appel API
    onBack();
  };

  const handleRequestInfo = () => {
    console.log("Demande d'informations:", { comments });
    // Ici on ferait l'appel API
    onBack();
  };

  const handleReject = () => {
    console.log("Rejeté:", { comments });
    // Ici on ferait l'appel API
    onBack();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Examiner la fiche de faisabilité</h1>
          <p className="text-muted-foreground">Évaluation détaillée de la proposition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>{feasibility.title}</span>
                </CardTitle>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                  <Clock className="mr-1 h-3 w-3" />
                  En cours
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{feasibility.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Justification</h4>
                <p className="text-muted-foreground">{feasibility.justification}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Périmètre d'application</h4>
                <p className="text-muted-foreground">{feasibility.scope}</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents annexes */}
          <Card>
            <CardHeader>
              <CardTitle>Documents annexes</CardTitle>
              <CardDescription>Fichiers fournis par le promoteur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feasibility.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Décision */}
          <Card>
            <CardHeader>
              <CardTitle>Prise de décision</CardTitle>
              <CardDescription>Évaluation et décision sur cette proposition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Décision</label>
                <Select value={decision} onValueChange={setDecision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une décision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approuver</SelectItem>
                    <SelectItem value="request_info">Demander des informations</SelectItem>
                    <SelectItem value="reject">Rejeter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Commentaires</label>
                <Textarea
                  placeholder="Ajoutez vos commentaires et justifications..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleValidate} disabled={!decision}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Valider
                </Button>
                <Button variant="outline" onClick={handleRequestInfo}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Demander infos
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informations latérales */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Promoteur</p>
                  <p className="font-medium">{feasibility.promoter}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date de soumission</p>
                  <p className="font-medium">{new Date(feasibility.submissionDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Échéance</p>
                  <p className="font-medium">{new Date(feasibility.deadline).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Assigné à</p>
                  <p className="font-medium">{feasibility.assignedTo}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Secteur</p>
                <Badge variant="outline">{feasibility.sector}</Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Priorité</p>
                <Badge variant="destructive">Haute</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Contacter le promoteur
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Générer rapport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};