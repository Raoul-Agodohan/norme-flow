import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Users, 
  Plus,
  UserPlus,
  Building,
  Calendar,
  Target
} from "lucide-react";

interface CreateTechnicalBodyPageProps {
  onBack: () => void;
}

export const CreateTechnicalBodyPage = ({ onBack }: CreateTechnicalBodyPageProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    objectives: "",
    sector: "",
    chairman: "",
    secretary: "",
    duration: "",
    meetingFrequency: "",
    maxMembers: "",
    isPublic: false
  });

  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);

  // Mock data des experts disponibles
  const availableExperts = [
    { id: "1", name: "Dr. Marie Dubois", expertise: "Sécurité alimentaire", organization: "INRA" },
    { id: "2", name: "Jean-Pierre Martin", expertise: "Chimie industrielle", organization: "CNRS" },
    { id: "3", name: "Sophie Lenoir", expertise: "Environnement", organization: "ADEME" },
    { id: "4", name: "Michel Lambert", expertise: "Électronique", organization: "CEA" },
    { id: "5", name: "Claire Rousseau", expertise: "Textile", organization: "IFTH" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpertToggle = (expertId: string) => {
    setSelectedExperts(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    );
  };

  const handleSubmit = () => {
    console.log("Création organe technique:", { formData, selectedExperts });
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
          <h1 className="text-3xl font-bold text-foreground">Créer un organe technique</h1>
          <p className="text-muted-foreground">Configuration d'un nouveau comité ou groupe de travail</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Informations générales</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nom de l'organe</label>
              <Input
                placeholder="Ex: Comité Technique Sécurité Alimentaire"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Type d'organe</label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT">Comité Technique (CT)</SelectItem>
                  <SelectItem value="SC">Sous-Comité (SC)</SelectItem>
                  <SelectItem value="GT">Groupe de Travail (GT)</SelectItem>
                  <SelectItem value="GE">Groupe d'Experts (GE)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Secteur</label>
              <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alimentaire">Alimentaire</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="electronique">Électronique</SelectItem>
                  <SelectItem value="environnement">Environnement</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="chimie">Chimie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Décrivez la mission et les responsabilités de cet organe..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Objectifs</label>
              <Textarea
                placeholder="Listez les objectifs principaux..."
                value={formData.objectives}
                onChange={(e) => handleInputChange("objectives", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuration opérationnelle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Configuration opérationnelle</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Président</label>
              <Input
                placeholder="Nom du président"
                value={formData.chairman}
                onChange={(e) => handleInputChange("chairman", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Secrétaire</label>
              <Input
                placeholder="Nom du secrétaire"
                value={formData.secretary}
                onChange={(e) => handleInputChange("secretary", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Durée du mandat (mois)</label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 mois</SelectItem>
                  <SelectItem value="12">12 mois</SelectItem>
                  <SelectItem value="24">24 mois</SelectItem>
                  <SelectItem value="36">36 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fréquence des réunions</label>
              <Select value={formData.meetingFrequency} onValueChange={(value) => handleInputChange("meetingFrequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="biweekly">Bi-mensuelle</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                  <SelectItem value="quarterly">Trimestrielle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Nombre maximum de membres</label>
              <Input
                type="number"
                placeholder="Ex: 15"
                value={formData.maxMembers}
                onChange={(e) => handleInputChange("maxMembers", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleInputChange("isPublic", checked as boolean)}
              />
              <label htmlFor="public" className="text-sm font-medium">
                Organe public (visible dans l'annuaire)
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sélection des experts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Composition initiale</span>
          </CardTitle>
          <CardDescription>
            Sélectionnez les experts qui feront partie de cet organe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableExperts.map((expert) => (
              <div
                key={expert.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedExperts.includes(expert.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleExpertToggle(expert.id)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    checked={selectedExperts.includes(expert.id)}
                    onChange={() => {}}
                  />
                  <span className="font-medium">{expert.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{expert.expertise}</p>
                <p className="text-xs text-muted-foreground">{expert.organization}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>{selectedExperts.length}</strong> expert(s) sélectionné(s)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Annuler
        </Button>
        <div className="space-x-3">
          <Button variant="outline">
            Enregistrer comme brouillon
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Créer l'organe technique
          </Button>
        </div>
      </div>
    </div>
  );
};