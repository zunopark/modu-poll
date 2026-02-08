import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px] pb-20 flex flex-col justify-center items-center px-4">
      {/* Container - Increased width and padding for a less cramped look */}
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 p-10 md:p-14 border border-gray-100 relative overflow-hidden">
        
        {/* Decorative Background Blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">로그인</h1>
          <p className="text-gray-500 text-base">
            MODUPOLE에 오신 것을 환영합니다!<br/>
            <span className="text-sm mt-1 block opacity-80">간편하게 로그인하고 폴댄스의 모든 것을 즐겨보세요.</span>
          </p>
        </div>

        {/* SNS Login Buttons */}
        <div className="space-y-4 mb-4 relative z-10">
          {/* Kakao */}
          <button 
            onClick={onLogin}
            className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD800] text-[#3c1e1e] rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M12 3C5.373 3 0 6.666 0 11.19c0 2.923 2.254 5.485 5.65 6.786-.23.854-.836 3.097-.957 3.568-.15.586.216.576.452.418.187-.125 2.964-2.015 4.14-2.812.872.126 1.77.195 2.715.195 6.627 0 12-3.666 12-8.19C24 6.666 18.627 3 12 3z"/>
            </svg>
            카카오로 3초 만에 시작하기
          </button>
          
          {/* Naver */}
          <button 
            onClick={onLogin}
            className="w-full h-14 bg-[#03C75A] hover:bg-[#02b351] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
             <span className="font-black text-xl">N</span>
             네이버로 시작하기
          </button>

          {/* Google */}
          <button 
            onClick={onLogin}
            className="w-full h-14 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <path d="M12.0003 20.45c4.6666 0 8.0833-3.2083 8.0833-8.2083 0-.7084-.0833-1.375-.2083-2.0417H12.0003v3.8334h4.5416c-.2083 1.2916-1.1666 2.875-2.5833 3.8333l-.0376.25 3.7543 2.909.2602.026c2.4709-2.275 3.896-5.625 3.896-9.5209 0-1.285-.2035-2.518-.558-3.6666H12.0003V2.1833h9.8166c1.3667 2.05 2.1834 4.5417 2.1834 7.2667 0 6.8167-5.55 12.35-12.0003 12.35-6.6208 0-12.0003-5.3792-12.0003-12.0003 0-6.6209 5.3795-12.0003 12.0003-12.0003 3.1958 0 6.0958 1.2583 8.2333 3.2916l-3.325 3.325c-1.3083-1.25-3.0791-2.0166-4.9083-2.0166-4.0458 0-7.3333 3.2875-7.3333 7.3333 0 4.0459 3.2875 7.3334 7.3333 7.3334z" fill="#4285F4"/>
              <path d="M3.2043 7.1667l3.7542 2.909C7.9042 7.7667 9.8085 6.1833 12.0002 6.1833c1.8292 0 3.6 0.7667 4.9083 2.0167l3.325-3.325C18.0959 2.8417 15.1959 1.5833 12.0002 1.5833c-3.9542 0-7.4459 2.0917-9.4584 5.2584l.6625.325z" fill="#EA4335"/>
              <path d="M12.0002 22.4167c-2.4833 0-4.8083-.7834-6.7333-2.125l-3.5625 3.1041c2.8792 2.375 6.55 3.7875 10.2958 3.7875 3.65 0 7.075-1.3416 9.7792-3.5791l-3.6084-2.9917c-1.6875 1.1583-3.725 1.8042-5.8958 1.8042z" fill="#34A853"/>
              <path d="M5.2667 19.3958c-.7334-1.4291-1.15-3.0541-1.15-4.7916 0-1.8209.4583-3.5167 1.2583-4.9917l-3.7625-2.9125C.5792 8.7917 0 11.2292 0 14.6042c0 3.5166.6333 6.0416 1.7667 8.1916l3.5-3.4z" fill="#FBBC05"/>
            </svg>
            구글로 시작하기
          </button>
        </div>

        <div className="relative z-10 text-center">
           <p className="mt-4 text-xs text-gray-400">
             로그인 시 <span className="underline cursor-pointer hover:text-gray-600">이용약관</span> 및 <span className="underline cursor-pointer hover:text-gray-600">개인정보처리방침</span>에 동의하게 됩니다.
           </p>
        </div>

      </div>
      
      <p className="mt-8 text-xs text-gray-400 text-center font-medium">
        &copy; 2026 MODUPOLE. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;