import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Derive a lighter tint for backgrounds
    const accentLight = accentColor + "18";
    const accentMid = accentColor + "40";

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-800" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
            {/* Top Hero Band */}
            <header style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)` }} className="px-10 py-10 text-white">
                <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                        {data.personal_info?.profession && (
                            <p className="text-xs tracking-widest uppercase font-medium opacity-80 mb-1">
                                {data.personal_info.profession}
                            </p>
                        )}
                        <h1 className="text-5xl font-black tracking-tight leading-none">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                    </div>
                    {/* Decorative circle */}
                    <div className="w-20 h-20 rounded-full border-4 border-white opacity-20 flex-shrink-0 hidden sm:block" />
                </div>

                {/* Contact strip */}
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={13} />
                            <span className="break-all">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={13} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={13} />
                            <span className="break-all text-xs max-w-[200px]">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={13} />
                            <span className="break-all text-xs max-w-[200px]">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Body — two column */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Left column */}
                <div className="col-span-1 p-7 border-r border-gray-100" style={{ backgroundColor: accentLight }}>
                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2
                                className="text-xs font-black uppercase tracking-widest mb-4 pb-1 inline-block"
                                style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}
                            >
                                About Me
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mt-3">{data.professional_summary}</p>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2
                                className="text-xs font-black uppercase tracking-widest mb-4 pb-1 inline-block"
                                style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}
                            >
                                Education
                            </h2>
                            <div className="space-y-4 mt-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <p className="font-bold text-sm text-gray-900">{edu.degree}</p>
                                        {edu.field && <p className="text-xs text-gray-500 mt-0.5">{edu.field}</p>}
                                        <p className="text-xs text-gray-600 mt-2">{edu.institution}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-xs font-semibold" style={{ color: accentColor }}>
                                                {formatDate(edu.graduation_date)}
                                            </p>
                                            {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2
                                className="text-xs font-black uppercase tracking-widest mb-4 pb-1 inline-block"
                                style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}
                            >
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-xs font-semibold px-3 py-1.5 rounded-full transition-transform hover:scale-105"
                                        style={{ backgroundColor: accentMid, color: accentColor }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right column */}
                <div className="col-span-1 md:col-span-2 p-8">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-10">
                            <h2
                                className="text-xs font-black uppercase tracking-widest mb-6 pb-1 inline-block"
                                style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}
                            >
                                Work Experience
                            </h2>
                            <div className="space-y-8 mt-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative group">
                                        {/* Accent left bar */}
                                        <div 
                                            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 group-hover:w-1" 
                                            style={{ backgroundColor: index === 0 ? accentColor : "#e5e7eb" }} 
                                        />
                                        <div className="pl-5">
                                            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                                <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                                <span
                                                    className="text-xs font-semibold px-2 py-1 rounded whitespace-nowrap"
                                                    style={{ backgroundColor: accentLight, color: accentColor }}
                                                >
                                                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                            {exp.description && (
                                                <div className="space-y-1.5">
                                                    {exp.description.split("\n").map((line, i) => (
                                                        <div key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                                                            <span className="leading-relaxed">{line}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2
                                className="text-xs font-black uppercase tracking-widest mb-6 pb-1 inline-block"
                                style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}
                            >
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-5 mt-4">
                                {data.project.map((project, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                                        style={{ borderColor: accentMid, backgroundColor: accentLight, borderWidth: "1px" }}
                                    >
                                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                                            <h3 className="font-bold text-gray-900 text-base">{project.name}</h3>
                                            {project.type && (
                                                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: accentMid, color: accentColor }}>
                                                    {project.type}
                                                </span>
                                            )}
                                        </div>
                                        {project.description && (
                                            <p className="text-sm text-gray-600 leading-relaxed mt-2">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
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
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;