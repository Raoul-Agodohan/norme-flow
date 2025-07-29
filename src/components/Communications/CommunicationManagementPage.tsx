import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Send, 
  Edit, 
  Eye,
  Calendar,
  Users,
  Mail,
  MessageSquare,
  Share,
  BarChart3,
  FileText,
  Search
} from "lucide-react";

export const CommunicationManagementPage = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - campagnes de communication
  const campaigns = [
    {
      id: 1,
      title: "Nouvelle norme sécurité alimentaire",
      type: "email",
      status: "envoyé",
      createdDate: "2024-02-15",
      sentDate: "2024-02-16",
      recipients: 1250,
      openRate: 68,
      clickRate: 12,
      subject: "Norme EN-2024-001 maintenant disponible",
      preview: "La nouvelle norme de sécurité alimentaire pour restaurants est officiellement publiée..."
    },
    {
      id: 2,
      title: "Enquête publique textile EPI",
      type: "announcement",
      status: "programmé",
      createdDate: "2024-02-14",
      scheduledDate: "2024-02-20",
      recipients: 850,
      subject: "Consultation publique - Standard textile EPI",
      preview: "Participez à l'enquête publique sur le nouveau standard textile pour les équipements..."
    },
    {
      id: 3,
      title: "Newsletter mensuelle février",
      type: "newsletter",
      status: "brouillon",
      createdDate: "2024-02-10",
      recipients: 3200,
      subject: "Actualités normalisation - Février 2024",
      preview: "Découvrez les dernières normes publiées, les projets en cours et les événements à venir..."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "envoyé":
        return <Badge className="bg-success/10 text-success border-success">Envoyé</Badge>;
      case "programmé":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Programmé</Badge>;
      case "brouillon":
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "announcement":
        return <MessageSquare className="h-4 w-4" />;
      case "newsletter":
        return <FileText className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Communications</h1>
          <p className="text-muted-foreground">Créez et gérez vos campagnes de communication</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle campagne
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Send className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Campagnes ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">5,300</p>
            <p className="text-xs text-muted-foreground">Destinataires actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">72%</p>
            <p className="text-xs text-muted-foreground">Taux d'ouverture moy.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">15%</p>
            <p className="text-xs text-muted-foreground">Taux de clic moy.</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "campaigns" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("campaigns")}
        >
          Campagnes
        </Button>
        <Button
          variant={activeTab === "templates" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("templates")}
        >
          Modèles
        </Button>
        <Button
          variant={activeTab === "recipients" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("recipients")}
        >
          Destinataires
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("analytics")}
        >
          Statistiques
        </Button>
      </div>

      {/* Filtres et recherche */}
      {activeTab === "campaigns" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une campagne..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="envoyé">Envoyé</SelectItem>
                  <SelectItem value="programmé">Programmé</SelectItem>
                  <SelectItem value="brouillon">Brouillon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contenu selon l'onglet actif */}
      {activeTab === "campaigns" && (
        <Card>
          <CardHeader>
            <CardTitle>Campagnes de communication ({filteredCampaigns.length})</CardTitle>
            <CardDescription>
              Gérez vos emails, newsletters et communications officielles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getTypeIcon(campaign.type)}
                        <h3 className="text-lg font-semibold">{campaign.title}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {campaign.subject}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {campaign.preview}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Créé le {new Date(campaign.createdDate).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {campaign.recipients} destinataires
                        </span>
                        {campaign.openRate && (
                          <span className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {campaign.openRate}% ouverture
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Aperçu
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                      {campaign.status === "brouillon" && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </Button>
                      )}
                      {campaign.status === "envoyé" && (
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Stats
                        </Button>
                      )}
                    </div>
                  </div>

                  {campaign.status === "envoyé" && campaign.openRate && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{campaign.recipients}</p>
                        <p className="text-xs text-muted-foreground">Envoyés</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-success">{campaign.openRate}%</p>
                        <p className="text-xs text-muted-foreground">Ouverture</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-warning">{campaign.clickRate || 0}%</p>
                        <p className="text-xs text-muted-foreground">Clics</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune campagne trouvée</h3>
                  <p className="text-muted-foreground">
                    {searchTerm 
                      ? "Essayez de modifier vos critères de recherche"
                      : "Créez votre première campagne de communication"
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Autres onglets */}
      {activeTab === "templates" && (
        <Card>
          <CardHeader>
            <CardTitle>Modèles de communication</CardTitle>
            <CardDescription>Créez et gérez vos modèles réutilisables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fonctionnalité en développement</h3>
              <p className="text-muted-foreground">
                La gestion des modèles sera bientôt disponible
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "recipients" && (
        <Card>
          <CardHeader>
            <CardTitle>Gestion des destinataires</CardTitle>
            <CardDescription>Organisez vos listes de diffusion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fonctionnalité en développement</h3>
              <p className="text-muted-foreground">
                La gestion des destinataires sera bientôt disponible
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Statistiques détaillées</CardTitle>
            <CardDescription>Analysez les performances de vos communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fonctionnalité en développement</h3>
              <p className="text-muted-foreground">
                Les statistiques détaillées seront bientôt disponibles
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};