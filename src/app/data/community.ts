export type Category = "전체" | "공지" | "자유" | "리뷰" | "질문" | "팁";

export interface Post {
  id: number;
  title: string;
  category: Category;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  image?: string;
  isHot?: boolean;
  content?: string; // Added for detail view
}

export const POPULAR_POSTS: Post[] = [
  {
    id: 1,
    title: "폴댄스 6개월 차, 드디어 아이샤 성공했습니다! 😭",
    category: "자유",
    author: "폴린이101",
    date: "2026.02.06",
    views: 1250,
    likes: 156,
    comments: 42,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    isHot: true,
    content: "드디어 아이샤를 성공했습니다. 6개월 동안 정말 열심히 연습했는데... \n\n처음에는 팔 힘도 부족하고 무서워서 시도조차 못했는데, 선생님이 잘 잡아주시고 격려해주신 덕분이에요. \n\n다들 포기하지 말고 화이팅하세요!"
  },
  {
    id: 2,
    title: "이번주 켈리스포츠 신상 리뷰 (착용샷 O)",
    category: "리뷰",
    author: "장비욕심",
    date: "2026.02.05",
    views: 980,
    likes: 89,
    comments: 25,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    isHot: true,
    content: "켈리스포츠에서 이번에 나온 벨벳 세트 입어봤어요. \n\n1. 소재: 벨벳이라 미끄러울 줄 알았는데 안쪽은 쫀쫀해서 폴 탈 때 전혀 문제 없습니다.\n2. 디자인: 넥라인이 예쁘게 파여서 목이 길어보여요.\n3. 사이즈: 평소 S 입는데 정사이즈로 잘 맞습니다.\n\n사진 참고하세요!"
  },
  {
    id: 3,
    title: "손땀 러버들을 위한 그립제 비교 분석 총정리",
    category: "팁",
    author: "드라이핸즈",
    date: "2026.02.04",
    views: 2100,
    likes: 342,
    comments: 56,
    isHot: true,
    content: "손에 땀이 많아서 이것저것 다 써본 유목민입니다. \n\n- 갓그립: 가루날림 적고 지속력 좋음. 건조한 손 추천\n- 잇츠그립: 땀 많은 손에 추천. 엄청 뻑뻑함\n- 드라이핸즈(직구): 명불허전. 근데 구하기 힘듦\n\n개인적으로 여름엔 잇츠그립, 겨울엔 갓그립 조합 추천합니다."
  },
  {
    id: 4,
    title: "[공지] 2026 상반기 커뮤니티 이용 수칙 안내",
    category: "공지",
    author: "관리자",
    date: "2026.01.01",
    views: 5000,
    likes: 120,
    comments: 10,
    isHot: true,
    content: "안녕하세요, MODUPOLE 관리자입니다. \n\n2026년 상반기 커뮤니티 이용 수칙이 일부 개정되었습니다. \n\n1. 비방 및 욕설 금지\n2. 광고성 게시글 작성 시 사전 문의\n3. 타 학원 비하 발언 금지\n\n모두가 즐거운 커뮤니티를 위해 협조 부탁드립니다."
  }
];

export const GENERAL_POSTS: Post[] = Array.from({ length: 50 }).map((_, i) => ({
  id: 10 + i,
  title: i % 3 === 0 ? `폴댄스 학원 추천 부탁드려요 (지역: 강남) ${i}` : 
         i % 3 === 1 ? `오늘 배운 콤보 기록... 너무 어렵네요 ${i}` : 
         `중고 폴웨어 벼룩합니다! 상태 좋아요 ${i}`,
  category: i % 5 === 0 ? "질문" : i % 5 === 1 ? "자유" : i % 5 === 2 ? "팁" : "리뷰",
  author: `유저${i}`,
  date: `2026.02.${Math.max(1, 28 - i)}`,
  views: Math.floor(Math.random() * 500),
  likes: Math.floor(Math.random() * 50),
  comments: Math.floor(Math.random() * 20),
  image: i % 4 === 0 ? "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=200&auto=format&fit=crop" : undefined,
  content: "내용이 들어갈 자리입니다. 임시 텍스트입니다. 폴댄스는 정말 재미있는 운동이에요. 다들 안전폴링하세요! \n\n(상세 내용은 아직 구현되지 않은 목데이터입니다.)"
}));

export const ALL_POSTS = [...POPULAR_POSTS, ...GENERAL_POSTS];