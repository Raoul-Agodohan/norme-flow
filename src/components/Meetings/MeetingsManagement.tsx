import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Plus, 
  Clock,
  Users,
  FileText,
  Video,
  MapPin,
  Search,
  Filter,
  Download,
  Edit,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MeetingsManagement = () => {
  const meetings = [
    {
      id: 1,
      title: "GT Sécurité Alimentaire - Session 3",
      organTechnique: "Groupe de Travail Sécurité Alimentaire",
      date: "2024-01-20",
      time: "14:00",
      duration: "2h",
      location: "Salle de conférence A",
      type: "presentiel",
      status: "planifie",
      participants: 12,
      confirmedParticipants: 8,
      agenda: "Révision avant-projet de norme",
      coordinator: "Dr. Martin Dubois"
    },
    {
      id: 2,
      title: "SC Textile - Validation finale",
      organTechnique: "Sous-Comité Textile Biologique",
      date: "2024-01-22",
      time: "09:00",
      duration: "3h",
      location: "Visioconférence",
      type: "virtuel",
      status: "planifie",
      participants: 8,
      confirmedParticipants: 6,
      agenda: "Vote final sur le standard textile bio",
      coordinator: "Mme. Sophie Laurent"
    },
    {
      id: 3,
      title: "CT Construction - Bilan trimestriel",
      organTechnique: "Comité Technique Construction",
      date: "2024-01-15",
      time: "10:00",
      duration: "4h",
      location: "Auditorium principal",
      type: "hybride",
      status: "termine",
      participants: 15,
      confirmedParticipants: 15,
      agenda: "Présentation des avancées du trimestre",
      coordinator: "Ing. Pierre Moreau"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planifie":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary">Planifiée</Badge>;
      case "en_cours":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">En cours</Badge>;
      case "termine":
        return <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted">Terminée</Badge>;
      case "annule":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Annulée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const config = {
      presentiel: { icon: MapPin, color: "bg-accent/10 text-accent-foreground border-accent", label: "Présentiel" },
      virtuel: { icon: Video, color: "bg-primary/10 text-primary border-primary", label: "Virtuel" },
      hybride: { icon: Users, color: "bg-secondary/10 text-secondary-foreground border-secondary", label: "Hybride" }
    };
    const typeConfig = config[type as keyof typeof config];
    const Icon = typeConfig.icon;
    
    return (
      <Badge variant="outline" className={typeConfig.color}>
        <Icon className="mr-1 h-3 w-3" />
        {typeConfig.label}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des réunions</h1>
          <p className="text-muted-foreground">Organisation et suivi des réunions des organes techniques</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Planifier une réunion
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Réunions ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">À venir cette semaine</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Taux de participation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-muted-foreground">Comptes-rendus en attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher une réunion..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les organes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les organes</SelectItem>
                  <SelectItem value="gt">Groupes de Travail</SelectItem>
                  <SelectItem value="sc">Sous-Comités</SelectItem>
                  <SelectItem value="ct">Comités Techniques</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="planifie">Planifiées</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="termine">Terminées</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="presentiel">Présentiel</SelectItem>
                  <SelectItem value="virtuel">Virtuel</SelectItem>
                  <SelectItem value="hybride">Hybride</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des réunions */}
      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{meeting.title}</CardTitle>
                    {getStatusBadge(meeting.status)}
                    {getTypeBadge(meeting.type)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span>{meeting.organTechnique}</span>
                    <span>Coordinateur: {meeting.coordinator}</span>
                  </div>
                  <CardDescription className="text-base">
                    {meeting.agenda}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Date et heure:</span>
                    <span className="ml-2">{new Date(meeting.date).toLocaleDateString('fr-FR')} à {meeting.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Durée:</span>
                    <span className="ml-2">{meeting.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    {meeting.type === 'virtuel' ? (
                      <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">Lieu:</span>
                    <span className="ml-2">{meeting.location}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Participants:</span>
                    <span className="ml-2">{meeting.confirmedParticipants}/{meeting.participants}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(meeting.confirmedParticipants / meeting.participants) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taux de confirmation: {Math.round((meeting.confirmedParticipants / meeting.participants) * 100)}%
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Users className="mr-2 h-3 w-3" />
                    Participants
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-3 w-3" />
                    Ordre du jour
                  </Button>
                  {meeting.status === 'termine' && (
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-3 w-3" />
                      Compte-rendu
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  {meeting.status === 'planifie' && (
                    <Button size="sm" variant="outline">
                      Modifier
                    </Button>
                  )}
                  <Button size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Nouvelle réunion</h3>
            <p className="text-sm text-muted-foreground">
              Planifier une réunion
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Planning hebdomadaire</h3>
            <p className="text-sm text-muted-foreground">
              Vue d'ensemble
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Modèles</h3>
            <p className="text-sm text-muted-foreground">
              Ordres du jour types
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Salles et ressources</h3>
            <p className="text-sm text-muted-foreground">
              Gestion des salles
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};