/**
 * 栖读社区书屋 - 活动中心页面JS
 * 功能：活动列表展示、分类筛选、活动报名
 */

document.addEventListener('DOMContentLoaded', function() {
    initEventsPage();
});

// 当前筛选分类
let currentCategory = '全部';

/**
 * 初始化活动页面
 */
function initEventsPage() {
    renderEventList();
    initCategoryFilter();
    initRegisterButtons();
}

/**
 * 渲染活动列表
 */
function renderEventList(category = '全部') {
    const eventsContainer = document.getElementById('events-list');
    if (!eventsContainer) return;

    const events = getEvents();
    let filteredEvents = events;

    // 按分类筛选
    if (category !== '全部') {
        filteredEvents = events.filter(event => event.category === category);
    }

    // 按日期排序
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <p class="empty-state-text">暂无该分类的活动</p>
            </div>
        `;
        return;
    }

    eventsContainer.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');

    // 重新绑定报名按钮事件
    initRegisterButtons();
}

/**
 * 初始化分类筛选
 */
function initCategoryFilter() {
    const filterContainer = document.querySelector('.filter-tabs');
    if (!filterContainer) return;

    const categories = ['全部', '共读会', '新书分享', '儿童绘本', '夜读活动', '手账工作坊'];

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-tab ${cat === '全部' ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

    // 绑定点击事件
    filterContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-tab')) {
            // 更新选中状态
            filterContainer.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');

            // 筛选并重新渲染
            currentCategory = e.target.dataset.category;
            renderEventList(currentCategory);
        }
    });
}

/**
 * 初始化报名按钮
 */
function initRegisterButtons() {
    const registerButtons = document.querySelectorAll('.event-register-btn');

    registerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = parseInt(this.dataset.id);
            handleRegister(eventId, this);
        });
    });
}

/**
 * 处理报名
 */
function handleRegister(eventId, button) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) {
        showToast('活动不存在', 'error');
        return;
    }

    // 检查是否满员
    if (event.registered >= event.capacity) {
        showToast('该活动已满员', 'error');
        return;
    }

    // 显示确认弹窗
    createModal({
        title: '活动报名确认',
        content: `
            <div style="line-height: 2;">
                <p><strong>活动名称：</strong>${event.name}</p>
                <p><strong>活动时间：</strong>${formatDate(event.date)} ${event.time}</p>
                <p><strong>活动地点：</strong>${event.location}</p>
                <p><strong>剩余名额：</strong>${event.capacity - event.registered}人</p>
            </div>
        `,
        confirmText: '确认报名',
        onConfirm: () => {
            // 执行报名
            const result = registerEvent(eventId);
            if (result.success) {
                showToast(result.message, 'success');
                // 重新渲染列表
                renderEventList(currentCategory);
            } else {
                showToast(result.message, 'error');
            }
        }
    });
}

/**
 * 显示活动详情弹窗
 */
function showEventDetail(eventId) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    const isFull = event.registered >= event.capacity;

    createModal({
        title: event.name,
        content: `
            <div style="line-height: 2;">
                <p><strong>📅 活动日期：</strong>${formatDate(event.date)}</p>
                <p><strong>🕐 活动时间：</strong>${event.time}</p>
                <p><strong>📍 活动地点：</strong>${event.location}</p>
                <p><strong>📂 活动分类：</strong>${event.category}</p>
                <p><strong>👥 报名人数：</strong>${event.registered}/${event.capacity}人</p>
                <hr style="margin: 16px 0; border: none; border-top: 1px dashed var(--color-cream-dark);">
                <p><strong>活动介绍：</strong></p>
                <p style="color: var(--text-secondary);">${event.description}</p>
            </div>
        `,
        confirmText: isFull ? '已满员' : '立即报名',
        showCancel: !isFull,
        onConfirm: () => {
            if (!isFull) {
                const result = registerEvent(eventId);
                if (result.success) {
                    showToast(result.message, 'success');
                    renderEventList(currentCategory);
                } else {
                    showToast(result.message, 'error');
                }
            }
        }
    });
}
