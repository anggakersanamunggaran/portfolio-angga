import { personalInfo } from "@/data/portfolio";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ctaSolid } from "@/components/ui/cta";

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
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s work{" "}
              <em className="accent-serif whitespace-nowrap">together</em>
            </>
          }
          description="Have a project in mind or just want to chat? I'm always open to new opportunities and interesting conversations."
        />

        {/* Same hairline grid as the offerings section. */}
        <div className="mt-14 grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group border-b border-r border-rule p-6 transition-colors hover:bg-neutral-50"
            >
              <span className="text-ink">{iconMap[link.icon]}</span>
              <h3 className="label-micro mt-6 text-ink">{link.label}</h3>
              <p className="mt-2 truncate text-sm font-medium text-ink">
                {link.value}
              </p>
              <p className="mt-1 text-xs text-muted">{link.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Based in {personalInfo.location}, working remotely with teams across time
            zones.
          </p>
          <a
            href={`mailto:${personalInfo.email}?subject=Hello%20Angga`}
            className={ctaSolid}
          >
            Send me an email
            <Send size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
