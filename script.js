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
    nameDisplay.innerText = name;
    detailCard.style.borderColor = color;
    submitBtn.style.backgroundColor = color;
    
    detailCard.classList.remove('hidden');
    detailCard.scrollIntoView({ behavior: 'smooth' });
}

function addToCalendar() {
    const memo = document.getElementById('memo').value;
    
    // タイトルの先頭に識別用の色絵文字を付与
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
    
    window.open(calendarUrl, '_blank');
}
