export interface Move {
  id: number;
  name: string;
  engName: string;
  level: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  category?: string;
  image: string;
  tags: string[];
  description: string;
  videoId: string;
  relatedMoveIds: number[];
  psoDifficulty: string;
  aliases?: string[];
}

export const MOVES: Move[] = [
  // Novice / Beginner
  { 
    id: 1, 
    name: '클라임', 
    engName: 'Climb', 
    level: 'Novice', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1547955922-b5b630dc6538?q=80&w=800&auto=format&fit=crop',
    tags: ['#기초', '#근력', '#필수'],
    description: '폴댄스의 가장 기초가 되는 동작으로, 폴을 잡고 올라가는 기술입니다.',
    videoId: 'dQw4w9WgXcQ', // Placeholder
    relatedMoveIds: [2, 5],
    psoDifficulty: 'Level 1'
  },
  { 
    id: 2, 
    name: '파이어맨 스핀', 
    engName: 'Fireman Spin', 
    level: 'Novice', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tags: ['#스핀', '#입문', '#회전'],
    description: '소방관이 봉을 타고 내려오는 모습과 비슷하여 이름 붙여진 가장 기본적인 스핀 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [1, 3],
    psoDifficulty: 'Level 1'
  },
  { 
    id: 3, 
    name: '체어 스핀', 
    engName: 'Chair Spin', 
    level: 'Novice', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    tags: ['#스핀', '#코어', '#우아함'],
    description: '의자에 앉은 듯한 자세로 회전하는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [2, 4],
    psoDifficulty: 'Level 1'
  },
  { 
    id: 4, 
    name: '헐리우드 스핀', 
    engName: 'Hollywood Spin', 
    level: 'Novice', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#스핀', '#다리찢기', '#유연성'],
    description: '한쪽 다리를 크게 돌려 회전력을 얻는 스핀입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [3, 5],
    psoDifficulty: 'Level 1'
  },
  { 
    id: 5, 
    name: '펜슬', 
    engName: 'Pencil', 
    level: 'Beginner', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    tags: ['#라인', '#버티기', '#전신'],
    description: '몸을 연필처럼 곧게 펴서 폴에 매달리는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [1, 6],
    psoDifficulty: 'Level 1'
  },
  { 
    id: 6, 
    name: '페어리', 
    engName: 'Fairy', 
    level: 'Beginner', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tags: ['#요정', '#스핀', '#예쁨'],
    description: '요정처럼 가볍게 날아오르는 듯한 스핀 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [5, 7],
    psoDifficulty: 'Level 2'
  },
  { 
    id: 7, 
    name: '팅커벨', 
    engName: 'Tinkerbell', 
    level: 'Beginner', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#요정시리즈', '#스핀', '#입문'],
    description: '무릎을 굽혀 폴을 잡고 회전하는 귀여운 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [6, 8],
    psoDifficulty: 'Level 2'
  },
  { 
    id: 8, 
    name: '백후크', 
    engName: 'Back Hook', 
    level: 'Beginner', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tags: ['#후크', '#스핀', '#기본'],
    description: '뒤쪽 다리를 폴에 걸어 회전하는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [7, 9],
    psoDifficulty: 'Level 2'
  },
  { 
    id: 9, 
    name: '프론트 후크', 
    engName: 'Front Hook', 
    level: 'Beginner', 
    category: 'Spin',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    tags: ['#후크', '#스핀', '#기본'],
    description: '앞쪽 다리를 폴에 걸어 회전하는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [8, 10],
    psoDifficulty: 'Level 2'
  },
  { 
    id: 10, 
    name: '인버트 V', 
    engName: 'Invert V', 
    level: 'Beginner', 
    category: 'Invert',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    tags: ['#뒤집기', '#복근', '#필수'],
    description: '몸을 거꾸로 뒤집어 V자 모양을 만드는 폴댄스의 핵심 기술입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [11, 12],
    psoDifficulty: 'Level 3'
  },
  
  // Intermediate
  { 
    id: 11, 
    name: '제미니', 
    engName: 'Gemini (Outside Leg Hang)', 
    level: 'Intermediate', 
    category: 'Invert',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tags: ['#레그행', '#오금', '#필수'],
    description: '바깥쪽 다리의 오금을 폴에 걸고 버티는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [10, 12],
    psoDifficulty: 'Level 3'
  },
  { 
    id: 12, 
    name: '스콜피온', 
    engName: 'Scorpio (Inside Leg Hang)', 
    level: 'Intermediate', 
    category: 'Invert',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#레그행', '#오금', '#유연성'],
    description: '안쪽 다리의 오금을 폴에 걸고 버티는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [10, 11],
    psoDifficulty: 'Level 3'
  },
  { 
    id: 13, 
    name: '버터플라이', 
    engName: 'Butterfly', 
    level: 'Intermediate', 
    category: 'Invert',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tags: ['#확장', '#근력', '#예쁨'],
    description: '나비가 날개를 펼친 듯한 형상을 만드는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [12, 14],
    psoDifficulty: 'Level 3'
  },
  { 
    id: 14, 
    name: '슈퍼맨', 
    engName: 'Superman', 
    level: 'Intermediate', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    tags: ['#고통', '#허벅지', '#비행'],
    description: '슈퍼맨이 날아가는 자세와 비슷하여 붙여진 이름입니다. 허벅지 안쪽의 고통을 참아내야 합니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [13, 15],
    psoDifficulty: 'Level 4'
  },
  { 
    id: 15, 
    name: '제이드 스플릿', 
    engName: 'Jade Split', 
    level: 'Intermediate', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    tags: ['#다리찢기', '#유연성', '#라인'],
    description: '공중에서 다리를 180도로 찢는 고난이도 유연성 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [14, 16],
    psoDifficulty: 'Level 4'
  },
  { 
    id: 16, 
    name: '알레그라', 
    engName: 'Allegra', 
    level: 'Intermediate', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tags: ['#후굴', '#유연성', '#아름다움'],
    description: '등을 아치형으로 만들고 다리를 잡는 우아한 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [15, 17],
    psoDifficulty: 'Level 4'
  },
  { 
    id: 17, 
    name: '히어로', 
    engName: 'Hero', 
    level: 'Intermediate', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#힘', '#균형', '#영웅'],
    description: '영웅이 착지하는 듯한 역동적인 자세입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [16, 18],
    psoDifficulty: 'Level 4'
  },
  { 
    id: 18, 
    name: '비바', 
    engName: 'Viva', 
    level: 'Intermediate', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    tags: ['#유연성', '#스핀', '#콤보'],
    description: '다리를 넓게 벌려 회전하는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [17, 19],
    psoDifficulty: 'Level 4'
  },
  { 
    id: 19, 
    name: '큐피드', 
    engName: 'Cupid', 
    level: 'Intermediate', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tags: ['#사랑', '#균형', '#다리힘'],
    description: '큐피드가 활을 쏘는 자세를 형상화한 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [18, 20],
    psoDifficulty: 'Level 3'
  },
  { 
    id: 20, 
    name: '인피니티', 
    engName: 'Infinity', 
    level: 'Intermediate', 
    category: 'Static',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    tags: ['#무한대', '#밸런스', '#코어'],
    description: '몸으로 무한대(∞) 기호를 만드는 듯한 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [19, 21],
    psoDifficulty: 'Level 4'
  },

  // Advanced
  { 
    id: 21, 
    name: '아이샤', 
    engName: 'Ayesha', 
    level: 'Advanced', 
    category: 'Invert',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tags: ['#핸드스프링', '#밸런스', '#고급'],
    description: '핸드스프링의 기본이 되는 동작으로, 두 팔로 몸을 지탱하며 거꾸로 서는 기술입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [20, 22],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 22, 
    name: '아이언 X', 
    engName: 'Iron X', 
    level: 'Advanced', 
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#플래그', '#끝판왕', '#코어힘'],
    description: '인�� 깃발(Human Flag) 자세를 폴에서 구현하는 최고난이도 근력 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [21, 23],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 23, 
    name: '핸드스프링', 
    engName: 'Handspring', 
    level: 'Advanced', 
    category: 'Dynamic',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    tags: ['#다이내믹', '#점프', '#아크로바틱'],
    description: '바닥에서 점프하여 아이샤 자세로 진입하는 다이내믹한 기술입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [21, 24],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 24, 
    name: '러시안 스플릿', 
    engName: 'Russian Split', 
    level: 'Advanced', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    tags: ['#유연성', '#스플릿', '#발등'],
    description: '폴을 발등으로 잡고 다리를 찢는 고난이도 유연성 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [23, 25],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 25, 
    name: '스패치콕', 
    engName: 'Spatchcock', 
    level: 'Advanced', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    tags: ['#극강유연성', '#고관절', '#펠릭스'],
    description: '고관절 유연성이 극도로 요구되는, 닭을 납작하게 누른 듯한 자세입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [24, 26],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 26, 
    name: '버드 오브 파라다이스', 
    engName: 'Bird of Paradise', 
    level: 'Advanced', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    tags: ['#극락조', '#유연성', '#스탠딩'],
    description: '서서 다리를 머리 위로 들어올리는 극락조 요가 자세를 폴에서 수행합니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [25, 27],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 27, 
    name: '데드리프트', 
    engName: 'Deadlift', 
    level: 'Advanced', 
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tags: ['#힘', '#데드', '#제자리'],
    description: '반동 없이 순수 근력만으로 몸을 들어올리는 기술입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [26, 28],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 28, 
    name: '피닉스', 
    engName: 'Phoenix', 
    level: 'Advanced', 
    category: 'Dynamic',
    image: 'https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=800&auto=format&fit=crop',
    tags: ['#불사조', '#다이내믹', '#회전'],
    description: '거꾸로 회전하며 날아오르는 불사조 같은 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [27, 29],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 29, 
    name: '레인보우 마르첸코', 
    engName: 'Rainbow Marchenko', 
    level: 'Advanced', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    tags: ['#허리유연성', '#무지개', '#아름다움'],
    description: '몸을 무지개처럼 둥글게 휘어 발을 잡는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [28, 30],
    psoDifficulty: 'Level 5'
  },
  { 
    id: 30, 
    name: '이글', 
    engName: 'Eagle', 
    level: 'Advanced', 
    category: 'Flexibility',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    tags: ['#독수리', '#유연성', '#활공'],
    description: '독수리가 날개를 펼친 듯한 웅장한 자태를 뽐내는 동작입니다.',
    videoId: 'dQw4w9WgXcQ',
    relatedMoveIds: [29, 21],
    psoDifficulty: 'Level 5'
  }
];

// Alias for compatibility
export const POLE_MOVES = MOVES;