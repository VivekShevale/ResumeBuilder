import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sparkles,
  User,
  ZoomIn,
  ZoomOut,
  Share2,
  Save,
  CheckCircle2,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

function ResumeBuilder() {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  // Resume data state - SAME AS ORIGINAL
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  // UI state
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(420);
  const [isResizing, setIsResizing] = useState(false);

  const MIN_FONT = 70;
  const MAX_FONT = 120;
  const FONT_STEP = 5;
  const MIN_SIDEBAR_WIDTH = 320;
  const MAX_SIDEBAR_WIDTH = 600;

  // Section definitions with descriptions
  const sections = [
    { 
      id: "personal", 
      name: "Personal Info", 
      icon: User,
      description: "Name, contact, and professional photo"
    },
    { 
      id: "summary", 
      name: "Professional Summary", 
      icon: FileText,
      description: "Brief overview of your expertise"
    },
    { 
      id: "experience", 
      name: "Work Experience", 
      icon: Briefcase,
      description: "Your employment history"
    },
    { 
      id: "education", 
      name: "Education", 
      icon: GraduationCap,
      description: "Academic background and qualifications"
    },
    { 
      id: "projects", 
      name: "Projects", 
      icon: FolderGit2,
      description: "Notable projects and achievements"
    },
    { 
      id: "skills", 
      name: "Skills", 
      icon: Sparkles,
      description: "Technical and soft skills"
    },
  ];

  // Load existing resume - SAME AS ORIGINAL
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = `${data.resume.title} | Resume Builder`;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  // Resizing logic for sidebar
  const handleMouseDown = useCallback((e) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Visibility toggle - SAME AS ORIGINAL
  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume: ", error);
    }
  };

  // Share functionality - SAME AS ORIGINAL
  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  // Download Resume - SAME AS ORIGINAL (window.print)
  const downloadResume = () => {
    window.print();
  };

  // Save resume - SAME AS ORIGINAL
  const saveResume = async () => {
    setIsSaving(true);
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume: ", error);
    }
    setIsSaving(false);
  };

  const activeSection = sections[activeSectionIndex];
  const progress = ((activeSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar - NEW DESIGN */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:block">
              <h1 className="font-semibold text-slate-900 truncate max-w-xs">
                {resumeData.title || "Untitled Resume"}
              </h1>
            </div>
          </div>

          {/* Center: Progress Stepper (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = idx === activeSectionIndex;
              const isCompleted = idx < activeSectionIndex;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200" 
                      : isCompleted
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isCompleted 
                      ? "bg-green-500 text-white" 
                      : isActive 
                      ? "bg-rose-600 text-white" 
                      : "bg-slate-200 text-slate-500"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className="hidden xl:inline">{section.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Visibility Toggle */}
            <button
              onClick={changeResumeVisibility}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                resumeData.public 
                  ? "bg-green-50 text-green-700 hover:bg-green-100" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {resumeData.public ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {resumeData.public ? "Public" : "Private"}
            </button>

            {/* Share */}
            {resumeData.public && (
              <button
                onClick={handleShare}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            )}

            {/* Save */}
            <button
              onClick={saveResume}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-rose-500/20"
            >
              {isSaving ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
            </button>

            {/* Download - SAME FUNCTIONALITY (window.print) */}
            <button
              onClick={downloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm shadow-green-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden h-1 bg-slate-100">
          <div 
            className="h-full bg-rose-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content Area - NEW DESIGN */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Form Panel */}
        <div 
          className="flex flex-col bg-white border-r border-slate-200 relative"
          style={{ width: `${sidebarWidth}px`, minWidth: `${MIN_SIDEBAR_WIDTH}px`, maxWidth: `${MAX_SIDEBAR_WIDTH}px` }}
        >
          {/* Floating Toolbar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200 p-4 space-y-3">
            {/* Template & Color Controls */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />
              </div>
              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData((prev) => ({ ...prev, accent_color: color }))
                }
              />
            </div>

            {/* Font Size Control */}
            {/* <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-xs font-medium">Zoom</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFontSize(f => Math.max(f - FONT_STEP, MIN_FONT))}
                  disabled={fontSize <= MIN_FONT}
                  className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 transition-all shadow-sm"
                >
                  <ZoomOut className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-xs font-medium text-slate-700 w-10 text-center tabular-nums">
                  {fontSize}%
                </span>
                <button
                  onClick={() => setFontSize(f => Math.min(f + FONT_STEP, MAX_FONT))}
                  disabled={fontSize >= MAX_FONT}
                  className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 transition-all shadow-sm"
                >
                  <ZoomIn className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div> */}

            {/* Section Navigation (Mobile/Tablet) */}
            <div className="lg:hidden">
              <select
                value={activeSectionIndex}
                onChange={(e) => setActiveSectionIndex(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              >
                {sections.map((section, idx) => (
                  <option key={section.id} value={idx}>
                    {idx + 1}. {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-lg mx-auto space-y-6">
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <activeSection.icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {activeSection.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {activeSection.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Form Component - SAME AS ORIGINAL */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                  disabled={activeSectionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {activeSectionIndex + 1} of {sections.length}
                  </span>
                </div>

                <button
                  onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                  disabled={activeSectionIndex === sections.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={handleMouseDown}
            className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-rose-500 transition-colors z-20 ${
              isResizing ? "bg-rose-500" : "bg-transparent"
            }`}
          />
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-slate-100/50 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Resume Preview Component */}
            <div className="bg-white shadow-2xl rounded-lg">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                fontSize={fontSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;