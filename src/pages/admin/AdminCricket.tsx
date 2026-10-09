import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileUpload } from '../../components/ui/FileUpload';
import { cricketService } from '../../lib/services';
import type { Match, CricketTeam } from '../../types';

export function AdminCricket() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<CricketTeam[]>([]);
  const [activeTab, setActiveTab] = useState<'matches' | 'teams'>('matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [matchEditData, setMatchEditData] = useState<Partial<Match>>({});
  const [teamEditData, setTeamEditData] = useState<Partial<CricketTeam>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const matchStatuses = ['All', 'upcoming', 'live', 'completed'];

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [matchesData, teamsData] = await Promise.all([
          cricketService.getMatches(),
          cricketService.getTeams(),
        ]);
        setMatches(matchesData);
        setTeams(teamsData);
      } catch (err) {
        console.error('Failed to fetch cricket data:', err);
        setError('Failed to load cricket data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.teams.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTeams = teams.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      if (activeTab === 'matches') {
        const newMatch = await cricketService.createMatch(matchEditData as Omit<Match, 'id'>);
        setMatches(prev => [newMatch, ...prev]);
      } else {
        const newTeam = await cricketService.createTeam(teamEditData as Omit<CricketTeam, 'id'>);
        setTeams(prev => [newTeam, ...prev]);
      }
      setShowCreateModal(false);
      setMatchEditData({});
      setTeamEditData({});
    } catch (err) {
      console.error('Failed to create:', err);
      setError(`Failed to create ${activeTab === 'matches' ? 'match' : 'team'}. Please try again.`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      if (activeTab === 'matches') {
        const updated = await cricketService.updateMatch(id, matchEditData as Partial<Match>);
        setMatches(prev => prev.map(m => m.id === id ? updated : m));
      } else {
        const updated = await cricketService.updateTeam(id, teamEditData as Partial<CricketTeam>);
        setTeams(prev => prev.map(t => t.id === id ? updated : t));
      }
      setIsEditing(null);
      setMatchEditData({});
      setTeamEditData({});
    } catch (err) {
      console.error('Failed to update:', err);
      setError(`Failed to update ${activeTab === 'matches' ? 'match' : 'team'}. Please try again.`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab === 'matches' ? 'match' : 'team'}?`)) return;
    try {
      if (activeTab === 'matches') {
        await cricketService.deleteMatch(id);
        setMatches(prev => prev.filter(m => m.id !== id));
      } else {
        await cricketService.deleteTeam(id);
        setTeams(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete:', err);
      setError(`Failed to delete ${activeTab === 'matches' ? 'match' : 'team'}. Please try again.`);
    }
  };

  const startEditMatch = (match: Match) => {
    setIsEditing(match.id);
    setMatchEditData({ ...match });
  };

  const startEditTeam = (team: CricketTeam) => {
    setIsEditing(team.id);
    setTeamEditData({ ...team });
  };

  const handleMatchInputChange = (field: keyof Match, value: string | string[]) => {
    setMatchEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamInputChange = (field: keyof CricketTeam, value: string | number) => {
    setTeamEditData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Cricket</h1>
          <p className="text-text-secondary mt-1">Manage cricket teams and matches</p>
        </div>
        <Card variant="outlined" padding="lg" className="animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Cricket</h1>
          <p className="text-text-secondary mt-1">Manage cricket teams and matches</p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0 gap-2" onClick={() => {
          if (activeTab === 'matches') {
            setMatchEditData({
              status: 'upcoming',
              teams: ['', ''],
            });
          } else {
            setTeamEditData({
              players: 11,
            });
          }
          setShowCreateModal(true);
        }}>
          <Plus size={20} />
          {activeTab === 'matches' ? 'Add Match' : 'Add Team'}
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 border-b border-border-color">
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            activeTab === 'matches'
              ? 'border-primary text-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            activeTab === 'teams'
              ? 'border-primary text-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Teams
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      <Card variant="outlined" padding="md" className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder={activeTab === 'matches' ? "Search matches..." : "Search teams..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {activeTab === 'matches' && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white min-w-[150px]"
            >
              {matchStatuses.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          )}
        </div>
      </Card>

      <Card variant="outlined" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-color">
              <tr>
                {activeTab === 'matches' ? (
                  <>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Teams</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ground</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Team Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Captain</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Players</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Logo</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {activeTab === 'matches' ? (
                filteredMatches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {isEditing === match.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={Array.isArray(matchEditData.teams) ? matchEditData.teams[0] : ''}
                            onChange={(e) => handleMatchInputChange('teams', [e.target.value, Array.isArray(matchEditData.teams) ? matchEditData.teams[1] : ''])}
                            placeholder="Team 1"
                            className="w-40 px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <span className="self-center text-text-secondary">vs</span>
                          <input
                            type="text"
                            value={Array.isArray(matchEditData.teams) ? matchEditData.teams[1] : ''}
                            onChange={(e) => handleMatchInputChange('teams', [Array.isArray(matchEditData.teams) ? matchEditData.teams[0] : '', e.target.value])}
                            placeholder="Team 2"
                            className="w-40 px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      ) : (
                        <span className="text-text-secondary">{match.teams.join(' vs ')}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {isEditing === match.id ? (
                        <input
                          type="date"
                          value={matchEditData.date || ''}
                          onChange={(e) => handleMatchInputChange('date', e.target.value)}
                          className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        new Date(match.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === match.id ? (
                        <input
                          type="text"
                          value={matchEditData.ground || ''}
                          onChange={(e) => handleMatchInputChange('ground', e.target.value)}
                          className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span className="text-text-secondary">{match.ground}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === match.id ? (
                        <select
                          value={matchEditData.status || 'upcoming'}
                          onChange={(e) => handleMatchInputChange('status', e.target.value)}
                          className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="live">Live</option>
                          <option value="completed">Completed</option>
                        </select>
                      ) : (
                        <Badge variant={match.status === 'completed' ? 'success' : match.status === 'live' ? 'primary' : 'gray'} size="sm">
                          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {isEditing === match.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleUpdate(match.id)} isLoading={isCreating}>
                              <Save size={18} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)} className="text-text-secondary hover:text-emergency">
                              <Trash2 size={18} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-blue-primary" onClick={() => startEditMatch(match)}>
                              <Edit size={18} />
                            </Button>
                            <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-emergency" onClick={() => handleDelete(match.id)}>
                              <Trash2 size={18} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {isEditing === team.id ? (
                        <input
                          type="text"
                          value={teamEditData.name || ''}
                          onChange={(e) => handleTeamInputChange('name', e.target.value)}
                          className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="font-medium text-text-primary line-clamp-1">{team.name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === team.id ? (
                        <input
                          type="text"
                          value={teamEditData.captain || ''}
                          onChange={(e) => handleTeamInputChange('captain', e.target.value)}
                          className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span className="text-text-secondary">{team.captain}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm whitespace-nowrap">
                      {isEditing === team.id ? (
                        <input
                          type="number"
                          value={teamEditData.players || 11}
                          onChange={(e) => handleTeamInputChange('players', Number(e.target.value))}
                          className="w-20 px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        team.players
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === team.id ? (
                        <FileUpload
                          value={teamEditData.logo || ''}
                          onChange={(url) => handleTeamInputChange('logo', url)}
                          allowedTypes={['image']}
                          maxSizeMB={2}
                          label="Team Logo"
                          placeholder="Click or drag to upload logo (JPG, PNG, WebP • Max 2MB)"
                          bucket="cricket"
                          folder="team-logos"
                          showPreview={true}
                          disabled={isCreating}
                        />
                      ) : (
                        team.logo ? (
                          <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="text-text-secondary">No logo</span>
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {isEditing === team.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleUpdate(team.id)} isLoading={isCreating}>
                              <Save size={18} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)} className="text-text-secondary hover:text-emergency">
                              <Trash2 size={18} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-blue-primary" onClick={() => startEditTeam(team)}>
                              <Edit size={18} />
                            </Button>
                            <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-emergency" onClick={() => handleDelete(team.id)}>
                              <Trash2 size={18} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {(activeTab === 'matches' ? filteredMatches.length === 0 : filteredTeams.length === 0) && (
          <div className="p-8 text-center text-text-secondary">
            No {activeTab === 'matches' ? 'matches' : 'teams'} found matching your criteria.
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(showCreateModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">
                {isEditing ? 'Edit' : 'Add'} {activeTab === 'matches' ? 'Match' : 'Team'}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); setIsEditing(null); setMatchEditData({}); setTeamEditData({}); }}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={isEditing ? (e) => { e.preventDefault(); handleUpdate(isEditing); } : handleCreate} className="p-6 space-y-4">
              {activeTab === 'matches' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Team 1 *</label>
                      <Input
                        value={Array.isArray(matchEditData.teams) ? matchEditData.teams[0] : ''}
                        onChange={(e) => handleMatchInputChange('teams', [e.target.value, Array.isArray(matchEditData.teams) ? matchEditData.teams[1] : ''])}
                        placeholder="Enter team 1 name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Team 2 *</label>
                      <Input
                        value={Array.isArray(matchEditData.teams) ? matchEditData.teams[1] : ''}
                        onChange={(e) => handleMatchInputChange('teams', [Array.isArray(matchEditData.teams) ? matchEditData.teams[0] : '', e.target.value])}
                        placeholder="Enter team 2 name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Date *</label>
                      <input
                        type="date"
                        value={matchEditData.date || new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleMatchInputChange('date', e.target.value)}
                        className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Time *</label>
                      <input
                        type="time"
                        value={matchEditData.time || ''}
                        onChange={(e) => handleMatchInputChange('time', e.target.value)}
                        className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Ground *</label>
                    <Input
                      value={matchEditData.ground || ''}
                      onChange={(e) => handleMatchInputChange('ground', e.target.value)}
                      placeholder="Enter ground name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                    <select
                      value={matchEditData.status || 'upcoming'}
                      onChange={(e) => handleMatchInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Score</label>
                    <Input
                      value={matchEditData.score || ''}
                      onChange={(e) => handleMatchInputChange('score', e.target.value)}
                      placeholder="e.g., Team A: 150/5 | Team B: 145/8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Winner</label>
                    <Input
                      value={matchEditData.winner || ''}
                      onChange={(e) => handleMatchInputChange('winner', e.target.value)}
                      placeholder="Enter winner team name"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Team Name *</label>
                    <Input
                      value={teamEditData.name || ''}
                      onChange={(e) => handleTeamInputChange('name', e.target.value)}
                      placeholder="Enter team name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Captain *</label>
                    <Input
                      value={teamEditData.captain || ''}
                      onChange={(e) => handleTeamInputChange('captain', e.target.value)}
                      placeholder="Enter captain name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Players *</label>
                      <input
                        type="number"
                        value={teamEditData.players || 11}
                        onChange={(e) => handleTeamInputChange('players', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        min="1"
                        max="20"
                      />
                    </div>

                    <div>
                      <FileUpload
                        value={teamEditData.logo || ''}
                        onChange={(url) => handleTeamInputChange('logo', url)}
                        allowedTypes={['image']}
                        maxSizeMB={2}
                        label="Team Logo"
                        placeholder="Click or drag to upload logo (JPG, PNG, WebP • Max 2MB)"
                        bucket="cricket"
                        folder="team-logos"
                        showPreview={true}
                        disabled={isCreating}
                        supportedFormats={{
                          images: ['jpg', 'jpeg', 'png', 'webp']
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-border-color">
                <Button type="button" variant="ghost" onClick={() => { setShowCreateModal(false); setIsEditing(null); setMatchEditData({}); setTeamEditData({}); }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    isEditing ? 'Save Changes' : activeTab === 'matches' ? 'Add Match' : 'Add Team'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}