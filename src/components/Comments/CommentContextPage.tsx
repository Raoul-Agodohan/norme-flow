import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  MessageCircle, 
  Clock, 
  User, 
  FileText,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Reply
} from "lucide-react";

interface CommentContextPageProps {
  commentId: string;
  onBack: () => void;
}

export const CommentContextPage = ({ commentId, onBack }: CommentContextPageProps) => {
  const [response, setResponse] = useState("");
  
  // Données simulées pour le commentaire et son contexte
  const commentData = {
    id: commentId,
    author: "Marie Dubois",
    authorRole: "Expert Matériaux - Université de Lomé",
    avatar: "/avatars/marie-dubois.jpg",
    date: "2024-01-22T14:30:00",
    status: "En cours d'analyse",
    severity: "Majeur",
    section: "Article 3.2 - Composition chimique",
    normTitle: "NT 01.01.001 - Ciment Portland",
    normVersion: "Version 2.1",
    content: `Je souhaite attirer l'attention sur une incohérence dans les spécifications de la composition chimique du ciment Portland. 

La limite supérieure pour le sulfate de sodium (Na2SO3) est fixée à 0,6% dans l'article 3.2.1, alors que la norme internationale ISO 12269-1 recommande une limite de 0,8%. 

Cette différence pourrait créer des difficultés pour les producteurs locaux qui exportent vers d'autres pays de la région CEDEAO, où la norme ISO est généralement adoptée.

Recommandation : Harmoniser cette valeur avec les standards internationaux ou justifier scientifiquement cette restriction plus sévère.`,
    responses: [
      {
        id: 1,
        author: "Dr. Pierre Akakpo",
        role: "Rapporteur GT Ciment",
        date: "2024-01-23T09:15:00",
        content: "Merci pour cette observation pertinente. La limite de 0,6% avait été adoptée suite aux études locales sur la disponibilité des matières premières. Nous allons réévaluer cette position.",
        type: "official"
      },
      {
        id: 2,
        author: "Jean-Baptiste Koffi",
        role: "Représentant Industrie",
        date: "2024-01-23T16:20:00",
        content: "Je confirme les difficultés mentionnées. Plusieurs de nos membres exportateurs ont déjà fait remonter cette problématique.",
        type: "support"
      }
    ],
    attachments: [
      { name: "ISO_12269-1_extract.pdf", size: "245 KB" },
      { name: "analyse_comparative.xlsx", size: "18 KB" }
    ],
    relatedComments: [
      { id: "C002", author: "Dr. Kossi Mensah", section: "Article 3.1", summary: "Question sur les agrégats fins" },
      { id: "C007", author: "Ing. Fatou Sall", section: "Article 3.3", summary: "Méthodes d'essai alternatives" }
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; icon: any }> = {
      "En cours d'analyse": { variant: "secondary", icon: Clock },
      "Traité": { variant: "default", icon: CheckCircle },
      "Nécessite clarification": { variant: "destructive", icon: AlertCircle }
    };
    
    const config = variants[status] || variants["En cours d'analyse"];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      "Mineur": "text-green-600",
      "Modéré": "text-yellow-600",
      "Majeur": "text-orange-600",
      "Critique": "text-red-600"
    };
    return colors[severity] || "text-gray-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Contexte du commentaire</h1>
          <p className="text-muted-foreground">Analyse détaillée et suivi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commentaire principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={commentData.avatar} />
                    <AvatarFallback>
                      {commentData.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{commentData.author}</CardTitle>
                    <CardDescription>{commentData.authorRole}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(commentData.status)}
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(commentData.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className={getSeverityColor(commentData.severity)}>
                  {commentData.severity}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Section : {commentData.section}
                </span>
              </div>
              
              <div className="prose prose-sm max-w-none">
                {commentData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>

              {commentData.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Pièces jointes :</h4>
                  <div className="space-y-2">
                    {commentData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({file.size})</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Réponses et discussions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Discussions ({commentData.responses.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commentData.responses.map((response, index) => (
                <div key={response.id}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {response.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{response.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {response.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(response.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm">{response.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Utile
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-3 w-3 mr-1" />
                          Répondre
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < commentData.responses.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Ajouter une réponse :</h4>
                <Textarea
                  placeholder="Votre réponse ou analyse..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button>Publier la réponse</Button>
                  <Button variant="outline">Brouillon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Informations contextuelles */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contexte de la norme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">{commentData.normTitle}</p>
                <p className="text-sm text-muted-foreground">{commentData.normVersion}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium">Section concernée :</p>
                <p className="text-sm">{commentData.section}</p>
              </div>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Voir la section complète
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <CheckCircle className="h-4 w-4 mr-2" />
                Marquer comme traité
              </Button>
              <Button className="w-full" variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Demander clarification
              </Button>
              <Button className="w-full" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Assigner à un expert
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commentaires liés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commentData.relatedComments.map((comment) => (
                <div key={comment.id} className="p-3 border rounded">
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{comment.section}</p>
                  <p className="text-sm mt-1">{comment.summary}</p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                    Voir le détail →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};