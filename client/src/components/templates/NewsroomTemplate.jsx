import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const NewsroomTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const dimWhite = "#e2e8f0";
    const mutedText = "#94a3b8";
    const bgCard = "#1e293b";
    const bgMain = "#0f172a";

    return (
        <div
            className="max-w-5xl mx-auto"
            style={{
                fontFamily: "'Courier New', Courier, monospace",
                backgroundColor: bgMain,
                color: dimWhite,
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
            }}
        >
            {/* Header — terminal prompt style */}
            <header style={{ backgroundColor: bgCard, borderBottom: `1px solid ${accentColor}30` }} className="px-8 py-7">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: accentColor, fontSize: "12px" }}>❯</span>
                            <span style={{ color: mutedText, fontSize: "11px" }}>whoami</span>
                        </div>
                        <h1
                            className="font-bold"
                            style={{ fontSize: "2.4rem", color: dimWhite, letterSpacing: "-0.02em", lineHeight: 1.1 }}
                        >
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-sm mt-1" style={{ color: accentColor }}>
                                // {data.personal_info.profession}
                            </p>
                        )}
                    </div>

                    {/* Terminal window dots */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
                        <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
                    </div>
                </div>

                {/* Contact */}
                <div className="mt-4 flex flex-wrap gap-4" style={{ borderTop: `1px solid ${accentColor}25`, paddingTop: "12px" }}>
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: mutedText }}>
                            <Mail size={11} style={{ color: accentColor }} />
                            {data.personal_info.email}
                        </span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: mutedText }}>
                            <Phone size={11} style={{ color: accentColor }} />
                            {data.personal_info.phone}
                        </span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: mutedText }}>
                            <MapPin size={11} style={{ color: accentColor }} />
                            {data.personal_info.location}
                        </span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: mutedText }}>
                            <Linkedin size={11} style={{ color: accentColor }} />
                            {data.personal_info.linkedin}
                        </span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: mutedText }}>
                            <Globe size={11} style={{ color: accentColor }} />
                            {data.personal_info.website}
                        </span>
                    )}
                </div>
            </header>

            <div className="p-8 grid grid-cols-3 gap-6">

                {/* Left: Summary + Skills + Education */}
                <div className="col-span-1 flex flex-col gap-5">

                    {/* Summary */}
                    {data.professional_summary && (
                        <div className="rounded-lg p-4" style={{ backgroundColor: bgCard, border: `1px solid ${accentColor}25` }}>
                            <p className="text-xs mb-2" style={{ color: accentColor }}>/* about */</p>
                            <p className="text-xs leading-relaxed" style={{ color: mutedText }}>{data.professional_summary}</p>
                        </div>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <div className="rounded-lg p-4" style={{ backgroundColor: bgCard, border: `1px solid ${accentColor}25` }}>
                            <p className="text-xs mb-3" style={{ color: accentColor }}>const skills = [</p>
                            <div className="flex flex-col gap-1 pl-3">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="text-xs" style={{ color: dimWhite }}>
                                        <span style={{ color: mutedText }}>"</span>
                                        {skill}
                                        <span style={{ color: mutedText }}>"</span>
                                        {i < data.skills.length - 1 ? <span style={{ color: mutedText }}>,</span> : ""}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs mt-1" style={{ color: accentColor }}>]</p>
                        </div>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <div className="rounded-lg p-4" style={{ backgroundColor: bgCard, border: `1px solid ${accentColor}25` }}>
                            <p className="text-xs mb-3" style={{ color: accentColor }}>/* education */</p>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="text-xs font-bold" style={{ color: dimWhite }}>{edu.degree}</p>
                                        {edu.field && <p className="text-xs" style={{ color: mutedText }}>{edu.field}</p>}
                                        <p className="text-xs mt-0.5" style={{ color: mutedText }}>{edu.institution}</p>
                                        <p className="text-xs mt-0.5" style={{ color: accentColor }}>{formatDate(edu.graduation_date)}</p>
                                        {edu.gpa && <p className="text-xs" style={{ color: mutedText }}>gpa: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Experience + Projects */}
                <div className="col-span-2 flex flex-col gap-5">

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <div>
                            <p className="text-xs mb-3" style={{ color: accentColor }}>
                                <span style={{ color: mutedText }}>function </span>
                                experience<span style={{ color: mutedText }}>()</span> {"{"}
                            </p>
                            <div className="flex flex-col gap-3 pl-3">
                                {data.experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg p-4"
                                        style={{
                                            backgroundColor: bgCard,
                                            border: `1px solid ${accentColor}30`,
                                            borderLeft: `3px solid ${accentColor}`,
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-sm" style={{ color: dimWhite }}>{exp.position}</h3>
                                            <span className="text-xs ml-4 flex-shrink-0" style={{ color: mutedText, fontFamily: "'Courier New', monospace" }}>
                                                {formatDate(exp.start_date)} – {exp.is_current ? "now" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                        {exp.description && (
                                            <ul className="space-y-1">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i} className="text-xs flex items-start gap-2" style={{ color: mutedText }}>
                                                        <span style={{ color: accentColor }} className="flex-shrink-0">→</span>
                                                        {line}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs mt-2 pl-0" style={{ color: accentColor }}>{"}"}</p>
                        </div>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <div>
                            <p className="text-xs mb-3" style={{ color: accentColor }}>
                                <span style={{ color: mutedText }}>const </span>
                                projects<span style={{ color: mutedText }}> = </span>
                                {"{"}
                            </p>
                            <div className="grid grid-cols-2 gap-3 pl-3">
                                {data.project.map((project, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg p-4"
                                        style={{ backgroundColor: bgCard, border: `1px solid ${accentColor}25` }}
                                    >
                                        <h3 className="font-bold text-xs mb-0.5" style={{ color: dimWhite }}>{project.name}</h3>
                                        {project.type && (
                                            <p className="text-xs mb-1" style={{ color: accentColor }}>// {project.type}</p>
                                        )}
                                        {project.description && (
                                            <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                                                {project.description.split("\n").join(" ")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs mt-2" style={{ color: accentColor }}>{"}"}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsroomTemplate;