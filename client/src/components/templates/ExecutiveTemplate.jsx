import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const sidebarBg = accentColor || "#1a2744";

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 flex" style={{ minHeight: "100%" }}>

            {/* Left Sidebar */}
            <aside className="w-64 shrink-0 text-white flex flex-col" style={{ backgroundColor: sidebarBg }}>

                {/* Profile */}
                <div className="p-8 pb-6 border-b border-white/20">
                    <h1 className="text-2xl font-bold leading-tight tracking-wide mb-1">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.personal_info?.profession && (
                        <p className="text-xs uppercase tracking-widest opacity-70 font-medium mt-2">
                            {data.personal_info.profession}
                        </p>
                    )}
                </div>

                {/* Contact */}
                <div className="p-8 pb-6 border-b border-white/20">
                    <h2 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-60">Contact</h2>
                    <div className="space-y-3 text-sm">
                        {data.personal_info?.email && (
                            <div className="flex items-start gap-3">
                                <Mail size={14} className="mt-0.5 shrink-0 opacity-70" />
                                <span className="break-all opacity-90">{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="shrink-0 opacity-70" />
                                <span className="opacity-90">{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-3">
                                <MapPin size={14} className="shrink-0 opacity-70" />
                                <span className="opacity-90">{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-start gap-3">
                                <Linkedin size={14} className="mt-0.5 shrink-0 opacity-70" />
                                <span className="break-all opacity-90 text-xs">{data.personal_info.linkedin}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-start gap-3">
                                <Globe size={14} className="mt-0.5 shrink-0 opacity-70" />
                                <span className="break-all opacity-90 text-xs">{data.personal_info.website}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div className="p-8 pb-6 border-b border-white/20">
                        <h2 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-60">Education</h2>
                        <div className="space-y-4 text-sm">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="font-semibold opacity-95 leading-snug">
                                        {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                                    </p>
                                    <p className="opacity-70 text-xs mt-0.5">{edu.institution}</p>
                                    <p className="opacity-50 text-xs">{formatDate(edu.graduation_date)}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="p-8">
                        <h2 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-60">Core Skills</h2>
                        <ul className="space-y-2">
                            {data.skills.map((skill, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm opacity-90">
                                    <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Right Main Content */}
            <main className="flex-1 p-10">

                {/* Decorative top rule */}
                <div className="h-1 w-16 rounded mb-8" style={{ backgroundColor: sidebarBg }} />

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-xs uppercase tracking-widest font-bold mb-3 text-gray-400">
                            Executive Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-sm">{data.professional_summary}</p>
                    </section>
                )}

                {/* Divider */}
                {data.professional_summary && <div className="border-t border-gray-100 mb-8" />}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xs uppercase tracking-widest font-bold mb-5 text-gray-400">
                            Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                        <span className="text-xs text-gray-400 shrink-0 ml-4 mt-0.5">
                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: sidebarBg }}>{exp.company}</p>
                                    {exp.description && (
                                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <div className="border-t border-gray-100 mb-6" />
                        <h2 className="text-xs uppercase tracking-widest font-bold mb-5 text-gray-400">
                            Key Projects
                        </h2>
                        <div className="space-y-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-1 shrink-0 rounded-full mt-1" style={{ backgroundColor: sidebarBg, opacity: 0.3 }} />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{proj.name}</h3>
                                        {proj.description && (
                                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{proj.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ExecutiveTemplate;