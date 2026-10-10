import type { Topic } from "./domain";

export const categories = ["전체", "라이프", "먹거리", "문화", "테크"];
export const topics: Topic[] = [
  {
    id: "running",
    category: "라이프",
    title: "같이 달리면 뭐가 다를까?",
    subtitle: "러닝크루, 기록보다 함께하는 재미",
    summary:
      "러닝크루는 함께 달리는 모임이에요. 코스와 속도를 정하고, 달린 뒤 이야기를 나누기도 해요.",
    context:
      "Strava의 2024년 리포트는 러닝 모임과 사회적 연결을 다뤘어요. 모임마다 분위기와 참여 조건이 달라요. 처음이라면 초보 코스가 있는지 확인해 보세요.",
    opener: "혼자 뛰는 거랑 같이 뛰는 거, 어떤 게 더 좋아요?",
    followUp: "처음 가도 편하게 뛸 수 있는 코스가 있어요?",
    caution: "운동 기록이나 체력을 비교하기보다, 경험을 물어보세요.",
    image: "/images/run.jpg",
    imageAlt: "푸른 새벽 하늘 아래 함께 달리는 사람들",
    minutes: 1,
    source: {
      label: "Strava · 2024 운동 트렌드 리포트",
      url: "https://press.strava.com/zi/articles/strava-releases-annual-year-in-sport-trend",
      note: "2024년 자료예요. 현재 국내 인기 순위를 뜻하지 않아요.",
    },
  },
  {
    id: "matcha",
    category: "먹거리",
    title: "커피 대신 말차 한 잔?",
    subtitle: "쌉싸름한 맛도 취향이 되니까",
    summary:
      "말차는 찻잎을 곱게 갈아 만든 가루차예요. 우유를 넣은 말차 라테나 디저트로도 즐겨요.",
    context:
      "가루를 물에 풀어 마신다는 점에서 잎을 우려내는 차와 달라요. 라테는 우유와 당도에 따라 맛이 달라지니, 서로 좋아하는 조합을 물어보기 좋아요.",
    opener: "말차는 진한 쪽이 좋아요, 달달한 쪽이 좋아요?",
    followUp: "괜찮았던 카페나 디저트 있으면 알려주세요.",
    caution: "말차에도 카페인이 있어요. 건강 효능을 단정하지 마세요.",
    image: "/images/matcha.jpg",
    imageAlt: "흰 잔에 담긴 초록빛 말차 라테",
    minutes: 1,
    source: {
      label: "일본정부관광국 · 다도와 말차",
      url: "https://www.japan.travel/en/guide/tea-ceremony/",
      note: "말차의 기본 설명을 참고했어요. 카페 추천이나 인기 순위는 아니에요.",
    },
  },
  {
    id: "camera",
    category: "라이프",
    title: "사진은 조금 덜 선명해도",
    subtitle: "디지털카메라로 남기는 일상",
    summary:
      "휴대폰 대신 별도 카메라로 일상을 기록하는 취미예요. 색감과 찍는 과정 자체를 즐길 수 있어요.",
    context:
      "Fujifilm의 X half는 필름 촬영 방식을 디지털로 구현한 사례예요. 카메라를 새로 사지 않아도, 평소 어떤 사진을 찍는지 이야기해 볼 수 있어요.",
    opener: "휴대폰에 가장 많이 찍어둔 사진이 뭐예요?",
    followUp: "사진 찍을 때 풍경이 좋아요, 사람이 좋아요?",
    caution: "기기 가격이나 브랜드로 취향을 평가하지 마세요.",
    image: "/images/camera.jpg",
    imageAlt: "검은 카메라 두 대의 렌즈",
    minutes: 1,
    source: {
      label: "Fujifilm · X half 소개",
      url: "https://www.fujifilm-x.com/en-gb/products/cameras/x-hf1/",
      note: "제품의 촬영 방식만 참고했어요. 구매를 권하는 내용은 아니에요.",
    },
  },
  {
    id: "coffee",
    category: "먹거리",
    title: "커피 한 잔에도 취향이 있다",
    subtitle: "핸드드립, 어렵게 말하지 않아도 돼요",
    summary:
      "핸드드립은 분쇄한 원두에 물을 부어 커피를 내리는 방식이에요. 물을 붓는 속도와 원두에 따라 맛이 달라져요.",
    context:
      "HARIO는 V60 드리퍼에서 물을 붓는 방식이 추출에 영향을 준다고 설명해요. 전문 용어를 몰라도 산뜻한 맛과 고소한 맛 중 무엇을 좋아하는지부터 이야기해 보세요.",
    opener: "커피는 산뜻한 맛이 좋아요, 고소한 맛이 좋아요?",
    followUp: "집에서도 내려 마셔요, 카페에서 마시는 편이에요?",
    caution: "커피를 마시지 않는 사람에게는 다른 음료 취향을 물어보세요.",
    image: "/images/popup.jpg",
    imageAlt: "카페에서 드리퍼에 물을 붓는 모습",
    minutes: 1,
    source: {
      label: "HARIO · V60 드리퍼 안내",
      url: "https://globalhario.com/products/hario-v60-coffee-dripper-ceramic",
      note: "추출 방식의 기본 설명을 참고했어요.",
    },
  },
  {
    id: "playlist",
    category: "문화",
    title: "요즘 가장 많이 듣는 노래는?",
    subtitle: "플레이리스트로 시작하는 취향 이야기",
    summary:
      "자주 듣는 노래 한 곡은 부담 없이 꺼내기 좋은 소재예요. 플레이리스트나 연말 청취 기록도 이야기의 출발점이 될 수 있어요.",
    context:
      "Spotify Wrapped는 한 해의 음악 청취 기록을 정리하는 기능이에요. 여기서는 2024년 소개 자료를 참고했어요. 서비스를 쓰지 않아도 좋아하는 노래를 물어볼 수 있어요.",
    opener: "요즘 반복해서 듣는 노래 하나만 추천해 주세요.",
    followUp: "그 노래는 언제 들으면 제일 좋아요?",
    caution: "장르를 잘 몰라도 괜찮아요. 취향을 평가하지 말고 들어보세요.",
    image: "/images/music.jpg",
    imageAlt: "라디오 옆에서 편하게 음악을 듣는 사람",
    minutes: 1,
    source: {
      label: "Spotify · 2024 Wrapped 소개",
      url: "https://newsroom.spotify.com/2024-12-04/the-art-and-science-behind-spotify-wrapped/",
      note: "2024년 기능 소개 자료예요. 올해 기능이나 차트와 다를 수 있어요.",
    },
  },
  {
    id: "ai-image",
    category: "테크",
    title: "AI로 이미지를 만든다면?",
    subtitle: "생성형 AI, 써본 경험부터 이야기하기",
    summary:
      "생성형 AI는 글로 설명하거나 이미지를 넣어 새로운 이미지를 만들 수 있어요. 원하는 장면을 구체적으로 적는 게 출발점이에요.",
    context:
      "OpenAI는 2025년 이미지 생성 기능에서 텍스트 설명과 기존 이미지 편집 사례를 소개했어요. 결과에 오류가 있을 수 있어 확인이 필요해요.",
    opener: "AI로 이미지를 만들어 본 적 있어요?",
    followUp: "만들어본다면 어떤 장면을 해보고 싶어요?",
    caution:
      "다른 사람의 사진은 동의를 받고 사용하세요. 결과를 사실로 단정하지 마세요.",
    image: "/images/ai.jpg",
    imageAlt: "전자회로 기판의 부품을 가까이 찍은 사진",
    minutes: 1,
    source: {
      label: "OpenAI · 2025 이미지 생성 소개",
      url: "https://openai.com/index/introducing-4o-image-generation/",
      note: "2025년 발표 자료예요. 현재 모델·요금·제공 범위는 별도 확인이 필요해요.",
    },
  },
];
export const briefingIds = ["running", "matcha", "camera"];
export const questions = [
  {
    situation: "처음 만난 사람이 러닝을 시작했다고 해요.",
    prompt: "어떤 말로 이어가면 좋을까요?",
    options: [
      "몇 km를 몇 분에 뛰어요?",
      "어떤 계기로 시작했어요?",
      "저는 뛰는 거 별로예요.",
    ],
    correct: 1,
    explanation:
      "시작한 계기를 물으면 기록을 비교하지 않고 경험을 들을 수 있어요. 이 연습에서는 상대가 편하게 답할 수 있는 질문을 골라요.",
  },
  {
    situation: "친구가 모르는 가수의 노래를 추천해 줬어요.",
    prompt: "잘 모르는 이야기에도 자연스럽게 답해 보세요.",
    options: [
      "처음 듣는데, 어떤 노래부터 들어보면 좋아?",
      "아, 알지! 유명하잖아.",
      "내가 아는 가수가 더 좋은데.",
    ],
    correct: 0,
    explanation:
      "모르는 건 편하게 말해도 괜찮아요. 추천을 부탁하면 상대가 좋아하는 이야기를 이어갈 수 있어요.",
  },
  {
    situation: "추천한 말차 라테를 상대가 별로 좋아하지 않아요.",
    prompt: "취향이 다를 때는 어떻게 이어갈까요?",
    options: [
      "여기 말차가 유명한데 왜?",
      "다들 좋아하던데, 한 번 더 마셔봐.",
      "그럼 평소에는 어떤 음료 좋아해요?",
    ],
    correct: 2,
    explanation:
      "다른 취향도 그대로 받아들이고 질문을 바꿔보세요. 대화가 이어지는 방식은 상황마다 달라요.",
  },
];
