export const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="text-2xl font-bold tracking-tighter">
                MODU<span className="text-rose-500">POLE</span>
              </span>
            </div>
            <p className="mb-6 leading-relaxed max-w-sm">
              폴댄스를 사랑하는 사람들을 위한 대한민국 No.1
              플랫폼.
              <br />
              MODUPOLE과 함께 즐거운 폴링 되세요.
            </p>
          </div>
  
          <div>
            <h4 className="text-white font-bold mb-6">Service</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  동작사전
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  콤보메이커
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  폴플레이스
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  커뮤니티
                </a>
              </li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  광고/제휴 문의
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  오류 제보
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rose-500 transition-colors"
                >
                  이용약관
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-sm text-center md:text-left">
          &copy; 2026 MODUPOLE. All rights reserved.
        </div>
      </footer>
    );
  };