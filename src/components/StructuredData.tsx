'use client';

import Script from 'next/script';

interface StructuredDataProps {
  type?: 'WebSite' | 'SoftwareApplication';
  data: any;
}

export default function StructuredData({ type = 'WebSite', data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
