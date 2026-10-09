import { Trophy, Users, Calendar, Clock, MapPin, Award, ArrowRight, Image, Video, Shield, Crown, Star } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { matches, cricketTeams } from '../data/mockDb';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';


// Naidupalli Pirates Player Data (from extracted assets)
const piratesPlayers = [
  { id: 1, name: 'Prasanth', image: '/cricket-players/1.Prasanth.jpg' },
  { id: 2, name: 'Pranav', image: '/cricket-players/2.Pranav.jpg' },
  { id: 3, name: 'Mysur', image: '/cricket-players/3.Mysur.jpg' },
  { id: 4, name: 'Venkatesh', image: '/cricket-players/4.Venkatesh.jpg' },
  { id: 5, name: 'Subbarayudu', image: '/cricket-players/5.Subbarayudu.jpg' },
  { id: 6, name: 'Prathap', image: '/cricket-players/6.Prathap.jpg' },
  { id: 7, name: 'Praneeth', image: '/cricket-players/7.Praneeth.jpg' },
  { id: 8, name: 'Srikanth', image: '/cricket-players/8.Srikanth.jpg' },
  { id: 9, name: 'Mahesh', image: '/cricket-players/9.Mahesh.jpg' },
  { id: 10, name: 'Chandraprathap', image: '/cricket-players/10.Chandraprathap.jpg' },
  { id: 11, name: 'Sudhakar', image: '/cricket-players/11.Sudhakar.jpg' },
  { id: 12, name: 'Gopichand', image: '/cricket-players/12.Gopichand.jpg' },
  { id: 13, name: 'Sridhar', image: '/cricket-players/13.Sridhar.jpg' },
  { id: 14, name: 'Manmohan', image: '/cricket-players/14.Manmohan.jpg' },
  { id: 15, name: 'Asif', image: '/cricket-players/15.Asif.jpg' },
  { id: 16, name: 'Vikram', image: '/cricket-players/16.Vikram.jpg' },
  { id: 17, name: 'Nagarjuna', image: '/cricket-players/16(A).Nagarjuna.jpeg' },
  { id: 18, name: 'Sasi', image: '/cricket-players/16(b).Sasi.jpeg' },
  { id: 19, name: 'Prasanna', image: '/cricket-players/17.Prasanna.jpg' },
  { id: 20, name: 'Shekhar', image: '/cricket-players/18.Shekhar.jpg' },
  { id: 21, name: 'Ramu', image: '/cricket-players/19.Ramu.jpg' },
  { id: 22, name: 'Lakshman', image: '/cricket-players/20.Lakshman.jpg' },
  { id: 23, name: 'Harikrishna', image: '/cricket-players/21.Harikrishna.jpg' },
  { id: 24, name: 'Ravi', image: '/cricket-players/22.Ravi.jpg' },
  { id: 25, name: 'Manohar', image: '/cricket-players/23.Manohar.jpg' },
  { id: 26, name: 'Srinu', image: '/cricket-players/24.Srinu.jpg' },
  { id: 27, name: 'Sriman', image: '/cricket-players/25.Sriman.jpg' },
  { id: 28, name: 'Om Prathap', image: '/cricket-players/26.Om Prathap.jpg' },
  { id: 29, name: 'Manoj', image: '/cricket-players/27.Manoj.jpg' },
  { id: 30, name: 'Hari', image: '/cricket-players/28.Hari.jpg' },
  { id: 31, name: 'Venu', image: '/cricket-players/28(a).Venu.jpeg' },
  { id: 32, name: 'Siddu', image: '/cricket-players/29.Siddu.jpg' },
  { id: 33, name: 'Santhosh', image: '/cricket-players/30.Santhosh.jpg' },
  { id: 34, name: 'Sapthanidhi', image: '/cricket-players/31.Sapthanidhi.jpg' },
  { id: 35, name: 'Keshav', image: '/cricket-players/32.Keshav.jpg' },
  { id: 36, name: 'Srinidhi', image: '/cricket-players/33.Srinidhi.jpg' },
  { id: 37, name: 'Bunny', image: '/cricket-players/34.Bunny.jpg' },
];

const piratesTrophies = [
  {
    id: 1,
    title: 'Champions',
    tournament: 'Bhyravaram',
    image: '/cricket-trophies/1.png',
    icon: 'ðŸ†',
    type: 'champions',
  },
  {
    id: 2,
    title: 'Runners Up',
    tournament: 'Nallakonda',
    image: '/cricket-trophies/2.png',
    icon: 'ðŸ¥ˆ',
    type: 'runners',
  },
  {
    id: 3,
    title: 'Champions',
    tournament: 'Duttalur',
    image: '/cricket-trophies/3.png',
    icon: 'ðŸ†',
    type: 'champions',
  },
  {
    id: 4,
    title: 'Trophy Collection',
    tournament: 'Naidupalli Pirates',
    image: '/cricket-trophies/4.png',
    icon: 'ðŸ†',
    type: 'collection',
  },
];

const piratesGalleryImages = [
  '1.png',
  '1.Prasanth.jpg',
  '2.Pranav.jpg',
  '3.Mysur.jpg',
  '4.Venkatesh.jpg',
  '5.Subbarayudu.jpg',
  '6.Prathap.jpg',
  '7.Praneeth.jpg',
  '8.Srikanth.jpg',
  '9.Mahesh.jpg',
  '10.Chandraprathap.jpg',
  '11.Sudhakar.jpg',
  '12.Gopichand.jpg',
  '13.Sridhar.jpg',
  '14.Manmohan.jpg',
  '15.Asif.jpg',
  '16.Vikram.jpg',
  '16(A).Nagarjuna.jpeg',
  '16(b).Sasi.jpeg',
  '17.Prasanna.jpg',
  '18.Shekhar.jpg',
  '19.Ramu.jpg',
  '20.Lakshman.jpg',
  '21.Harikrishna.jpg',
  '22.Ravi.jpg',
  '23.Manohar.jpg',
  '24.Srinu.jpg',
  '25.Sriman.jpg',
  '26.Om Prathap.jpg',
  '27.Manoj.jpg',
  '28.Hari.jpg',
  '28(a).Venu.jpeg',
  '29.Siddu.jpg',
  '30.Santhosh.jpg',
  '31.Sapthanidhi.jpg',
  '32.Keshav.jpg',
  '33.Srinidhi.jpg',
  '34.Bunny.jpg',
  'IMG-20250111-WA0004.jpg',
  'IMG-20250116-WA0014.jpg',
  'IMG-20250116-WA0018.jpg',
  'IMG-20250116-WA0021.jpg',
  'IMG-20250116-WA0022.jpg',
  'IMG-20250116-WA0027.jpg',
  'IMG-20250116-WA0032.jpg',
  'IMG-20250116-WA0035.jpg',
  'IMG-20250116-WA0042.jpg',
  'IMG-20250116-WA0044.jpg',
  'IMG-20250116-WA0045.jpg',
  'IMG-20250116-WA0047.jpg',
  'IMG-20250116-WA0048.jpg',
  'IMG-20250116-WA0050.jpg',
  'IMG-20250116-WA0054.jpg',
  'IMG-20250116-WA0056.jpg',
  'IMG-20250116-WA0057.jpg',
  'IMG-20250116-WA0058.jpg',
  'IMG-20250116-WA0059.jpg',
  'IMG-20250116-WA0060.jpg',
  'IMG-20250116-WA0062.jpg',
  'IMG-20250116-WA0065.jpg',
  'IMG-20250116-WA0070.jpg',
  'IMG-20250116-WA0077.jpg',
  'IMG-20250116-WA0079.jpg',
  'IMG-20250116-WA0083.jpg',
  'IMG-20250116-WA0089.jpg',
  'IMG-20250116-WA0094.jpg',
  'IMG-20250116-WA0095.jpg',
  'IMG-20250116-WA0098.jpg',
  'IMG-20250116-WA0102.jpg',
  'IMG-20250119-WA0002.jpg',
  'IMG-20250119-WA0007.jpg',
  'IMG-20250119-WA0015.jpg',
  'IMG-20250119-WA0018.jpg',
  'IMG-20250119-WA0019.jpg',
  'IMG-20250119-WA0020.jpg',
  'IMG-20250120-WA0001.jpg',
  'IMG-20250120-WA0002.jpg',
  'IMG-20250120-WA0004.jpg',
  'IMG-20250120-WA0005.jpg',
  'IMG-20250120-WA0007.jpg',
  'IMG-20250120-WA0013.jpg',
  'IMG-20250120-WA0015.jpg',
  'IMG-20250120-WA0021.jpg',
  'IMG-20250120-WA0022.jpg',
  'IMG-20250120-WA0023.jpg',
  'IMG-20250120-WA0024.jpg',
  'IMG-20250120-WA0025.jpg',
  'IMG-20250120-WA0030.jpg',
  'IMG-20250120-WA0033.jpg',
  'IMG-20250120-WA0034.jpg',
  'IMG_20250123_181753_414.jpg',
  'IMG_20250123_181753_487.jpg',
  'Naidupalli-Pirates-logo.png',
  'Pirates-logo.jpeg',
  'Team.jpg',
];

const piratesVideos = [
  'VID-20250116-WA0103.mp4',
  'VID-20250116-WA0104.mp4',
  'VID-20250116-WA0106.mp4',
  'VID-20250116-WA0107.mp4',
  'VID-20250117-WA0012.mp4',
  'VID-20250119-WA0023.mp4',
  'VID-20250120-WA0036.mp4',
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="primary">Upcoming</Badge>;
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    case 'live':
      return <Badge variant="emergency">Live</Badge>;
    default:
      return <Badge variant="gray">{status}</Badge>;
  }
};

export function CricketPage() {
  const { t } = useLanguage();

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const completedMatches = matches.filter(m => m.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section - Naidupalli Pirates Branding */}
      <section className="relative mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-gold/10" />
        <div className="relative z-10">
          <Card variant="outlined" padding="none" className="border-primary/20 overflow-hidden relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/cricket-players/Team.jpg"
                alt="Naidupalli Pirates Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
            </div>
            <div className="relative z-10 p-6 md:p-10 lg:p-14">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 px-4 py-2 rounded-full mb-4">
                    <Shield size={18} className="text-white" />
                    <span className="text-sm font-semibold text-white uppercase tracking-wide">{t('cricket.title')}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                    NAIDUPALLI<br />
                    <span className="text-gold">PIRATES</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto md:mx-0">
                    {t('cricket.tagline')}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
                    <Link to="/cricket#players">
                      <Button variant="secondary" size="lg" className="gap-2 bg-white/20 hover:bg-white/30 border-white/30 text-white">
                        {t('cricket.squad')}
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                    <Link to="/cricket#gallery">
                      <Button variant="secondary" size="lg" className="gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white">
                        <Image size={20} />
                        {t('cricket.gallery')}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="w-80 h-80 mx-auto">
                    <div className="w-full h-full rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                      <img
                        src="/cricket-players/Naidupalli-Pirates-logo.png"
                        alt="Naidupalli Pirates Logo"
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pirates Squad Section */}
      <section id="players" className="mb-16">
        <SectionHeader title={t('cricket.squad')} subtitle={t('cricket.squadSubtitle')} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {piratesPlayers.map((player) => (
            <Card key={player.id} variant="default" hoverable padding="sm" className="text-center h-full">
              <CardContent className="p-3">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <img
                    src={player.image}
                    alt={t(player.name)}
                    loading="lazy"
                    className="w-full h-full rounded-xl object-cover border-2 border-primary/20 hover:border-primary/50 transition-colors"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="40" fill="%23e5e7eb"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%239ca3af" font-size="12"%3E%3F%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                    <Users size={12} className="text-white" />
                  </div>
                </div>
                <h4 className="font-semibold text-text-primary text-sm leading-tight">{t(player.name)}</h4>
                <p className="text-xs text-text-secondary">{t('Naidupalli Pirates')}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Badge variant="primary" className="text-base px-4 py-2">
            {piratesPlayers.length} {t('Players in Squad')}
          </Badge>
        </div>
      </section>

      {/* Trophies & Achievements */}
      <section id="trophies" className="mb-16">
        <SectionHeader title={t('cricket.achievements')} subtitle={t('cricket.achievementsSubtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {piratesTrophies.map((trophy) => (
            <Card key={trophy.id} variant="default" hoverable padding="none" className="overflow-hidden bg-gradient-to-br from-gray-50 to-white">
              <div className="relative h-48">
                <img
                  src={trophy.image}
                  alt={`${trophy.title} - ${trophy.tournament}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const nextEl = target.nextElementSibling;
                    if (nextEl) {
                      nextEl.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="text-6xl">{trophy.icon}</span>
                    <p className="text-primary font-bold mt-2">{trophy.title}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 text-center">
                <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {trophy.icon}
                  <span>{trophy.type === 'champions' ? t('cricket.champions') : trophy.type === 'runners' ? t('cricket.runnersUp') : t('cricket.collection')}</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">{trophy.title}</h3>
                <p className="text-text-secondary text-sm">{trophy.tournament}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Match Highlight */}
      {upcomingMatches.length > 0 && (
        <section className="mb-16">
          <Card variant="outlined" padding="none" className="bg-primary-light/30 border-primary/20 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Trophy size={24} className="text-white" />
                </div>
                <div>
                  <Badge variant="primary" className="mb-2">{t('Next Match')}</Badge>
                  <h2 className="text-2xl font-bold text-text-primary">{t('cricket.upcoming')}</h2>
                </div>
              </div>

              {upcomingMatches.map((match) => (
                <div key={match.id} className="text-center">
                  <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
                    <div className="text-center">
                      <p className="font-bold text-xl text-text-primary">{match.teams[0]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-primary font-bold text-2xl">VS</span>
                      <Badge variant="primary">{getStatusBadge(match.status)}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-xl text-text-primary">{match.teams[1]}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 flex-wrap text-text-secondary mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>{new Date(match.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      <span>{t(match.ground)}</span>
                    </div>
                  </div>

                  <Link to="/cricket">
                    <Button variant="primary" size="lg">{t('cricket.matchDetails')} <ArrowRight size={18} /></Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Recent Results */}
      {completedMatches.length > 0 && (
        <section className="mb-16">
          <SectionHeader title={t('cricket.results')} subtitle={t('cricket.resultsSubtitle') || 'Latest match outcomes'} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.slice(0, 3).map((match) => (
              <Card key={match.id} variant="default" hoverable padding="md" className="bg-gray-50/50">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="success">{t('cricket.status.completed')}</Badge>
                    <span className="text-text-secondary text-sm">{new Date(match.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-4 flex-wrap mb-2">
                      <span className="font-semibold text-text-primary">{match.teams[0]}</span>
                      <span className="text-primary font-bold">{t('cricket.vs')}</span>
                      <span className="font-semibold text-text-primary">{match.teams[1]}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Award size={16} className="text-gold" />
                      <span className="text-primary font-medium">{t('cricket.winner')}: {t(match.winner || '')}</span>
                    </div>
                  </div>
                  {match.score && (
                    <p className="text-text-secondary text-sm text-center bg-white p-3 rounded-lg">{match.score}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Village Cricket Teams */}
      <section className="mb-16">
        <SectionHeader title={t('cricket.teams')} subtitle={t('cricket.teamsSubtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cricketTeams.map((team) => (
            <Card key={team.id} variant="default" hoverable padding="md" className="text-center">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary-light flex items-center justify-center">
                  {team.logo ? (
                    <img src={team.logo} alt={t(team.name)} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Users size={32} className="text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">{t(team.name)}</h3>
                <p className="text-text-secondary text-sm mb-4">{t('cricket.captain')}: {t(team.captain)}</p>
                <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
                  <Users size={16} className="text-primary" />
                  <span>{team.players} {t('cricket.playersCount')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Points Table */}
      <section className="mb-16">
        <SectionHeader title={t('cricket.pointsTable')} subtitle={t('cricket.pointsTableSubtitle')} />
        <Card variant="outlined" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">POS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">TEAM</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">{t('cricket.played')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">{t('cricket.won')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">{t('cricket.lost')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">{t('cricket.points')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {cricketTeams.map((team, index) => {
                  const played = Math.floor(Math.random() * 5) + 1;
                  const won = Math.floor(Math.random() * played);
                  const lost = played - won;
                  const points = won * 2;
                  return (
                    <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 font-bold text-text-primary">
                        {index === 0 && <Crown size={18} className="inline text-gold mr-1" />}
                        {index === 1 && <Award size={18} className="inline text-gray-400 mr-1" />}
                        {index === 2 && <Star size={18} className="inline text-amber-500 mr-1" />}
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 font-medium text-text-primary">{t(team.name)}</td>
                      <td className="px-4 py-4 text-text-secondary">{played}</td>
                      <td className="px-4 py-4 text-green-600 font-medium">{won}</td>
                      <td className="px-4 py-4 text-red-600 font-medium">{lost}</td>
                      <td className="px-4 py-4 font-bold text-primary">{points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Celebration Gallery */}
      <section id="gallery" className="mb-16">
        <SectionHeader title={t('cricket.gallery')} subtitle={t('cricket.gallerySubtitle')} />

        <div className="mb-8">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-6">
            <Image size={24} className="text-primary" />
            {t('cricket.celebrationPhotos')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {piratesGalleryImages.slice(0, 24).map((img, index) => (
              <div key={index} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={`/cricket-gallery/${img}`}
                  alt={`Naidupalli Pirates celebration ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const nextEl = target.nextElementSibling;
                    if (nextEl) {
                      nextEl.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <Image size={24} className="text-primary" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{img.replace(/\.[^/.]+$/, '')}</p>
                </div>
              </div>
            ))}
          </div>
          {piratesGalleryImages.length > 24 && (
            <p className="text-center text-text-secondary mt-4">
              +{piratesGalleryImages.length - 24} {t('more photos in the archive')}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-6">
            <Video size={24} className="text-primary" />
            {t('cricket.celebrationVideos')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {piratesVideos.map((video, index) => (
              <Card key={index} variant="default" padding="none" className="overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    src={`/cricket-videos/${video}`}
                    preload="metadata"
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
                <CardContent className="p-4">
                  <p className="font-medium text-text-primary text-sm truncate">{video.replace(/\.[^/.]+$/, '')}</p>
                  <p className="text-text-secondary text-xs mt-1">{t('Celebration Video')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
