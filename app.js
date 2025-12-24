"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ===== Hero fade on scroll =====
  const hero = document.getElementById("hero");
  const heroFadeDistance = 260; // この距離スクロールするとほぼ消える（好みで調整）

  function updateHeroFade() {
    if (!hero) return;
    const y = window.scrollY || 0;
    const t = Math.min(Math.max(y / heroFadeDistance, 0), 1); // 0..1
    hero.style.opacity = String(1 - t);
    hero.style.transform = `translateY(${Math.round(-12 * t)}px)`;
    // 完全に消えたらクリックを透過（邪魔防止）
    hero.style.pointerEvents = t > 0.98 ? "none" : "auto";
  }

  window.addEventListener("scroll", updateHeroFade, { passive: true });
  updateHeroFade();

  // ===== Quiz data =====
  const questions = [
    { text: "約束した時間を守る", hint: "ドタキャンや大幅遅刻が常態化していないか。" },
    { text: "連絡を無視しない（既読スルーが常態化していない）", hint: "忙しくても一言返せるか。" },
    { text: "家事・育児を“手伝い”ではなく“担当”としてやる", hint: "担当があると継続しやすい。" },
    { text: "お金の使い道が透明（隠し借金・謎の出費がない）", hint: "明細や家計の共有ができるか。" },
    { text: "嘘をつかない（言い訳で事実を捻じ曲げない）", hint: "小さな嘘の積み重ねは要注意。" },
    { text: "感情で威圧しない（怒鳴る/物に当たる等がない）", hint: "安全を感じられる関係が最優先。" },
    { text: "相手の体調・気分への配慮がある", hint: "気づき＋声かけがあるか。" },
    { text: "外での評判より家の中を大事にする", hint: "家の中の態度に差がないか。" },
    { text: "相手の交友関係やスマホを過剰に束縛しない", hint: "尊重がある関係か。" },
    { text: "飲酒やギャンブルなどで生活が崩れない", hint: "生活費・時間・約束に影響が出ないか。" },
    { text: "夫婦の話し合いから逃げない", hint: "沈黙・逆ギレ・すり替えが続かないか。" },
    { text: "感謝や謝罪を言葉で伝える", hint: "言える人は改善も早い。" },
  ];

  function judge(score, total) {
    const ratio = score / total;

    if (score >= total - 1) {
      return {
        rank: "S",
        title: "神旦那度（S）",
        desc: "全体的に安定。信頼と協力が機能している状態です。今の良い習慣を“続ける仕組み”にするとさらに強いです。",
        actions: [
          "月1回、家計・予定・家事分担を10分だけ棚卸しする",
          "相手の負担が増えた週は“埋め合わせ”を具体的に提案する",
          "感謝を「何が助かったか」まで言語化する",
        ],
        notice: "特別な警戒サインは少なめ。ただし、ストレス期に崩れやすい項目（お金/連絡/感情）だけは定期チェック。",
        badgeTone: "ok",
      };
    }

    if (ratio >= 0.75) {
      return {
        rank: "A",
        title: "安定旦那度（A）",
        desc: "基本は良好。数項目だけ改善すると一気に満足度が上がります。",
        actions: [
          "弱い項目を1つだけ選び、2週間の“行動ルール”にする",
          "家事育児は「担当」を固定して“考える負担”を減らす",
          "話し合いは結論より「次の一手」を決める",
        ],
        notice: "問題が起きた時に「黙る/逃げる/逆ギレ」が出るなら、そこは優先改善ポイント。",
        badgeTone: "ok",
      };
    }

    if (ratio >= 0.5) {
      return {
        rank: "B",
        title: "伸びしろ旦那度（B）",
        desc: "良い部分もある一方、生活の実務やコミュニケーションで“摩耗”が起きやすい状態です。改善は十分可能。",
        actions: [
          "連絡・約束・お金のどれか1つを“透明化”する（共有・報告・記録）",
          "謝罪は「事実→影響→次の対策」の順で言う",
          "家事育児は“毎日5分”でも固定枠を作る",
        ],
        notice: "威圧（怒鳴る/物に当たる/脅し）がある場合は、点数に関係なく安全優先で相談先を確保。",
        badgeTone: "warn",
      };
    }

    if (ratio >= 0.25) {
      return {
        rank: "C",
        title: "要改善旦那度（C）",
        desc: "日常で不安や不満が溜まりやすい状態。言い分より“行動の改善”が必要です。",
        actions: [
          "約束・お金・話し合いの“最低ライン”を紙に書いて合意する",
          "連絡のルール（返答期限・緊急時の手段）を決める",
          "第三者（夫婦カウンセリング等）を検討する",
        ],
        notice: "隠し事・金銭トラブル・威圧が絡む場合は、記録（日時/事実）を残し、安全と相談動線を先に作る。",
        badgeTone: "danger",
      };
    }

    return {
      rank: "D",
      title: "危険信号（D）",
      desc: "信頼や安全が揺らいでいる可能性が高いです。まずは心身の安全と生活の安定を優先してください。",
      actions: [
        "心の健康：心の健康が乱れている可能性有、カウンセリングを受ける",
        "事家との距理：一時的に家族と離れて暮らしてみる",
        "一人で抱えない：信頼できる窓口や専門家に相談する",
      ],
      notice: "暴力・脅し・監視・経済的支配などがある場合、深追いせず安全優先で行動してください。",
      badgeTone: "danger",
    };
  }

  function setBadgeTone(el, tone) {
    el.style.background = "#eef2ff";
    el.style.borderColor = "#e0e7ff";
    el.style.color = "#111827";

    if (tone === "ok") {
      el.style.background = "#ecfdf5";
      el.style.borderColor = "#bbf7d0";
      el.style.color = "#065f46";
    } else if (tone === "warn") {
      el.style.background = "#fffbeb";
      el.style.borderColor = "#fde68a";
      el.style.color = "#92400e";
    } else if (tone === "danger") {
      el.style.background = "#fff1f2";
      el.style.borderColor = "#fecdd3";
      el.style.color = "#9f1239";
    }
  }

  // ===== DOM =====
  const quizCard = document.getElementById("quizCard");
  const resultCard = document.getElementById("resultCard");

  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const questionText = document.getElementById("questionText");
  const hintText = document.getElementById("hintText");

  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const btnBack = document.getElementById("btnBack");
  const btnReset = document.getElementById("btnReset");

  const rankBadge = document.getElementById("rankBadge");
  const resultTitle = document.getElementById("resultTitle");
  const resultScore = document.getElementById("resultScore");
  const resultDesc = document.getElementById("resultDesc");
  const actionList = document.getElementById("actionList");
  const noticeText = document.getElementById("noticeText");

  const btnRetry = document.getElementById("btnRetry");
  const btnCopy = document.getElementById("btnCopy");
  const copyHint = document.getElementById("copyHint");

  const required = [
    quizCard, resultCard, progressText, progressBar, questionText, hintText,
    btnYes, btnNo, btnBack, btnReset,
    rankBadge, resultTitle, resultScore, resultDesc, actionList, noticeText,
    btnRetry, btnCopy, copyHint
  ];
  if (required.some(x => !x)) {
    console.error("必要なIDが見つかりません。HTMLのIDを確認してください。");
    return;
  }

  // ===== state =====
  let index = 0;
  let answers = Array(questions.length).fill(null);

  function calcScore() {
    return answers.reduce((sum, v) => sum + (v === 1 ? 1 : 0), 0);
  }

  function renderQuestion() {
    const total = questions.length;
    const q = questions[index];

    progressText.textContent = `Q${index + 1} / ${total}`;
    progressBar.style.width = `${Math.round((index / total) * 100)}%`;

    questionText.textContent = q.text;
    hintText.textContent = q.hint ?? "";

    btnBack.disabled = index === 0;
    btnBack.style.opacity = index === 0 ? "0.6" : "1";
  }

  function showResult() {
    const total = questions.length;
    const missingIndex = answers.findIndex(v => v === null);
    if (missingIndex !== -1) {
      index = missingIndex;
      renderQuestion();
      hintText.textContent = "未回答の質問があります。ここから回答してください。";
      return;
    }

    const score = calcScore();
    const judged = judge(score, total);

    rankBadge.textContent = judged.rank;
    setBadgeTone(rankBadge, judged.badgeTone);

    resultTitle.textContent = judged.title;
    resultScore.textContent = `スコア: ${score} / ${total}`;
    resultDesc.textContent = judged.desc;

    actionList.innerHTML = "";
    for (const a of judged.actions) {
      const li = document.createElement("li");
      li.textContent = a;
      actionList.appendChild(li);
    }

    noticeText.textContent = judged.notice;

    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");
    progressBar.style.width = "100%";
  }

  function goNext() {
    const total = questions.length;
    if (index < total - 1) {
      index += 1;
      renderQuestion();
      hintText.textContent = "";
    } else {
      showResult();
    }
  }

  function resetAll() {
    index = 0;
    answers = Array(questions.length).fill(null);

    quizCard.classList.remove("hidden");
    resultCard.classList.add("hidden");
    copyHint.textContent = "";
    renderQuestion();
    progressBar.style.width = "0%";
  }

  function currentSummaryText() {
    const total = questions.length;
    const score = calcScore();
    const judged = judge(score, total);

    return [
      "【いい旦那度チェック 結果】",
      `スコア: ${score}/${total}`,
      `判定: ${judged.rank} - ${judged.title}`,
      "",
      "改善アクション:",
      ...judged.actions.map((x, i) => `${i + 1}. ${x}`),
      "",
      "注意:",
      judged.notice,
    ].join("\n");
  }

  // ===== events =====
  btnYes.addEventListener("click", () => {
    answers[index] = 1;
    goNext();
  });

  btnNo.addEventListener("click", () => {
    answers[index] = 0;
    goNext();
  });

  btnBack.addEventListener("click", () => {
    if (index > 0) {
      index -= 1;
      renderQuestion();
      hintText.textContent = "前の質問に戻りました（回答は保持されています）。";
    }
  });

  btnReset.addEventListener("click", () => {
    resetAll();
  });

  btnRetry.addEventListener("click", () => {
    resetAll();
    // 画面上に戻す（ヒーローが見える位置へ）
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(currentSummaryText());
      copyHint.textContent = "コピーしました。メモやLINEに貼り付けできます。";
    } catch (e) {
      console.error(e);
      copyHint.textContent = "コピーできませんでした。ブラウザの権限設定を確認してください。";
    }
  });

  // init
  resetAll();
});
