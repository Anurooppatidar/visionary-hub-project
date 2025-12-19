import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Plus, Users, Briefcase, MessageSquare, Mail } from "lucide-react";

// Mock Image Cropper UI Component (Visual only as per requirements for now)
const ImageCropper = ({ src, onCrop }: { src: string, onCrop: (url: string) => void }) => {
  return (
    <div className="border border-dashed p-4 rounded-lg bg-muted/50 text-center">
      <div className="aspect-[4/3] bg-muted w-full max-w-xs mx-auto mb-2 flex items-center justify-center">
        {src ? (
          <img src={src} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm">Image Preview Area</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        *Bonus Feature: Automatic 4:3 aspect ratio crop applied on upload
      </p>
    </div>
  );
};

export default function AdminPage() {
  const store = useStore();
  const { toast } = useToast();

  const [projectForm, setProjectForm] = useState({ name: "", description: "", imageUrl: "" });
  const [clientForm, setClientForm] = useState({ name: "", designation: "", description: "", imageUrl: "" });

  // Helper to handle simple form submissions
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description) return;
    
    // For demo purposes, if no image is provided, use a placeholder
    const finalImage = projectForm.imageUrl || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80";
    
    store.addProject({ ...projectForm, imageUrl: finalImage });
    setProjectForm({ name: "", description: "", imageUrl: "" });
    toast({ title: "Success", description: "Project added successfully" });
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.description) return;

    const finalImage = clientForm.imageUrl || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80";

    store.addClient({ ...clientForm, imageUrl: finalImage });
    setClientForm({ name: "", designation: "", description: "", imageUrl: "" });
    toast({ title: "Success", description: "Client added successfully" });
  };

  return (
    <div className="container py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your content and view submissions.</p>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="projects" className="gap-2"><Briefcase className="w-4 h-4" /> Projects</TabsTrigger>
          <TabsTrigger value="clients" className="gap-2"><Users className="w-4 h-4" /> Clients</TabsTrigger>
          <TabsTrigger value="messages" className="gap-2"><MessageSquare className="w-4 h-4" /> Messages</TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-2"><Mail className="w-4 h-4" /> Subscribers</TabsTrigger>
        </TabsList>

        {/* PROJECT MANAGEMENT */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
                <CardDescription>Add a new project to your portfolio.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-name">Project Name</Label>
                    <Input 
                      id="p-name" 
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                      placeholder="e.g. Skyline Tower"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-desc">Description</Label>
                    <Textarea 
                      id="p-desc" 
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      placeholder="Project details..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Image</Label>
                    <ImageCropper src={projectForm.imageUrl} onCrop={() => {}} />
                    <Input 
                      placeholder="Image URL (optional)" 
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                      className="text-xs"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Existing Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {store.projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted">
                      <img src={project.imageUrl || "/placeholder.jpg"} alt={project.name} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs">{project.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* CLIENT MANAGEMENT */}
        <TabsContent value="clients" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Add New Client</CardTitle>
                <CardDescription>Add a testimonial to the happy clients section.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Client Name</Label>
                    <Input 
                      id="c-name" 
                      value={clientForm.name}
                      onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-desig">Designation</Label>
                    <Input 
                      id="c-desig" 
                      value={clientForm.designation}
                      onChange={(e) => setClientForm({...clientForm, designation: e.target.value})}
                      placeholder="e.g. CEO, TechCorp"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-desc">Testimonial</Label>
                    <Textarea 
                      id="c-desc" 
                      value={clientForm.description}
                      onChange={(e) => setClientForm({...clientForm, description: e.target.value})}
                      placeholder="What did they say?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Photo</Label>
                    <ImageCropper src={clientForm.imageUrl} onCrop={() => {}} />
                    <Input 
                      placeholder="Image URL (optional)" 
                      value={clientForm.imageUrl}
                      onChange={(e) => setClientForm({...clientForm, imageUrl: e.target.value})}
                      className="text-xs"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Client
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Client Testimonials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {store.clients.map((client) => (
                  <Card key={client.id} className="flex flex-row items-center p-4 space-x-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0">
                      <img src={client.imageUrl || "/placeholder.jpg"} alt={client.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{client.name}</h4>
                      <p className="text-xs text-muted-foreground">{client.designation}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* MESSAGES */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Submissions</CardTitle>
              <CardDescription>View all inquiries from the landing page contact form.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>City</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {store.contacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-10">No messages yet.</TableCell>
                    </TableRow>
                  ) : (
                    store.contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-mono text-xs">{format(new Date(contact.timestamp), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="font-medium">{contact.fullName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.mobile}</TableCell>
                        <TableCell>{contact.city}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUBSCRIBERS */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Subscribers</CardTitle>
              <CardDescription>List of email addresses subscribed to the newsletter.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Email Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {store.subscribers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground py-10">No subscribers yet.</TableCell>
                    </TableRow>
                  ) : (
                    store.subscribers.map((sub) => (
                      <TableRow key={sub.id}>
                         <TableCell className="font-mono text-xs">{format(new Date(sub.timestamp), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="font-medium">{sub.email}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
