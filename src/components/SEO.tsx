import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

const SITE_URL = 'https://amit-sarode.github.io';
const OG_IMAGE = `${SITE_URL}/og-preview-card.svg`;

const SEO: React.FC<SEOProps> = ({ title, description, path = '/', noindex }) => {
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};

export default SEO;
