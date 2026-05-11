let currentSelection = {
    name: '',
    color: ''
};

function selectMenu(name, color) {
    currentSelection.name = name;
    currentSelection.color = color;

    const detailCard = document.getElementById('selection-detail');
    const nameDisplay = document.getElementById('selected-name');
    
    nameDisplay.innerText = name;
    nameDisplay.style.color = color;
    detailCard.classList.remove('hidden');
    
    // スムーズスクロール
    detailCard.scrollIntoView({ behavior: 'smooth' });
}

function addToCalendar() {
    const memo = document.getElementById('memo').value;
    const title = `【トレ】${currentSelection.name}`;
    
    // GoogleカレンダーURL生成用のパラメータ
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent(title);
    const details = encodeURIComponent(memo);
    
    // 本日の日付を取得
    const now = new Date();
    const dateStr = now.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    const dates = `${dateStr}/${dateStr}`; // 終日予定として設定

    const calendarUrl = `${baseUrl}&text=${text}&details=${details}&dates=${dates}`;
    
    // 別タブでカレンダーを開く
    window.open(calendarUrl, '_blank');
}
