
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare, Link } from "lucide-react";

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    social: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submission started", formData);
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending request to Google Apps Script...");
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbwP2QhGhFgQTaoRcNTc3AZOPFOzhYUzAFIxrp8nh5KWhwCKZliqya5PXfdMS5l1HvYORw/exec', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
          social: formData.social.trim()
        })
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response result:", result);

      if (result.result === "success") {
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll be in touch soon!",
        });
        setFormData({ name: "", email: "", message: "", social: "" });
      } else if (result.result === "already_registered") {
        toast({
          title: "Already Registered",
          description: "This email is already on our waitlist.",
          variant: "destructive"
        });
      } else {
        console.error("Unexpected result:", result);
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      
      let errorMessage = "Please try again or contact support.";
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Exclusive Waitlist
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be among the first to access BlueLink Blockchain Services ecosystem. 
            Get early investor opportunities and exclusive updates.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-gray-900">Early Access Registration</CardTitle>
              <CardDescription className="text-gray-600">
                Secure your spot in the future of digital finance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your interest in BlueLink Blockchain Services..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social" className="text-sm font-medium text-gray-700 flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    Social Links (Optional)
                  </Label>
                  <Input
                    id="social"
                    name="social"
                    type="text"
                    placeholder="LinkedIn, Twitter, or other social profiles"
                    value={formData.social}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  By joining our waitlist, you agree to receive updates about BlueLink Blockchain Services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
