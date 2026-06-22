import { personalInfo } from "@/data/portfolio";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  mail: <Mail size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
};

const contactLinks = [
  {
    label: "Email",
    value: personalInfo.email,
    url: `mailto:${personalInfo.email}`,
    icon: "mail",
    description: "Best way to reach me",
  },
  {
    label: "WhatsApp",
    value: "+62 813-2423-0307",
    url: "https://wa.me/6281324230307",
    icon: "whatsapp",
    description: "Fast response",
  },
  {
    label: "GitHub",
    value: "anggakersanamunggaran",
    url: "https://github.com/anggakersanamunggaran",
    icon: "github",
    description: "Code & open source",
  },
  {
    label: "LinkedIn",
    value: "/in/angga-munggaran/",
    url: "https://www.linkedin.com/in/angga-munggaran/",
    icon: "linkedin",
    description: "Professional profile",
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            Get in Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
            Let&apos;s work together
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            Have a project in mind or just want to chat? I&apos;m always open to
            new opportunities and interesting conversations.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600/50 hover:shadow-md hover:shadow-brand-950/5 dark:hover:shadow-black/20 transition-all duration-300 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                {iconMap[link.icon]}
              </div>
              <h4 className="text-sm font-semibold text-brand-primary dark:text-white mb-1">
                {link.label}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 line-clamp-1">
                {link.value}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {link.description}
              </p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`mailto:${personalInfo.email}?subject=Hello%20Angga`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary dark:bg-white text-white dark:text-brand-primary font-medium text-sm hover:bg-brand-accent dark:hover:bg-brand-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Send size={16} />
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
}
