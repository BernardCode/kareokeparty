
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const CreateParty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
    allowRequests: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      allowRequests: checked,
    }));
  };

  const handlePrivacyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      privacy: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a party title");
      return;
    }
    
    // Simulate party creation
    toast.success("Party created successfully!");
    
    // In a real app, you would call an API here
    // For now, we'll just redirect to a mock party page
    setTimeout(() => {
      navigate("/party/new-party");
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Create a Karaoke Party</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Party Details</CardTitle>
              <CardDescription>
                Set up your karaoke session and invite friends to sing along
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Party Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Friday Night Karaoke Jam"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Join us for some awesome singing!"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Privacy Settings</Label>
                <RadioGroup 
                  value={formData.privacy} 
                  onValueChange={handlePrivacyChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="font-normal">
                      Public (Anyone can join)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friends" id="friends" />
                    <Label htmlFor="friends" className="font-normal">
                      Friends Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="font-normal">
                      Private (Invite only)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label>Allow Song Requests</Label>
                  <p className="text-sm text-muted-foreground">
                    Let guests request songs to sing
                  </p>
                </div>
                <Switch
                  checked={formData.allowRequests}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit">Create Party</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateParty;
