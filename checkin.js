/**
 * 栖读社区书屋 - 阅读打卡页面JS
 * 功能：打卡表单、打卡记录展示、统计数据
 */

document.addEventListener('DOMContentLoaded', function() {
    initCheckinPage();
});

/**
 * 初始化打卡页面
 */
function initCheckinPage() {
    renderCheckinList();
    renderStats();
    initCheckinForm();
    checkTodayStatus();
}

/**
 * 渲染打卡记录列表
 */
function renderCheckinList() {
    const checkinContainer = document.getElementById('checkin-list');
    if (!checkinContainer) return;

    const checkins = getCheckins();

    // 按日期排序（最新的在前）
    checkins.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 只显示最近10条
    const recentCheckins = checkins.slice(0, 10);

    if (recentCheckins.length === 0) {
        checkinContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📖</div>
                <p class="empty-state-text">还没有打卡记录，快来记录你的阅读时光吧！</p>
            </div>
        `;
        return;
    }

    checkinContainer.innerHTML = recentCheckins.map(checkin => createCheckinCard(checkin)).join('');
}

/**
 * 渲染统计数据
 */
function renderStats() {
    const weeklyTimeEl = document.getElementById('weekly-time');
    const streakEl = document.getElementById('streak-days');
    const totalCountEl = document.getElementById('total-checkins');
    const totalBooksEl = document.getElementById('total-books');

    if (weeklyTimeEl) {
        const weeklyMinutes = getWeeklyReadingTime();
        const hours = Math.floor(weeklyMinutes / 60);
        const mins = weeklyMinutes % 60;
        weeklyTimeEl.textContent = hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
    }

    if (streakEl) {
        streakEl.textContent = getStreakDays();
    }

    if (totalCountEl) {
        const checkins = getCheckins();
        totalCountEl.textContent = checkins.length;
    }

    if (totalBooksEl) {
        const checkins = getCheckins();
        const uniqueBooks = new Set(checkins.map(c => c.book));
        totalBooksEl.textContent = uniqueBooks.size;
    }
}

/**
 * 检查今日打卡状态
 */
function checkTodayStatus() {
    const statusEl = document.getElementById('today-status');
    if (!statusEl) return;

    const today = new Date().toISOString().split('T')[0];
    const checkins = getCheckins();
    const todayCheckins = checkins.filter(c => c.date === today);

    if (todayCheckins.length > 0) {
        const totalMinutes = todayCheckins.reduce((sum, c) => sum + c.duration, 0);
        statusEl.innerHTML = `
            <div class="status-badge status-open">
                ✓ 今日已打卡 ${todayCheckins.length} 次，共 ${totalMinutes} 分钟
            </div>
        `;
    } else {
        statusEl.innerHTML = `
            <div class="status-badge status-closed">
                今日还未打卡，快去记录你的阅读时光吧！
            </div>
        `;
    }
}

/**
 * 初始化打卡表单
 */
function initCheckinForm() {
    const form = document.getElementById('checkin-form');
    if (!form) return;

    // 设置默认阅读时长
    const durationInput = form.querySelector('[name="duration"]');
    if (durationInput && !durationInput.value) {
        durationInput.value = 30;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据
        const formData = {
            book: form.querySelector('[name="book"]').value.trim(),
            duration: parseInt(form.querySelector('[name="duration"]').value) || 0,
            note: form.querySelector('[name="note"]').value.trim()
        };

        // 验证
        if (!formData.book) {
            showToast('请输入今日阅读的书名', 'error');
            form.querySelector('[name="book"]').focus();
            return;
        }
        if (formData.duration <= 0) {
            showToast('请输入有效的阅读时长', 'error');
            form.querySelector('[name="duration"]').focus();
            return;
        }
        if (formData.duration > 600) {
            showToast('阅读时长不能超过600分钟', 'error');
            form.querySelector('[name="duration"]').focus();
            return;
        }
        if (!formData.note) {
            showToast('请分享你的阅读心得', 'error');
            form.querySelector('[name="note"]').focus();
            return;
        }

        // 添加打卡记录
        const newCheckin = addCheckin(formData);

        // 清空表单（保留阅读时长默认值）
        form.querySelector('[name="book"]').value = '';
        form.querySelector('[name="note"]').value = '';
        form.querySelector('[name="duration"]').value = 30;

        // 显示成功提示
        const hour = Math.floor(formData.duration / 60);
        const min = formData.duration % 60;
        const timeStr = hour > 0 ? `${hour}小时${min}分钟` : `${min}分钟`;
        showToast(`打卡成功！今日阅读${timeStr}`, 'success');

        // 更新页面
        renderCheckinList();
        renderStats();
        checkTodayStatus();

        // 显示鼓励语
        showEncouragement(formData.duration);
    });

    // 输入框聚焦效果
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * 显示鼓励语
 */
function showEncouragement(duration) {
    const messages = [
        '坚持阅读，遇见更好的自己！',
        '每一分钟的阅读，都是对自己的投资。',
        '书籍是最好的朋友，阅读是最好的陪伴。',
        '今天的你，比昨天更博学了一点。',
        '阅读是心灵的旅行，享受这段旅程吧！',
        '好习惯从每天阅读开始，你已经迈出了重要一步。'
    ];

    // 根据阅读时长选择不同的鼓励语
    let message;
    if (duration >= 60) {
        message = '太棒了！今天阅读超过一小时，你的坚持令人敬佩！🌟';
    } else if (duration >= 30) {
        message = messages[Math.floor(Math.random() * messages.length)];
    } else {
        message = '每天进步一点点，明天继续加油！💪';
    }

    // 延迟显示，避免和打卡成功的toast重叠
    setTimeout(() => {
        showToast(message, 'info', 4000);
    }, 1500);
}

/**
 * 获取本周阅读排行（用于首页展示）
 */
function getWeeklyRank() {
    const checkins = getCheckins();
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    // 统计每本书的阅读时长
    const bookStats = {};
    checkins
        .filter(c => new Date(c.date) >= weekStart)
        .forEach(c => {
            if (!bookStats[c.book]) {
                bookStats[c.book] = { book: c.book, duration: 0, count: 0 };
            }
            bookStats[c.book].duration += c.duration;
            bookStats[c.book].count++;
        });

    // 转换为数组并排序
    return Object.values(bookStats)
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5);
}

/**
 * 格式化阅读时长显示
 */
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes}分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
}
