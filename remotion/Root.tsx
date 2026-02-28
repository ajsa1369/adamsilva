import { Composition } from 'remotion'
import { BlogSummaryVideo, type BlogSummaryProps } from './BlogSummary/BlogSummaryVideo'

const DEFAULT_PROPS: BlogSummaryProps = {
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

// 30fps: 4s title + 4×5s key points + 4s CTA = 28s total = 840 frames
const DURATION_FRAMES = 840

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BlogSummary"
        component={BlogSummaryVideo}
        durationInFrames={DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_PROPS}
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
    </>
  )
}
