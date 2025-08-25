import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ArrowLeftIcon, BuildingIcon, UsersIcon, StarIcon, CheckCircleIcon, PhoneIcon, MailIcon, LinkedinIcon, ExternalLinkIcon, XIcon, CheckIcon, LoaderIcon, ShieldCheckIcon } from 'lucide-react';
// Mock audience details
const mockAudience = {
  id: 1,
  name: 'London Estate Agencies - Repair Issues',
  companyCount: 50,
  contactCount: 48,
  lastUpdated: '2023-06-15',
  description: 'Estate agencies in London with poor tenant reviews about repairs'
};
// Generate 50 mock companies
const generateMockCompanies = () => {
  const londonAreas = ['Canary Wharf', 'Camden', 'Kensington', 'Chelsea', 'Islington', 'Hampstead', 'Fulham', 'Westminster', 'Shoreditch', 'Mayfair', 'Notting Hill', 'Battersea', 'Richmond', 'Greenwich', 'Wimbledon', 'Clapham', 'Hackney', 'Brixton', 'Hammersmith', 'Chiswick'];
  const companyPrefixes = ['Prime', 'Central', 'Thames', 'London', 'Royal', 'Capital', 'Urban', 'City', 'Metro', 'Elite', 'Premier', 'Crown', 'Regent', 'Prestige', 'Imperial', 'Sovereign', 'Apex', 'Summit', 'Heritage', 'Landmark'];
  const companySuffixes = ['Properties', 'Estates', 'Lettings', 'Realty', 'Homes', 'Property Management', 'Living', 'Residences', 'Housing', 'Real Estate', 'Accommodations', 'Property Services', 'Residential', 'Letting Agents', 'Property Solutions'];
  const repairIssues = ["Recent Google reviews mention 'maintenance requests ignored for weeks' and 'poor repair response times'", "Trustpilot reviews highlight 'emergency repairs not addressed promptly' across multiple properties", "Multiple tenant complaints about 'broken heating left unfixed for months' and poor maintenance coordination", "Negative reviews citing 'water leaks unresolved for days' causing property damage", "Tenant feedback mentions 'no response to urgent maintenance calls' on weekends", "Social media comments show pattern of 'delayed responses to critical repairs'", 'Google reviews show 1-star ratings specifically mentioning maintenance issues', "Recent complaints about 'mold problems ignored' despite multiple tenant reports", "Property forums mention this agency's 'poor contractor management' for repairs", 'Trustpilot shows declining ratings over 6 months specifically for maintenance responsiveness', "Recent news article mentioned tenant dispute over 'long-standing repair issues'", "Multiple reviews mention 'having to call repeatedly' to get maintenance attention", "Tenant association report highlights this agency for 'maintenance response failures'", "Online complaints about 'emergency call system that never connects to anyone'", "Reviews mention 'promised repairs that never happened' across multiple properties"];
  const companies = [];
  for (let i = 1; i <= 50; i++) {
    const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
    const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
    const area = londonAreas[Math.floor(Math.random() * londonAreas.length)];
    let name = '';
    // Occasionally use area in the name
    if (Math.random() > 0.5) {
      name = `${prefix} ${area} ${suffix}`;
    } else {
      name = `${prefix} ${suffix}`;
    }
    // Ensure no duplicate names
    if (companies.some(c => c.name === name)) {
      i--;
      continue;
    }
    const matchScore = Math.floor(Math.random() * 21) + 75;
    const reasonIndex = Math.floor(Math.random() * repairIssues.length);
    companies.push({
      id: i,
      name,
      industry: 'Estate Agency',
      location: 'London, UK',
      matchScore,
      reason: repairIssues[reasonIndex]
    });
  }
  // Sort by match score descending
  return companies.sort((a, b) => b.matchScore - a.matchScore);
};
// Generate mock contacts for companies
const generateMockContacts = companies => {
  const firstNames = ['Sarah', 'David', 'Emma', 'James', 'Olivia', 'Michael', 'Sophia', 'Daniel', 'Charlotte', 'Alexander', 'Elizabeth', 'William', 'Amelia', 'Benjamin', 'Isabella', 'Henry', 'Victoria', 'Thomas', 'Grace', 'Robert', 'Zoe', 'Richard', 'Natalie', 'John'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Taylor', 'Clark', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White', 'Harris', 'Martin', 'Jackson', 'Thompson', 'Evans', 'Young', 'Allen', 'King', 'Lee', 'Chen'];
  const titles = ['Operations Director', 'Head of Operations', 'Regional Manager', 'Property Manager', 'Lettings Director', 'Maintenance Coordinator', 'Head of Property Management', 'Managing Director', 'Branch Manager', 'Senior Property Manager', 'Director of Lettings', 'Chief Operations Officer', 'Residential Manager', 'Head of Residential Lettings'];
  const contacts = [];
  // Select companies that will have contacts (all except 2 random ones)
  const companiesWithContacts = [...companies];
  companiesWithContacts.splice(Math.floor(Math.random() * companiesWithContacts.length), 1);
  companiesWithContacts.splice(Math.floor(Math.random() * companiesWithContacts.length), 1);
  companiesWithContacts.forEach(company => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    // Create email from name and company
    const companyDomain = company.name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/properties|estates|lettings|realty|homes|propertymanagement|living|residences|housing|realestate|accommodations|propertyservices|residential|lettingagents|propertysolutions/g, '') + '.co.uk';
    const email = `${firstName[0].toLowerCase()}.${lastName.toLowerCase()}@${companyDomain}`;
    contacts.push({
      id: company.id,
      companyId: company.id,
      name: `${firstName} ${lastName}`,
      title,
      company: company.name,
      industry: company.industry,
      location: company.location,
      matchScore: company.matchScore,
      reason: company.reason,
      email
    });
  });
  return contacts;
};
const mockCompanies = generateMockCompanies();
const mockContacts = generateMockContacts(mockCompanies);
const AudienceDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('companies'); // 'companies' or 'contacts'
  const [rejectedCompanyIds, setRejectedCompanyIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  // Filter companies based on rejection status
  const filteredCompanies = mockCompanies.filter(company => !rejectedCompanyIds.includes(company.id));
  // Filter contacts to only show those from non-rejected companies
  const filteredContacts = mockContacts.filter(contact => !rejectedCompanyIds.includes(contact.companyId));
  const handleRejectCompany = (companyId: number) => {
    if (rejectedCompanyIds.includes(companyId)) {
      setRejectedCompanyIds(prev => prev.filter(id => id !== companyId));
    } else {
      setRejectedCompanyIds(prev => [...prev, companyId]);
    }
  };
  const handleFindContacts = () => {
    setIsLoading(true);
    // Simulate loading steps
    const loadingInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < 2) {
          return prev + 1;
        } else {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setIsLoading(false);
            setViewMode('contacts');
          }, 500);
          return prev;
        }
      });
    }, 1000);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <button className="flex items-center text-gray-500 hover:text-gray-700 mb-4" onClick={() => navigate('/audiences')}>
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Audiences
              </button>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {mockAudience.name}
                  </h1>
                  <p className="text-gray-500">{mockAudience.description}</p>
                </div>
                {viewMode === 'companies' && <Button onClick={handleFindContacts} disabled={filteredCompanies.length === 0}>
                    Find contacts
                  </Button>}
                {viewMode === 'contacts' && <Button onClick={() => navigate('/email-configuration')}>
                    Configure Emails
                  </Button>}
              </div>
            </div>

            {/* Audience Stats */}
            <Card className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                    <BuildingIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Companies</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {viewMode === 'companies' ? mockAudience.companyCount : filteredContacts.length}
                    </p>
                  </div>
                </div>
                {viewMode === 'contacts' && <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                      <UsersIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Contacts Found</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {filteredContacts.length}
                      </p>
                    </div>
                  </div>}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                    <StarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">
                      Average Match Quality
                    </p>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                  </div>
                </div>
                {viewMode === 'contacts' && <div className="flex items-center">
                    <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                      <ShieldCheckIcon className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">
                        Verification Status
                      </p>
                      <div className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-success mr-1" />
                        <p className="text-lg font-medium text-success">
                          All emails verified
                        </p>
                      </div>
                    </div>
                  </div>}
              </div>
            </Card>

            {/* Loading State */}
            {isLoading && <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 relative mb-4">
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {loadingStep === 0 && 'Finding contact details...'}
                  {loadingStep === 1 && 'Searching company databases...'}
                  {loadingStep === 2 && 'Verifying email addresses...'}
                </h3>
                <p className="text-gray-500">This may take a few moments</p>
              </div>}

            {/* Companies View */}
            {!isLoading && viewMode === 'companies' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCompanies.map(company => <Card key={company.id} className={`overflow-hidden transition-opacity duration-200 ${rejectedCompanyIds.includes(company.id) ? 'opacity-50' : ''}`}>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {company.name}
                          </h3>
                          <Badge variant={company.matchScore >= 90 ? 'primary' : company.matchScore >= 85 ? 'primary' : 'primary'} size="sm">
                            Match: {company.matchScore}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                          <div>
                            <span className="text-gray-500">Industry:</span>{' '}
                            {company.industry}
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span>{' '}
                            {company.location}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-sm">
                            <span className="font-medium">Why this fits:</span>{' '}
                            {company.reason}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" fullWidth onClick={() => handleRejectCompany(company.id)} icon={rejectedCompanyIds.includes(company.id) ? <CheckIcon className="w-4 h-4 mr-1" /> : <XIcon className="w-4 h-4 mr-1" />} className={rejectedCompanyIds.includes(company.id) ? 'border-success text-success hover:bg-success hover:bg-opacity-5' : ''}>
                        {rejectedCompanyIds.includes(company.id) ? 'Undo' : 'Reject'}
                      </Button>
                    </div>
                  </Card>)}
              </div>}

            {/* Contacts View */}
            {!isLoading && viewMode === 'contacts' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map(contact => <Card key={contact.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {contact.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">
                            {contact.title}
                          </p>
                          <div className="flex items-center">
                            <Badge variant={contact.matchScore >= 90 ? 'success' : contact.matchScore >= 85 ? 'primary' : 'default'} size="sm">
                              Match: {contact.matchScore}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {contact.company}
                        </p>
                        <div className="flex flex-wrap text-xs text-gray-500 gap-2 mb-2">
                          <span>{contact.location}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center text-sm mb-2">
                          <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-mono text-gray-600">
                            {contact.email}
                          </span>
                          <Badge variant="success" size="sm" className="ml-2">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Why this lead:
                        </p>
                        <p className="text-xs text-gray-600">
                          {contact.reason}
                        </p>
                      </div>
                    </div>
                  </Card>)}
              </div>}

            {/* Empty State */}
            {!isLoading && viewMode === 'companies' && filteredCompanies.length === 0 && <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BuildingIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No companies available
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You've rejected all companies in this audience.
                  </p>
                  <Button variant="outline" onClick={() => setRejectedCompanyIds([])}>
                    Reset Rejections
                  </Button>
                </div>}

            {!isLoading && viewMode === 'contacts' && filteredContacts.length === 0 && <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UsersIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No contacts available
                  </h3>
                  <p className="text-gray-500 mb-6">
                    No contacts were found for the selected companies.
                  </p>
                  <Button variant="outline" onClick={() => setViewMode('companies')}>
                    Back to Companies
                  </Button>
                </div>}
          </div>
        </main>
      </div>
    </div>;
};
export default AudienceDetail;