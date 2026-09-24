let currentSelection = { 
    name: '', 
    color: '', 
    emoji: '' 
};

function selectMenu(name, color, emoji) {
    currentSelection.name = name;
    currentSelection.color = color;
    currentSelection.emoji = emoji;
    
    const detailCard = document.getElementById('selection-detail');
    const nameDisplay = document.getElementById('selected-name');
    const submitBtn = document.getElementById('submit-btn');
    
    // UIの動的更新
    if (nameDisplay) nameDisplay.innerText = name;
    if (detailCard) {
        detailCard.style.borderColor = color;
        detailCard.classList.remove('hidden');
        detailCard.scrollIntoView({ behavior: 'smooth' });
    }
    if (submitBtn) submitBtn.style.backgroundColor = color;
}

function addToCalendar() {
    try {
        const memoInput = document.getElementById('memo');
        const memo = memoInput ? memoInput.value : '';
        
        // メニューが選択されていない場合の安全対策
        if (!currentSelection.name) {
            alert('トレーニングメニューを選択してください。');
            return;
        }

        // タイトルの先頭に色絵文字を付与
        const title = `${currentSelection.emoji}${currentSelection.name}`;
        
        // 日本時間（JST）の日付取得
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
        
        // 【修正ポイント】
        // window.open(..., '_blank') はポップアップブロックで拒否されやすいため、
        // 画面遷移（location.href）に変更して確実にカレンダーを開くようにします。
        window.location.href = calendarUrl;

    } catch (error) {
        alert('エラーが発生しました: ' + error.message);
    }
}
