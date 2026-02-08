export interface Place {
  id: number;
  name: string;
  address: string;
  instagram: string;
  tags: string[];
  region: string;
  x: number; // Percentage x position on the mock map
  y: number; // Percentage y position on the mock map
  image: string;
  phone: string;
}

export const PLACES: Place[] = [
  {
    id: 1,
    name: "SL Sports Pole Studio",
    address: "서울 강남구 역삼동 123-45",
    instagram: "@sl_sports_pole",
    tags: ["#인버트맛집", "#층고4m", "#채광좋음"],
    region: "강남구",
    x: 65,
    y: 45,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    phone: "02-1234-5678"
  },
  {
    id: 2,
    name: "Modu Pole Hongdae",
    address: "서울 마포구 서교동 332-1",
    instagram: "@modu_hongdae",
    tags: ["#입문전문", "#샤워실완비", "#역세권"],
    region: "마포구",
    x: 25,
    y: 35,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop",
    phone: "02-9876-5432"
  },
  {
    id: 3,
    name: "Pole & Fit Busan",
    address: "부산 해운대구 우동 992",
    instagram: "@pole_fit_busan",
    tags: ["#오션뷰", "#고급시설", "#주차가능"],
    region: "부산",
    x: 85,
    y: 85,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    phone: "051-123-4567"
  },
  {
    id: 4,
    name: "Star Pole Gangnam",
    address: "서울 강남구 청담동 88-1",
    instagram: "@star_pole_gn",
    tags: ["#연예인맛집", "#프라이빗", "#1:1레슨"],
    region: "강남구",
    x: 70,
    y: 50,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    phone: "02-555-5555"
  },
  {
    id: 5,
    name: "Pink Pole Studio",
    address: "서울 성동구 성수동 1가",
    instagram: "@pink_pole_seongsu",
    tags: ["#성수핫플", "#인생샷", "#핑크무드"],
    region: "성동구",
    x: 55,
    y: 40,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop",
    phone: "02-444-4444"
  },
  {
    id: 6,
    name: "Aerial Art Center",
    address: "서울 마포구 연남동 22-5",
    instagram: "@aerial_art_kr",
    tags: ["#후프병행", "#전문가반", "#넓은홀"],
    region: "마포구",
    x: 30,
    y: 30,
    image: "https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=600&auto=format&fit=crop",
    phone: "02-333-3333"
  }
];

export const REGIONS = ["전체", "강남구", "마포구", "성동구", "부산", "기타"];