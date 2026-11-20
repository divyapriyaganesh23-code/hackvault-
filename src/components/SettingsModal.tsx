import React, { useState } from 'react';
import { X, Cpu, Key, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { storageService, AIConfig } from '../services/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged: () => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, onConfigChanged }) => {
  const currentConfig = storageService.getAIConfig();
  const [provider, setProvider] = useState<'built-in' | 'gemini'>(currentConfig.provider || 'built-in');
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingStatus, setTestingStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    storageService.saveAIConfig({
      provider,
      apiKey: apiKey.trim()
    });
    setSavedSuccess(true);
    onConfigChanged();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestingStatus('Please enter an API key first');
      return;
    }
    setTestingStatus('Testing Gemini API key...');
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`);
      if (res.ok) {
        setTestingStatus('Connection Successful! Ready to use Gemini 1.5 Flash.');
      } else {
        const errData = await res.json().catch(() => ({}));
        setTestingStatus(`Failed: ${errData.error?.message || 'Invalid API Key'}`);
      }
    } catch (e: any) {
      setTestingStatus(`Network error: ${e.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">AI & Platform Settings</h3>
              <p className="text-xs text-slate-500">Configure AI explanation engine and credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Intelligence Engine Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider('built-in')}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  provider === 'built-in'
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="font-semibold text-sm text-slate-900 block">Built-in Engine</span>
                  <span className="text-xs text-slate-500 mt-1 block">Deterministic heuristic analysis. Zero configuration, fast, 100% offline.</span>
                </div>
                <span className="inline-block mt-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                  No Key Needed
                </span>
              </button>

              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  provider === 'gemini'
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="font-semibold text-sm text-slate-900 block">Google Gemini API</span>
                  <span className="text-xs text-slate-500 mt-1 block">Live generative answers using Gemini 1.5 Flash. Requires API key.</span>
                </div>
                <span className="inline-block mt-2 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 w-fit">
                  BYOK (Optional)
                </span>
              </button>
            </div>
          </div>

          {provider === 'gemini' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  Gemini API Key
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Get free key &rarr;
                </a>
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="text-xs text-slate-700 hover:text-blue-600 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Test Connection
                </button>
                {testingStatus && (
                  <span className={`text-xs ${testingStatus.includes('Successful') ? 'text-emerald-600 font-medium' : 'text-amber-600'}`}>
                    {testingStatus}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Security note: Your key is stored solely in your browser's private localStorage and never uploaded to any third-party server.
              </p>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              HackVault guarantees that all verified project links, hackathon archives, and repositories are real public links. AI analysis is explicitly badged and clearly separated from factual metadata.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" /> Saved!
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
