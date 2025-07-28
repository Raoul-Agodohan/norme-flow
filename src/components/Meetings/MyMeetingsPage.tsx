import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Search,
  Clock,
  Users,
  MapPin,
  FileText,
  Download,
  Eye,
  Video,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export const MyMeetingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const myMeetings = [
    {
      id: 1,
      title: "Réunion CT Sécurité Alimentaire",
      normTitle: "NF ISO 22000:2024",
      committee: "CT-FOOD-001",
      date: "2024-01-25",
      time: "14:00",
      duration: "2h",
      type: "CT",
      status: "upcoming",
      location: "Salle de conférence A / Teams",
      participants: 12,
      agenda: "Révision section 4.2 - Validation des allergènes",
      documents: [
        { name: "Ordre du jour", type: "pdf", size: "245 KB" },
        { name: "Avant-projet v2.1", type: "pdf", size: "2.3 MB" }
      ],
      myRole: "Expert technique",
      preparation: "required"
    },
    {
      id: 2,
      title: "GT Textile - Révision finale",
      normTitle: "NF EN 14476:2024",
      committee: "GT-RESIST-001",
      date: "2024-01-28",
      time: "10:00",
      duration: "1h30",
      type: "GT",
      status: "upcoming",
      location: "Visioconférence Teams",
      participants: 8,
      agenda: "Validation finale avant enquête publique",
      documents: [
        { name: "Projet final", type: "pdf", size: "3.1 MB" },
        { name: "Synthèse commentaires", type: "docx", size: "1.2 MB" }
      ],
      myRole: "Rapporteur adjoint",
      preparation: "optional"
    },
    {
      id: 3,
      title: "Comité de Pilotage Environnement",
      normTitle: "NF X30-500:2024",
      committee: "CT-ENV-001",
      date: "2024-01-22",
      time: "15:30",
      duration: "1h",
      type: "CP",
      status: "completed",
      location: "Salle B",
      participants: 6,
      agenda: "Bilan phase de rédaction et planification enquête",
      documents: [
        { name: "Compte rendu", type: "pdf", size: "890 KB" },
        { name: "Planning phase 2", type: "xlsx", size: "156 KB" }
      ],
      myRole: "Expert environnement",
      preparation: "completed"
    },
    {
      id: 4,
      title: "Assemblée Générale GT Textile",
      normTitle: "Activité générale GT",
      committee: "GT-TEXTILE-GEN",
      date: "2024-01-15",
      time: "09:00",
      duration: "3h",
      type: "AG",
      status: "completed",
      location: "Amphithéâtre",
      participants: 25,
      agenda: "Bilan annuel, nouvelles normes, élections",
      documents: [
        { name: "Rapport annuel", type: "pdf", size: "4.2 MB" },
        { name: "Compte rendu AG", type: "pdf", size: "1.8 MB" }
      ],
      myRole: "Membre élu",
      preparation: "completed"
    },
    {
      id: 5,
      title: "Réunion urgente - Révision standard",
      normTitle: "NF ISO 22000:2024",
      committee: "CT-FOOD-001",
      date: "2024-02-05",
      time: "16:00",
      duration: "1h",
      type: "Urgente",
      status: "scheduled",
      location: "Teams",
      participants: 8,
      agenda: "Point sur commentaires critiques enquête publique",
      documents: [],
      myRole: "Expert technique",
      preparation: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300"><Clock className="mr-1 h-3 w-3" />À venir</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="mr-1 h-3 w-3" />Terminée</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300"><Calendar className="mr-1 h-3 w-3" />Programmée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "CT":
        return <Badge variant="secondary">Comité Technique</Badge>;
      case "GT":
        return <Badge variant="outline">Groupe de Travail</Badge>;
      case "CP":
        return <Badge variant="outline">Comité Pilotage</Badge>;
      case "AG":
        return <Badge variant="outline">Assemblée Générale</Badge>;
      case "Urgente":
        return <Badge variant="destructive">Urgente</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  const getPreparationStatus = (status: string) => {
    switch (status) {
      case "required":
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Préparation requise</Badge>;
      case "optional":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Préparation optionnelle</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">En attente</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="mr-1 h-3 w-3" />Complétée</Badge>;
      default:
        return null;
    }
  };

  const filteredMeetings = myMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.normTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.agenda.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isToday = (date: string) => {
    const today = new Date().toDateString();
    const meetingDate = new Date(date).toDateString();
    return today === meetingDate;
  };

  const isTomorrow = (date: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const meetingDate = new Date(date).toDateString();
    return tomorrow.toDateString() === meetingDate;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Réunions</h1>
          <p className="text-muted-foreground">Calendrier de vos participations aux comités</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{myMeetings.length}</p>
            <p className="text-xs text-muted-foreground">Réunions total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myMeetings.filter(m => m.status === "upcoming" || m.status === "scheduled").length}</p>
            <p className="text-xs text-muted-foreground">À venir</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myMeetings.filter(m => m.location.includes("Teams") || m.location.includes("Visio")).length}</p>
            <p className="text-xs text-muted-foreground">En ligne</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myMeetings.filter(m => m.preparation === "required").length}</p>
            <p className="text-xs text-muted-foreground">Préparation requise</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Filtres et recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre, norme ou agenda..."
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
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="scheduled">Programmées</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des réunions */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className={`hover:shadow-md transition-shadow ${isToday(meeting.date) ? 'border-blue-300 bg-blue-50' : isTomorrow(meeting.date) ? 'border-orange-300 bg-orange-50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{meeting.title}</CardTitle>
                    {getTypeBadge(meeting.type)}
                    {isToday(meeting.date) && (
                      <Badge variant="default" className="bg-blue-600">AUJOURD'HUI</Badge>
                    )}
                    {isTomorrow(meeting.date) && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">DEMAIN</Badge>
                    )}
                  </div>
                  
                  <CardDescription className="mb-3">{meeting.normTitle}</CardDescription>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {getStatusBadge(meeting.status)}
                    <Badge variant="outline">{meeting.committee}</Badge>
                    {getPreparationStatus(meeting.preparation)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{new Date(meeting.date).toLocaleDateString('fr-FR')}</div>
                        <div>{meeting.time} ({meeting.duration})</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Lieu</div>
                        <div>{meeting.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{meeting.participants} participants</div>
                        <div>Mon rôle: {meeting.myRole}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Ordre du jour:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{meeting.agenda}</p>
                  </div>

                  {meeting.documents.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Documents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {meeting.documents.map((doc, index) => (
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
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  
                  {meeting.status === "upcoming" && (
                    <Button size="sm" className="flex items-center">
                      {meeting.location.includes("Teams") ? (
                        <>
                          <Video className="h-4 w-4 mr-1" />
                          Rejoindre
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-1" />
                          Confirmer
                        </>
                      )}
                    </Button>
                  )}
                  
                  {meeting.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Compte rendu
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        
        {filteredMeetings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune réunion trouvée</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Essayez de modifier vos critères de recherche"
                  : "Vous n'avez aucune réunion programmée"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};