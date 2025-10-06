import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const serviceProviderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  serviceType: z.string().min(1, "Type of Service is required"),
  story: z.string().min(1, "Service Provider Story is required"),
  location: z.string().min(1, "Location is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  education: z.string().min(1, "Education/Qualifications is required"),
  experience: z.string().min(1, "Years of Experience is required"),
  specialization: z.string().min(1, "Specialization/Discipline is required"),
  focusArea: z.string().min(1, "Focus Area / Key Strengths is required"),
  preferredRole: z.string().min(1, "Preferred Role is required"),
  portfolio: z.string().optional(),
  socialLinks: z.string().optional(),
  workedWithArtisans: z.string().min(1, "Worked with Artisans is required"),
  engagementMode: z.string().min(1, "Preferred Mode of Engagement is required"),
  sustainability: z.string().min(1, "Sustainability Practices is required"),
  certification: z.string().min(1, "Certification/Awards is required"),
  certificationsReceived: z.string().optional(),
  // Ratings & Reviews, Subscription, etc. can be added as needed
});

type ServiceProviderFormData = z.infer<typeof serviceProviderSchema>;

export default function ServiceProviderRegistrationForm({ onBack }: { onBack?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceProviderFormData>({
    resolver: zodResolver(serviceProviderSchema),
  });

  const onSubmit = (data: ServiceProviderFormData) => {
    // handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 w-full">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="serviceType">Type of Service *</Label>
        <Input id="serviceType" {...register("serviceType")} />
        {errors.serviceType && <span className="text-sm text-red-500">{errors.serviceType.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="story">Service Provider Story *</Label>
        <Textarea id="story" {...register("story")} />
        {errors.story && <span className="text-sm text-red-500">{errors.story.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="location">City/Town/Village *</Label>
        <Input id="location" {...register("location")} />
        {errors.location && <span className="text-sm text-red-500">{errors.location.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="state">State *</Label>
        <Input id="state" {...register("state")} />
        {errors.state && <span className="text-sm text-red-500">{errors.state.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="email">Email ID *</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="education">Education/Qualifications *</Label>
        <Input id="education" {...register("education")} />
        {errors.education && <span className="text-sm text-red-500">{errors.education.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="experience">Years of Experience *</Label>
        <Input id="experience" {...register("experience")} />
        {errors.experience && <span className="text-sm text-red-500">{errors.experience.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="specialization">Specialization/Discipline *</Label>
        <Input id="specialization" {...register("specialization")} />
        {errors.specialization && <span className="text-sm text-red-500">{errors.specialization.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="focusArea">Focus Area / Key Strengths *</Label>
        <Textarea id="focusArea" {...register("focusArea")} />
        {errors.focusArea && <span className="text-sm text-red-500">{errors.focusArea.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="preferredRole">Preferred Role *</Label>
        <Input id="preferredRole" {...register("preferredRole")} />
        {errors.preferredRole && <span className="text-sm text-red-500">{errors.preferredRole.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="portfolio">Portfolio/Projects</Label>
        <Input id="portfolio" {...register("portfolio")} />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="socialLinks">Social Media Links</Label>
        <Input id="socialLinks" {...register("socialLinks")} />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="workedWithArtisans">Worked with Artisans *</Label>
        <Input id="workedWithArtisans" {...register("workedWithArtisans")} />
        {errors.workedWithArtisans && <span className="text-sm text-red-500">{errors.workedWithArtisans.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="engagementMode">Preferred Mode of Engagement *</Label>
        <Input id="engagementMode" {...register("engagementMode")} />
        {errors.engagementMode && <span className="text-sm text-red-500">{errors.engagementMode.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="sustainability">Sustainability Practices *</Label>
        <Input id="sustainability" {...register("sustainability")} />
        {errors.sustainability && <span className="text-sm text-red-500">{errors.sustainability.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="certification">Certification/Awards *</Label>
        <Input id="certification" {...register("certification")} />
        {errors.certification && <span className="text-sm text-red-500">{errors.certification.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="certificationsReceived">Certifications Received</Label>
        <Input id="certificationsReceived" {...register("certificationsReceived")} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {onBack && <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">Back</Button>}
        <Button type="submit" className="w-full sm:flex-1">Register as Service Provider</Button>
      </div>
    </form>
  );
}
