import { personalInfo } from "@/data/portfolio";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  mail: <Mail size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-border-dark-subtle">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-text-dark-secondary">
            © {new Date().getFullYear()} {personalInfo.shortName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {personalInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-500 dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-400 transition-colors"
                aria-label={social.name}
              >
                {iconMap[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
