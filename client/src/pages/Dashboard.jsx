import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  Clock,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);

  const gradients = [
    "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    "from-amber-500/20 via-orange-500/20 to-red-500/20",
    "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
  ];

  const accentColors = [
    "text-violet-600 bg-violet-100",
    "text-amber-600 bg-amber-100",
    "text-emerald-600 bg-emerald-100",
    "text-rose-600 bg-rose-100",
    "text-blue-600 bg-blue-100",
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.put("/api/resumes/update", {resumeId: editResumeId, resumeData : { title }}, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume));
        setTitle('');
        setEditResumeId('');
        toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (confirm) {
        const { data } = await api.delete(`api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id != resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type === "application/pdf") {
      setResume(files[0]);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group relative overflow-hidden w-full sm:max-w-36 h-48 bg-white border border-dashed border-rose-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-gray-500 hover:bg-gray-50/30 transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <PlusIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-center px-2">
              <p className="text-sm font-semibold text-slate-700 group-hover:text-gray-600 transition-colors">Create Resume</p>
              <p className="text-xs text-slate-400 mt-0.5">Start from scratch</p>
            </div>
          </button>

          {/* <button
            onClick={() => setShowUploadResume(true)}
            className="group relative overflow-hidden w-full sm:max-w-36 h-48 bg-white border border-dashed border-purple-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500 hover:bg-purple-50/30 transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <UploadCloudIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-center px-2">
              <p className="text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition-colors">Upload Existing</p>
              <p className="text-xs text-slate-400 mt-0.5">Import your resume</p>
            </div>
          </button> */}
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const gradient = gradients[index % gradients.length];
            const accent = accentColors[index % accentColors.length];
            return (
              <div
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full sm:max-w-36 h-48 flex flex-col"
              >
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-br ${gradient} relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        className="p-1.5 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:bg-white transition-colors"
                      >
                        <PencilIcon className="w-3.5 h-3.5 text-slate-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteResume(resume._id);
                        }}
                        className="p-1.5 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:bg-red-50 transition-colors"
                      >
                        <TrashIcon className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-1.5 ${accent}`}>
                      <FilePenLineIcon className="w-3 h-3" />
                      Resume
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 leading-tight" title={resume.title}>
                      {resume.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Hover bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>

        {/* Modern Create Resume Modal */}
        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <PlusIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Create New Resume</h2>
                    <p className="text-sm text-white/70 mt-0.5">Start building your professional resume</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                  className="absolute top-5 right-5 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={createResume} className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="e.g., Software Developer Resume 2024"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Give your resume a unique name to easily identify it later
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateResume(false);
                      setTitle("");
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-gray-500/20 transition-all"
                  >
                    Create Resume
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modern Upload Resume Modal */}
        {showUploadResume && (
          <div
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <UploadCloudIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Upload Resume</h2>
                    <p className="text-sm text-white/70 mt-0.5">Import your existing resume</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                  className="absolute top-5 right-5 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={uploadResume} className="p-6">
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="e.g., My Resume 2024"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* File Upload Area */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload PDF
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${
                      dragActive
                        ? "border-purple-500 bg-purple-50"
                        : resume
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-input"
                      accept=".pdf"
                      hidden
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                    <label
                      htmlFor="resume-input"
                      className="block cursor-pointer"
                    >
                      {resume ? (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-green-700 mb-1">
                            {resume.name}
                          </p>
                          <p className="text-xs text-green-600">
                            {(resume.size / 1024).toFixed(2)} KB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setResume(null);
                            }}
                            className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <UploadCloud className="w-6 h-6 text-purple-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF files only (Max 10MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* AI Feature Notice */}
                {!resume && (
                  <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl border border-purple-100">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-purple-800 font-medium">
                          AI will analyze your resume
                        </p>
                        <p className="text-xs text-purple-600 mt-0.5">
                          Our AI will extract and enhance your resume content
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadResume(false);
                      setTitle("");
                      setResume(null);
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !title || !resume}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoaderCircleIcon className="animate-spin w-4 h-4" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Upload & Analyze"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modern Edit Resume Modal */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <PencilIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Edit Resume Title</h2>
                    <p className="text-sm text-white/70 mt-0.5">Update your resume name</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditResumeId("");
                    setTitle("");
                  }}
                  className="absolute top-5 right-5 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={editTitle} className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Enter new title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditResumeId("");
                      setTitle("");
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                  >
                    Update Title
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;