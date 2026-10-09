import { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

export function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(email, password);
      onClose();
    } catch (err) {
      setError('Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-border-color">
          <h2 id="admin-login-title" className="text-lg font-semibold text-text-primary">
            Administrator Access
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close login modal"
          >
            <X size={20} />
          </button>
        </div>

        <Card variant="default" padding="lg" className="m-4 border-border-color">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="admin@mana-naidupalli.in"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-text-primary mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <button
              onClick={onClose}
              className="w-full mt-4 text-center text-sm text-text-secondary hover:text-text-primary transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}