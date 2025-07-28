import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Search,
  Users,
  Calendar,
  Edit,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export const NormProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const normProjects = [
    {
      id: 1,
      title: "NF ISO 22000:2024 - Sécurité alimentaire",
      description: "Systèmes de management de la sécurité des denrées alimentaires",
      phase: "redaction",
      progress: 65,
      committee: "CT-FOOD-001",
      workingGroup: "GT-HACCP-002",
      startDate: "2024-01-15",
      deadline: "2024-04-15",
      rapporteur: "Dr. Sarah Martin",
      participants: 12,
      documentsCount: 8,
      commentsCount: 23,
      status: "active"
    },
    {
      id: 2,
      title: "NF EN 14476:2024 - Tests textiles",
      description: "Méthodes d'essai pour la résistance des textiles",
      phase: "enquete_publique",
      progress: 85,
      committee: "CT-TEXTILE-001",
      workingGroup: "GT-RESIST-001",
      startDate: "2023-11-20",
      deadline: "2024-02-20",
      rapporteur: "Marc Dubois",
      participants: 8,
      documentsCount: 12,
      commentsCount: 45,
      status: "public_inquiry"
    },
    {
      id: 3,
      title: "NF X30-500:2024 - Tests environnementaux",
      description: "Protocoles d'évaluation de l'impact environnemental",
      phase: "validation",
      progress: 95,
      committee: "CT-ENV-001",
      workingGroup: "GT-ECO-003",
      startDate: "2023-09-10",
      deadline: "2024-01-30",
      rapporteur: "Julie Lenoir",
      participants: 15,
      documentsCount: 15,
      commentsCount: 12,
      status: "validation"
    },
    {
      id: 4,
      title: "NF C15-100:2024 - Sécurité électrique",
      description: "Installations électriques basse tension",
      phase: "constitution_gt",
      progress: 25,
      committee: "CT-ELEC-001",
      workingGroup: null,
      startDate: "2024-01-05",
      deadline: "2024-06-05",
      rapporteur: "Pierre Lambert",
      participants: 5,
      documentsCount: 3,
      commentsCount: 8,
      status: "forming"
    }
  ];

  const getPhaseInfo = (phase: string) => {
    switch (phase) {
      case "constitution_gt":
        return { label: "Constitution GT", color: "blue", icon: Users };
      case "redaction":
        return { label: "Rédaction", color: "orange", icon: Edit };
      case "enquete_publique":
        return { label: "Enquête publique", color: "purple", icon: MessageSquare };
      case "validation":
        return { label: "Validation", color: "green", icon: CheckCircle };
      default:
        return { label: "Inconnu", color: "gray", icon: AlertTriangle };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Actif</Badge>;
      case "public_inquiry":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Enquête publique</Badge>;
      case "validation":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Validation</Badge>;
      case "forming":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">En formation</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const filteredProjects = normProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projets de Normes</h1>
          <p className="text-muted-foreground">Gérez les projets de normalisation en cours</p>
        </div>
        <Button className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>Nouveau projet</span>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{normProjects.length}</p>
            <p className="text-xs text-muted-foreground">Projets actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{normProjects.reduce((sum, p) => sum + p.participants, 0)}</p>
            <p className="text-xs text-muted-foreground">Participants total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{normProjects.filter(p => p.phase === "enquete_publique").length}</p>
            <p className="text-xs text-muted-foreground">Enquêtes publiques</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{normProjects.filter(p => p.phase === "validation").length}</p>
            <p className="text-xs text-muted-foreground">En validation</p>
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

      {/* Liste des projets */}
      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const phaseInfo = getPhaseInfo(project.phase);
          const PhaseIcon = phaseInfo.icon;
          
          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                    <CardDescription className="mb-3">{project.description}</CardDescription>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge variant="outline" className={`bg-${phaseInfo.color}-100 text-${phaseInfo.color}-800 border-${phaseInfo.color}-300`}>
                        <PhaseIcon className="mr-1 h-3 w-3" />
                        {phaseInfo.label}
                      </Badge>
                      {getStatusBadge(project.status)}
                      <Badge variant="outline">{project.committee}</Badge>
                      {project.workingGroup && (
                        <Badge variant="outline">{project.workingGroup}</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        <span>{project.participants} participants</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        <span>{project.commentsCount} commentaires</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progression du projet</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Rapporteur:</span> {project.rapporteur}
                      <span className="ml-4"><span className="font-medium">Documents:</span> {project.documentsCount}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Consulter
                    </Button>
                    <Button size="sm" className="flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Gérer
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
        
        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun projet trouvé</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Essayez de modifier vos critères de recherche"
                  : "Aucun projet de norme en cours"
                }
              </p>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Créer un nouveau projet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};