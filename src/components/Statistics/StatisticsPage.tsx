import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Download,
  Calendar,
  FileText,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";

export const StatisticsPage = () => {
  const monthlyData = [
    { month: "Janvier", proposals: 12, approved: 8, rejected: 2, pending: 2 },
    { month: "Février", proposals: 15, approved: 10, rejected: 3, pending: 2 },
    { month: "Mars", proposals: 18, approved: 12, rejected: 4, pending: 2 },
    { month: "Avril", proposals: 14, approved: 9, rejected: 2, pending: 3 },
  ];

  const sectorData = [
    { sector: "Alimentaire", norms: 25, percentage: 30, trend: "+12%" },
    { sector: "Construction", norms: 20, percentage: 24, trend: "+8%" },
    { sector: "Environnement", norms: 17, percentage: 20, trend: "+15%" },
    { sector: "Technologie", norms: 13, percentage: 16, trend: "+20%" },
    { sector: "Textile", norms: 8, percentage: 10, trend: "+5%" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistiques et rapports</h1>
          <p className="text-muted-foreground">Analyse des performances et indicateurs clés</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Période personnalisée
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter rapport
          </Button>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">Normes totales</p>
                <p className="text-xs text-success">+15% ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">8.5</p>
                <p className="text-xs text-muted-foreground">Délai moyen (mois)</p>
                <p className="text-xs text-destructive">+0.5 vs objectif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Taux d'approbation</p>
                <p className="text-xs text-success">+3% vs trimestre</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Participants actifs</p>
                <p className="text-xs text-success">+12 ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution mensuelle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Évolution mensuelle</span>
            </CardTitle>
            <CardDescription>
              Propositions et approbations par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">{data.proposals} propositions</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="h-2 bg-success rounded" style={{ width: `${(data.approved / data.proposals) * 100}%` }} title={`${data.approved} approuvées`} />
                    <div className="h-2 bg-destructive rounded" style={{ width: `${(data.rejected / data.proposals) * 100}%` }} title={`${data.rejected} rejetées`} />
                    <div className="h-2 bg-warning rounded" style={{ width: `${(data.pending / data.proposals) * 100}%` }} title={`${data.pending} en attente`} />
                    <div className="h-2 bg-muted rounded flex-1" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{data.approved} ✓</span>
                    <span>{data.rejected} ✗</span>
                    <span>{data.pending} ⏳</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Répartition par secteur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance par secteur</span>
            </CardTitle>
            <CardDescription>
              Distribution et évolution des normes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorData.map((sector, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{sector.sector}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">{sector.norms} normes</span>
                      <span className="text-xs text-success">{sector.trend}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${sector.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Délais moyens par phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Faisabilité</span>
                <span className="font-bold">2.1 mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rédaction</span>
                <span className="font-bold">4.2 mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Enquête publique</span>
                <span className="font-bold">1.8 mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Finalisation</span>
                <span className="font-bold">0.9 mois</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Taux de participation GT</span>
                <span className="font-bold text-success">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Commentaires enquête</span>
                <span className="font-bold">156/norme</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Experts actifs</span>
                <span className="font-bold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Satisfaction</span>
                <span className="font-bold text-success">4.7/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Objectifs mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Nouvelles normes</span>
                  <span>8/10</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Délai objectif</span>
                  <span>7.8/8.0 mois</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-warning rounded-full" style={{ width: '97%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Satisfaction</span>
                  <span>4.7/5.0</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-success rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions d'export */}
      <Card>
        <CardHeader>
          <CardTitle>Rapports disponibles</CardTitle>
          <CardDescription>
            Téléchargez les rapports détaillés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Rapport mensuel (PDF)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Données brutes (Excel)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Dashboard exécutif (PowerPoint)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};