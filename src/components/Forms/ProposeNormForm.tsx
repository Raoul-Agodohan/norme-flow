import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Save, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProposeNormFormProps {
  onBack: () => void;
}

export const ProposeNormForm = ({ onBack }: ProposeNormFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    sector: "",
    description: "",
    justification: "",
    objectives: "",
    scope: "",
    stakeholders: "",
    timeline: "",
    resources: "",
    priority: "",
    references: ""
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (isDraft: boolean) => {
    if (!formData.title || !formData.sector || !formData.description) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isDraft ? "Brouillon sauvegardé" : "Proposition soumise",
      description: isDraft 
        ? "Votre proposition a été sauvegardée en brouillon"
        : "Votre proposition a été soumise pour validation",
      variant: "default"
    });

    if (!isDraft) {
      onBack();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Proposer une nouvelle norme</h1>
          <p className="text-muted-foreground">Remplissez la fiche de faisabilité</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Détails de base de la norme proposée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de la norme *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Norme sur la sécurité alimentaire..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="sector">Secteur d'activité *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentaire">Alimentaire</SelectItem>
                    <SelectItem value="textile">Textile</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="environnement">Environnement</SelectItem>
                    <SelectItem value="technologie">Technologie</SelectItem>
                    <SelectItem value="energie">Énergie</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description détaillée *</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez en détail la norme proposée, son contexte et sa nécessité..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Justification et objectifs */}
          <Card>
            <CardHeader>
              <CardTitle>Justification et objectifs</CardTitle>
              <CardDescription>Pourquoi cette norme est-elle nécessaire ?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="justification">Justification</Label>
                <Textarea
                  id="justification"
                  placeholder="Expliquez pourquoi cette norme est nécessaire, les problèmes qu'elle résout..."
                  className="min-h-[100px]"
                  value={formData.justification}
                  onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="objectives">Objectifs spécifiques</Label>
                <Textarea
                  id="objectives"
                  placeholder="Listez les objectifs spécifiques que cette norme doit atteindre..."
                  className="min-h-[100px]"
                  value={formData.objectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="scope">Champ d'application</Label>
                <Textarea
                  id="scope"
                  placeholder="Définissez le périmètre d'application de cette norme..."
                  className="min-h-[80px]"
                  value={formData.scope}
                  onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Parties prenantes et ressources */}
          <Card>
            <CardHeader>
              <CardTitle>Parties prenantes et ressources</CardTitle>
              <CardDescription>Qui sera impliqué et quelles ressources sont nécessaires ?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="stakeholders">Parties prenantes identifiées</Label>
                <Textarea
                  id="stakeholders"
                  placeholder="Listez les organisations, entreprises, experts qui devraient être impliqués..."
                  className="min-h-[80px]"
                  value={formData.stakeholders}
                  onChange={(e) => setFormData(prev => ({ ...prev, stakeholders: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeline">Délai estimé</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un délai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-6mois">3-6 mois</SelectItem>
                      <SelectItem value="6-12mois">6-12 mois</SelectItem>
                      <SelectItem value="1-2ans">1-2 ans</SelectItem>
                      <SelectItem value="plus-2ans">Plus de 2 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Niveau de priorité</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critique">Critique</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="resources">Ressources nécessaires</Label>
                <Textarea
                  id="resources"
                  placeholder="Décrivez les ressources humaines, techniques ou financières nécessaires..."
                  className="min-h-[80px]"
                  value={formData.resources}
                  onChange={(e) => setFormData(prev => ({ ...prev, resources: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents justificatifs */}
          <Card>
            <CardHeader>
              <CardTitle>Documents justificatifs</CardTitle>
              <CardDescription>Joignez tous les documents supportant votre proposition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">
                    Cliquez pour télécharger des fichiers
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <p className="text-sm text-muted-foreground">
                    Formats acceptés: PDF, Word, Excel, PowerPoint (max 10MB par fichier)
                  </p>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Fichiers téléchargés:</Label>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => handleSubmit(false)} 
                className="w-full"
                size="lg"
              >
                <Send className="mr-2 h-4 w-4" />
                Soumettre la proposition
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleSubmit(true)}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder en brouillon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Aide</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Remplissez tous les champs obligatoires (*)</p>
              <p>• Joignez les documents supportant votre demande</p>
              <p>• Une fois soumise, votre proposition sera évaluée par nos experts</p>
              <p>• Vous recevrez des notifications à chaque étape</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};