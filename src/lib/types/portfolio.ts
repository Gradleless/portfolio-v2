interface Education {
    period: string;
    description: string;
}

interface Experience {
    title: string;
    period: string;
    description: string;
}

interface Technology {
    src: string;
    alt: string;
	href: string;
}

interface ContactItem {
    href: string;
    icon: string;
    text: string;
}

interface PortfolioData {
	name: string;
	title: string;
	location: string;
	about: string;
	education: Education[];
	certifications: string[];
	languages: string[];
	experiences: Experience[];
	interests: string[];
	technologies: Technology[];
	contact: ContactItem[];
}

export type { PortfolioData, Education, Experience, Technology, ContactItem };