import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export function LoginPage() {
  const { t } = useLanguage();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); // Redirect to home or dashboard after login
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-primary-light/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
           <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
             <span className="text-white text-3xl">🌱</span>
           </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-text-primary tracking-tight">
          {t('auth.welcomeBack') || 'Welcome Back'}
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          MANA NAIDUPALLI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card variant="default" padding="lg" className="shadow-xl border-t-4 border-t-primary">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                {t('auth.mobileEmail') || 'Mobile Number / Email'}
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all"
                  placeholder={t('auth.enterEmailMobile') || 'Enter your email or mobile'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                {t('auth.password') || 'Password'}
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all"
                  placeholder={t('auth.enterPassword') || 'Enter your password'}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-text-secondary transition-colors" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-text-secondary transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                  {t('auth.rememberMe') || 'Remember me'}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark transition-colors">
                  {t('auth.forgotPassword') || 'Forgot Password?'}
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full text-base" isLoading={isLoading}>
                {t('auth.login') || 'Login'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-color" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-text-secondary">{t('auth.or') || 'Or'}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                {t('auth.noAccount') || 'Don\'t have an account? '}
                <Link to="/signup" className="font-medium text-primary hover:text-primary-dark transition-colors">
                  {t('auth.createAccount') || 'Create Account'}
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}