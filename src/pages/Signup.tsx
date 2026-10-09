import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export function SignupPage() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('auth.passwordsNoMatch'));
      return;
    }

    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-primary-light/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card variant="default" padding="lg" className="shadow-xl border-t-4 border-t-primary text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t('auth.accountCreated')}</h2>
            <p className="text-text-secondary mb-6">{t('auth.redirecting')}</p>
            <Button variant="primary" onClick={() => navigate('/login')}>
              {t('auth.goToLogin')}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-light/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
           <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
             <span className="text-white text-3xl">🌱</span>
           </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-text-primary tracking-tight">
          {t('auth.createAccount')}
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          {t('auth.joinCommunity')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card variant="default" padding="lg" className="shadow-xl border-t-4 border-t-primary">
          <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 border-l-4 border-emergency p-4 text-sm text-emergency">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                {t('auth.fullName')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('auth.fullName')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                {t('auth.mobileEmail')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('auth.enterEmailMobile')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                {t('auth.password')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('auth.enterPassword')}
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                {t('auth.confirmPassword')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('auth.confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-text-secondary transition-colors" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-text-secondary transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full text-base" isLoading={isLoading}>
                {t('auth.createAccount')}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}