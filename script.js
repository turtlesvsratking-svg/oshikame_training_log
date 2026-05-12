let currentSelection = { name: '', color: '' };

function selectMenu(name, color) {
    currentSelection.name = name;
    currentSelection.color = color;
    
    const detailCard = document.getElementById('selection-detail');
    const nameDisplay = document.getElementById('selected-name');
    
    nameDisplay.innerText = name;
    nameDisplay.style.color = color;
    detailCard.classList.remove('hidden');
    
    // 選択時に詳細入力エリアへスムーズに移動
    detailCard.scrollIntoView({ behavior: 'smooth' });
}

function addToCalendar() {
    const memo = document.getElementById('memo').value;
    const title = `【トレ】${currentSelection.name}`;
    
    // 日本の現在時刻に基づいた日付取得 (ISOによる1日ズレを回避)
    const now = new Date();
    const y = now.getFullYear();
    const m = ("0" + (now.getMonth() + 1)).slice(-2);
    const d = ("0" + now.getDate()).slice(-2);
    
    const dateStr = `${y}${m}${d}`;
    const dates = `${dateStr}/${dateStr}`; // 終日予定設定

    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent(title);
    const details = encodeURIComponent(memo);
    const calendarUrl = `${baseUrl}&text=${text}&details=${details}&dates=${dates}`;
    
    // Googleカレンダーを別タブで開く
    window.open(calendarUrl, '_blank');
}
