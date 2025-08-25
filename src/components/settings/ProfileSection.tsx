import React, { useState } from 'react';
import Button from '../ui/Button';
import { UserIcon, LinkIcon, BuildingIcon, MailIcon, CheckIcon, XIcon } from 'lucide-react';
interface ProfileProps {
  name: string;
  email: string;
  company: string;
  linkedin: string;
  website: string;
  profileImage: string | null;
}
interface ProfileSectionProps {
  profile: ProfileProps;
  onProfileUpdate: (profile: ProfileProps) => void;
}
const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onProfileUpdate
}) => {
  const [formData, setFormData] = useState<ProfileProps>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onProfileUpdate(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 800);
  };
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
        {!isEditing && <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>}
      </div>
      {successMessage && <div className="mb-4 bg-success bg-opacity-10 text-success px-4 py-3 rounded-lg flex items-center">
          <CheckIcon className="w-5 h-5 mr-2" />
          {successMessage}
        </div>}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {!isEditing ?
        // View mode
        <>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-4">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{profile.name}</h3>
                  <p className="text-gray-500 text-sm">{profile.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Company</p>
                  <div className="flex items-center">
                    <BuildingIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{profile.company}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Website</p>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{profile.website}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{profile.linkedin}</p>
                  </div>
                </div>
              </div>
            </> :
        // Edit mode
        <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your full name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your company name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="yourcompany.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="linkedin.com/in/yourprofile" />
                  </div>
                </div>
              </div>
            </>}
        </div>
        {isEditing && <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCancel} icon={<XIcon className="w-4 h-4" />}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} icon={isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : <CheckIcon className="w-4 h-4" />}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>}
      </form>
    </div>;
};
export default ProfileSection;