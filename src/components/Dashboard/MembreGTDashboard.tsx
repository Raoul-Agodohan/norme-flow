import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell
} from "lucide-react";

interface MembreGTDashboardProps {
  onNavigate: (route: string) => void;
}

export const MembreGTDashboard = ({ onNavigate }: MembreGTDashboardProps) => {
  const activeNorms = [
    {
      id: 1,
      title: "Norme sécurité alimentaire",
      committee: "CT-FOOD-001",
      status: "revision",
      deadline: "2024-02-15",
      myComments: 3
    },
    {
      id: 2,
      title: "Standard qualité textile",
      committee: "GT-TEXTILE-002", 
      status: "enquete_publique",
      deadline: "2024-02-20",
      myComments: 1
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Réunion CT Sécurité Alimentaire",
      date: "2024-01-25",
      time: "14:00",
      type: "CT"
    },
    {
      id: 2,
      title: "GT Textile - Révision finale",
      date: "2024-01-28", 
      time: "10:00",
      type: "GT"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Expert</h1>
          <p className="text-muted-foreground">Vos normes en cours et activités</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>3 notifications</span>
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Normes actives</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Commentaires</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Réunions à venir</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Comités</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Normes en cours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Normes en cours d'examen</span>
          </CardTitle>
          <CardDescription>
            Normes où votre expertise est requise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeNorms.map((norm) => (
              <div key={norm.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{norm.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline">{norm.committee}</Badge>
                    <Badge variant={norm.status === "enquete_publique" ? "default" : "secondary"}>
                      {norm.status === "enquete_publique" ? "Enquête publique" : "Révision"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Échéance: {new Date(norm.deadline).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{norm.myComments} commentaires</span>
                  <Button variant="outline" size="sm">
                    Consulter
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate("active-norms")}
            >
              Voir toutes les normes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prochaines réunions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Prochaines réunions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(meeting.date).toLocaleDateString('fr-FR')} à {meeting.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate("my-meetings")}
            >
              Voir toutes mes réunions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};