import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginFormProps {
  onLogin: (role: string, name: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.role && formData.email) {
      onLogin(formData.role, formData.name || formData.email);
    }
  };

  const roles = [
    { value: "promoteur", label: "Promoteur de norme" },
    { value: "normalisateur", label: "Secrétaire technique" },
    { value: "direction", label: "Direction CODINORM" },
    { value: "membre_gt", label: "Membre GT/SC/CT" },
    { value: "expert", label: "Expert ponctuel" },
    { value: "documentation", label: "Service documentation" },
    { value: "communication", label: "Service communication" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">CODINORM</CardTitle>
          <CardDescription>
            Plateforme digitale de normalisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre rôle" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <div>
                <a href="#" className="hover:text-primary">Mot de passe oublié ?</a>
                {" • "}
                <a href="#" className="hover:text-primary">Créer un compte</a>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onLogin("public", "Visiteur")}
              >
                Accéder aux enquêtes publiques
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};