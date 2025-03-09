'use client';

import { useEffect } from 'react';

// Professional portfolio structured data for better search results
export default function StructuredData() {
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window !== 'undefined') {
      // Create the structured data script
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');

      // Portfolio person schema
      const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Caio Reis',
        jobTitle: 'Backend Developer',
        description:
          'Software engineer specialized in backend development, Node.js, Python, and system architecture',
        url: 'https://caioreisdev.com',
        sameAs: [
          'https://github.com/caio-rds',
          'https://www.linkedin.com/in/caio-reis-04224a20a/',
        ],
        knowsAbout: [
          'Node.js',
          'Python',
          'Golang',
          'Database Design',
          'API Development',
          'System Architecture',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
      };

      script.textContent = JSON.stringify(personSchema);
      document.head.appendChild(script);

      return () => {
        // Clean up on component unmount
        document.head.removeChild(script);
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
