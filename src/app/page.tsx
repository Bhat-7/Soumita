import type { ReactNode } from 'react';
import { Header } from '@/components/header/Header';
import {
  CertificationsStation,
  ContactStation,
  IntroStation,
  RecommendationsStation,
  RoleStation,
  SkillsStation,
} from '@/components/stations/Stations';
import { TimeTunnel, type TunnelStation } from '@/components/tunnel/TimeTunnel';
import {
  FORMSPREE_ENDPOINT,
  certifications,
  practice,
  profile,
  recommendations,
  roles,
  toolkit,
} from '@/data/portfolio';

type StationSpec = Omit<TunnelStation, 'content'> & { render: (index: number) => ReactNode };

export default function Home() {
  const presentYear = new Date().getFullYear();
  const firstYear = roles[0]?.start.year ?? presentYear;

  // Journey order: where it started → each role, oldest first → what she carries today → contact.
  const specs: StationSpec[] = [
    {
      id: 'intro',
      label: 'Start',
      caption: 'Where the journey begins',
      year: firstYear,
      hue: 'cobalt',
      render: () => <IntroStation profile={profile} roles={roles} firstStopId={roles[0]?.id ?? 'toolkit'} />,
    },
    ...roles.map<StationSpec>((role) => ({
      id: role.id,
      label: role.short,
      caption: `${role.company} · ${role.role}`,
      year: role.start.year,
      hue: role.hue,
      render: (i) => <RoleStation role={role} index={i} />,
    })),
    {
      id: 'toolkit',
      label: 'Toolkit',
      caption: 'Technical expertise',
      year: presentYear,
      hue: 'teal',
      render: (i) => <SkillsStation index={i} label="Toolkit" title="The toolkit" groups={toolkit} />,
    },
    {
      id: 'practice',
      label: 'Practice',
      caption: 'How the work gets done',
      year: presentYear,
      hue: 'sun',
      render: (i) => <SkillsStation index={i} label="Practice" title="How I work" groups={practice} />,
    },
    {
      id: 'certified',
      label: 'Certified',
      caption: 'Credentials',
      year: presentYear,
      hue: 'magenta',
      render: (i) => <CertificationsStation index={i} items={certifications} />,
    },
    ...(recommendations.length > 0
      ? [
          {
            id: 'reviews',
            label: 'Reviews',
            caption: 'Recommendations',
            year: presentYear,
            hue: 'tangerine' as const,
            render: (i: number) => <RecommendationsStation index={i} items={recommendations} />,
          },
        ]
      : []),
    {
      id: 'contact',
      label: 'Contact',
      caption: 'Arrival · present day',
      year: presentYear,
      hue: 'ink',
      render: (i) => <ContactStation index={i} profile={profile} endpoint={FORMSPREE_ENDPOINT} />,
    },
  ];

  const stations: TunnelStation[] = specs.map(({ render, ...spec }, i) => ({
    ...spec,
    content: render(i),
  }));

  return (
    <>
      <Header
        profile={profile}
        nav={[
          { label: 'Journey', href: `#${roles[0]?.id ?? 'intro'}` },
          { label: 'Skills', href: '#toolkit' },
          { label: 'Certifications', href: '#certified' },
          { label: 'Contact', href: '#contact' },
        ]}
      />
      <main>
        <TimeTunnel stations={stations} presentYear={presentYear} />
      </main>
    </>
  );
}
