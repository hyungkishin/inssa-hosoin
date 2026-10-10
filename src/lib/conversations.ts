export type FollowUp = { text: string; reply: string; note: string };
export type Opening = FollowUp & { followUps: FollowUp[] };
export type Scenario = {
  id: string;
  title: string;
  label: string;
  situation: string;
  message: string;
  hint: string;
  context: string;
  caution: string;
  topicId?: string;
  openings: Opening[];
};
export const scenarios: Scenario[] = [
  {
    id: "goods",
    title: "친구의 캐릭터 굿즈",
    label: "취향을 알고 싶을 때",
    situation: "친구가 가방에 새 키링을 달고 왔어요.",
    message: "이거 봐. 드디어 구했어!",
    topicId: "hachiware",
    hint: "이름을 몰라도, 좋아하는 이유는 물어볼 수 있어요.",
    context:
      "이 연습에서는 친구가 하치와레 키링을 보여줘요. 캐릭터 지식보다 친구가 좋아하는 이유에 집중해 보세요.",
    caution:
      "친구가 짧게 답하면 질문을 계속하기보다 반응을 듣고 기다려 보세요.",
    openings: [
      {
        text: "처음 보는데, 어떤 캐릭터야?",
        reply: "하치와레야. 겁이 나도 해보는 모습이 좋아.",
        note: "모른다고 말해도 괜찮아요. 친구가 캐릭터와 좋아하는 이유를 함께 알려줬어요.",
        followUps: [
          {
            text: "그런 모습이 나오는 장면 하나 보여줄래?",
            reply: "좋아ㅋㅋ 짧은 영상 있는데 보내줄게.",
            note: "친구가 말한 특징을 받아 물었어요. 함께 볼 소재로 이어갈 수 있어요.",
          },
          {
            text: "난 아직 잘 모르지만, 좋아하는 이유는 알 것 같아.",
            reply: "맞아. 보고 있으면 좀 응원하게 돼.",
            note: "질문을 더 하지 않고 들은 내용에 반응하는 방법도 있어요.",
          },
        ],
      },
      {
        text: "키링 귀엽다. 어디서 샀어?",
        reply: "팝업에서 샀어. 한 시간 기다렸잖아ㅋㅋ",
        note: "구매 경험으로 이어졌어요. 캐릭터 설명이 없어도 친구의 이야기를 들을 수 있어요.",
        followUps: [
          {
            text: "한 시간이나? 기다릴 만큼 갖고 싶었구나.",
            reply: "응ㅋㅋ 이 표정이 딱 내가 찾던 거였어.",
            note: "기다린 경험을 짚어줬어요. 친구가 중요하게 생각한 부분을 더 말할 여지가 생겨요.",
          },
          {
            text: "그 팝업 아직 해? 나도 구경해 보고 싶다.",
            reply: "이번 주까지야. 시간 맞으면 같이 가자.",
            note: "정말 구경하고 싶을 때 쓸 수 있는 말이에요. 관심 없는 약속을 억지로 만들 필요는 없어요.",
          },
        ],
      },
      {
        text: "요즘 다 그거 달고 다니더라.",
        reply: "응. 근데 난 유행하기 전부터 좋아했어.",
        note: "유행 이야기보다 개인 취향을 말하고 싶을 수 있어요. 친구가 좋아하는 이유로 돌아가 보세요.",
        followUps: [
          {
            text: "어떤 점 때문에 좋아하게 됐어?",
            reply: "성격이 좋아. 무서워도 친구 도와주는 장면이 있거든.",
            note: "친구가 좋아하게 된 계기를 물었어요. 유행 여부에 관한 대화를 이어갈 필요는 없어요.",
          },
          {
            text: "아, 오래 좋아했구나. 내가 이제 눈에 들어왔나 봐.",
            reply: "그럴 수 있지ㅋㅋ 내가 자주 달고 다녔는데.",
            note: "내가 몰랐던 것으로 정리했어요. 상대의 취향을 평가하지 않고 넘어갈 수 있어요.",
          },
        ],
      },
    ],
  },
  {
    id: "show",
    title: "처음 듣는 작품",
    label: "같이 이야기하고 싶을 때",
    situation: "친구가 요즘 푹 빠진 작품 이야기를 해요.",
    message: "어제 그거 보다가 또 새벽 두 시에 잤어ㅋㅋ",
    hint: "작품을 다 볼 필요 없이, 친구가 빠진 이유부터 들어봐요.",
    context:
      "제목도 줄거리도 모르는 상황이에요. 친구가 재미있게 본 부분을 물어보면 대화의 단서를 얻을 수 있어요.",
    caution:
      "스포일러가 싫으면 먼저 말하세요. 직접 볼 계획이 없다면 본다고 약속하지 않아도 돼요.",
    openings: [
      {
        text: "난 아직 안 봤는데, 어떤 점이 재밌어?",
        reply: "둘이 맨날 싸우는데 정작 서로 제일 챙겨ㅋㅋ",
        note: "줄거리 전체보다 친구가 좋아하는 관계를 들었어요.",
        followUps: [
          {
            text: "티격태격하는 관계 좋아하는구나ㅋㅋ",
            reply: "맞아ㅋㅋ 말은 저렇게 해도 행동은 다르니까.",
            note: "방금 들은 취향에 반응했어요. 모르는 설정을 아는 척할 필요가 없어요.",
          },
          {
            text: "스포 없이 입문할 만한 장면 있어?",
            reply: "예고편에 둘이 처음 만나는 장면 있어. 그거 봐봐.",
            note: "함께 볼 수 있는 짧은 소재를 요청했어요. 전체 정주행을 약속하지 않아도 돼요.",
          },
        ],
      },
      {
        text: "새벽 두 시까지? 오늘 안 피곤해?",
        reply: "엄청 피곤해. 근데 딱 한 편만 더가 안 되더라.",
        note: "작품보다 지금 친구의 상태에 반응했어요. 이런 시작도 가능해요.",
        followUps: [
          {
            text: "오늘은 한 편만 보고 자자ㅋㅋ 어디서 끊기가 어려워?",
            reply: "항상 끝에 뭔가 터져서 다음 걸 누르게 돼.",
            note: "친구가 한 말을 받아 작품 이야기로 연결했어요.",
          },
          {
            text: "그 정도면 제대로 빠졌네ㅋㅋ 난 무슨 작품인지도 몰라.",
            reply: "아 제목도 말 안 했네ㅋㅋ 알려줄게.",
            note: "모르는 정도를 편하게 말했어요. 친구가 설명할 출발점을 알 수 있어요.",
          },
        ],
      },
      {
        text: "나도 이름은 들어봤어. 볼까 고민 중이야.",
        reply: "너는 잔잔한 거 좋아하잖아. 이건 좀 정신없을 수도 있어.",
        note: "친구가 내 취향을 기준으로 답했어요. 실제로 고민 중일 때 쓸 수 있는 말이에요.",
        followUps: [
          {
            text: "그럼 네가 좋아하는 포인트만 먼저 들을래.",
            reply: "대사가 웃겨. 나중에 생각나서 혼자 또 웃게 돼.",
            note: "내 취향과 달라도 상대가 좋아하는 부분은 들어볼 수 있어요.",
          },
          {
            text: "그럴 수도 있겠다. 예고편부터 봐야겠네.",
            reply: "응, 예고편 분위기가 딱 그 작품이야.",
            note: "부담이 적은 다음 행동을 골랐어요. 흥미가 없으면 여기서 마쳐도 돼요.",
          },
        ],
      },
    ],
  },
  {
    id: "meme",
    title: "뜻을 모르는 짤",
    label: "어떻게 반응할지 애매할 때",
    situation: "친구가 일이 쌓였다며 ‘This is fine’ 짤을 보냈어요.",
    message: "오늘 할 일 아직 이만큼 남음. This is fine…",
    topicId: "this-is-fine",
    hint: "짤이 웃겨도, 지금 어떤 상황인지 먼저 확인해 봐요.",
    context:
      "이 짤은 안 괜찮은 상황에 애써 태연한 반응을 붙이는 예시로 쓰여요. 친구가 농담하는지 힘들어하는지는 대화로 확인해야 해요.",
    caution:
      "상대가 힘들다고 하면 농담을 이어가기보다 듣거나 필요한 도움을 물어보세요.",
    openings: [
      {
        text: "안 괜찮다는 뜻이지ㅠ 많이 남았어?",
        reply: "응ㅠ 오늘 안에 끝내야 하는 게 두 개나 있어.",
        note: "표현의 뜻을 확인하면서 실제 상황도 물었어요.",
        followUps: [
          {
            text: "얘기 좀 들어줄까, 아니면 일부터 마칠래?",
            reply: "일단 마치고 연락할게. 물어봐 줘서 고마워.",
            note: "지금 대화를 계속할지 상대가 고르게 했어요. 답장이 늦어져도 재촉하지 마세요.",
          },
          {
            text: "두 개면 빡세겠다. 내가 도울 수 있는 거 있어?",
            reply: "자료 확인만 잠깐 부탁해도 돼?",
            note: "실제로 도울 여력이 있을 때 쓸 말이에요. 어려우면 가능한 범위를 말하세요.",
          },
        ],
      },
      {
        text: "이 짤 처음 보는데, 괜찮다는 거야 아닌 거야?",
        reply: "안 괜찮다는 거ㅋㅋ 불났는데 괜찮다고 하는 짤이야.",
        note: "뜻을 직접 물어봤어요. 짤을 몰라도 상황을 알아갈 수 있어요.",
        followUps: [
          {
            text: "아ㅋㅋ 그럼 지금은 어떤 상황인데?",
            reply: "마감 두 개가 겹쳤어. 일단 커피로 버티는 중.",
            note: "뜻을 알게 된 뒤 친구의 상황으로 돌아왔어요.",
          },
          {
            text: "괜찮다는 말만 보고 오해할 뻔했네. 많이 바빠?",
            reply: "응, 오늘만 넘기면 좀 나아질 것 같아.",
            note: "어떻게 이해했는지 말하고 상태를 확인했어요.",
          },
        ],
      },
      {
        text: "일단 커피부터? 나도 지금 그 상태ㅋㅋ",
        reply: "ㅋㅋ너도? 오늘 왜 이렇게 일이 안 줄지.",
        note: "같은 상황이라면 공감으로 시작할 수 있어요. 상대가 더 힘들어하면 내 이야기만 계속하지 마세요.",
        followUps: [
          {
            text: "너는 뭐가 제일 급해?",
            reply: "저녁 회의 자료. 그거부터 해야겠어.",
            note: "공감 뒤 상대의 이야기를 다시 물었어요.",
          },
          {
            text: "끝나고 서로 생존 신고하자ㅋㅋ",
            reply: "좋아ㅋㅋ 끝나면 연락할게.",
            note: "가벼운 농담이 통하는 관계에서 쓸 수 있어요. 심각한 상황이라면 먼저 상태를 확인하세요.",
          },
        ],
      },
    ],
  },
];
export const memoOutcomes = [
  { id: "untried", label: "아직 안 써봤어요" },
  { id: "helped", label: "도움 됐어요" },
  { id: "stuck", label: "이어가기 어려웠어요" },
  { id: "no-chance", label: "쓸 상황이 없었어요" },
] as const;
export type MemoOutcome = (typeof memoOutcomes)[number]["id"];
export type ConversationMemo = {
  scenarioId: string;
  opener: string;
  followUp: string;
  outcome: MemoOutcome;
};
export const MEMO_KEY = "inssa-conversations-v1";
export function parseMemos(raw: string | null): ConversationMemo[] {
  try {
    const data: unknown = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(data)) return [];
    const result: ConversationMemo[] = [];
    for (const value of data) {
      if (!value || typeof value !== "object" || Array.isArray(value)) continue;
      const { scenarioId, opener, followUp, outcome } = value;
      if (
        !scenarios.some((s) => s.id === scenarioId) ||
        result.some((m) => m.scenarioId === scenarioId)
      )
        continue;
      if (
        typeof opener !== "string" ||
        typeof followUp !== "string" ||
        !opener.trim() ||
        !followUp.trim()
      )
        continue;
      result.push({
        scenarioId,
        opener: opener.trim().slice(0, 180),
        followUp: followUp.trim().slice(0, 180),
        outcome: memoOutcomes.some((o) => o.id === outcome)
          ? outcome
          : "untried",
      });
    }
    return result;
  } catch {
    return [];
  }
}
