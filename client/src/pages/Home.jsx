import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Zap, 
  Shield, 
  Award,
  ChevronRight, 
  Star, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Globe,
  Lock,
  Download,
  Sparkles,
  Clock,
  Workflow,
  Layers,
  Layers2
} from 'lucide-react';
import CallToAction from "../components/home/CallToAction";

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradients = [
    "from-rose-500/10 via-red-500/10 to-pink-500/10",
    "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    "from-amber-500/10 via-orange-500/10 to-red-500/10",
    "from-slate-500/10 via-gray-500/10 to-zinc-500/10",
    "from-rose-500/10 via-pink-500/10 to-red-500/10",
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast & Intuitive",
      description: "Build your resume in minutes with our streamlined interface and smart suggestions.",
      gradient: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50",
      textColor: "text-rose-600"
    },
    {
      icon: Award,
      title: "Professional Templates",
      description: "Choose from expertly designed templates that meet industry standards and impress recruiters.",
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      icon: Shield,
      title: "ATS-Friendly",
      description: "Ensure your resume passes Applicant Tracking Systems with optimized formatting and structure.",
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and protected. We prioritize your privacy and security.",
      gradient: "from-slate-500 to-gray-600",
      bgLight: "bg-slate-50",
      textColor: "text-slate-600"
    },
    {
      icon: Download,
      title: "Instant Export",
      description: "Download your resume as a high-quality PDF, ready to send to employers immediately.",
      gradient: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50",
      textColor: "text-rose-600"
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      description: "Create and edit your resume on any device, wherever you are.",
      gradient: "from-blue-500 to-rose-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Corp",
      content: "This resume builder helped me land interviews at top companies. The templates are clean and professional.",
      rating: 5,
      gradient: "from-rose-500 to-red-600"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "Global Brand",
      content: "Simple, effective, and professional. Exactly what I needed to update my resume quickly.",
      rating: 5,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Emily Watson",
      role: "Recent Graduate",
      company: "StartUp Inc",
      content: "As a new graduate, this tool helped me present my skills professionally. Highly recommended.",
      rating: 5,
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm' : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-rose-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <Layers2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Rezumi ✦
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
              <Link to="/app" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
              <Link 
                to="/app" 
                className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm font-medium rounded-lg hover:from-slate-700 hover:to-slate-600 transition-all shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur border-t border-slate-100 px-6 py-4 space-y-3">
            <a href="#features" className="block py-2 text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#testimonials" className="block py-2 text-sm text-slate-600 hover:text-slate-900">Testimonials</a>
            <Link to="/app" className="block py-2 text-sm text-slate-600 hover:text-slate-900">Sign In</Link>
            <Link to="/app" className="block py-2 text-sm font-medium text-slate-900">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-100/40 to-red-100/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Hey, Guys</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
              Create a professional resume that 
              <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent"> gets you hired</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Build, customize, and download your resume in minutes. Our clean, ATS-friendly templates help you stand out to recruiters and land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link 
                to="/app"
                className="px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-medium rounded-lg hover:from-slate-700 hover:to-slate-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
              >
                Create Your Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-sm text-slate-500 flex items-center gap-2 pt-3 sm:pt-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Free to use, no credit card required
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white" />
                ))}
              </div>
              <p>Trusted by 10,000+ job seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600">
              Professional tools designed to help you create a resume that stands out and gets results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.bgLight} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
              Simple process, powerful results
            </h2>
            <p className="text-slate-600">
              Create your professional resume in three straightforward steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose your template",
                description: "Select from our collection of clean, professional designs tailored to your industry.",
                gradient: "from-rose-500 to-red-600",
                bgLight: "bg-rose-50"
              },
              {
                step: "2",
                title: "Fill in your details",
                description: "Add your experience, education, and skills with our easy-to-use form.",
                gradient: "from-emerald-500 to-teal-600",
                bgLight: "bg-emerald-50"
              },
              {
                step: "3",
                title: "Download and apply",
                description: "Export your resume as a PDF and start applying to your target positions.",
                gradient: "from-amber-500 to-orange-600",
                bgLight: "bg-amber-50"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} text-white flex items-center justify-center font-semibold text-lg shadow-md group-hover:scale-110 transition-transform`}>
                    {item.step}
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
              What our users say
            </h2>
            <p className="text-slate-600">
              Join thousands of professionals who have advanced their careers with our resume builder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.name}</div>
                    <div className="text-slate-500 text-xs">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-600 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Resumio
                </span>
              </Link>
              <p className="text-sm text-slate-600 max-w-xs">
                Professional resume building made simple. Create, customize, and download your resume in minutes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a></li>
                <li><a href="#templates" className="text-slate-600 hover:text-slate-900 transition-colors">Templates</a></li>
                <li><a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#help" className="text-slate-600 hover:text-slate-900 transition-colors">Help Center</a></li>
                <li><a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a></li>
                <li><a href="#privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 Rezumi ✦. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;