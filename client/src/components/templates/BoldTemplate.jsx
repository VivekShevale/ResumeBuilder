import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const BoldTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-900">
            {/* Bold Header */}
            <div className="py-12 px-8 text-white" style={{ backgroundColor: accentColor }}>
                <h1 className="text-6xl font-black mb-2 tracking-tight">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xl opacity-90">
                    {data.personal_info?.profession || "Professional"}
                </p>
            </div>

            <div className="p-8">
                {/* Contact Bar */}
                <div className="flex flex-wrap justify-between items-center gap-4 pb-6 mb-6 border-b-2 border-gray-200">
                    <div className="flex flex-wrap gap-4 text-sm">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-1">
                                <Phone className="size-4" />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} target="_blank" className="text-gray-600 hover:text-gray-900">
                                <Linkedin className="size-5" />
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website} target="_blank" className="text-gray-600 hover:text-gray-900">
                                <Globe className="size-5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">SUMMARY</h2>
                        <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-5">EXPERIENCE</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold">{exp.position}</h3>
                                            <p className="text-gray-700 font-semibold">{exp.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-semibold" style={{ color: accentColor }}>
                                                {formatDate(exp.start_date)} - {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-line mt-2">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">EDUCATION</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-lg">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-700">{edu.institution}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                                            <span>{formatDate(edu.graduation_date)}</span>
                                            {edu.gpa && <span className="font-bold">GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">SKILLS</h2>
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="font-medium">{skill}</span>
                                        <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: "85%", backgroundColor: accentColor }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">PROJECTS</h2>
                        <div className="grid gap-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                                    <h3 className="font-bold text-lg">{proj.name}</h3>
                                    {proj.description && (
                                        <p className="text-gray-600">{proj.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default BoldTemplate;