'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { Save, Loader2 } from 'lucide-react';

interface SettingState {
  system_prompt: string;
  max_history_messages: string;
  internet_fallback_enabled: string;
  temperature: string;
  max_tokens: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingState>({
    system_prompt: '',
    max_history_messages: '20',
    internet_fallback_enabled: 'true',
    temperature: '0.7',
    max_tokens: '1024',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          const map: Record<string, string> = {};
          for (const s of d.data) {
            map[s.setting_key] = s.setting_value;
          }
          setSettings((prev) => ({ ...prev, ...map }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: keyof SettingState, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <h1 className="text-lg font-semibold text-foreground mb-6">AI Settings</h1>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-card border border-border rounded-md p-6 space-y-5">
            {/* System Prompt */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                System Prompt
              </label>
              <textarea
                value={settings.system_prompt}
                onChange={(e) => update('system_prompt', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Base instructions for the AI assistant
              </p>
            </div>

            {/* Model Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Temperature</label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => update('temperature', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Max Tokens</label>
                <input
                  type="number"
                  min="256"
                  max="4096"
                  value={settings.max_tokens}
                  onChange={(e) => update('max_tokens', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Other Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Max History Messages
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={settings.max_history_messages}
                  onChange={(e) => update('max_history_messages', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Internet Fallback
                </label>
                <select
                  value={settings.internet_fallback_enabled}
                  onChange={(e) => update('internet_fallback_enabled', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
