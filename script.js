let currentSelection = { name: '', color: '' };

function selectMenu(name, color) {
    currentSelection.name = name;
    currentSelection.color = color;
    const detailCard = document.getElementById('selection-detail');
    const nameDisplay = document.getElementById('selected-name');
    nameDisplay.innerText = name;
    nameDisplay.style.color = color;
    detailCard.classList.remove('hidden');
    detailCard.scrollIntoView({ behavior: 'smooth' });
}

function addToCalendar() {
    const memo = document.getElementById('memo').value;
    const title = `【トレ】${currentSelection.name}`;
    
    // 日付処理の修正：日本の現在時刻を取得
    const now = new Date();
    const y = now.getFullYear();
    const m = ("0" + (now.getMonth() + 1)).slice(-2);
    const d = ("0" + now.getDate()).slice(-2);
    
    // Googleカレンダー形式 (YYYYMMDD)
    const dateStr = `${y}${m}${d}`;
    const dates = `${dateStr}/${dateStr}`;

    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent(title);
    const details = encodeURIComponent(memo);
    const calendarUrl = `${baseUrl}&text=${text}&details=${details}&dates=${dates}`;
    
    window.open(calendarUrl, '_blank');
}
