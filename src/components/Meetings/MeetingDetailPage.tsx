import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText,
  Video,
  Download,
  Plus,
  CheckCircle,
  User
} from "lucide-react";

interface MeetingDetailPageProps {
  meetingId: number;
  onBack: () => void;
}

export const MeetingDetailPage = ({ meetingId, onBack }: MeetingDetailPageProps) => {
  const [newActionItem, setNewActionItem] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");

  // Mock data - en réalité viendrait d'une API
  const meeting = {
    id: meetingId,
    title: "Révision Norme EN-2024-001",
    organizer: "Sarah Martin",
    date: "2024-02-15",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle de conférence A",
    virtualLink: "https://teams.microsoft.com/meet/...",
    type: "Hybride",
    status: "confirmé",
    agenda: [
      { id: 1, title: "Présentation du projet", duration: "20 min", presenter: "Sarah Martin" },
      { id: 2, title: "Examen technique", duration: "45 min", presenter: "Dr. Dubois" },
      { id: 3, title: "Discussion et commentaires", duration: "30 min", presenter: "Tous" },
      { id: 4, title: "Prochaines étapes", duration: "15 min", presenter: "Sarah Martin" }
    ],
    participants: [
      { id: 1, name: "Dr. Marie Dubois", role: "Expert", status: "confirmé", avatar: "MD" },
      { id: 2, name: "Jean-Pierre Martin", role: "Représentant industrie", status: "confirmé", avatar: "JPM" },
      { id: 3, name: "Sophie Lenoir", role: "Expert environnement", status: "en_attente", avatar: "SL" },
      { id: 4, name: "Michel Lambert", role: "Consultant", status: "décliné", avatar: "ML" }
    ],
    documents: [
      { name: "Ordre_du_jour.pdf", size: "256 KB", type: "PDF" },
      { name: "Projet_norme_v2.docx", size: "1.2 MB", type: "Word" },
      { name: "Commentaires_publics.xlsx", size: "890 KB", type: "Excel" }
    ],
    actionItems: [
      { id: 1, task: "Réviser le chapitre 3.2", assignee: "Dr. Dubois", deadline: "2024-02-20", status: "en_cours" },
      { id: 2, task: "Préparer analyse d'impact", assignee: "J-P Martin", deadline: "2024-02-22", status: "nouveau" }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmé":
        return <Badge className="bg-success/10 text-success border-success">Confirmé</Badge>;
      case "en_attente":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">En attente</Badge>;
      case "décliné":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Décliné</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      console.log("Nouvelle action:", newActionItem);
      setNewActionItem("");
    }
  };

  const handleJoinMeeting = () => {
    window.open(meeting.virtualLink, '_blank');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{meeting.title}</h1>
            <p className="text-muted-foreground">Organisé par {meeting.organizer}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Ajouter au calendrier
          </Button>
          <Button onClick={handleJoinMeeting}>
            <Video className="h-4 w-4 mr-2" />
            Rejoindre la réunion
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Détails de la réunion */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de la réunion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(meeting.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horaire</p>
                    <p className="font-medium">{meeting.startTime} - {meeting.endTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lieu</p>
                    <p className="font-medium">{meeting.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{meeting.type}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ordre du jour */}
          <Card>
            <CardHeader>
              <CardTitle>Ordre du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meeting.agenda.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.duration} • Présenté par {item.presenter}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes de réunion */}
          <Card>
            <CardHeader>
              <CardTitle>Notes de réunion</CardTitle>
              <CardDescription>Compte-rendu et discussions principales</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ajoutez vos notes de réunion..."
                value={meetingNotes}
                onChange={(e) => setMeetingNotes(e.target.value)}
                rows={6}
              />
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm">
                  Enregistrer les notes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions à suivre */}
          <Card>
            <CardHeader>
              <CardTitle>Actions à suivre</CardTitle>
              <CardDescription>Tâches assignées suite à cette réunion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {meeting.actionItems.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{action.task}</p>
                        <p className="text-sm text-muted-foreground">
                          Assigné à {action.assignee} • Échéance: {new Date(action.deadline).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={action.status === "en_cours" ? "outline" : "secondary"}>
                      {action.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Nouvelle action à suivre..."
                  value={newActionItem}
                  onChange={(e) => setNewActionItem(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={handleAddActionItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participants ({meeting.participants.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meeting.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {participant.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                    {getStatusBadge(participant.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {meeting.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Inviter un participant
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Générer CR
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Planifier suivi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};