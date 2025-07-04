import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare, Link, CheckCircle } from "lucide-react";

const Whitelist = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    social: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Message Required",
        description: "Please tell us about your interest.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("email", formData.email.trim().toLowerCase());
      form.append("message", formData.message.trim());
      form.append("social", formData.social.trim() || "Not provided");

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby-REj6C_1_tSV8tQkVVodKy0NkltByvOHWNVArMUms5NSzKyNVTSnj07PFRmBQ8ahvyQ/exec",
        {
          method: "POST",
          body: form,
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "", social: "" });
        toast({
          title: "Success!",
          description:
            "You've been added to our Whitelist. We'll be in touch soon!",
        });
      } else if (result.result === "already_registered") {
        toast({
          title: "Already Registered",
          description: "This email is already on our Whitelist.",
          variant: "destructive",
        });
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Whitelist submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center animate-scale-in">
            <Card className="shadow-2xl border-0 bg-sky-50 backdrop-blur-sm">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to BlueLink!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  You've successfully joined our exclusive Whitelist. We'll keep
                  you updated on our progress and early access opportunities.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                  Add Another Person
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="Whitelist"
      className="py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2
            className="text-4xl font-bold text-sky-600 mb-4 animate-pulse"
          >
            {" "}
            Join Our Exclusive Whitelist
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be among the first to access BlueLink Blockchain Services ecosystem.
            Get early investor opportunities and exclusive updates.
          </p>
        </div>

        <div className="max-w-2xl mx-auto animate-scale-in">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-gray-900">
                Early Access Registration
              </CardTitle>
              <CardDescription className="text-gray-600">
                Secure your spot in the future of digital finance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  icon={User}
                  id="name"
                  label="Full Name *"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <InputField
                  icon={Mail}
                  id="email"
                  label="Email Address *"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <TextareaField
                  icon={MessageSquare}
                  id="message"
                  label="Message *"
                  name="message"
                  placeholder="Tell us about your interest in BlueLink Blockchain Services..."
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <InputField
                  icon={Link}
                  id="social"
                  label="Social Links (Optional)"
                  name="social"
                  type="text"
                  placeholder="LinkedIn, Twitter, Telegram, etc."
                  value={formData.social}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in"
                >
                  {isSubmitting ? "Submitting..." : "Join Whitelist"}
                </Button>
              </form>

              <div className="mt-6 text-center animate-fade-in">
                <p className="text-sm text-gray-500">
                  By joining our Whitelist, you agree to receive updates about
                  BlueLink Blockchain Services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Reusable Form Input
const InputField = ({ icon: Icon, ...props }: any) => (
  <div className="space-y-2 animate-fade-in">
    <Label
      htmlFor={props.id}
      className="text-sm font-medium text-gray-700 flex items-center"
    >
      <Icon className="h-4 w-4 mr-2" />
      {props.label}
    </Label>
    <Input
      {...props}
      className="h-12 border-sky-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
    />
  </div>
);

// Reusable Textarea Field
const TextareaField = ({ icon: Icon, ...props }: any) => (
  <div className="space-y-2 animate-fade-in">
    <Label
      htmlFor={props.id}
      className="text-sm font-medium text-gray-700 flex items-center"
    >
      <Icon className="h-4 w-4 mr-2" />
      {props.label}
    </Label>
    <Textarea
      {...props}
      className="border-sky-200 focus:border-blue-500 focus:ring-blue-500 resize-none bg-white"
      rows={4}
    />
  </div>
);

export default Whitelist;
