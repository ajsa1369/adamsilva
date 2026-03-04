import { Composition } from 'remotion'
import { BlogSummaryVideo, type BlogSummaryProps } from './BlogSummary/BlogSummaryVideo'
import { HomepageExplainerVideo, type HomepageExplainerProps } from './HomepageExplainer/HomepageExplainerVideo'
import { HeroAdVideo, type HeroAdProps } from './HeroAd/HeroAdVideo'

const DEFAULT_BLOG_PROPS: BlogSummaryProps = {
  title: 'The Agentic Commerce Protocols: UCP, ACP, and AP2',
  excerpt: 'Three protocols are reshaping commerce. UCP enables agent discovery, ACP enables agent checkout, AP2 enables agent payments with cryptographic trust.',
  keyPoints: [
    'UCP lets AI agents discover your entire product catalog via a single manifest endpoint',
    'ACP enables ChatGPT and AI agents to complete purchases programmatically using Stripe SPT',
    'AP2 mandates cryptographic Verifiable Credentials for all agentic transactions',
    'Enterprises that implement all three protocols are positioned to capture agent-mediated commerce',
  ],
  author: 'Adam Silva',
  category: 'Protocols',
  slug: 'agentic-commerce-protocols-ucp-acp-ap2',
  protocols: ['UCP', 'ACP', 'AP2'],
}

const DEFAULT_EXPLAINER_PROPS: HomepageExplainerProps = {
  testimonialQuote: "Adam's UCP implementation made our entire product catalog discoverable by AI shopping agents within two weeks.",
  testimonialAuthor: 'Sarah Chen, VP Digital Strategy, Meridian Commerce',
}

// BlogSummary: 30fps × 28s = 840 frames
const BLOG_DURATION = 840

// HomepageExplainer: 30fps × 74.97s = 2249 frames (matched to Delia narration w/ ACRA CTA)
const EXPLAINER_DURATION = 2249

// HeroAd: 30fps × 45.9s = 1379 frames (matched to Aurora narration)
const HERO_AD_DURATION = 1379

const DEFAULT_HERO_AD_PROPS: HeroAdProps = {
  tagline: 'AI Agents. Lead Gen. Advertising. Results.',
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BlogSummary"
        component={BlogSummaryVideo}
        durationInFrames={BLOG_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_BLOG_PROPS}
        calculateMetadata={({ props }) => {
          const fps = 30
          const titleDuration = fps * 4
          const pointDuration = fps * 5
          const ctaDuration = fps * 4
          const totalKeyPoints = Math.min(props.keyPoints.length, 4)
          const total = titleDuration + totalKeyPoints * pointDuration + ctaDuration
          return { durationInFrames: total }
        }}
      />

      <Composition
        id="HomepageExplainer"
        component={HomepageExplainerVideo}
        durationInFrames={EXPLAINER_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_EXPLAINER_PROPS}
      />

      <Composition
        id="HeroAd"
        component={HeroAdVideo}
        durationInFrames={HERO_AD_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_HERO_AD_PROPS}
      />
    </>
  )
}
