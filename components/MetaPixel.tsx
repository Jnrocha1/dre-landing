'use client'

import Script from 'next/script'
import { META_PIXEL_ID } from '@/lib/meta-pixel'

// Código-base padrão do Meta Pixel. Só renderiza se NEXT_PUBLIC_META_PIXEL_ID estiver
// configurado na Vercel — sem essa env var, esse componente não injeta nada (o site continua
// funcionando normalmente, só sem tracking, em vez de quebrar ou mandar eventos pra um pixel
// inexistente). Assim que a env var for adicionada e o projeto redeployado, o pixel liga sozinho,
// sem precisar de nenhuma mudança de código.
export function MetaPixel() {
  if (!META_PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
