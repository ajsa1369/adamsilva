/**
 * Centralized social media links for Adam Silva Consulting.
 * Used by Footer, organization schema, person schema, and anywhere else social links appear.
 */

export type SocialLink = {
  platform: string
  url: string
  /** Show in the website footer icon row */
  showInFooter: boolean
}

/** Company social profiles (Adam Silva Consulting brand accounts) */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/adam-silva-consulting', showInFooter: true },
  { platform: 'X', url: 'https://x.com/adamsilvacons', showInFooter: true },
  { platform: 'YouTube', url: 'https://www.youtube.com/@AdamSilvaConsulting', showInFooter: true },
  { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61575089498498', showInFooter: true },
  { platform: 'Instagram', url: 'https://www.instagram.com/adamsilvaconsulting', showInFooter: true },
  { platform: 'Threads', url: 'https://www.threads.net/@adamsilvaconsulting', showInFooter: false },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@adamsilvaconsulting', showInFooter: false },
  { platform: 'Reddit', url: 'https://www.reddit.com/user/AdamSilvaConsulting', showInFooter: false },
  { platform: 'Pinterest', url: 'https://www.pinterest.com/adamsilvaconsulting', showInFooter: false },
  { platform: 'Quora', url: 'https://www.quora.com/profile/Adam-Silva-Consulting', showInFooter: false },
  { platform: 'Medium', url: 'https://medium.com/@adamsilvaconsulting', showInFooter: false },
  { platform: 'Substack', url: 'https://adamsilvaconsulting.substack.com', showInFooter: false },
  { platform: 'Bluesky', url: 'https://bsky.app/profile/adamsilvaconsulting.bsky.social', showInFooter: false },
  { platform: 'Discord', url: 'https://discord.gg/adam-silva-consulting', showInFooter: true },
  // GitHub omitted — private repo, security concern
  { platform: 'HackerNews', url: 'https://news.ycombinator.com/user?id=adamsilvacons', showInFooter: false },
  { platform: 'Kaggle', url: 'https://www.kaggle.com/adamsilvaconsulting', showInFooter: false },
  { platform: 'Rumble', url: 'https://rumble.com/user/AdamSilvaConsulting', showInFooter: false },
  { platform: 'Kick', url: 'https://kick.com/adamsilvaconsulting', showInFooter: false },
  { platform: 'Gettr', url: 'https://gettr.com/user/adamsilvaconsulting', showInFooter: false },
  { platform: 'Parler', url: 'https://app.parler.com/adamsilvaconsulting', showInFooter: false },
]

/** All social profile URLs — used for schema.org sameAs */
export const SOCIAL_URLS = SOCIAL_LINKS.map(l => l.url)

/** Footer-visible social links only */
export const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS.filter(l => l.showInFooter)

/** Adam Silva's personal profiles (different from company pages) */
export const PERSONAL_SOCIAL_LINKS = [
  'https://www.linkedin.com/in/adamsilvacons',
  'https://x.com/adamsilvacons',
]
