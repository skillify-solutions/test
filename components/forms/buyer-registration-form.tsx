import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

const buyerSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Name is required"),
  profileType: z.string().min(1, "Profile Type is required"),
  introduction: z.string().min(1, "Introduction/Profile is required"),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),

  // Location Information
  location: z.string().min(1, "City/Town/Village is required"),
  districtPincode: z.string().min(1, "District/Pincode is required"),
  state: z.string().min(1, "State is required"),
  gst: z.string().optional(),

  // Interests & Preferences
  primaryInterest: z.array(z.string()).min(1, "Select at least one primary interest"),
  craftsInterested: z.array(z.string()).min(1, "Select at least one craft"),
  productsInterested: z.array(z.string()).min(1, "Select at least one product type"),
  moq: z.string().min(1, "MOQ is required"),

  // Online & Offline Presence
  socialLinks: z.string().optional(),
  offlinePresence: z.string().min(1, "Offline Presence is required"),

  // Collaboration & Practices
  collaboration: z.string().min(1, "Collaboration with Designers is required"),
  sustainability: z.string().min(1, "Sustainability Practices is required"),

  // Certifications & Awards
  certification: z.string().min(1, "Certification/Awards is required"),
  certificationsReceived: z.string().optional(),

  // Ratings & Reviews
  ratingsSystem: z.string().optional(),
  peersReviews: z.string().optional(),

  // Subscription
  subscribeToUpdates: z.boolean().default(true)
});

type BuyerFormData = z.infer<typeof buyerSchema>;

export default function BuyerRegistrationForm({ onBack }: { onBack?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
  });

  const onSubmit = (data: BuyerFormData) => {
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
        <Label htmlFor="profileType">Profile Type *</Label>
        <Input id="profileType" {...register("profileType")} />
        {errors.profileType && <span className="text-sm text-red-500">{errors.profileType.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="introduction">Introduction/Profile *</Label>
        <Textarea id="introduction" {...register("introduction")} />
        {errors.introduction && <span className="text-sm text-red-500">{errors.introduction.message}</span>}
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
        <Label htmlFor="location">City/Town/Village *</Label>
        <Input id="location" {...register("location")} />
        {errors.location && <span className="text-sm text-red-500">{errors.location.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="districtPincode">District/Pincode *</Label>
        <Input id="districtPincode" {...register("districtPincode")} />
        {errors.districtPincode && <span className="text-sm text-red-500">{errors.districtPincode.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="state">State *</Label>
        <Input id="state" {...register("state")} />
        {errors.state && <span className="text-sm text-red-500">{errors.state.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="gst">GST Number</Label>
        <Input id="gst" {...register("gst")} />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="primaryInterest">Primary Interest *</Label>
        <Input id="primaryInterest" {...register("primaryInterest")} />
        {errors.primaryInterest && <span className="text-sm text-red-500">{errors.primaryInterest.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="craftsInterested">Crafts Interested In *</Label>
        <Input id="craftsInterested" {...register("craftsInterested")} />
        {errors.craftsInterested && <span className="text-sm text-red-500">{errors.craftsInterested.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="productsInterested">Products Interested In *</Label>
        <Input id="productsInterested" {...register("productsInterested")} />
        {errors.productsInterested && <span className="text-sm text-red-500">{errors.productsInterested.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="moq">MOQ *</Label>
        <Input id="moq" {...register("moq")} />
        {errors.moq && <span className="text-sm text-red-500">{errors.moq.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="socialLinks">Social Media Links</Label>
        <Input id="socialLinks" {...register("socialLinks")} />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="offlinePresence">Offline Presence *</Label>
        <Input id="offlinePresence" {...register("offlinePresence")} />
        {errors.offlinePresence && <span className="text-sm text-red-500">{errors.offlinePresence.message}</span>}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="collaboration">Collaboration with Designers *</Label>
        <Input id="collaboration" {...register("collaboration")} />
        {errors.collaboration && <span className="text-sm text-red-500">{errors.collaboration.message}</span>}
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
        <Button type="submit" className="w-full sm:flex-1">Register as Buyer</Button>
      </div>
    </form>
  );
}
