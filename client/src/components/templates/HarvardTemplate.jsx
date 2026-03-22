import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const HarvardTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const lineColor = accentColor || "#8b0000";

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 px-12 py-10">

            {/* Header */}
            <header className="text-center mb-1">
                <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ fontVariant: "small-caps", letterSpacing: "0.05em" }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                {/* Contact row */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.phone && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span>{data.personal_info.phone}</span>
                        </>
                    )}
                    {data.personal_info?.email && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span style={{ color: lineColor }}>{data.personal_info.email}</span>
                        </>
                    )}
                    {data.personal_info?.linkedin && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span style={{ color: lineColor }}>{data.personal_info.linkedin}</span>
                        </>
                    )}
                    {data.personal_info?.website && (
                        <>
                            <span className="text-gray-300">|</span>
                            <span style={{ color: lineColor }}>{data.personal_info.website}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Full-width rule */}
            <div className="mt-4 mb-5 border-t-2" style={{ borderColor: lineColor }} />

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-5">
                    <SectionHeading color={lineColor} label="Summary" />
                    <p className="text-sm text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-5">
                    <SectionHeading color={lineColor} label="Education" />
                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-sm text-gray-900">{edu.institution}</p>
                                    <p className="text-sm text-gray-700 italic">
                                        {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                                        {edu.gpa ? ` — GPA: ${edu.gpa}` : ""}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 shrink-0 ml-4 mt-0.5">{formatDate(edu.graduation_date)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-5">
                    <SectionHeading color={lineColor} label="Experience" />
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-sm">{exp.company}</span>
                                        {exp.position && (
                                            <span className="text-sm text-gray-600">, <em>{exp.position}</em></span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 shrink-0 ml-4 mt-0.5">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4">
                                        {exp.description.split("\n").filter(Boolean).map((line, i) => (
                                            <li key={i} className="text-sm text-gray-700 leading-snug">{line.replace(/^[-•]\s*/, "")}</li>
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
                <section className="mb-5">
                    <SectionHeading color={lineColor} label="Projects" />
                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <p className="font-bold text-sm">{proj.name}</p>
                                {proj.description && (
                                    <ul className="mt-1 space-y-1 list-disc list-outside ml-4">
                                        {proj.description.split("\n").filter(Boolean).map((line, i) => (
                                            <li key={i} className="text-sm text-gray-700 leading-snug">{line.replace(/^[-•]\s*/, "")}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <SectionHeading color={lineColor} label="Skills" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {data.skills.join(" · ")}
                    </p>
                </section>
            )}
        </div>
    );
};

const SectionHeading = ({ label, color }) => (
    <div className="mb-2">
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
            {label}
        </h2>
        <div className="mt-1 border-t" style={{ borderColor: color, opacity: 0.3 }} />
    </div>
);

export default HarvardTemplate;