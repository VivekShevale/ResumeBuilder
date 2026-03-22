import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Star, Layers, Award, Calendar, Code, User } from "lucide-react";

const InfographicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const accent = accentColor || "#2563eb";

    // Calculate skill level based on skill name length or custom mapping
    const getSkillLevel = (skill, index) => {
        const levels = [4, 5, 3, 4, 5, 3, 4, 5];
        return levels[index % levels.length];
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-lg">
            {/* Top Header Band with Gradient */}
            <header className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}>
                {/* Decorative elements */}
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-5 bg-white" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full opacity-5 bg-white" />
                <div className="absolute right-32 top-8 w-24 h-24 rounded-full opacity-10 bg-white" />
                <div className="absolute left-1/4 bottom-0 w-32 h-32 rounded-full opacity-5 bg-white" />
                
                <div className="relative px-8 py-8 md:px-10 md:py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                                {data.personal_info?.full_name || "Your Name"}
                            </h1>
                            {data.personal_info?.profession && (
                                <div className="inline-block">
                                    <p className="text-sm uppercase tracking-wider text-white/90 bg-white/20 px-3 py-1 rounded-full">
                                        {data.personal_info.profession}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="text-xs space-y-1.5 text-white/90">
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Mail size={12} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="shrink-0" />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} className="shrink-0" />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={12} className="shrink-0" />
                                    <span className="break-all text-xs">{data.personal_info.linkedin.replace(/^https?:\/\//, '')}</span>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-center gap-2">
                                    <Globe size={12} className="shrink-0" />
                                    <span className="break-all text-xs">{data.personal_info.website.replace(/^https?:\/\//, '')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Body with improved grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Left Sidebar - Enhanced */}
                <aside className="md:col-span-1 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 p-6 md:p-7">
                    {/* Profile Image (if available) */}
                    {data.personal_info?.image && (
                        <div className="mb-8 flex justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: accent }}>
                                <img 
                                    src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Skills with Enhanced Visualization */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-8">
                            <InfoSectionTitle icon={<Star size={14} />} label="Core Skills" accent={accent} />
                            <div className="space-y-3 mt-4">
                                {data.skills.map((skill, i) => {
                                    const level = getSkillLevel(skill, i);
                                    return (
                                        <div key={i}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{skill}</span>
                                                <span className="text-xs text-gray-500">{level}/5</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full transition-all duration-300"
                                                    style={{ width: `${(level / 5) * 100}%`, backgroundColor: accent }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Education - Enhanced */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <InfoSectionTitle icon={<GraduationCap size={14} />} label="Education" accent={accent} />
                            <div className="space-y-5 mt-4">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: accent + "40" }} />
                                        <div className="pl-4">
                                            <h3 className="font-semibold text-sm text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            {edu.field && (
                                                <p className="text-xs text-gray-600 mt-0.5">{edu.field}</p>
                                            )}
                                            <p className="text-xs font-medium mt-1" style={{ color: accent }}>
                                                {edu.institution}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar size={10} className="text-gray-400" />
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(edu.graduation_date)}
                                                </p>
                                                {edu.gpa && (
                                                    <>
                                                        <span className="text-gray-300">•</span>
                                                        <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Additional Info Section */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <InfoSectionTitle icon={<Award size={14} />} label="Certifications" accent={accent} />
                            <div className="space-y-2 mt-4">
                                {data.certifications.map((cert, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: accent }} />
                                        <span className="text-xs text-gray-700">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content - Enhanced */}
                <main className="md:col-span-2 p-6 md:p-8">
                    {/* Professional Summary - Card Style */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <div 
                                className="rounded-xl p-5 text-sm text-gray-700 leading-relaxed shadow-sm"
                                style={{ backgroundColor: accent + "08", borderLeft: `3px solid ${accent}` }}
                            >
                                <div className="flex items-start gap-2">
                                    <User size={16} style={{ color: accent }} className="mt-0.5 shrink-0" />
                                    <p className="flex-1">{data.professional_summary}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Experience - Enhanced Timeline */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <InfoSectionTitle icon={<Briefcase size={14} />} label="Professional Experience" accent={accent} />
                            <div className="mt-5 space-y-6">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        {/* Timeline connector */}
                                        {i < data.experience.length - 1 && (
                                            <div 
                                                className="absolute left-[7px] top-6 bottom-0 w-0.5"
                                                style={{ backgroundColor: accent + "30" }}
                                            />
                                        )}
                                        
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div 
                                                    className="w-4 h-4 rounded-full border-2 bg-white z-10"
                                                    style={{ borderColor: accent }}
                                                />
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                                                        <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
                                                            {exp.company}
                                                        </p>
                                                    </div>
                                                    <span 
                                                        className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap self-start"
                                                        style={{ backgroundColor: accent + "10", color: accent }}
                                                    >
                                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                    </span>
                                                </div>
                                                {exp.description && (
                                                    <div className="text-sm text-gray-600 leading-relaxed mt-2">
                                                        {exp.description.split("\n").map((line, idx) => (
                                                            <p key={idx} className="mb-1">{line}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects - Grid Layout */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <InfoSectionTitle icon={<Layers size={14} />} label="Featured Projects" accent={accent} />
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.project.map((proj, i) => (
                                    <div
                                        key={i}
                                        className="group rounded-lg p-4 border transition-all duration-200 hover:shadow-md"
                                        style={{ borderColor: accent + "20" }}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-sm text-gray-900 group-hover" style={{ color: accent }}>
                                                {proj.name}
                                            </h3>
                                            {proj.type && (
                                                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accent + "10", color: accent }}>
                                                    {proj.type}
                                                </span>
                                            )}
                                        </div>
                                        {proj.description && (
                                            <p className="text-xs text-gray-600 leading-relaxed mt-1">
                                                {proj.description.length > 100 
                                                    ? `${proj.description.substring(0, 100)}...` 
                                                    : proj.description}
                                            </p>
                                        )}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {proj.technologies.slice(0, 3).map((tech, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="text-xs px-1.5 py-0.5 rounded"
                                                        style={{ backgroundColor: accent + "08", color: accent }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* Footer Decoration */}
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, ${accent})` }} />
        </div>
    );
};

const InfoSectionTitle = ({ icon, label, accent }) => (
    <div className="flex items-center gap-2 pb-2 border-b-2" style={{ borderBottomColor: accent + "30" }}>
        <span style={{ color: accent }}>{icon}</span>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">{label}</h2>
    </div>
);

export default InfographicTemplate;