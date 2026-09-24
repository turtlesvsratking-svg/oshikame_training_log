let currentSelection = { 
    name: '', 
    color: '', 
    emoji: '' 
};

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
    } catch (err) {
        alert("メニュー選択エラー: " + err.message);
    }
}

function prepareCalendarUrl(event) {
    try {
        if (!currentSelection.name) {
            alert('トレーニングメニューを選択してください。');
            event.preventDefault();
            return;
        }

        const memoInput = document.getElementById('memo');
        const memo = memoInput ? memoInput.value : '';

        // タイトル設定（【トレ】なし、絵文字＋メニュー名）
        const title = `${currentSelection.emoji}${currentSelection.name}`;
        
        // 日本時間の日付（YYYYMMDD）
        const now = new Date();
        const y = now.getFullYear();
        const m = ("0" + (now.getMonth() + 1)).slice(-2);
        const d = ("0" + now.getDate()).slice(-2);
        const dateStr = `${y}${m}${d}`;
        const dates = `${dateStr}/${dateStr}`;

        const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
        const text = encodeURIComponent(title);
        const details = encodeURIComponent(memo);
        const calendarUrl = `${baseUrl}&text=${text}&details=${details}&dates=${dates}`;
        
        // ボタン(aタグ)のリンク先を動的に書き換える
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.href = calendarUrl;

    } catch (err) {
        alert("カレンダーURL作成エラー: " + err.message);
        event.preventDefault();
    }
}
