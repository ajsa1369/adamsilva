import { Composition } from 'remotion';
import { InsightsVideo } from './compositions/InsightsVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InsightsVideo"
        component={InsightsVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'The Agentic Commerce Protocols: UCP, ACP, and AP2',
          subtitle: 'Global Infrastructure for Agentic Commerce',
          category: 'Technical Deep Dive',
          date: 'January 15, 2026'
        }}
      />
      <Composition
        id="ServiceHighlight"
        component={InsightsVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'AI-Powered Marketing Solutions',
          subtitle: 'Global Infrastructure for Agentic Commerce',
          category: 'Service Highlight',
          date: ''
        }}
      />
      <Composition
        id="BrandAnnouncement"
        component={InsightsVideo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'Adam Silva Consulting',
          subtitle: 'Global Infrastructure for Agentic Commerce',
          category: 'Brand Announcement',
          date: ''
        }}
      />
    </>
  );
};
