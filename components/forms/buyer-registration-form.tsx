import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormSelect } from "@/components/ui/form-select";
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
  subscribeToUpdates: z.boolean()
});

type BuyerFormData = z.infer<typeof buyerSchema>;

// Form options data
const profileTypeOptions = [
  { value: "retailer", label: "Retailer" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "distributor", label: "Distributor" },
  { value: "exporter", label: "Exporter" },
  { value: "individual", label: "Individual Buyer" },
  { value: "organization", label: "Organization" }
];

const primaryInterestOptions = [
  { value: "buying", label: "Buying" },
  { value: "funding", label: "Funding" },
  { value: "selecting", label: "Selecting" },
  { value: "aggregating", label: "Aggregating" },
  { value: "donating", label: "Donating" },
  { value: "gifting", label: "Gifting" },
  { value: "exporting", label: "Exporting" },
  { value: "discovering", label: "Discovering" },
  { value: "other", label: "Other" }
];

const craftsInterestedOptions = [
  { value: "pottery", label: "Pottery" },
  { value: "metalwork", label: "Metalwork" },
  { value: "glasswork", label: "Glasswork" },
  { value: "sculpture", label: "Sculpture" },
  { value: "textiles", label: "Textiles" },
  { value: "jewelry", label: "Jewelry" },
  { value: "basketry", label: "Basketry" },
  { value: "woodwork", label: "Woodwork" },
  { value: "leatherwork", label: "Leatherwork" },
  { value: "painting", label: "Painting" },
  { value: "other", label: "Other" }
];

const productsInterestedOptions = [
  { value: "jewelry", label: "Jewelry" },
  { value: "home-decor", label: "Home Decor" },
  { value: "furniture", label: "Furniture" },
  { value: "collectibles", label: "Collectibles" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "kitchenware", label: "Kitchenware" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "art", label: "Art" },
  { value: "gifts", label: "Gifts" },
  { value: "other", label: "Other" }
];

const moqOptions = [
  { value: "1-10", label: "1-10 pieces" },
  { value: "11-50", label: "11-50 pieces" },
  { value: "51-100", label: "51-100 pieces" },
  { value: "101-500", label: "101-500 pieces" },
  { value: "500+", label: "500+ pieces" },
  { value: "custom", label: "Custom" }
];

const offlinePresenceOptions = [
  { value: "physical-store", label: "Physical Store" },
  { value: "market-stall", label: "Market Stall" },
  { value: "exhibition-booth", label: "Exhibition Booth" },
  { value: "online-only", label: "Online Only" },
  { value: "other", label: "Other" }
];

const collaborationOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "interested", label: "Interested" }
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

export default function BuyerRegistrationForm({ onBack }: { onBack?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
  });

  const onSubmit = (data: any) => {
    // handle form submission
    console.log("Buyer registration data:", data);
    alert("Buyer registration submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-h-[80vh] overflow-y-auto">
      {/* Basic Information Section */}
      <div className="space-y-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">1</span>
          </div>
          <h3 className="text-xl font-semibold text-amber-800">Basic Information</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Your name or business name" {...register("name")} />
          {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
        </div>

        <FormSelect
          name="profileType"
          label="Profile Type"
          options={profileTypeOptions}
          register={register}
          errors={errors}
          placeholder="Select profile type"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="introduction">Introduction/Profile *</Label>
          <Textarea 
            id="introduction" 
            placeholder="Tell us about yourself, your business, and your interests..." 
            rows={4}
            {...register("introduction")} 
          />
          {errors.introduction && <span className="text-sm text-red-500">{errors.introduction.message}</span>}
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

      {/* Location Information Section */}
      <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">2</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-800">Location Information</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">City/Town/Village *</Label>
          <Input id="location" placeholder="Your location" {...register("location")} />
          {errors.location && <span className="text-sm text-red-500">{errors.location.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="districtPincode">District/Pincode *</Label>
            <Input id="districtPincode" placeholder="District and pincode" {...register("districtPincode")} />
            {errors.districtPincode && <span className="text-sm text-red-500">{errors.districtPincode.message}</span>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" placeholder="Your state" {...register("state")} />
            {errors.state && <span className="text-sm text-red-500">{errors.state.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gst">GST Number</Label>
          <Input id="gst" placeholder="If applicable (Optional)" {...register("gst")} />
        </div>
      </div>

      {/* Interests & Preferences Section */}
      <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">3</span>
          </div>
          <h3 className="text-xl font-semibold text-green-800">Interests & Preferences</h3>
        </div>
        
        <CheckboxGroup
          name="primaryInterest"
          label="Primary Interest"
          options={primaryInterestOptions}
          register={register}
          errors={errors}
          columns={3}
          required
        />

        <CheckboxGroup
          name="craftsInterested"
          label="Crafts Interested In"
          options={craftsInterestedOptions}
          register={register}
          errors={errors}
          columns={3}
          required
        />

        <CheckboxGroup
          name="productsInterested"
          label="Products Interested In"
          options={productsInterestedOptions}
          register={register}
          errors={errors}
          columns={3}
          required
        />

        <FormSelect
          name="moq"
          label="MOQ (Minimum Order Quantity)"
          options={moqOptions}
          register={register}
          errors={errors}
          placeholder="Select MOQ range"
          required
        />
      </div>

      {/* Online & Offline Presence Section */}
      <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">4</span>
          </div>
          <h3 className="text-xl font-semibold text-purple-800">Online & Offline Presence</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="socialLinks">Social Media Links</Label>
          <Input id="socialLinks" placeholder="Instagram, Pinterest, LinkedIn, Website, E-commerce platforms, etc." {...register("socialLinks")} />
        </div>

        <FormSelect
          name="offlinePresence"
          label="Offline Presence"
          options={offlinePresenceOptions}
          register={register}
          errors={errors}
          placeholder="Select offline presence"
          required
        />
      </div>

      {/* Collaboration & Practices Section */}
      <div className="space-y-6 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">5</span>
          </div>
          <h3 className="text-xl font-semibold text-teal-800">Collaboration & Practices</h3>
        </div>
        
        <FormSelect
          name="collaboration"
          label="Collaboration with Designers"
          options={collaborationOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
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
      <div className="space-y-6 p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">6</span>
          </div>
          <h3 className="text-xl font-semibold text-rose-800">Certifications & Awards</h3>
        </div>
        
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
      <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">7</span>
          </div>
          <h3 className="text-xl font-semibold text-indigo-800">Ratings & Reviews</h3>
        </div>
        
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
      <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">8</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Subscription</h3>
        </div>
        
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
      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto hover:bg-gray-50 transition-all duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
        )}
        <Button type="submit" className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Register as Buyer
        </Button>
      </div>
    </form>
  );
}
