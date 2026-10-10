import type { Topic } from "./domain.ts";

export const categories = ["전체", "캐릭터", "짤·표현"];
export const topics: Topic[] = [
  {
    id: "chiikawa",
    category: "캐릭터",
    title: "치이카와, 대체 누구야?",
    subtitle: "먼작귀 · 작고 하얀 주인공",
    aliases: ["먼작귀", "ちいかわ", "chiikawa"],
    summary:
      "나가노 작가의 만화와 그 주인공 이름이에요. 국내에서는 ‘먼작귀’라는 이름으로도 만날 수 있어요.",
    recognition:
      "작고 둥근 귀, 하얀 몸. 파란 귀는 하치와레, 긴 귀는 우사기예요.",
    context:
      "X에서 시작한 만화예요. 치이카와와 친구들의 일상을 다뤄요. 귀여운 그림 속에 노동이나 토벌 같은 의외의 설정도 있어요.",
    usage:
      "친구가 캐릭터 굿즈나 움짤을 보낼 때, 작품 이름과 캐릭터 이름이 같다는 점만 알아도 이해하기 쉬워요.",
    opener: "아, 이게 치이카와구나. 파란 귀 친구는 이름이 뭐야?",
    followUp:
      "이름은 하치와레예요. 셋이 함께 나오는 장면부터 보면 구분하기 쉬워요.",
    caution:
      "캐릭터 자체에 고정된 밈 뜻이 있는 건 아니에요. 짤의 표정과 앞뒤 대화를 함께 보세요.",
    image: "/images/chiikawa.png",
    imageAlt: "둥근 귀와 하얀 몸의 치이카와",
    minutes: 1,
    source: {
      label: "공식 애니메이션 · 치이카와",
      url: "https://www.anime-chiikawa.jp/",
      note: "원작·캐릭터 소개를 참고했어요. 사용 상황과 대화 예시는 서비스에서 작성했어요. ©nagano / chiikawa committee",
    },
  },
  {
    id: "hachiware",
    category: "캐릭터",
    title: "파란 귀는 하치와레",
    subtitle: "치이카와랑 같은 캐릭터가 아니에요",
    aliases: ["ハチワレ", "hachiware", "파란 고양이"],
    summary:
      "치이카와의 친구예요. 머리 위 파란 무늬와 뾰족한 귀로 구분할 수 있어요.",
    recognition:
      "파란 귀와 머리 무늬, 하얀 얼굴. 둥근 귀의 치이카와와 비교해 보세요.",
    context:
      "치이카와, 우사기와 함께 나오는 주요 캐릭터예요. 말을 하면서 상황을 설명하는 장면이 있어요. 종을 단정하기보다 이름으로 기억해 두세요.",
    usage:
      "파란 머리 캐릭터가 나오는 짤이나 굿즈를 봤을 때 ‘하치와레’라고 알아볼 수 있어요.",
    opener: "파란 귀가 하치와레 맞지? 이제 좀 구분된다.",
    followUp: "하얗고 둥근 귀는 치이카와, 길쭉한 귀는 우사기예요.",
    caution:
      "같은 작품에 나와도 이름은 달라요. 모두 치이카와라고 부르면 주인공과 헷갈릴 수 있어요.",
    image: "/images/hachiware.png",
    imageAlt: "뾰족한 파란 귀와 머리 무늬의 하치와레",
    minutes: 1,
    source: {
      label: "공식 애니메이션 · 캐릭터",
      url: "https://www.anime-chiikawa.jp/chara.html",
      note: "공식 캐릭터 그림으로 생김새를 확인했어요. ©nagano / chiikawa committee",
    },
  },
  {
    id: "usagi",
    category: "캐릭터",
    title: "긴 귀는 우사기",
    subtitle: "‘야하!’ 하는 그 캐릭터",
    aliases: ["うさぎ", "usagi", "야하", "우라"],
    summary: "치이카와의 친구예요. 연한 노란색 몸과 길게 선 귀가 눈에 띄어요.",
    recognition: "세 친구 중 귀가 가장 길어요. 하치와레의 파란 무늬도 없어요.",
    context:
      "공식 애니메이션에서도 ‘야하’, ‘우라’ 같은 소리를 내요. 번역 자막이나 팬 표기에 따라 한글 표현은 조금씩 달라질 수 있어요.",
    usage:
      "우사기 영상과 함께 ‘야하!’를 보내는 건 캐릭터의 소리를 따라 하는 반응으로 볼 수 있어요. 모든 상황에 같은 뜻으로 쓰이지는 않아요.",
    opener: "야하 하는 애가 우사기였구나ㅋㅋ",
    followUp: "영상으로 들으면 글자로 봤을 때보다 기억하기 쉬워요.",
    caution:
      "‘야하’는 일반적인 일본어 인사로 외우기보다, 작품 속 소리로 기억하세요.",
    image: "/images/usagi.png",
    imageAlt: "연한 노란색 몸과 긴 귀의 우사기",
    minutes: 1,
    source: {
      label: "공식 애니메이션 · 우사기",
      url: "https://www.anime-chiikawa.jp/",
      note: "공식 화면의 캐릭터와 소리 표기를 참고했어요. ©nagano / chiikawa committee",
    },
  },
  {
    id: "mangom",
    category: "캐릭터",
    title: "망곰 = 망그러진 곰",
    subtitle: "이모티콘에서 본 그 곰",
    aliases: ["망곰", "망그러진곰", "유랑"],
    summary:
      "유랑 작가의 ‘망그러진 곰’이에요. 카카오 이모티콘에서 다양한 표정과 동작으로 만날 수 있어요.",
    recognition:
      "둥글고 살짝 울퉁불퉁한 윤곽의 곰이에요. 농담곰과는 다른 작가의 캐릭터예요.",
    context:
      "공식 이모티콘 작가 페이지에 ‘아기 망그러진 곰’, ‘꼬질 망그러진 곰’ 등 여러 시리즈가 있어요. ‘망곰’은 이름을 줄여 부르는 표현이에요.",
    usage:
      "친구가 ‘망곰 귀엽다’고 하면 캐릭터 이야기를 하는 거예요. 이모티콘의 뜻은 개별 표정과 문구에 따라 달라요.",
    opener: "망곰이 망그러진 곰 줄임말이었네. 이모티콘으로 봤어!",
    followUp: "농담곰은 나가노, 망그러진 곰은 유랑 작가예요.",
    caution: "망곰과 농담곰은 같은 캐릭터가 아니에요.",
    image: "/images/mangom.png",
    imageAlt: "하트와 불꽃을 들고 있는 망그러진 곰 이모티콘",
    minutes: 1,
    source: {
      label: "카카오 이모티콘 · 유랑 작가",
      url: "https://e.kakao.com/creator/JAGPC8",
      note: "작가명과 시리즈 이름을 확인했어요. ©YURANG. 예시는 서비스에서 작성했어요.",
    },
  },
  {
    id: "nagano-bear",
    category: "캐릭터",
    title: "농담곰, 치이카와랑 같은 작가?",
    subtitle: "나가노의 하얀 곰",
    aliases: ["농담곰", "나가노", "nagano", "くま"],
    summary:
      "나가노 작가의 곰 캐릭터예요. 치이카와도 같은 작가가 그렸지만 서로 다른 캐릭터예요.",
    recognition:
      "하얀 몸과 작은 둥근 귀, 단순한 얼굴을 보세요. 치이카와와는 그림의 비율과 얼굴이 달라요.",
    context:
      "나가노 공식 마켓에서는 ‘くま(곰)’ 항목으로 구분해요. 국내에서 부르는 농담곰과 공식 일본어 표기를 함께 알아두면 검색하기 편해요.",
    usage:
      "흰 곰 짤을 전부 치이카와로 부르기보다, 원본의 얼굴과 출처를 확인해 보세요.",
    opener: "농담곰이랑 치이카와가 같은 작가였어?",
    followUp: "같은 작가지만 망그러진 곰과는 관계없는 별도 캐릭터예요.",
    caution: "생김새만으로 헷갈리면 원작자나 공식 상품명을 확인하세요.",
    image: "/images/nagano-bear.png",
    imageAlt: "단순한 얼굴과 하얀 몸의 나가노 곰",
    minutes: 1,
    source: {
      label: "나가노 마켓 · 곰",
      url: "https://nagano-market.jp/collections/kuma",
      note: "공식 마켓의 작가·캐릭터 분류를 참고했어요. ©nagano",
    },
  },
  {
    id: "this-is-fine",
    category: "짤·표현",
    title: "This is fine, 안 괜찮은데 괜찮대",
    subtitle: "불난 방에서도 ‘괜찮아’",
    aliases: ["디스이즈파인", "괜찮아", "불타는 강아지"],
    summary:
      "불이 난 방에 앉은 개가 ‘This is fine’이라고 말하는 만화에서 나온 짤이에요. 상황과 말의 모순이 핵심이에요.",
    recognition:
      "불난 방과 태연한 개가 원본의 단서예요. 이 카드의 글자 그림은 원본 짤이 아니에요.",
    context:
      "KC Green의 웹코믹 Gunshow ‘On Fire’가 원본이에요. 정말 괜찮다는 뜻보다, 일이 꼬여도 애써 태연한 상태를 표현하는 예시로 이해해 보세요.",
    usage:
      "예: 할 일은 쌓였는데 일단 커피부터 마시는 내 상황에 ‘This is fine’. 아래 문장은 사용 맥락을 설명한 자체 예시예요.",
    opener: "할 일은 산더미인데 커피부터 마시는 중. This is fine…",
    followUp: "말 그대로 괜찮다는 뜻과 반어적인 사용을 구분하면 돼요.",
    caution:
      "다른 사람의 실제 사고나 힘든 일을 가볍게 넘기는 답변으로 쓰지는 않는 편이 좋아요.",
    image: "/images/this-is-fine.svg",
    imageAlt:
      "This is fine 문구와 안 괜찮은데 괜찮다는 뜻을 설명한 자체 제작 카드",
    minutes: 1,
    source: {
      label: "KC Green · Gunshow 원본",
      url: "https://gunshowcomic.com/648",
      note: "원본 만화로 장면을 확인할 수 있어요. 사용 맥락은 편집 설명이며 최신 유행 순위가 아니에요.",
    },
  },
];
export const briefingIds = ["chiikawa", "hachiware", "usagi"];
export const questions = [
  {
    situation: "친구가 치이카와 키링을 보여줘요. 이름은 처음 들어요.",
    prompt: "어떻게 대화를 이어갈까요?",
    options: [
      "요즘 그거 누가 좋아해?",
      "처음 보는데, 어떤 캐릭터야?",
      "알지! 나도 다 봤어.",
    ],
    correct: 1,
    explanation:
      "처음 본다고 말하고 물어보면, 아는 척하지 않아도 이야기를 이어갈 수 있어요.",
  },
  {
    situation: "친구가 파란 귀 캐릭터를 하치와레라고 알려줬어요.",
    prompt: "막 알게 된 내용으로 답해 보세요.",
    options: [
      "아, 파란 귀가 하치와레구나. 넌 셋 중에 누가 좋아?",
      "이름이 왜 이렇게 어려워?",
      "다 똑같이 생겼는데?",
    ],
    correct: 0,
    explanation:
      "알게 된 특징을 짚고 취향을 물어보세요. 작품을 전부 볼 필요는 없어요.",
  },
  {
    situation: "친구가 ‘This is fine’ 짤을 보내며 일이 너무 많다고 해요.",
    prompt: "상황을 확인하며 반응해 보세요.",
    options: [
      "괜찮다니까 다행이네!",
      "짤 웃기다ㅋㅋ 끝!",
      "안 괜찮다는 뜻이지ㅠ 무슨 일 있어?",
    ],
    correct: 2,
    explanation:
      "이 짤은 반어적으로 쓰일 수 있어요. 상대가 힘들다고 하면 상황을 먼저 확인해 보세요.",
  },
];
export const memeQuestions = [
  {
    situation: "치이카와 세 친구 구분하기",
    prompt: "파란 귀와 머리 무늬가 있는 캐릭터는?",
    options: ["치이카와", "하치와레", "우사기"],
    correct: 1,
    explanation:
      "파란 귀는 하치와레, 둥근 귀의 하얀 캐릭터는 치이카와, 긴 귀는 우사기예요.",
  },
  {
    situation: "줄임말 알아보기",
    prompt: "‘망곰’은 어떤 이름의 줄임말일까요?",
    options: ["망그러진 곰", "농담곰", "나가노의 곰"],
    correct: 0,
    explanation:
      "망곰은 유랑 작가의 망그러진 곰이에요. 농담곰은 나가노 작가의 별도 캐릭터예요.",
  },
  {
    situation: "짤의 맥락 이해하기",
    prompt: "일이 쌓였을 때 ‘This is fine’은 어떤 맥락일까요?",
    options: [
      "모든 일이 잘 끝났다",
      "상대의 성공을 축하한다",
      "안 괜찮지만 애써 태연한 상태",
    ],
    correct: 2,
    explanation:
      "불난 방에서도 괜찮다고 말하는 장면의 모순을 떠올리면 이해하기 쉬워요.",
  },
];
