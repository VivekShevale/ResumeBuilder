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

    return (
        <div
            className="max-w-5xl mx-auto bg-white text-black"
            style={{ fontFamily: "'Times New Roman', Times, serif", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
        >
            {/* Masthead */}
            <header className="px-8 pt-6 pb-0">
                {/* Top rule */}
                <div style={{ borderTop: `6px solid ${accentColor}`, borderBottom: "1px solid black", padding: "4px 0" }}>
                    <div className="flex justify-between items-center text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                        <span>VOL. I — ISSUE 1</span>
                        <span style={{ color: accentColor, fontWeight: "bold" }}>CURRICULUM VITAE</span>
                        <span>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                </div>

                {/* Headline name */}
                <div className="text-center py-4" style={{ borderBottom: "3px solid black" }}>
                    <h1
                        className="font-black uppercase"
                        style={{
                            fontSize: "clamp(2rem, 6vw, 3.5rem)",
                            letterSpacing: "0.08em",
                            lineHeight: 1.05,
                        }}
                    >
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.personal_info?.profession && (
                        <p
                            className="text-sm uppercase tracking-widest font-bold mt-1"
                            style={{ color: accentColor }}
                        >
                            — {data.personal_info.profession} —
                        </p>
                    )}
                </div>

                {/* Contact bar */}
                <div
                    className="flex flex-wrap justify-center gap-4 py-2 text-xs border-b border-black"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1"><Mail size={10} style={{ color: accentColor }} /> {data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1"><Phone size={10} style={{ color: accentColor }} /> {data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1"><MapPin size={10} style={{ color: accentColor }} /> {data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1"><Linkedin size={10} style={{ color: accentColor }} /> {data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1"><Globe size={10} style={{ color: accentColor }} /> {data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Body in newspaper columns */}
            <div className="px-8 py-5">
                {/* Summary — full width intro like a lede */}
                {data.professional_summary && (
                    <div className="mb-5 pb-4" style={{ borderBottom: "1px solid black" }}>
                        <p
                            className="text-base leading-snug font-semibold text-center italic"
                        >
                            "{data.professional_summary}"
                        </p>
                    </div>
                )}

                {/* Three column newspaper grid */}
                <div className="grid grid-cols-3 gap-0" style={{ borderTop: "2px solid black" }}>

                    {/* Column 1: Experience */}
                    <div className="pr-5 pt-4" style={{ borderRight: "1px solid black" }}>
                        <h2
                            className="text-xs font-black uppercase tracking-widest mb-3 pb-1"
                            style={{ borderBottom: `2px solid ${accentColor}`, color: accentColor }}
                        >
                            Professional Experience
                        </h2>
                        <div className="space-y-4">
                            {data.experience && data.experience.map((exp, index) => (
                                <div key={index}>
                                    <h3 className="font-black text-sm uppercase leading-tight">{exp.position}</h3>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-xs font-bold italic" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                                            {formatDate(exp.start_date).replace(" ", "'")}–{exp.is_current ? "pres." : formatDate(exp.end_date).replace(" ", "'")}
                                        </p>
                                    </div>
                                    {exp.description && (
                                        <div className="mt-1 text-xs leading-relaxed">
                                            {exp.description.split("\n").map((line, i) => (
                                                <p key={i} className="mb-0.5">› {line}</p>
                                            ))}
                                        </div>
                                    )}
                                    {index < (data.experience?.length - 1) && (
                                        <div className="mt-3 border-t border-dotted border-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Projects */}
                    <div className="px-5 pt-4" style={{ borderRight: "1px solid black" }}>
                        {data.project && data.project.length > 0 && (
                            <>
                                <h2
                                    className="text-xs font-black uppercase tracking-widest mb-3 pb-1"
                                    style={{ borderBottom: `2px solid ${accentColor}`, color: accentColor }}
                                >
                                    Notable Projects
                                </h2>
                                <div className="space-y-4">
                                    {data.project.map((project, index) => (
                                        <div key={index}>
                                            <h3 className="font-black text-sm uppercase">{project.name}</h3>
                                            {project.type && (
                                                <p className="text-xs italic font-semibold" style={{ color: accentColor }}>{project.type}</p>
                                            )}
                                            {project.description && (
                                                <p className="text-xs leading-relaxed mt-1">
                                                    {project.description.split("\n").join(" ")}
                                                </p>
                                            )}
                                            {index < (data.project?.length - 1) && (
                                                <div className="mt-3 border-t border-dotted border-gray-400" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Column 3: Education + Skills */}
                    <div className="pl-5 pt-4">
                        {data.education && data.education.length > 0 && (
                            <div className="mb-5">
                                <h2
                                    className="text-xs font-black uppercase tracking-widest mb-3 pb-1"
                                    style={{ borderBottom: `2px solid ${accentColor}`, color: accentColor }}
                                >
                                    Education
                                </h2>
                                <div className="space-y-3">
                                    {data.education.map((edu, index) => (
                                        <div key={index}>
                                            <p className="font-black text-xs uppercase">{edu.degree}</p>
                                            {edu.field && <p className="text-xs italic">{edu.field}</p>}
                                            <p className="text-xs">{edu.institution}</p>
                                            <p className="text-xs font-bold" style={{ color: accentColor, fontFamily: "'Courier New', monospace" }}>
                                                {formatDate(edu.graduation_date)}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.skills && data.skills.length > 0 && (
                            <div>
                                <h2
                                    className="text-xs font-black uppercase tracking-widest mb-3 pb-1"
                                    style={{ borderBottom: `2px solid ${accentColor}`, color: accentColor }}
                                >
                                    Competencies
                                </h2>
                                <div className="text-xs leading-loose">
                                    {data.skills.map((skill, i) => (
                                        <span key={i}>
                                            {skill}{i < data.skills.length - 1 ? <span style={{ color: accentColor }}> · </span> : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer rule */}
            <div className="mx-8 mb-6" style={{ borderTop: `4px solid ${accentColor}` }} />
        </div>
    );
};

export default NewsroomTemplate;