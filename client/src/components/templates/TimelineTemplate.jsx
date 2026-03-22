import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const TimelineTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const accent = accentColor || "#0f766e";

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800">
            {/* Header */}
            <header className="px-12 pt-10 pb-8">
                <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl font-light tracking-wide text-gray-900">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-sm font-medium mt-1 uppercase tracking-widest" style={{ color: accent }}>
                                {data.personal_info.profession}
                            </p>
                        )}
                    </div>

                    {/* Contact block */}
                    <div className="text-right text-xs text-gray-500 space-y-1">
                        {data.personal_info?.email && (
                            <div className="flex items-center justify-end gap-1.5"><Mail size={11} /><span className="break-all">{data.personal_info.email}</span></div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center justify-end gap-1.5"><Phone size={11} /><span>{data.personal_info.phone}</span></div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center justify-end gap-1.5"><MapPin size={11} /><span>{data.personal_info.location}</span></div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center justify-end gap-1.5"><Linkedin size={11} /><span className="break-all">{data.personal_info.linkedin}</span></div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-center justify-end gap-1.5"><Globe size={11} /><span className="break-all">{data.personal_info.website}</span></div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-6 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
            </header>

            <div className="px-12 pb-12">
                {/* Summary */}
                {data.professional_summary && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl">{data.professional_summary}</p>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full border font-medium"
                                style={{ borderColor: accent, color: accent }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Experience Timeline */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-10">
                        <TimelineLabel label="Experience" accent={accent} />
                        <div className="mt-4 relative">
                            {/* Spine line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: accent + "30", marginLeft: "7px" }} />

                            <div className="space-y-6">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="flex gap-5 relative">
                                        {/* Dot */}
                                        <div
                                            className="w-3.5 h-3.5 rounded-full shrink-0 border-2 bg-white mt-0.5 z-10"
                                            style={{ borderColor: accent }}
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                                                    <p className="text-xs font-medium" style={{ color: accent }}>{exp.company}</p>
                                                </div>
                                                <span className="text-xs text-gray-400 shrink-0">
                                                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            {exp.description && (
                                                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Two column: Education + Projects - Now properly aligned */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <TimelineLabel label="Education" accent={accent} />
                            <div className="mt-4 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: accent + "30", marginLeft: "7px" }} />
                                <div className="space-y-5">
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="flex gap-4 relative">
                                            <div
                                                className="w-3.5 h-3.5 rounded-full shrink-0 border-2 bg-white mt-0.5 z-10"
                                                style={{ borderColor: accent }}
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm text-gray-900">
                                                    {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
                                                </p>
                                                <p className="text-xs font-medium mt-0.5" style={{ color: accent }}>{edu.institution}</p>
                                                <div className="flex justify-between items-center flex-wrap gap-2 mt-1">
                                                    <p className="text-xs text-gray-400">
                                                        {formatDate(edu.graduation_date)}
                                                    </p>
                                                    {edu.gpa && (
                                                        <p className="text-xs text-gray-400">
                                                            GPA: {edu.gpa}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <TimelineLabel label="Projects" accent={accent} />
                            <div className="mt-4 space-y-4">
                                {data.project.map((proj, i) => (
                                    <div key={i} className="pl-4 border-l-2" style={{ borderColor: accent + "40" }}>
                                        <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                                        {proj.description && (
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Additional spacing consistency */}
                {(!data.education || data.education.length === 0) && (!data.project || data.project.length === 0) && (
                    <div className="h-0"></div>
                )}
            </div>
        </div>
    );
};

const TimelineLabel = ({ label, accent }) => (
    <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
        {label}
    </h2>
);

export default TimelineTemplate;