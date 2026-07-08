import { useEffect } from 'react';

export function useStructuredData() {
  useEffect(() => {
    if (document.getElementById('structured-data')) return;

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://caioreisdev.com/#person',
          name: 'Caio Reis',
          jobTitle: ['Backend Developer', 'Software Engineer'],
          description:
            'Software engineer and backend developer based in Rio de Janeiro, Brazil, specialized in APIs, Node.js, Python, Golang, databases, Docker and scalable system architecture.',
          url: 'https://caioreisdev.com/',
          image: 'https://caioreisdev.com/Me.png',
          sameAs: [
            'https://github.com/caio-rds',
            'https://www.linkedin.com/in/caio-reis-04224a20a/',
          ],
          knowsAbout: [
            'Backend Development',
            'API Development',
            'Node.js',
            'TypeScript',
            'Python',
            'Golang',
            'SQL Server',
            'PostgreSQL',
            'MongoDB',
            'Redis',
            'Docker',
            'Microservices',
            'System Architecture',
            'Domain-Driven Design',
            'CI/CD',
            'Automated Testing',
          ],
          homeLocation: {
            '@type': 'Place',
            name: 'Rio de Janeiro, RJ, Brazil',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://caioreisdev.com/#website',
          url: 'https://caioreisdev.com/',
          name: 'Caio Reis Portfolio',
          inLanguage: ['pt-BR', 'en'],
          publisher: { '@id': 'https://caioreisdev.com/#person' },
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
}