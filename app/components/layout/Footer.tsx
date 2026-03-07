'use client'

import Link from 'next/link'
import { ArrowRight, Rss, Zap } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/data/social'

function SocialIcon({ platform, size = 14 }: { platform: string; size?: number }) {
  const s = size
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const }
  switch (platform) {
    case 'LinkedIn': return <svg {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    case 'X': return <svg {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    case 'YouTube': return <svg {...props}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    case 'Facebook': return <svg {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    case 'Instagram': return <svg {...props}><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
    case 'Discord': return <svg {...props}><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
    case 'TikTok': return <svg {...props}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
    case 'Reddit': return <svg {...props}><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/></svg>
    case 'Pinterest': return <svg {...props}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
    case 'Medium': return <svg {...props}><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
    case 'Substack': return <svg {...props}><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
    case 'Bluesky': return <svg {...props}><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.625 3.502 6.204 3.258-4.247.646-7.98 2.402-4.477 8.212 3.858 5.652 5.539.403 7.65-3.596 2.11 3.999 3.174 8.898 7.648 3.596 3.503-5.81-.23-7.566-4.476-8.212 2.578.244 5.418-.631 6.203-3.258.247-.829.625-5.79.625-6.479 0-.688-.14-1.86-.903-2.203-.659-.299-1.664-.621-4.3 1.24C12.046 4.747 9.087 8.686 8 10.8h4z"/></svg>
    case 'Threads': return <svg {...props}><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.033 4.26-.678 5.089-1.217l.846 1.814c-1.07.657-3.542 1.434-5.93 1.476L12.186 24zm5.862-8.773c-.375-2.454-1.878-3.863-4.364-4.106a5.692 5.692 0 00-.453-.032c-1.207 0-2.2.473-2.88 1.37l1.645.96c.419-.603 1.05-.83 1.79-.727 1.003.14 1.654.768 1.894 1.818.164.73.15 1.467-.043 2.191-.413 1.524-1.614 2.407-3.32 2.407-1.256 0-2.312-.472-2.963-1.327-.614-.808-.837-1.889-.627-3.042.377-2.074 1.806-3.32 3.826-3.32.282 0 .574.027.869.082 2.868.531 4.406 2.518 4.406 5.331 0 3.818-2.494 6.22-6.512 6.268-2.502-.034-4.47-.859-5.725-2.416C5.006 16.944 4.482 14.743 4.47 12c.013-2.745.537-4.946 1.558-6.546 1.255-1.557 3.223-2.382 5.726-2.416 2.673.035 4.703.894 6.032 2.553.618.77 1.068 1.703 1.342 2.755l2.024-.562c-.344-1.327-.925-2.504-1.734-3.5C17.845 2.35 15.36 1.476 12.18 1.441h-.013c-3.18.036-5.664.91-7.223 2.844C3.726 5.817 3.124 8.312 3.1 11.992v.016c.024 3.68.625 6.175 1.845 7.707C6.502 21.549 8.986 22.423 12.166 22.459h.014c3.396-.041 5.543-1.816 5.981-4.854.083-.56.096-1.097.042-1.604z"/></svg>
    case 'Quora': return <svg {...props}><path d="M12.738 20.713c-.687-1.386-1.521-2.799-2.953-2.799-.434 0-.869.107-1.216.322l-.614-1.218c.708-.608 1.737-.948 2.94-.948 1.91 0 3.149.936 4.078 2.38.543-1.085.852-2.476.852-4.136 0-5.092-2.174-8.37-5.818-8.37-3.598 0-5.818 3.278-5.818 8.37 0 5.07 2.22 8.31 5.818 8.31.652 0 1.259-.1 1.818-.288l.913 1.377zM12.004 24C5.385 24 0 18.627 0 12S5.385 0 12.004 0C18.616 0 24 5.373 24 12s-5.384 12-11.996 12z"/></svg>
    case 'HackerNews': return <svg {...props}><path d="M0 0v24h24V0H0zm11.09 13.79V18h1.81v-4.21l4.11-7.33h-2.07l-2.93 5.45-2.93-5.45H7.01l4.08 7.33z"/></svg>
    case 'Kaggle': return <svg {...props}><path d="M18.825 23.726a.614.614 0 01-.506.274h-3.154a.627.627 0 01-.508-.249l-5.46-6.884-1.833 1.79v5.049c0 .393-.165.494-.372.494H4.503c-.208 0-.374-.093-.374-.494V.414c0-.4.166-.414.374-.414h2.489c.207 0 .372.014.372.414v13.81l6.962-7.165a.642.642 0 01.47-.199h3.355c.378 0 .473.295.252.508l-6.947 6.886 7.358 9.192c.17.254.083.48-.164.48z"/></svg>
    case 'Rumble': return <svg {...props}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 13.5l-6 4.5c-.825.619-1.5.206-1.5-.825V6.825c0-1.031.675-1.444 1.5-.825l6 4.5c.825.619.825 2.181 0 3z"/></svg>
    case 'Kick': return <svg {...props}><path d="M1.333 0C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.333 24h21.334c.736 0 1.333-.597 1.333-1.333V1.333C24 .597 23.403 0 22.667 0H1.333zm6 5.333h3.334v4.001L14 5.333h4l-4.667 5.334L18 16h-4l-3.333-4v4H7.333V5.333z"/></svg>
    case 'Gettr': return <svg {...props}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 9.2c-.016.176-.032.352-.048.528A8.092 8.092 0 0113.58 17.4a8.297 8.297 0 01-4.504 1.32 8.274 8.274 0 01-4.476-1.312c.224.024.456.04.688.04a5.862 5.862 0 003.632-1.252 2.928 2.928 0 01-2.732-2.032 2.942 2.942 0 001.32-.052 2.924 2.924 0 01-2.344-2.868v-.048c.4.22.852.352 1.336.368a2.918 2.918 0 01-.904-3.904 8.296 8.296 0 006.024 3.056 2.924 2.924 0 014.98-2.664 5.856 5.856 0 001.852-.708 2.934 2.934 0 01-1.284 1.616A5.86 5.86 0 0018.82 8.8a5.92 5.92 0 01-1.252 1.4z"/></svg>
    case 'Parler': return <svg {...props}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.2 18H8.4V6h4.8c2.648 0 4.8 2.152 4.8 4.8s-2.152 4.8-4.8 4.8h-2.4v2.4zm0-4.8h2.4c1.324 0 2.4-1.076 2.4-2.4s-1.076-2.4-2.4-2.4h-2.4v4.8z"/></svg>
    default: return <Rss size={s} />
  }
}

const FOOTER_LINKS = {
  Services: [
    { label: 'ACRA (Free)', href: '/services/acra' },
    { label: 'AEO Audit', href: '/services/aeo-audit' },
    { label: 'GEO Implementation', href: '/services/geo-implementation' },
    { label: 'Authority Building', href: '/services/authority-building' },
    { label: 'Blog Creator Engine', href: '/services/agent-ready-blog-creator' },
    { label: 'UCP Implementation', href: '/services/ucp-implementation' },
    { label: 'ACP Integration', href: '/services/acp-integration' },
    { label: 'AP2 Trust Layer', href: '/services/ap2-trust-layer' },
  ],
  Protocols: [
    { label: 'Protocol Overview', href: '/protocols' },
    { label: 'Universal Commerce (UCP)', href: '/protocols/ucp' },
    { label: 'Agentic Commerce (ACP)', href: '/protocols/acp' },
    { label: 'Agent Payments (AP2)', href: '/protocols/ap2' },
  ],
  Resources: [
    { label: 'Insights', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Research', href: '/resources' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Free Tools', href: '/tools/token-calculator' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>

      {/* Newsletter CTA */}
      <div style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="badge mb-3">
                <Zap size={10} />
                Agentic Commerce Weekly
              </div>
              <h2
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                Stay ahead of the protocol curve
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                UCP, ACP, and AP2 updates, implementation guides, and AI commerce intelligence — every week.
              </p>
            </div>
            <form
              className="flex gap-2 w-full lg:w-auto"
              action="/api/newsletter"
              method="POST"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(14,165,233,0.4)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button type="submit" className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap">
                Subscribe
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Adam Silva Consulting — Home" className="block mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-full.svg"
                alt="Adam Silva Consulting — Global Infrastructure for Agentic Commerce"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-muted-2)' }}>
              The definitive authority for UCP, ACP, and AP2 protocol implementation.
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              {SOCIAL_LINKS.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  title={platform}
                  className="p-1.5 rounded-md transition-all duration-150"
                  style={{ color: 'var(--color-muted-2)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,165,233,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted-2)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  }}
                >
                  <SocialIcon platform={platform} size={13} />
                </a>
              ))}
              <a
                href="/feed.xml"
                aria-label="RSS Feed"
                title="RSS Feed"
                className="p-1.5 rounded-md transition-all duration-150"
                style={{ color: 'var(--color-muted-2)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,165,233,0.08)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted-2)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                }}
              >
                <Rss size={13} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-2)' }}
              >
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150 hover:text-[var(--color-accent)]"
                      style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}>
            © {new Date().getFullYear()} Adam Silva Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
            {[
              { label: 'Terms', href: '/terms' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Glossary', href: '/glossary' },
              { label: 'Sitemap', href: '/sitemap' },
              { label: 'UCP Manifest', href: '/.well-known/ucp/manifest.json', title: 'AI Agent Discovery' },
            ].map(({ label, href, title }) => (
              <a
                key={label}
                href={href}
                title={title}
                className="transition-colors hover:text-[var(--color-accent)]"
                style={{ color: 'var(--color-muted-2)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
