let currentSelection = { 
    name: '', 
    color: '', 
    emoji: '' 
};

function logMsg(msg) {
    const statusDiv = document.getElementById('status-msg');
    if (statusDiv) {
        statusDiv.innerText = msg;
    }
}

function selectMenu(name, color, emoji) {
    try {
        currentSelection.name = name;
        currentSelection.color = color;
        currentSelection.emoji = emoji;
        
        const detailCard = document.getElementById('selection-detail');
        const nameDisplay = document.getElementById('selected-name');
        const submitBtn = document.getElementById('submit-btn');
        
        if (nameDisplay) nameDisplay.innerText = name;
        if (detailCard) {
            detailCard.style.borderColor = color;
            detailCard.classList.remove('hidden');
            detailCard.scrollIntoView({ behavior: 'smooth' });
        }
        if (submitBtn) submitBtn.style.backgroundColor = color;

        logMsg(""); // エラー表示をクリア
    } catch (err) {
        logMsg("選択エラー: " + err.message);
    }
}

function openCalendar() {
    try {
        if (!currentSelection.name) {
            alert('先に上のメニューを選択してください。');
            return;
        }

        const memoInput = document.getElementById('memo');
        const memo = memoInput ? memoInput.value : '';

        // タイトル作成（色絵文字 + 種目名）
        const title = currentSelection.emoji + currentSelection.name;
        
        // 日付生成（YYYYMMDD）
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const dateStr = y + m + d;
        const dates = dateStr + "/" + dateStr;

        // URL構築
        const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
        const textParam = encodeURIComponent(title);
        const detailsParam = encodeURIComponent(memo);
        const calendarUrl = baseUrl + "&text=" + textParam + "&details=" + detailsParam + "&dates=" + dates;

        // 画面遷移
        window.location.href = calendarUrl;

    } catch (err) {
        logMsg("カレンダー遷移エラー: " + err.message);
    }
}
