import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ElegantTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>

            {/* Centered Header */}
            <header className="text-center px-10 pt-12 pb-8">
                <h1
                    className="text-5xl font-normal tracking-widest mb-2 uppercase"
                    style={{ color: "#1c1c1c", letterSpacing: "0.2em" }}
                >
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                {data.personal_info?.profession && (
                    <p
                        className="text-xs tracking-widest uppercase mb-6 font-light"
                        style={{ color: accentColor, letterSpacing: "0.3em" }}
                    >
                        {data.personal_info.profession}
                    </p>
                )}

                {/* Ornamental divider */}
                <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="h-px w-16" style={{ backgroundColor: accentColor }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div className="h-px w-16" style={{ backgroundColor: accentColor }} />
                </div>

                {/* Contact row */}
                <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 tracking-wide">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={11} style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={11} style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={11} style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={11} style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={11} style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="px-10 pb-12">

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-10 text-center">
                        <p className="text-sm text-gray-600 leading-loose italic max-w-2xl mx-auto">
                            "{data.professional_summary}"
                        </p>
                    </section>
                )}

                {/* Ornamental separator */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    <div className="h-px flex-1" style={{ backgroundColor: "#e5e7eb" }} />
                </div>

                {/* Two column: Experience left, sidebar right */}
                <div className="grid grid-cols-3 gap-10">

                    {/* Experience — timeline */}
                    <div className="col-span-2">
                        {data.experience && data.experience.length > 0 && (
                            <section className="mb-10">
                                <h2
                                    className="text-xs uppercase tracking-widest font-normal mb-6 text-center"
                                    style={{ color: accentColor, letterSpacing: "0.25em" }}
                                >
                                    ✦ Experience ✦
                                </h2>

                                <div className="relative">
                                    {/* Vertical timeline line */}
                                    <div
                                        className="absolute left-3.5 top-1 bottom-1 w-px"
                                        style={{ backgroundColor: accentColor + "40" }}
                                    />

                                    <div className="space-y-8">
                                        {data.experience.map((exp, index) => (
                                            <div key={index} className="flex gap-6">
                                                {/* Timeline dot */}
                                                <div className="flex-shrink-0 relative z-10">
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center bg-white"
                                                        style={{ borderColor: accentColor }}
                                                    >
                                                        <div
                                                            className="w-2.5 h-2.5 rounded-full"
                                                            style={{ backgroundColor: accentColor }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1 -mt-0.5">
                                                    <h3 className="font-semibold text-gray-900 text-base">{exp.position}</h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <p className="text-sm" style={{ color: accentColor }}>{exp.company}</p>
                                                        <span className="text-gray-300">|</span>
                                                        <span className="text-xs text-gray-400 italic">
                                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                        </span>
                                                    </div>
                                                    {exp.description && (
                                                        <ul className="space-y-1.5">
                                                            {exp.description.split("\n").map((line, i) => (
                                                                <li key={i} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                                                                    <span className="mt-2 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                                                                    {line}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
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
                                <h2
                                    className="text-xs uppercase tracking-widest font-normal mb-6 text-center"
                                    style={{ color: accentColor, letterSpacing: "0.25em" }}
                                >
                                    ✦ Projects ✦
                                </h2>
                                <div className="space-y-5">
                                    {data.project.map((project, index) => (
                                        <div key={index} className="border-l-2 pl-4" style={{ borderColor: accentColor + "60" }}>
                                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                            {project.type && (
                                                <p className="text-xs text-gray-400 italic mb-1">{project.type}</p>
                                            )}
                                            {project.description && (
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {project.description.split("\n").join(" ")}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right sidebar */}
                    <div className="col-span-1">

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section className="mb-8">
                                <h2
                                    className="text-xs uppercase tracking-widest font-normal mb-5 text-center"
                                    style={{ color: accentColor, letterSpacing: "0.25em" }}
                                >
                                    ✦ Education ✦
                                </h2>
                                <div className="space-y-5">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="text-center">
                                            <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
                                            {edu.field && <p className="text-xs text-gray-500">{edu.field}</p>}
                                            <p className="text-xs text-gray-600 mt-1">{edu.institution}</p>
                                            <p className="text-xs italic mt-1" style={{ color: accentColor }}>
                                                {formatDate(edu.graduation_date)}
                                            </p>
                                            {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
                                            {index < data.education.length - 1 && (
                                                <div className="h-px bg-gray-100 mt-4" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2
                                    className="text-xs uppercase tracking-widest font-normal mb-5 text-center"
                                    style={{ color: accentColor, letterSpacing: "0.25em" }}
                                >
                                    ✦ Skills ✦
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {data.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="text-xs text-center py-1.5 border text-gray-600"
                                            style={{ borderColor: accentColor + "50" }}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantTemplate;