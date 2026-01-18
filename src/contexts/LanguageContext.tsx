import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'ja';

interface Translations {
  [key: string]: {
    en: string;
    pt: string;
    ja: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', pt: 'Início', ja: 'ホーム' },
  'nav.myBids': { en: 'My Bids', pt: 'Meus Lances', ja: 'マイ入札' },
  'nav.buyCredits': { en: 'Buy Credits', pt: 'Comprar Créditos', ja: 'クレジット購入' },
  'nav.settings': { en: 'Settings', pt: 'Configurações', ja: '設定' },
  'nav.admin': { en: 'Admin', pt: 'Admin', ja: '管理者' },
  'nav.logout': { en: 'Logout', pt: 'Sair', ja: 'ログアウト' },
  'nav.login': { en: 'Login', pt: 'Entrar', ja: 'ログイン' },
  
  // Home
  'home.liveAuctions': { en: 'Live Auctions', pt: 'Leilões Ativos', ja: 'ライブオークション' },
  'home.upcomingAuctions': { en: 'Upcoming Auctions', pt: 'Próximos Leilões', ja: '今後のオークション' },
  'home.currentPrice': { en: 'Current Price', pt: 'Preço Atual', ja: '現在価格' },
  'home.lastBidder': { en: 'Last Bidder', pt: 'Último Lance', ja: '最終入札者' },
  'home.timeLeft': { en: 'Time Left', pt: 'Tempo Restante', ja: '残り時間' },
  'home.bid': { en: 'BID NOW', pt: 'DAR LANCE', ja: '入札する' },
  'home.startsIn': { en: 'Starts in', pt: 'Começa em', ja: '開始まで' },
  
  // Credits
  'credits.title': { en: 'Buy Bid Credits', pt: 'Comprar Créditos de Lance', ja: '入札クレジット購入' },
  'credits.yourCredits': { en: 'Your Credits', pt: 'Seus Créditos', ja: 'あなたのクレジット' },
  'credits.bids': { en: 'bids', pt: 'lances', ja: '入札' },
  'credits.buy': { en: 'Buy', pt: 'Comprar', ja: '購入' },
  
  // My Bids
  'myBids.title': { en: 'My Bids', pt: 'Meus Lances', ja: 'マイ入札' },
  'myBids.active': { en: 'Active Bids', pt: 'Lances Ativos', ja: 'アクティブ入札' },
  'myBids.ended': { en: 'Ended Auctions', pt: 'Leilões Encerrados', ja: '終了したオークション' },
  'myBids.won': { en: 'WON', pt: 'GANHOU', ja: '落札' },
  'myBids.lost': { en: 'LOST', pt: 'PERDEU', ja: '未落札' },
  'myBids.winning': { en: 'WINNING', pt: 'GANHANDO', ja: '落札中' },
  
  // Auth
  'auth.login': { en: 'Login', pt: 'Entrar', ja: 'ログイン' },
  'auth.register': { en: 'Register', pt: 'Cadastrar', ja: '登録' },
  'auth.email': { en: 'Email', pt: 'Email', ja: 'メールアドレス' },
  'auth.password': { en: 'Password', pt: 'Senha', ja: 'パスワード' },
  'auth.username': { en: 'Username', pt: 'Nome de Usuário', ja: 'ユーザー名' },
  'auth.createAccount': { en: 'Create Account', pt: 'Criar Conta', ja: 'アカウント作成' },
  'auth.haveAccount': { en: 'Already have an account?', pt: 'Já tem uma conta?', ja: 'アカウントをお持ちですか？' },
  'auth.noAccount': { en: 'Don\'t have an account?', pt: 'Não tem uma conta?', ja: 'アカウントをお持ちでないですか？' },
  
  // Admin
  'admin.dashboard': { en: 'Admin Dashboard', pt: 'Painel Admin', ja: '管理ダッシュボード' },
  'admin.createItem': { en: 'Create Item', pt: 'Criar Item', ja: 'アイテム作成' },
  'admin.manageAuctions': { en: 'Manage Auctions', pt: 'Gerenciar Leilões', ja: 'オークション管理' },
  'admin.itemName': { en: 'Item Name', pt: 'Nome do Item', ja: 'アイテム名' },
  'admin.description': { en: 'Description', pt: 'Descrição', ja: '説明' },
  'admin.imageUrl': { en: 'Image URL', pt: 'URL da Imagem', ja: '画像URL' },
  'admin.startTime': { en: 'Start Time', pt: 'Hora de Início', ja: '開始時間' },
  'admin.create': { en: 'Create', pt: 'Criar', ja: '作成' },
  'admin.schedule': { en: 'Schedule', pt: 'Agendar', ja: 'スケジュール' },
  'admin.status': { en: 'Status', pt: 'Status', ja: 'ステータス' },
  'admin.actions': { en: 'Actions', pt: 'Ações', ja: 'アクション' },
  'admin.end': { en: 'End', pt: 'Encerrar', ja: '終了' },
  
  // Settings
  'settings.title': { en: 'Settings', pt: 'Configurações', ja: '設定' },
  'settings.language': { en: 'Language', pt: 'Idioma', ja: '言語' },
  'settings.account': { en: 'Account Information', pt: 'Informações da Conta', ja: 'アカウント情報' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
