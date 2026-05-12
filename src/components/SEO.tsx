import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
};

const SITE_URL = 'https://amit-sarode.github.io';
const OG_IMAGE = `${SITE_URL}/og-preview-card.svg`;

const SEO: React.FC<SEOProps> = ({ title, description, path = '/' }) => {
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
    </Helmet>
  );
};

export default SEO;
