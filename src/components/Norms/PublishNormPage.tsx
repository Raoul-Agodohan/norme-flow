import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Calendar,
  Send,
  Eye,
  Download,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface PublishNormPageProps {
  normId?: number;
  onBack: () => void;
}

export const PublishNormPage = ({ normId, onBack }: PublishNormPageProps) => {
  const [publicationData, setPublicationData] = useState({
    reference: "",
    title: "",
    category: "",
    publicationDate: "",
    effectiveDate: "",
    price: "",
    summary: "",
    keywords: "",
    language: "fr",
    isPublic: true,
    requiresPayment: false
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock data - norme à publier
  const norm = {
    id: normId || 1,
    title: "Norme de sécurité alimentaire pour restaurants",
    version: "v3.2",
    status: "approuvée",
    approvalDate: "2024-02-15",
    category: "Alimentaire",
    description: "Standard de sécurité alimentaire pour les établissements de restauration",
    fileSize: "2.3 MB"
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setPublicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  const handlePublish = () => {
    console.log("Publication de la norme:", { publicationData, files: uploadedFiles });
    // Ici on ferait l'appel API
    onBack();
  };

  const handlePreview = () => {
    console.log("Aperçu de la publication");
    // Ouvrir un aperçu de la publication
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publier une norme</h1>
          <p className="text-muted-foreground">Mise en ligne officielle de la norme approuvée</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations de publication */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de la norme</CardTitle>
              <CardDescription>Détails de la norme à publier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{norm.title}</h3>
                  <span className="text-sm text-muted-foreground">{norm.version}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{norm.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Approuvée le {new Date(norm.approvalDate).toLocaleDateString('fr-FR')}</span>
                  <span>Taille: {norm.fileSize}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métadonnées de publication</CardTitle>
              <CardDescription>Informations pour le catalogue public</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Référence officielle</label>
                  <Input
                    placeholder="Ex: NF EN 2024-001"
                    value={publicationData.reference}
                    onChange={(e) => handleInputChange("reference", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Select value={publicationData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alimentaire">Alimentaire</SelectItem>
                      <SelectItem value="textile">Textile</SelectItem>
                      <SelectItem value="electronique">Électronique</SelectItem>
                      <SelectItem value="environnement">Environnement</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date de publication</label>
                  <Input
                    type="date"
                    value={publicationData.publicationDate}
                    onChange={(e) => handleInputChange("publicationDate", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date d'entrée en vigueur</label>
                  <Input
                    type="date"
                    value={publicationData.effectiveDate}
                    onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Titre public</label>
                <Input
                  placeholder="Titre tel qu'il apparaîtra dans le catalogue"
                  value={publicationData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Résumé</label>
                <Textarea
                  placeholder="Description courte pour le catalogue public..."
                  value={publicationData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mots-clés</label>
                <Input
                  placeholder="mots-clés, séparés, par, des, virgules"
                  value={publicationData.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Prix (€)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={publicationData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents et fichiers</CardTitle>
              <CardDescription>Version finale et documents annexes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Cliquez pour téléverser les fichiers</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX jusqu'à 10MB</p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Fichiers téléversés</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Options et paramètres */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Langue</label>
                <Select value={publicationData.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                    <SelectItem value="ar">Arabe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public"
                    checked={publicationData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked as boolean)}
                  />
                  <label htmlFor="public" className="text-sm font-medium">
                    Publication publique
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="payment"
                    checked={publicationData.requiresPayment}
                    onCheckedChange={(checked) => handleInputChange("requiresPayment", checked as boolean)}
                  />
                  <label htmlFor="payment" className="text-sm font-medium">
                    Nécessite un paiement
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Norme approuvée officiellement</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {uploadedFiles.length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <span>Documents finaux téléversés</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {publicationData.reference && publicationData.title ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <span>Métadonnées complètes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" onClick={handlePreview} className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Aperçu
              </Button>
              <Button onClick={handlePublish} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Publier la norme
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• La publication sera effective immédiatement</p>
                <p>• Une notification sera envoyée aux abonnés</p>
                <p>• La norme apparaîtra dans le catalogue public</p>
                <p>• Un communiqué de presse peut être généré</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};