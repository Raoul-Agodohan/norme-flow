import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Eye, 
  Users, 
  Globe,
  Calendar,
  Filter,
  Share2,
  Mail,
  MessageSquare
} from "lucide-react";

export const BroadcastStatsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  const diffusionStats = [
    {
      id: 1,
      title: "Norme NT 01.01.001 - Ciment Portland",
      publishDate: "2024-01-15",
      views: 1250,
      downloads: 387,
      shares: 45,
      channels: ["Site web", "Newsletter", "Réseaux sociaux"],
      engagement: 85
    },
    {
      id: 2,
      title: "Norme NT 02.03.002 - Matériaux de construction",
      publishDate: "2024-01-20",
      views: 892,
      downloads: 234,
      shares: 28,
      channels: ["Site web", "Newsletter"],
      engagement: 72
    },
    {
      id: 3,
      title: "Norme NT 03.01.001 - Sécurité alimentaire",
      publishDate: "2024-01-25",
      views: 2134,
      downloads: 678,
      shares: 89,
      channels: ["Site web", "Newsletter", "Réseaux sociaux", "Presse"],
      engagement: 92
    }
  ];

  const overviewStats = [
    { label: "Vues totales", value: "4,276", icon: Eye, change: "+12%" },
    { label: "Téléchargements", value: "1,299", icon: Download, change: "+8%" },
    { label: "Partages", value: "162", icon: Share2, change: "+15%" },
    { label: "Abonnés newsletter", value: "3,487", icon: Users, change: "+5%" }
  ];

  const getChannelBadge = (channel: string) => {
    const variants: Record<string, string> = {
      "Site web": "default",
      "Newsletter": "secondary",
      "Réseaux sociaux": "outline",
      "Presse": "destructive"
    };
    return variants[channel] || "default";
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return "text-green-600";
    if (engagement >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Statistiques de diffusion</h1>
          <p className="text-muted-foreground">
            Analyse de la portée et de l'engagement des normes publiées
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 derniers jours</SelectItem>
              <SelectItem value="30">30 derniers jours</SelectItem>
              <SelectItem value="90">3 derniers mois</SelectItem>
              <SelectItem value="365">1 an</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="detailed">Analyse détaillée</TabsTrigger>
          <TabsTrigger value="channels">Canaux de diffusion</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance par norme</CardTitle>
              <CardDescription>
                Détail des statistiques de diffusion pour chaque norme publiée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diffusionStats.map((norm) => (
                  <div
                    key={norm.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{norm.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Publié le {new Date(norm.publishDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getEngagementColor(norm.engagement)}
                      >
                        {norm.engagement}% engagement
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{norm.views}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Vues</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{norm.downloads}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Téléchargements</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{norm.shares}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Partages</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{norm.engagement}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Canaux de diffusion :</p>
                      <div className="flex flex-wrap gap-2">
                        {norm.channels.map((channel) => (
                          <Badge 
                            key={channel} 
                            variant={getChannelBadge(channel) as any}
                            className="text-xs"
                          >
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Site web
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Vues totales</span>
                    <span className="font-semibold">3,276</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taux de conversion</span>
                    <span className="font-semibold">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps moyen</span>
                    <span className="font-semibold">3:24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ouvertures</span>
                    <span className="font-semibold">2,145</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taux d'ouverture</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clics</span>
                    <span className="font-semibold">487</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Réseaux sociaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Portée</span>
                    <span className="font-semibold">8,932</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partages</span>
                    <span className="font-semibold">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des performances</CardTitle>
              <CardDescription>
                Tendances des derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Graphique des tendances</p>
                  <p className="text-sm">(Données simulées)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};