import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/ui/form-select";
import { FileUpload } from "@/components/ui/file-upload";

const serviceProviderSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Service Provider Name is required"),
  serviceType: z.string().min(1, "Type of Service is required"),
  story: z.string().min(1, "Service Provider Story is required"),
  location: z.string().min(1, "City/Town/Village is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),

  // Education & Experience
  education: z.string().min(1, "Education/Qualifications is required"),
  experience: z.string().min(1, "Years of Experience is required"),
  specialization: z.string().min(1, "Specialization/Discipline is required"),
  focusArea: z.string().min(1, "Focus Area / Key Strengths is required"),
  preferredRole: z.string().min(1, "Preferred Role is required"),

  // Portfolio & Social Media
  portfolio: z.string().optional(),
  socialLinks: z.string().optional(),

  // Collaboration & Preferences
  workedWithArtisans: z.string().min(1, "Worked with Artisans is required"),
  engagementMode: z.string().min(1, "Preferred Mode of Engagement is required"),
  sustainability: z.string().min(1, "Sustainability Practices is required"),

  // Certifications & Awards
  certification: z.string().min(1, "Certification/Awards is required"),
  certificationsReceived: z.string().optional(),

  // Ratings & Reviews
  ratingsSystem: z.string().optional(),
  peersReviews: z.string().optional(),

  // Subscription
  subscribeToUpdates: z.boolean()
});

type ServiceProviderFormData = z.infer<typeof serviceProviderSchema>;

// Form options data
const serviceTypeOptions = [
  { value: "consulting", label: "Consulting" },
  { value: "training", label: "Training" },
  { value: "logistics", label: "Logistics" },
  { value: "technical-support", label: "Technical Support" },
  { value: "design", label: "Design Services" },
  { value: "marketing", label: "Marketing" },
  { value: "business-development", label: "Business Development" },
  { value: "other", label: "Other" }
];

const educationOptions = [
  { value: "high-school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
  { value: "certification", label: "Professional Certification" },
  { value: "other", label: "Other" }
];

const experienceOptions = [
  { value: "0-1", label: "0-1 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-20", label: "11-20 years" },
  { value: "20+", label: "20+ years" }
];

const preferredRoleOptions = [
  { value: "consultant", label: "Consultant" },
  { value: "trainer", label: "Trainer" },
  { value: "mentor", label: "Mentor" },
  { value: "advisor", label: "Advisor" },
  { value: "facilitator", label: "Facilitator" },
  { value: "coach", label: "Coach" },
  { value: "other", label: "Other" }
];

const workedWithArtisansOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "limited", label: "Limited Experience" }
];

const engagementModeOptions = [
  { value: "one-time", label: "One-time Projects" },
  { value: "ongoing", label: "Ongoing Support" },
  { value: "workshops", label: "Workshops & Training" },
  { value: "consultation", label: "Consultation Sessions" },
  { value: "mentorship", label: "Mentorship Programs" },
  { value: "other", label: "Other" }
];

const sustainabilityOptions = [
  { value: "high", label: "High Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "low", label: "Low Priority" },
  { value: "not-considered", label: "Not Considered" }
];

const certificationOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "applying", label: "Applying for" }
];

export default function ServiceProviderRegistrationForm({ onBack }: { onBack?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceProviderFormData>({
    resolver: zodResolver(serviceProviderSchema),
  });

  const onSubmit = (data: any) => {
    // handle form submission
    console.log("Service Provider registration data:", data);
    alert("Service Provider registration submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-h-[80vh] overflow-y-auto">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Basic Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">Service Provider Name *</Label>
          <Input id="name" placeholder="Your name or company name" {...register("name")} />
          {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
        </div>

        <FormSelect
          name="serviceType"
          label="Type of Service"
          options={serviceTypeOptions}
          register={register}
          errors={errors}
          placeholder="Select service type"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="story">Service Provider Story *</Label>
          <Textarea 
            id="story" 
            placeholder="Tell us about your interests, practice, and how you can help artisans..." 
            rows={4}
            {...register("story")} 
          />
          {errors.story && <span className="text-sm text-red-500">{errors.story.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">City/Town/Village *</Label>
            <Input id="location" placeholder="Your current location" {...register("location")} />
            {errors.location && <span className="text-sm text-red-500">{errors.location.message}</span>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" placeholder="Your state" {...register("state")} />
            {errors.state && <span className="text-sm text-red-500">{errors.state.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" placeholder="Your contact number" {...register("phone")} />
            {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email ID *</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" {...register("email")} />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>
        </div>
      </div>

      {/* Education & Experience Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Education & Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            name="education"
            label="Education/Qualifications"
            options={educationOptions}
            register={register}
            errors={errors}
            placeholder="Select qualification"
            required
          />
          
          <FormSelect
            name="experience"
            label="Years of Experience"
            options={experienceOptions}
            register={register}
            errors={errors}
            placeholder="Select experience"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization/Discipline *</Label>
          <Input id="specialization" placeholder="Your area of specialization" {...register("specialization")} />
          {errors.specialization && <span className="text-sm text-red-500">{errors.specialization.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="focusArea">Focus Area / Key Strengths *</Label>
          <Textarea 
            id="focusArea" 
            placeholder="Describe your key strengths and focus areas..." 
            rows={4}
            {...register("focusArea")} 
          />
          {errors.focusArea && <span className="text-sm text-red-500">{errors.focusArea.message}</span>}
        </div>

        <FormSelect
          name="preferredRole"
          label="Preferred Role"
          options={preferredRoleOptions}
          register={register}
          errors={errors}
          placeholder="Select preferred role"
          required
        />
      </div>

      {/* Portfolio & Social Media Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Portfolio & Social Media</h3>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Projects</Label>
          <Textarea 
            id="portfolio" 
            placeholder="Upload images and/or PDFs, or provide links to your portfolio..." 
            rows={4}
            {...register("portfolio")} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="socialLinks">Social Media Links</Label>
          <Input id="socialLinks" placeholder="Instagram, Pinterest, LinkedIn, E-commerce platforms, etc." {...register("socialLinks")} />
        </div>
      </div>

      {/* Collaboration & Preferences Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Collaboration & Preferences</h3>
        
        <FormSelect
          name="workedWithArtisans"
          label="Worked with Artisans"
          options={workedWithArtisansOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <FormSelect
          name="engagementMode"
          label="Preferred Mode of Engagement"
          options={engagementModeOptions}
          register={register}
          errors={errors}
          placeholder="Select mode"
          required
        />

        <FormSelect
          name="sustainability"
          label="Sustainability Practices"
          options={sustainabilityOptions}
          register={register}
          errors={errors}
          placeholder="Select sustainability level"
          required
        />
      </div>

      {/* Certifications & Awards Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Certifications & Awards</h3>
        
        <FormSelect
          name="certification"
          label="Certification/Awards"
          options={certificationOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="certificationsReceived">Which certificates/awards did you receive?</Label>
          <Textarea 
            id="certificationsReceived" 
            placeholder="List your certificates and awards (Optional)" 
            rows={3}
            {...register("certificationsReceived")} 
          />
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Ratings & Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ratingsSystem">Ratings System</Label>
            <Input id="ratingsSystem" placeholder="TBD (Optional)" {...register("ratingsSystem")} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="peersReviews">Peers Reviews</Label>
            <Input id="peersReviews" placeholder="TBD (Optional)" {...register("peersReviews")} />
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Subscription</h3>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="subscribeToUpdates"
            {...register("subscribeToUpdates")}
            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            defaultChecked
          />
          <label htmlFor="subscribeToUpdates" className="text-sm text-gray-700">
            Subscribe to updates on new catalog uploads, new members, etc.
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
            Back
          </Button>
        )}
        <Button type="submit" className="w-full sm:flex-1">
          Register as Service Provider
        </Button>
      </div>
    </form>
  );
}