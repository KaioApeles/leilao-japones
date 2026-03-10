import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'ja';
const LANGUAGE_STORAGE_KEY = 'site_language';

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
  'home.subtitle': { en: 'Every bid starts at 1¥ • Each bid adds 1¥', pt: 'Todo lance começa em 1¥ • Cada lance adiciona 1¥', ja: 'すべての入札は1¥から開始 • 入札ごとに1¥加算' },
  'home.howItWorksTitle': { en: 'How it works', pt: 'Como funciona', ja: '仕組み' },
  'home.howItWorksDesc': { en: 'Each auction starts at 1¥. Every bid increases the price by 1¥ and costs you 1 credit. The last bidder when the timer runs out wins the item at the final price!', pt: 'Cada leilão começa em 1¥. Cada lance aumenta o preço em 1¥ e custa 1 crédito. O último a dar lance quando o tempo acabar vence o item pelo preço final!', ja: '各オークションは1¥から開始。入札ごとに価格は1¥上がり、1クレジット消費します。時間切れ時の最終入札者が最終価格で落札します。' },
  'home.loadError': { en: 'Unable to load auctions right now.', pt: 'Não foi possível carregar os leilões agora.', ja: '現在オークションを読み込めません。' },
  'home.bidError': { en: 'Unable to place bid right now.', pt: 'Não foi possível dar o lance agora.', ja: '現在入札できません。' },
  
  // Credits
  'credits.title': { en: 'Buy Bid Credits', pt: 'Comprar Créditos de Lance', ja: '入札クレジット購入' },
  'credits.yourCredits': { en: 'Your Credits', pt: 'Seus Créditos', ja: 'あなたのクレジット' },
  'credits.bids': { en: 'bids', pt: 'lances', ja: '入札' },
  'credits.buy': { en: 'Buy', pt: 'Comprar', ja: '購入' },
  'credits.subtitle': { en: 'Get more bids to win amazing items!', pt: 'Compre mais lances para ganhar itens incríveis!', ja: '入札数を増やして魅力的な商品を勝ち取ろう！' },
  'credits.loginRequired': { en: 'Please login to buy credits', pt: 'Faça login para comprar créditos', ja: 'クレジット購入にはログインが必要です' },
  'credits.label': { en: 'Credits', pt: 'Créditos', ja: 'クレジット' },
  'credits.popular': { en: 'Popular', pt: 'Popular', ja: '人気' },
  'credits.bonus': { en: 'Bonus!', pt: 'Bônus!', ja: 'ボーナス！' },
  'credits.noteTitle': { en: 'Note:', pt: 'Nota:', ja: '注意:' },
  'credits.noteDesc': { en: 'This is a demo. In production, this would integrate with a real payment processor.', pt: 'Isto é uma demo. Em produção, isso integraria com um processador de pagamento real.', ja: 'これはデモです。本番では実際の決済プロバイダーと連携します。' },
  
  // My Bids
  'myBids.title': { en: 'My Bids', pt: 'Meus Lances', ja: 'マイ入札' },
  'myBids.active': { en: 'Active Bids', pt: 'Lances Ativos', ja: 'アクティブ入札' },
  'myBids.ended': { en: 'Ended Auctions', pt: 'Leilões Encerrados', ja: '終了したオークション' },
  'myBids.won': { en: 'WON', pt: 'GANHOU', ja: '落札' },
  'myBids.lost': { en: 'LOST', pt: 'PERDEU', ja: '未落札' },
  'myBids.winning': { en: 'WINNING', pt: 'GANHANDO', ja: '落札中' },
  'myBids.loginRequired': { en: 'Please login to view your bids', pt: 'Faça login para ver seus lances', ja: '入札履歴を見るにはログインしてください' },
  'myBids.subtitle': { en: 'Track all your auction activity', pt: 'Acompanhe toda sua atividade de leilão', ja: 'すべてのオークション活動を確認できます' },
  'myBids.statusActive': { en: 'ACTIVE', pt: 'ATIVO', ja: '進行中' },
  'myBids.currentPrice': { en: 'Current Price', pt: 'Preço Atual', ja: '現在価格' },
  'myBids.myBidsLabel': { en: 'My Bids', pt: 'Meus Lances', ja: '自分の入札' },
  'myBids.loadError': { en: 'Unable to load your bids right now.', pt: 'Não foi possível carregar seus lances agora.', ja: '現在あなたの入札を読み込めません。' },
  
  // Auth
  'auth.login': { en: 'Login', pt: 'Entrar', ja: 'ログイン' },
  'auth.register': { en: 'Register', pt: 'Cadastrar', ja: '登録' },
  'auth.email': { en: 'Email', pt: 'Email', ja: 'メールアドレス' },
  'auth.password': { en: 'Password', pt: 'Senha', ja: 'パスワード' },
  'auth.username': { en: 'Username', pt: 'Nome de Usuário', ja: 'ユーザー名' },
  'auth.createAccount': { en: 'Create Account', pt: 'Criar Conta', ja: 'アカウント作成' },
  'auth.haveAccount': { en: 'Already have an account?', pt: 'Já tem uma conta?', ja: 'アカウントをお持ちですか？' },
  'auth.noAccount': { en: 'Don\'t have an account?', pt: 'Não tem uma conta?', ja: 'アカウントをお持ちでないですか？' },
  'auth.demoLabel': { en: 'Demo:', pt: 'Demo:', ja: 'デモ:' },
  'auth.demoHint': { en: 'Use admin@admin.com / admin for admin access', pt: 'Use admin@admin.com / admin para acesso de administrador', ja: 'admin@admin.com / admin で管理者アクセス' },
  'auth.authFailed': { en: 'Authentication failed.', pt: 'Falha na autenticação.', ja: '認証に失敗しました。' },
  'auth.showPassword': { en: 'Show password', pt: 'Mostrar senha', ja: 'パスワードを表示' },
  'auth.hidePassword': { en: 'Hide password', pt: 'Ocultar senha', ja: 'パスワードを隠す' },
  'auth.tagline': { en: 'Penny Auction', pt: 'Leilão Penny', ja: 'ペニーオークション' },
  
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
  'admin.accessRequired': { en: 'Admin access required', pt: 'Acesso de administrador obrigatório', ja: '管理者アクセスが必要です' },
  'admin.subtitle': { en: 'Manage auction items and monitor activity', pt: 'Gerencie itens do leilão e monitore a atividade', ja: 'オークション商品の管理と状況の監視' },
  'admin.itemHeader': { en: 'Item', pt: 'Item', ja: '商品' },
  'admin.priceHeader': { en: 'Price', pt: 'Preço', ja: '価格' },
  'admin.bidsHeader': { en: 'Bids', pt: 'Lances', ja: '入札数' },
  'admin.startTimeHint': { en: 'Optional - leave blank for immediate', pt: 'Opcional - deixe em branco para imediato', ja: '任意 - 空欄で即時開始' },
  'admin.selectDateTime': { en: 'Select date and time', pt: 'Selecione data e hora', ja: '日時を選択' },
  'admin.createSuccess': { en: 'Auction created successfully!', pt: 'Leilão criado com sucesso!', ja: 'オークションを作成しました！' },
  'admin.mockCreateSuccess': { en: 'Item created successfully!', pt: 'Item criado com sucesso!', ja: '商品を作成しました！' },
  'admin.loadError': { en: 'Unable to load auctions right now.', pt: 'Não foi possível carregar os leilões agora.', ja: '現在オークションを読み込めません。' },
  'admin.createError': { en: 'Unable to create auction right now.', pt: 'Não foi possível criar o leilão agora.', ja: '現在オークションを作成できません。' },
  'admin.updateError': { en: 'Unable to update auction status right now.', pt: 'Não foi possível atualizar o status do leilão agora.', ja: '現在オークションのステータスを更新できません。' },
  'admin.deleteError': { en: 'Unable to delete auction right now.', pt: 'Não foi possível excluir o leilão agora.', ja: '現在オークションを削除できません。' },
  'admin.pauseAuction': { en: 'Pause Auction', pt: 'Pausar Leilão', ja: 'オークションを一時停止' },
  'admin.resumeAuction': { en: 'Resume Auction', pt: 'Retomar Leilão', ja: 'オークションを再開' },
  'admin.delete': { en: 'Delete', pt: 'Excluir', ja: '削除' },
  'admin.statusActive': { en: 'active', pt: 'ativo', ja: '進行中' },
  'admin.statusUpcoming': { en: 'upcoming', pt: 'em breve', ja: '開始前' },
  'admin.statusEnded': { en: 'ended', pt: 'encerrado', ja: '終了' },
  
  // Settings
  'settings.title': { en: 'Settings', pt: 'Configurações', ja: '設定' },
  'settings.language': { en: 'Language', pt: 'Idioma', ja: '言語' },
  'settings.account': { en: 'Account Information', pt: 'Informações da Conta', ja: 'アカウント情報' },
  'settings.loginRequired': { en: 'Please login to access settings', pt: 'Faça login para acessar configurações', ja: '設定にアクセスするにはログインしてください' },
  'settings.accountType': { en: 'Account Type', pt: 'Tipo de Conta', ja: 'アカウント種別' },
  'settings.accountTypeAdmin': { en: 'Administrator', pt: 'Administrador', ja: '管理者' },
  'settings.accountTypeUser': { en: 'User', pt: 'Usuário', ja: 'ユーザー' },
  'settings.preferences': { en: 'Preferences', pt: 'Preferências', ja: '設定項目' },
  'settings.emailNotifications': { en: 'Email Notifications', pt: 'Notificações por Email', ja: 'メール通知' },
  'settings.emailNotificationsDesc': { en: 'Receive updates about your bids', pt: 'Receba atualizações sobre seus lances', ja: '入札に関する更新を受け取る' },
  'settings.soundEffects': { en: 'Sound Effects', pt: 'Efeitos Sonoros', ja: 'サウンド効果' },
  'settings.soundEffectsDesc': { en: 'Play sounds for bids and wins', pt: 'Tocar sons para lances e vitórias', ja: '入札や落札時に音を再生' },
  
  // Rankings
  'nav.rankings': { en: 'Rankings', pt: 'Rankings', ja: 'ランキング' },
  'rankings.title': { en: 'Top Winners', pt: 'Melhores Vencedores', ja: 'トップ入札者' },
  'rankings.subtitle': { en: 'Hall of Champions', pt: 'Hall dos Campeões', ja: 'チャンピオンホール' },
  'rankings.auctionsWon': { en: 'auctions won', pt: 'leilões ganhos', ja: '落札数' },
  'rankings.totalBids': { en: 'total bids', pt: 'lances totais', ja: '総入札数' },
  'rankings.position': { en: 'Position', pt: 'Posição', ja: '順位' },
  
  // Generic
  'common.comingSoon': { en: 'Coming Soon', pt: 'Em Breve', ja: '近日公開' },
  'common.startingAt': { en: 'Starting at', pt: 'Começando em', ja: '開始価格' },
  'common.startingSoon': { en: 'Starting soon...', pt: 'Começando em breve...', ja: 'まもなく開始...' },
  'common.credits': { en: 'credits', pt: 'créditos', ja: 'クレジット' },
  'common.loading': { en: 'Loading...', pt: 'Carregando...', ja: '読み込み中...' },
  'common.loginRequiredToBid': { en: 'Please login to bid', pt: 'Faça login para dar lances', ja: '入札するにはログインしてください' },
  'common.notEnoughCredits': { en: 'Not enough credits!', pt: 'Créditos insuficientes!', ja: 'クレジット不足です！' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  applyLocale: (locale?: string | null) => void;
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

const normalizeLocaleToLanguage = (locale?: string | null): Language | null => {
  if (!locale) return null;
  const normalized = locale.toLowerCase();
  if (normalized.startsWith('pt')) return 'pt';
  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('en')) return 'en';
  return null;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'pt' || savedLanguage === 'ja') {
      return savedLanguage;
    }

    const browserLanguage = normalizeLocaleToLanguage(navigator.language);
    return browserLanguage ?? 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const applyLocale = (locale?: string | null) => {
    const languageFromLocale = normalizeLocaleToLanguage(locale);
    if (!languageFromLocale) return;
    setLanguage(languageFromLocale);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, applyLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
