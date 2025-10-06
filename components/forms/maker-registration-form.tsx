
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

const makerSchema = z.object({
  // Basic Information
  brandName: z.string().min(1, "Brand/Logo Name is required"),
  makerName: z.string().min(1, "Maker/Organization Name is required"),
  makerStory: z.string().min(1, "Maker Story is required"),
  makerProfile: z.string().min(1, "Maker Profile is required"),
  makerCardNumber: z.string().optional(),
  gender: z.enum(["he", "she", "they", "none"], {
    required_error: "Gender is required"
  }),
  yearsExperience: z.string().min(1, "Years of Experience is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  email: z.string().email("Invalid email address"),
  msmeNumber: z.string().optional(),
  registrationDate: z.string().min(1, "Registration Date is required"),
  orgContactNumber: z.string().optional(),
  orgEmail: z.string().optional(),

  // Location Information
  city: z.string().min(1, "City/Town/Village is required"),
  districtPincode: z.string().min(1, "District/Pincode is required"),
  state: z.string().min(1, "State is required"),

  // Craft Details
  craftType: z.string().min(1, "Craft Type is required"),
  craftStory: z.string().min(1, "Craft Story is required"),
  processTechnique: z.string().min(1, "Process/Technique is required"),
  craftTools: z.string().min(1, "Craft Associated Tools is required"),
  uspInnovation: z.string().min(1, "USP/Innovation is required"),

  // Scale & Capacity
  activeMakers: z.string().min(1, "Total Number of Active Makers is required"),
  genderRatio: z.string().min(1, "Ratio of Female:Male Makers is required"),
  languagesKnown: z.string().min(1, "Languages Known is required"),

  // Production Details
  videos: z.string().optional(),
  rawMaterials: z.string().min(1, "Raw Materials Used is required"),
  catalogue: z.string().optional(),
  productsRange: z.string().min(1, "Products Range is required"),
  productionCapacity: z.string().min(1, "Production Capacity per Month is required"),

  // Business Information
  gstNumber: z.string().optional(),
  photos: z.string().optional(),
  socialMediaLinks: z.string().optional(),
  websiteLink: z.string().optional(),
  offlinePresence: z.string().min(1, "Artisan's Offline Presence is required"),

  // Services & Collaboration
  exhibitSpaces: z.string().optional(),
  conductWorkshops: z.string().min(1, "Do you conduct workshops is required"),
  collaborationDesigners: z.string().min(1, "Collaboration with Designers is required"),
  insurance: z.string().min(1, "Insurance is required"),
  certifications: z.string().min(1, "Certifications/Awards is required"),
  certificatesReceived: z.string().optional(),

  // Additional Information
  sustainabilityPractices: z.string().optional(),
  ratingsSystem: z.string().optional(),
  peersReviews: z.string().optional(),

  // Subscription
  subscribeToUpdates: z.boolean().default(true)
});

type MakerFormData = z.infer<typeof makerSchema>;

// Form options data
const genderOptions = [
  { value: "he", label: "He" },
  { value: "she", label: "She" },
  { value: "they", label: "They" },
  { value: "none", label: "None" }
];

const makerProfileOptions = [
  { value: "individual", label: "Individual Artisan" },
  { value: "cooperative", label: "Cooperative" },
  { value: "organization", label: "Organization" },
  { value: "enterprise", label: "Enterprise" }
];

const experienceOptions = [
  { value: "0-1", label: "0-1 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-20", label: "11-20 years" },
  { value: "20+", label: "20+ years" }
];

const activeMakersOptions = [
  { value: "1-5", label: "1-5 makers" },
  { value: "6-10", label: "6-10 makers" },
  { value: "11-25", label: "11-25 makers" },
  { value: "26-50", label: "26-50 makers" },
  { value: "50+", label: "50+ makers" }
];

const productionCapacityOptions = [
  { value: "1-10", label: "1-10 pieces/month" },
  { value: "11-50", label: "11-50 pieces/month" },
  { value: "51-100", label: "51-100 pieces/month" },
  { value: "101-500", label: "101-500 pieces/month" },
  { value: "500+", label: "500+ pieces/month" }
];

const offlinePresenceOptions = [
  { value: "physical-store", label: "Physical Store" },
  { value: "market-stall", label: "Market Stall" },
  { value: "exhibition-booth", label: "Exhibition Booth" },
  { value: "online-only", label: "Online Only" },
  { value: "other", label: "Other" }
];

const workshopOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "planning", label: "Planning to conduct" }
];

const collaborationOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "interested", label: "Interested" }
];

const insuranceOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "planning", label: "Planning to get" }
];

const certificationOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "applying", label: "Applying for" }
];

export default function MakerRegistrationForm({ onBack }: { onBack?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakerFormData>({
    resolver: zodResolver(makerSchema),
  });

  const onSubmit = (data: MakerFormData) => {
    // handle form submission
    console.log("Maker registration data:", data);
    alert("Maker registration submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-h-[80vh] overflow-y-auto">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand/Logo Name *</Label>
            <Input id="brandName" placeholder="Your brand name" {...register("brandName")} />
            {errors.brandName && <span className="text-sm text-red-500">{errors.brandName.message}</span>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="makerName">Maker/Organization Name *</Label>
            <Input id="makerName" placeholder="Your name or organization" {...register("makerName")} />
            {errors.makerName && <span className="text-sm text-red-500">{errors.makerName.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="makerStory">Maker Story *</Label>
          <Textarea 
            id="makerStory" 
            placeholder="Tell us about your journey as a maker..." 
            rows={4}
            {...register("makerStory")} 
          />
          {errors.makerStory && <span className="text-sm text-red-500">{errors.makerStory.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            name="makerProfile"
            label="Maker Profile"
            options={makerProfileOptions}
            register={register}
            errors={errors}
            placeholder="Select your profile"
            required
          />
          
          <div className="space-y-2">
            <Label htmlFor="makerCardNumber">Maker Card Number</Label>
            <Input id="makerCardNumber" placeholder="Optional" {...register("makerCardNumber")} />
          </div>
        </div>

        <RadioGroup
          name="gender"
          label="Gender"
          options={genderOptions}
          register={register}
          errors={errors}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            name="yearsExperience"
            label="Years of Experience"
            options={experienceOptions}
            register={register}
            errors={errors}
            placeholder="Select experience"
            required
          />
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input id="contactNumber" placeholder="Your contact number" {...register("contactNumber")} />
            {errors.contactNumber && <span className="text-sm text-red-500">{errors.contactNumber.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email ID *</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" {...register("email")} />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="msmeNumber">MSME Registration Number</Label>
            <Input id="msmeNumber" placeholder="Optional" {...register("msmeNumber")} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="registrationDate">Registration Date (Year) *</Label>
            <Input id="registrationDate" placeholder="e.g., 1990, 1991..." {...register("registrationDate")} />
            {errors.registrationDate && <span className="text-sm text-red-500">{errors.registrationDate.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orgContactNumber">Organization Contact Number</Label>
            <Input id="orgContactNumber" placeholder="Optional" {...register("orgContactNumber")} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgEmail">Organization Email ID</Label>
            <Input id="orgEmail" type="email" placeholder="Optional" {...register("orgEmail")} />
          </div>
        </div>
      </div>

      {/* Location Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Location Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="city">City/Town/Village *</Label>
          <Input id="city" placeholder="Your location" {...register("city")} />
          {errors.city && <span className="text-sm text-red-500">{errors.city.message}</span>}
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
      </div>

      {/* Craft Details Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Craft Details</h3>
        
        <div className="space-y-2">
          <Label htmlFor="craftType">Craft Type *</Label>
          <Input id="craftType" placeholder="e.g., Pottery, Weaving, Metalwork..." {...register("craftType")} />
          {errors.craftType && <span className="text-sm text-red-500">{errors.craftType.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="craftStory">Craft Story *</Label>
          <Textarea 
            id="craftStory" 
            placeholder="Tell us about your craft and its significance..." 
            rows={4}
            {...register("craftStory")} 
          />
          {errors.craftStory && <span className="text-sm text-red-500">{errors.craftStory.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="processTechnique">Process/Technique *</Label>
          <Textarea 
            id="processTechnique" 
            placeholder="Describe your process and techniques..." 
            rows={4}
            {...register("processTechnique")} 
          />
          {errors.processTechnique && <span className="text-sm text-red-500">{errors.processTechnique.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="craftTools">Craft Associated Tools *</Label>
          <Textarea 
            id="craftTools" 
            placeholder="List the tools you use in your craft..." 
            rows={3}
            {...register("craftTools")} 
          />
          {errors.craftTools && <span className="text-sm text-red-500">{errors.craftTools.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="uspInnovation">USP/Innovation *</Label>
          <Textarea 
            id="uspInnovation" 
            placeholder="What makes your craft unique? Any innovations?" 
            rows={3}
            {...register("uspInnovation")} 
          />
          {errors.uspInnovation && <span className="text-sm text-red-500">{errors.uspInnovation.message}</span>}
        </div>
      </div>

      {/* Scale & Capacity Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Scale & Capacity</h3>
        
        <Select
          name="activeMakers"
          label="Total Number of Active Makers"
          options={activeMakersOptions}
          register={register}
          errors={errors}
          placeholder="Select range"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="genderRatio">Ratio of Female:Male Makers *</Label>
          <Input id="genderRatio" placeholder="e.g., 60:40, 50:50" {...register("genderRatio")} />
          {errors.genderRatio && <span className="text-sm text-red-500">{errors.genderRatio.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="languagesKnown">Languages Known *</Label>
          <Input id="languagesKnown" placeholder="e.g., Hindi, Marathi, Kannada, English..." {...register("languagesKnown")} />
          {errors.languagesKnown && <span className="text-sm text-red-500">{errors.languagesKnown.message}</span>}
        </div>
      </div>

      {/* Production Details Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Production Details</h3>
        
        <FileUpload
          name="videos"
          label="Videos of Maker/Craft"
          register={register}
          errors={errors}
          placeholder="Upload or provide links (Optional)"
          accept="video/*"
        />

        <div className="space-y-2">
          <Label htmlFor="rawMaterials">Raw Materials Used *</Label>
          <Textarea 
            id="rawMaterials" 
            placeholder="List the materials you use..." 
            rows={3}
            {...register("rawMaterials")} 
          />
          {errors.rawMaterials && <span className="text-sm text-red-500">{errors.rawMaterials.message}</span>}
        </div>

        <FileUpload
          name="catalogue"
          label="Catalogue/Portfolio"
          register={register}
          errors={errors}
          placeholder="Upload or provide links (Optional)"
          accept=".pdf,.doc,.docx,image/*"
        />

        <div className="space-y-2">
          <Label htmlFor="productsRange">Products Range *</Label>
          <Textarea 
            id="productsRange" 
            placeholder="Describe your product range..." 
            rows={3}
            {...register("productsRange")} 
          />
          {errors.productsRange && <span className="text-sm text-red-500">{errors.productsRange.message}</span>}
        </div>

        <Select
          name="productionCapacity"
          label="Production Capacity per Month"
          options={productionCapacityOptions}
          register={register}
          errors={errors}
          placeholder="Select capacity"
          required
        />
      </div>

      {/* Business Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Business Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input id="gstNumber" placeholder="Optional" {...register("gstNumber")} />
          </div>
          
          <FileUpload
            name="photos"
            label="Photos of Artisan"
            register={register}
            errors={errors}
            placeholder="Upload photos (Optional)"
            accept="image/*"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="socialMediaLinks">Social Media Links</Label>
          <Input id="socialMediaLinks" placeholder="Instagram, Pinterest, LinkedIn, E-commerce platforms, etc." {...register("socialMediaLinks")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteLink">Artisan's Website Link</Label>
          <Input id="websiteLink" placeholder="https://your-website.com (Optional)" {...register("websiteLink")} />
        </div>

        <Select
          name="offlinePresence"
          label="Artisan's Offline Presence"
          options={offlinePresenceOptions}
          register={register}
          errors={errors}
          placeholder="Select presence type"
          required
        />
      </div>

      {/* Services & Collaboration Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Services & Collaboration</h3>
        
        <div className="space-y-2">
          <Label htmlFor="exhibitSpaces">Exhibit/Display Spaces</Label>
          <Textarea 
            id="exhibitSpaces" 
            placeholder="Which spaces do you exhibit/display at? (Optional)" 
            rows={3}
            {...register("exhibitSpaces")} 
          />
        </div>

        <Select
          name="conductWorkshops"
          label="Do you conduct workshops?"
          options={workshopOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <Select
          name="collaborationDesigners"
          label="Collaboration with Designers"
          options={collaborationOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <Select
          name="insurance"
          label="Insurance"
          options={insuranceOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <Select
          name="certifications"
          label="Certifications/Awards"
          options={certificationOptions}
          register={register}
          errors={errors}
          placeholder="Select option"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="certificatesReceived">Which certificates/awards did you receive?</Label>
          <Textarea 
            id="certificatesReceived" 
            placeholder="List your certificates and awards (Optional)" 
            rows={3}
            {...register("certificatesReceived")} 
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-600">Additional Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="sustainabilityPractices">Sustainability Practices</Label>
          <Textarea 
            id="sustainabilityPractices" 
            placeholder="Describe your sustainability practices (Optional)" 
            rows={3}
            {...register("sustainabilityPractices")} 
          />
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
            Subscribe to updates on new image uploads, new catalog uploads, etc.
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
          Register as Maker
        </Button>
      </div>
    </form>
  );
}
