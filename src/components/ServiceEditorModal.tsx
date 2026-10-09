import React, { useState, useEffect } from 'react';
import { SubService } from '../types';
import {
  getEditableServiceBySlug,
  updateEditableService,
  addEditableService,
  deleteEditableService,
  resetEditableServiceToDefault
} from '../data/editableServicesStore';
import {
  X,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ServiceEditorModalProps {
  serviceSlug?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (slug?: string) => void;
  initialCategory?: string;
}

export const ServiceEditorModal: React.FC<ServiceEditorModalProps> = ({
  serviceSlug,
  isOpen,
  onClose,
  onSaved,
  initialCategory
}) => {
  const isCreateMode = !serviceSlug;

  const [activeTab, setActiveTab] = useState<'general' | 'subservices' | 'benefits'>('general');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(initialCategory || 'Outdoor & Mural Media');
  const [heroTagline, setHeroTagline] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [suitableCampaigns, setSuitableCampaigns] = useState<string[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // New sub-service temporary fields
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');

  // New benefit / campaign temporary inputs
  const [newBenefit, setNewBenefit] = useState('');
  const [newCampaign, setNewCampaign] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (serviceSlug) {
      // Editing existing service
      const current = getEditableServiceBySlug(serviceSlug);
      if (current) {
        setTitle(current.title);
        setCategory(current.category);
        setHeroTagline(current.heroTagline);
        setShortDescription(current.shortDescription);
        setFullDescription(current.fullDescription);
        setSubServices(current.subServices || []);
        setBenefits(current.benefits || []);
        setSuitableCampaigns(current.suitableCampaigns || []);
      }
    } else {
      // Create new service mode
      setTitle('');
      setCategory(initialCategory || 'Outdoor & Mural Media');
      setHeroTagline('Unmatched Pan-India High-Visibility Advertising & Branding');
      setShortDescription('');
      setFullDescription('');
      setSubServices([
        { name: 'Core Execution Format', description: 'Precision execution across prime urban and rural locations' },
        { name: 'On-Ground Auditing', description: 'GPS timestamped photo reporting and municipal clearance' }
      ]);
      setBenefits([
        'High-density footfall and vehicular traffic reach',
        'Turnkey execution with complete site clearance and compliance',
        'Daily digital progress tracking with GPS photo proofs'
      ]);
      setSuitableCampaigns([
        'FMCG & Consumer Goods Launches',
        'BFSI, Fintech & Telecom Awareness',
        'National Brand Visibility Drives'
      ]);
    }

    setConfirmReset(false);
    setConfirmDelete(false);
  }, [isOpen, serviceSlug, initialCategory]);

  if (!isOpen) return null;

  // Sub-Service handlers
  const handleAddSubService = () => {
    if (!newSubName.trim()) return;
    setSubServices([
      ...subServices,
      {
        name: newSubName.trim(),
        description: newSubDesc.trim() || 'Custom advertising execution specification'
      }
    ]);
    setNewSubName('');
    setNewSubDesc('');
  };

  const handleRemoveSubService = (index: number) => {
    setSubServices(subServices.filter((_, i) => i !== index));
  };

  const handleUpdateSubService = (index: number, key: 'name' | 'description', value: string) => {
    const updated = [...subServices];
    updated[index] = { ...updated[index], [key]: value };
    setSubServices(updated);
  };

  // Benefit handlers
  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setBenefits([...benefits, newBenefit.trim()]);
    setNewBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  // Campaign type handlers
  const handleAddCampaign = () => {
    if (!newCampaign.trim()) return;
    setSuitableCampaigns([...suitableCampaigns, newCampaign.trim()]);
    setNewCampaign('');
  };

  const handleRemoveCampaign = (index: number) => {
    setSuitableCampaigns(suitableCampaigns.filter((_, i) => i !== index));
  };

  // Save Service
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isCreateMode) {
      // Create new service
      const created = addEditableService({
        title: title.trim(),
        category: category.trim(),
        heroTagline: heroTagline.trim() || 'Pan-India High-Impact Advertising Solution',
        shortDescription: shortDescription.trim() || `${title.trim()} execution across target tier-1, tier-2, and rural Indian markets.`,
        fullDescription: fullDescription.trim() || `${title.trim()} delivers maximum brand visibility and on-ground customer recall.`,
        subServices: subServices.length > 0 ? subServices : [
          { name: 'Turnkey Execution', description: 'End-to-end site sourcing, printing, and fabrication' }
        ],
        benefits: benefits.length > 0 ? benefits : [
          'High visual retention and multi-point consumer touchpoint coverage',
          'GPS-verified digital proof of performance'
        ],
        suitableCampaigns: suitableCampaigns.length > 0 ? suitableCampaigns : [
          'Pan-India Brand Awareness',
          'Rural & Urban Product Launch Campaigns'
        ]
      });

      if (onSaved) onSaved(created.slug);
      onClose();
    } else if (serviceSlug) {
      // Update existing service
      updateEditableService(serviceSlug, {
        title: title.trim(),
        category: category.trim(),
        heroTagline: heroTagline.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        subServices,
        benefits,
        suitableCampaigns
      });

      if (onSaved) onSaved(serviceSlug);
      onClose();
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (!serviceSlug) return;
    resetEditableServiceToDefault(serviceSlug);
    setConfirmReset(false);
    if (onSaved) onSaved(serviceSlug);
    onClose();
  };

  // Delete service
  const handleDeleteService = () => {
    if (!serviceSlug) return;
    deleteEditableService(serviceSlug);
    setConfirmDelete(false);
    if (onSaved) onSaved(undefined);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              {isCreateMode ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">
                  {isCreateMode ? 'Add New Advertising Service' : `Edit Service: ${title || 'Service Details'}`}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-950 border border-rose-600/40 text-rose-300">
                  {isCreateMode ? 'New Service' : 'Live Service'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isCreateMode
                  ? 'Define the service scope, descriptions, key capabilities, and strategic benefits.'
                  : 'Customize copy, category, specifications, and campaign parameters.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-slate-800 bg-slate-900/60 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/80'
            }`}
          >
            General Info &amp; Descriptions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subservices')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subservices'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/80'
            }`}
          >
            Key Capabilities ({subServices.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('benefits')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/80'
            }`}
          >
            Benefits &amp; Campaigns ({benefits.length})
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Highway Mural Super-Sites / Retail Gateway Branding"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-rose-500"
                  >
                    <option value="Outdoor & Mural Media">Outdoor &amp; Mural Media</option>
                    <option value="On-Ground Mobile Media">On-Ground Mobile Media</option>
                    <option value="Retail & Commercial Branding">Retail &amp; Commercial Branding</option>
                    <option value="OOH & Large-Format Media">OOH &amp; Large-Format Media</option>
                    <option value="Signage & Structural Fabrication">Signage &amp; Structural Fabrication</option>
                    <option value="Experiential & Consumer Activation">Experiential &amp; Consumer Activation</option>
                    <option value="Transit & Mass Mobility Media">Transit &amp; Mass Mobility Media</option>
                    <option value="Corporate Production & Events">Corporate Production &amp; Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Hero Tagline / Subtitle:
                </label>
                <input
                  type="text"
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  placeholder="e.g. Unmatched 24/7 Regional Line-of-Sight & Uncluttered Reach"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Short Description (Used in Grid Cards &amp; Previews) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary highlighting coverage, impact, and target audience..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Detailed Description (Shown on Service Detail Page)
                </label>
                <textarea
                  rows={5}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Comprehensive explanation of execution specifications, geographical reach, municipal clearance, and strategic impact..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: KEY CAPABILITIES (SUB-SERVICES) */}
          {activeTab === 'subservices' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-rose-400 block">
                  Add Capability / Execution Option
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Option Name (e.g. High-Gloss Vinyl Wrap)"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      placeholder="Description & Technical Specification"
                      value={newSubDesc}
                      onChange={(e) => setNewSubDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddSubService}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* List of sub-services */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Configured Capabilities ({subServices.length})
                </label>
                {subServices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                    No sub-capabilities listed. Use the box above to add execution formats.
                  </p>
                ) : (
                  subServices.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between"
                    >
                      <div className="flex-1 w-full space-y-1.5">
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => handleUpdateSubService(idx, 'name', e.target.value)}
                          className="w-full text-xs font-bold text-rose-300 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-rose-500 focus:bg-slate-900 px-1 py-0.5 rounded-sm"
                        />
                        <input
                          type="text"
                          value={sub.description}
                          onChange={(e) => handleUpdateSubService(idx, 'description', e.target.value)}
                          className="w-full text-[11px] text-slate-400 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-rose-500 focus:bg-slate-900 px-1 py-0.5 rounded-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubService(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer self-end sm:self-center"
                        title="Delete capability"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BENEFITS & CAMPAIGN TYPES */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              {/* Strategic Advantages / Benefits */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Strategic Advantages &amp; Deliverables ({benefits.length})</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 100% Geo-tagged photo audit with daily dashboard updates"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Add Benefit
                  </button>
                </div>

                <div className="space-y-1.5">
                  {benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Campaign Types */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-rose-400" />
                    <span>Recommended Campaign Types ({suitableCampaigns.length})</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Festive Hyperlocal Retail Drive"
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCampaign();
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCampaign}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Add Campaign
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {suitableCampaigns.map((camp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <span>{camp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCampaign(idx)}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isCreateMode && serviceSlug && (
                <>
                  {confirmReset ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Confirm Revert
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="px-3 py-1.5 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      title="Reset text changes back to factory defaults"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revert to Default</span>
                    </button>
                  )}

                  {confirmDelete ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleDeleteService}
                        className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Yes, Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(false)}
                        className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Service</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isCreateMode ? 'Publish New Service' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
