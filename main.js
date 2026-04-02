/**
 * 栖读社区书屋 - 主JS文件
 * 包含通用功能：导航、Toast提示、模态框、返回顶部等
 */

// ========== DOM 加载完成后执行 ==========
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initBackToTop();
    initToastContainer();
    highlightCurrentNav();
});

// ========== 导航栏功能 ==========

/**
 * 初始化导航栏
 */
function initNavbar() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            // 切换汉堡菜单动画
            const spans = toggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // 点击导航链接后关闭菜单（移动端）
        const links = menu.querySelectorAll('.navbar-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menu.classList.remove('active');
                }
            });
        });

        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    // 滚动时改变导航栏样式
    let lastScrollY = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(93, 78, 55, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(93, 78, 55, 0.08)';
        }

        lastScrollY = scrollY;
    });
}

/**
 * 高亮当前页面的导航链接
 */
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.navbar-link');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== 返回顶部功能 ==========

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTop);

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Toast 提示功能 ==========

let toastContainer = null;

/**
 * 初始化 Toast 容器
 */
function initToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

/**
 * 显示 Toast 提示
 * @param {string} message - 提示信息
 * @param {string} type - 类型：success, error, info
 * @param {number} duration - 持续时间（毫秒）
 */
function showToast(message, type = 'success', duration = 3000) {
    initToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // 自动移除
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// ========== 模态框功能 ==========

/**
 * 创建模态框
 * @param {Object} options - 配置选项
 * @returns {Object} - 模态框控制对象
 */
function createModal(options = {}) {
    const {
        title = '',
        content = '',
        onConfirm = null,
        onCancel = null,
        confirmText = '确定',
        cancelText = '取消',
        showCancel = true
    } = options;

    // 创建模态框元素
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" aria-label="关闭">×</button>
            </div>
            <div class="modal-body">
                ${typeof content === 'string' ? content : ''}
            </div>
            <div class="modal-footer">
                ${showCancel ? `<button class="btn btn-secondary btn-small modal-cancel">${cancelText}</button>` : ''}
                <button class="btn btn-primary btn-small modal-confirm">${confirmText}</button>
            </div>
        </div>
    `;

    // 如果content是DOM元素，插入到modal-body中
    if (typeof content !== 'string') {
        modalOverlay.querySelector('.modal-body').appendChild(content);
    }

    document.body.appendChild(modalOverlay);

    // 强制重绘后添加active类
    modalOverlay.offsetHeight;
    modalOverlay.classList.add('active');

    // 关闭模态框
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.remove();
        }, 200);
    };

    // 事件绑定
    modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
        if (onCancel) onCancel();
        closeModal();
    });

    if (showCancel) {
        modalOverlay.querySelector('.modal-cancel').addEventListener('click', () => {
            if (onCancel) onCancel();
            closeModal();
        });
    }

    modalOverlay.querySelector('.modal-confirm').addEventListener('click', () => {
        if (onConfirm) onConfirm();
        closeModal();
    });

    // 点击遮罩关闭
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            if (onCancel) onCancel();
            closeModal();
        }
    });

    // ESC键关闭
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            if (onCancel) onCancel();
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    return {
        close: closeModal,
        getElement: () => modalOverlay
    };
}

// ========== 表单验证功能 ==========

/**
 * 验证表单
 * @param {HTMLFormElement} form - 表单元素
 * @param {Object} rules - 验证规则
 * @returns {Object} - 验证结果 { valid: boolean, errors: [] }
 */
function validateForm(form, rules) {
    const errors = [];
    let valid = true;

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) continue;

        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.form-error');

        for (const rule of fieldRules) {
            if (!rule.test(value)) {
                valid = false;
                errors.push({ field: fieldName, message: rule.message });

                if (errorElement) {
                    errorElement.textContent = rule.message;
                    errorElement.style.display = 'block';
                }
                field.style.borderColor = 'var(--color-danger)';
                break;
            } else {
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
                field.style.borderColor = '';
            }
        }
    }

    return { valid, errors };
}

/**
 * 创建验证规则
 */
const ValidationRules = {
    required: (message = '此字段为必填项') => ({
        test: (value) => value.length > 0,
        message
    }),
    minLength: (min, message) => ({
        test: (value) => value.length >= min,
        message: message || `最少需要 ${min} 个字符`
    }),
    maxLength: (max, message) => ({
        test: (value) => value.length <= max,
        message: message || `最多允许 ${max} 个字符`
    }),
    min: (minVal, message) => ({
        test: (value) => Number(value) >= minVal,
        message: message || `值不能小于 ${minVal}`
    }),
    max: (maxVal, message) => ({
        test: (value) => Number(value) <= maxVal,
        message: message || `值不能大于 ${maxVal}`
    })
};

// ========== 工具函数 ==========

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 格式化时间显示（几分钟前、几小时前等）
 */
function formatTimeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return dateStr.split(' ')[0];
}

/**
 * 生成随机ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 截断文本
 */
function truncate(text, length = 100) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

// ========== 页面渲染辅助函数 ==========

/**
 * 创建活动卡片HTML
 */
function createEventCard(event) {
    const date = new Date(event.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fillPercent = (event.registered / event.capacity) * 100;
    const isFull = event.registered >= event.capacity;

    return `
        <div class="event-card ${isFull ? 'event-full' : ''}" data-id="${event.id}">
            <div class="event-card-header">
                <div class="event-date">
                    <div class="event-date-day">${day}</div>
                    <div class="event-date-month">${month}月</div>
                </div>
                <span class="event-category">${event.category}</span>
            </div>
            <div class="event-card-body">
                <h3 class="event-title">${event.name}</h3>
                <div class="event-info">
                    <div class="event-info-item">
                        <span>🕐</span> ${event.time}
                    </div>
                    <div class="event-info-item">
                        <span>📍</span> ${event.location}
                    </div>
                </div>
                <p class="card-text">${truncate(event.description, 60)}</p>
                <div class="event-capacity">
                    <span class="event-capacity-text">
                        已报名 ${event.registered}/${event.capacity} 人
                    </span>
                    <div class="event-capacity-bar">
                        <div class="event-capacity-fill" style="width: ${fillPercent}%"></div>
                    </div>
                </div>
                <button class="btn ${isFull ? 'btn-secondary' : 'btn-primary'} btn-small btn-full event-register-btn"
                        ${isFull ? 'disabled' : ''} data-id="${event.id}">
                    ${isFull ? '已满员' : '立即报名'}
                </button>
            </div>
        </div>
    `;
}

/**
 * 创建漂流书卡片HTML
 */
function createBookCard(book) {
    const isAvailable = book.status === 'available';
    const categoryIcons = {
        '文学': '📖',
        '心理': '🧠',
        '设计': '🎨',
        '历史': '📜',
        '生活方式': '🌿',
        '儿童': '🧸'
    };
    const icon = categoryIcons[book.category] || '📚';

    return `
        <div class="book-card" data-id="${book.id}">
            <div class="book-card-header">
                ${icon}
                <span class="book-status ${isAvailable ? 'book-status-available' : 'book-status-exchanged'}">
                    ${isAvailable ? '可交换' : '已交换'}
                </span>
            </div>
            <div class="book-card-body">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span class="book-meta-item">📚 ${book.category}</span>
                    <span class="book-meta-item">👤 ${book.owner}</span>
                </div>
                <span class="book-condition">✨ ${book.condition}</span>
                <p class="book-note">${truncate(book.note, 50)}</p>
                <button class="btn ${isAvailable ? 'btn-primary' : 'btn-secondary'} btn-small btn-full book-swap-btn"
                        ${!isAvailable ? 'disabled' : ''} data-id="${book.id}">
                    ${isAvailable ? '我想交换' : '已交换'}
                </button>
            </div>
        </div>
    `;
}

/**
 * 创建打卡记录卡片HTML
 */
function createCheckinCard(checkin) {
    return `
        <div class="checkin-card">
            <div class="checkin-header">
                <span class="checkin-date">📅 ${checkin.date}</span>
                <span class="checkin-duration">⏱️ ${checkin.duration}分钟</span>
            </div>
            <h4 class="checkin-book">${checkin.book}</h4>
            <p class="checkin-note">${checkin.note}</p>
        </div>
    `;
}

/**
 * 创建互动墙帖子卡片HTML
 */
function createPostCard(post) {
    const initial = post.nickname.charAt(0);
    return `
        <div class="post-card" data-id="${post.id}">
            <div class="post-header">
                <div class="post-user">
                    <div class="post-avatar">${initial}</div>
                    <div>
                        <div class="post-name">${post.nickname}</div>
                        <div class="post-time">${formatTimeAgo(post.date)}</div>
                    </div>
                </div>
                <span class="post-type">${post.type}</span>
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
            </div>
            <div class="post-actions">
                <span class="post-action like-btn" data-id="${post.id}">
                    ❤️ <span class="like-count">${post.likes}</span>
                </span>
            </div>
        </div>
    `;
}

/**
 * 创建空间卡片HTML
 */
function createSpaceCard(space) {
    return `
        <div class="space-card">
            <div class="space-card-image">${space.icon}</div>
            <div class="space-card-body">
                <h3 class="space-card-title">${space.name}</h3>
                <p class="space-card-desc">${space.description}</p>
                <div class="space-card-meta">
                    <span class="space-card-meta-item">
                        <span>👥</span> 建议人数：${space.capacity}
                    </span>
                    <span class="space-card-meta-item">
                        <span>📋</span> ${space.activities}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// ========== 添加CSS动画样式 ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
