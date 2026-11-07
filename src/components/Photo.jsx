import { useState } from 'react';

// Image with an elegant monogram fallback, so the page stays beautiful
// even before the original photographs are placed in /public/assets.
export default function Photo({ src, alt, label = 'S ♥ H', position = 'center 25%', eager = false, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`photo-fallback ${className}`} role="img" aria-label={alt} {...rest}>
        <span>{label}</span>
      </div>
    );
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{ objectPosition: position }}
      onError={() => setFailed(true)}
      draggable="false"
      {...rest}
    />
  );
}
