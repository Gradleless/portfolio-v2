import type { PortfolioData } from '$lib/types/portfolio';

export const portfolioData: PortfolioData = {
	name: 'Lycia Dufour',
	title: 'Développeuse',
	location: 'Lille, France',
	about:
		"Je suis une développeuse web fullstack. Je suis une personne qui aime et est passionnée par la beauté, c'est pourquoi mes travaux sont réalisés aussi soigneusement que possible.",
	education: [
		{
			period: '2020 - 2023',
			description: 'STI2D opt. SIN (Systèmes d\'Information et Numérique)'
		},
	],
	certifications: [
		'Baccaulauréat STI2D opt. SIN',
	],
	languages: [
		'Français (Natif)', 
		'Anglais (B2)', 
		'Espagnol (C2)'
	],
	experiences: [
		{
			title: 'Développeuse Web Freelance',
			period: '2023 - Maintenant',
			description:
				"Je travaille comme freelance pour divers projets, notamment dans la conception d'applications web fullstack avec des technologies modernes"
		},
		{
			title: 'Festi Pizza',
			period: 'Annoeullin, France',
			description:
				"Conception d'une application avec Svelte(kit) et Tailwindcss, pour la gestion des commandes et la présentation des menus en ligne."
		},
		{
			title: 'Vitalliance',
			period: 'France',
			description:
				"Conception d'une application pour les auxiliaires de vie en utilisant Wails.js, React, et Tailwindcss. Interaction avec l'API de Vitalliance."
		},
		{
			title: 'Anhost',
			period: 'France',
			description:
				"Conception d'une application hébergeur basée sur Svelte(kit) et Tailwindcss, avec intégration de bases de données PostgreSQL et Prisma, et utilisation de Golang pour une partie du backend."
		}
	],
	interests: ['Lecture', 'Écriture', 'Musique', 'Cyberpunk', 'FL Studio'],
	technologies: [
		{
			src: 'svelte',
			alt: 'Svelte',
			href: 'https://svelte.dev'
		},
		{
			src: 'tailwindcss',
			alt: 'Tailwind CSS',
			href: 'https://tailwindcss.com'
		},
		{
			src: 'postgresql',
			alt: 'PostgreSQL',
			href: 'https://www.postgresql.org'
		},
		{
			src: 'typescriptlang',
			alt: 'TypeScript',
			href: 'https://www.typescriptlang.org'
		},
		{
			src: 'reactjs',
			alt: 'Node',
			href: 'https://reactjs.org'
		},
		{
			src: 'nextjs',
			alt: 'Next.js',
			href: 'https://nextjs.org'
		},
		{
			src: 'nodejs',
			alt: 'Nodejs',
			href: 'https://nodejs.org'
		},
		{
			src: "go",
			alt: "Golang",
			href: "https://golang.org"
		},
		{
			src: 'vercel',
			alt: 'Vercel',
			href: 'https://vercel.com'
		},
		{
			src: 'mongodb',
			alt: 'MongoDB',
			href: 'https://www.mongodb.com'
		},
		{
			src: 'prisma',
			alt: 'Prisma',
			href: 'https://www.prisma.io'
		},
		{
			src: "wails",
			alt: "Wails",
			href: "https://wails.io"
		},
		{
			src: 'docker',
			alt: 'Docker',
			href: 'https://www.docker.com'
		},
		{
			src: 'github',
			alt: 'GitHub',
			href: 'https://github.com'
		},
		{
			src: 'gitlab',
			alt: 'GitLab',
			href: 'https://gitlab.com'
		},
	],
	contact: [
		{
			href: 'mailto:lycia.dufour@gmail.com',
			icon: 'IconMailForward',
			text: 'lycia.dufour@gmail.com'
		},
		{
			href: 'https://fr.linkedin.com/in/lycia-dufour-3ab8302b3',
			icon: 'IconBrandLinkedin',
			text: 'Lycia Dufour'
		},
		{ href: 'https://github.com/gradleless', icon: 'IconBrandGithub', text: 'Gradleless' }
	]
};
