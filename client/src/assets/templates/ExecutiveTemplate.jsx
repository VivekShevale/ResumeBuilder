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

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-900 flex" style={{ fontFamily: "'Georgia', serif" }}>
            {/* Dark Left Sidebar */}
            <aside className="w-72 flex-shrink-0 text-white flex flex-col" style={{ backgroundColor: "#1a1a2e" }}>
                {/* Name block */}
                <div className="p-8 pb-6" style={{ borderBottom: `3px solid ${accentColor}` }}>
                    <h1 className="text-2xl font-bold leading-tight tracking-wide mb-1">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.personal_info?.profession && (
                        <p className="text-xs tracking-widest uppercase mt-2 font-light" style={{ color: accentColor }}>
                            {data.personal_info.profession}
                        </p>
                    )}
                </div>

                <div className="p-8 flex flex-col gap-8 flex-1">
                    {/* Contact */}
                    <section>
                        <h2 className="text-xs tracking-widest uppercase font-bold mb-4" style={{ color: accentColor }}>
                            Contact
                        </h2>
                        <div className="space-y-3 text-sm text-gray-300">
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-3">
                                    <Phone size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-3">
                                    <Mail size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-3">
                                    <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-start gap-3">
                                    <Linkedin size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-all text-xs">{data.personal_info.linkedin}</span>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-start gap-3">
                                    <Globe size={13} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-all text-xs">{data.personal_info.website}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-xs tracking-widest uppercase font-bold mb-4" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-5 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-white leading-snug">{edu.degree}</p>
                                        {edu.field && <p className="text-gray-400 text-xs">{edu.field}</p>}
                                        <p className="text-gray-400 mt-1">{edu.institution}</p>
                                        <p className="text-xs mt-1" style={{ color: accentColor }}>
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                        {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-xs tracking-widest uppercase font-bold mb-4" style={{ color: accentColor }}>
                                Skills
                            </h2>
                            <div className="flex flex-col gap-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <span className="text-sm text-gray-300">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-8 pb-8" style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <h2 className="text-xs tracking-widest uppercase font-bold mb-3" style={{ color: accentColor }}>
                            Profile
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8 pb-8" style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <h2 className="text-xs tracking-widest uppercase font-bold mb-6" style={{ color: accentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-7">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-4 pt-1">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: accentColor }}>
                                        {exp.company}
                                    </p>
                                    {exp.description && (
                                        <ul className="space-y-1">
                                            {exp.description.split("\n").map((line, i) => (
                                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-xs tracking-widest uppercase font-bold mb-6" style={{ color: accentColor }}>
                            Projects
                        </h2>
                        <div className="space-y-5">
                            {data.project.map((project, index) => (
                                <div key={index}>
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <h3 className="font-bold text-gray-900">{project.name}</h3>
                                        {project.type && (
                                            <span className="text-xs text-gray-400">{project.type}</span>
                                        )}
                                    </div>
                                    {project.description && (
                                        <ul className="space-y-1">
                                            {project.description.split("\n").map((line, i) => (
                                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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