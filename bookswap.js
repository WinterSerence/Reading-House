/**
 * 栖读社区书屋 - 漂流书架页面JS
 * 功能：漂流书列表展示、分类筛选、发布新书、申请交换
 */

document.addEventListener('DOMContentLoaded', function() {
    initBookswapPage();
});

// 当前筛选分类
let currentBookCategory = '全部';

/**
 * 初始化漂流书架页面
 */
function initBookswapPage() {
    renderBookList();
    initCategoryFilter();
    initSwapButtons();
    initAddBookForm();
}

/**
 * 渲染漂流书列表
 */
function renderBookList(category = '全部') {
    const booksContainer = document.getElementById('books-list');
    if (!booksContainer) return;

    let books = getBooks();

    // 按分类筛选
    if (category !== '全部') {
        books = books.filter(book => book.category === category);
    }

    // 可交换的书排在前面
    books.sort((a, b) => {
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (a.status !== 'available' && b.status === 'available') return 1;
        return new Date(b.date) - new Date(a.date);
    });

    if (books.length === 0) {
        booksContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <p class="empty-state-text">暂无该分类的漂流书</p>
            </div>
        `;
        return;
    }

    booksContainer.innerHTML = books.map(book => createBookCard(book)).join('');

    // 重新绑定交换按钮事件
    initSwapButtons();
}

/**
 * 初始化分类筛选
 */
function initCategoryFilter() {
    const filterContainer = document.querySelector('.filter-tabs');
    if (!filterContainer) return;

    const categories = ['全部', '文学', '心理', '设计', '历史', '生活方式', '儿童'];

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
            currentBookCategory = e.target.dataset.category;
            renderBookList(currentBookCategory);
        }
    });
}

/**
 * 初始化交换按钮
 */
function initSwapButtons() {
    const swapButtons = document.querySelectorAll('.book-swap-btn');

    swapButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = parseInt(this.dataset.id);
            handleSwap(bookId, this);
        });
    });
}

/**
 * 处理交换申请
 */
function handleSwap(bookId, button) {
    const books = getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) {
        showToast('图书不存在', 'error');
        return;
    }

    if (book.status !== 'available') {
        showToast('该书已被交换', 'error');
        return;
    }

    // 显示确认弹窗
    createModal({
        title: '申请交换确认',
        content: `
            <div style="line-height: 2;">
                <p><strong>📚 书名：</strong>${book.title}</p>
                <p><strong>✍️ 作者：</strong>${book.author}</p>
                <p><strong>📊 成色：</strong>${book.condition}</p>
                <p><strong>👤 书主：</strong>${book.owner}</p>
                <hr style="margin: 16px 0; border: none; border-top: 1px dashed var(--color-cream-dark);">
                <p><strong>📖 书主留言：</strong></p>
                <p style="color: var(--text-secondary); font-style: italic;">"${book.note}"</p>
            </div>
            <p style="margin-top: 16px; color: var(--color-green); font-size: 0.9rem;">
                💡 提交交换申请后，系统会生成交换码，请联系书主完成交换。
            </p>
        `,
        confirmText: '确认申请',
        onConfirm: () => {
            // 执行交换
            const result = exchangeBook(bookId);
            if (result.success) {
                showToast(result.message, 'success');
                // 重新渲染列表
                renderBookList(currentBookCategory);
            } else {
                showToast(result.message, 'error');
            }
        }
    });
}

/**
 * 初始化发布新书表单
 */
function initAddBookForm() {
    const form = document.getElementById('add-book-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据
        const formData = {
            title: form.querySelector('[name="title"]').value.trim(),
            author: form.querySelector('[name="author"]').value.trim(),
            category: form.querySelector('[name="category"]').value,
            owner: form.querySelector('[name="owner"]').value.trim(),
            condition: form.querySelector('[name="condition"]').value,
            note: form.querySelector('[name="note"]').value.trim()
        };

        // 验证
        if (!formData.title) {
            showToast('请输入书名', 'error');
            return;
        }
        if (!formData.author) {
            showToast('请输入作者', 'error');
            return;
        }
        if (!formData.category) {
            showToast('请选择分类', 'error');
            return;
        }
        if (!formData.owner) {
            showToast('请输入您的昵称', 'error');
            return;
        }
        if (!formData.note) {
            showToast('请填写交换说明', 'error');
            return;
        }

        // 添加新书
        const newBook = addBook(formData);

        // 清空表单
        form.reset();

        // 显示成功提示
        showToast('发布成功！感谢您的分享', 'success');

        // 重新渲染列表
        renderBookList(currentBookCategory);

        // 滚动到列表顶部
        document.getElementById('books-list').scrollIntoView({ behavior: 'smooth' });
    });

    // 输入框聚焦效果
    const inputs = form.querySelectorAll('input, textarea, select');
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
 * 显示图书详情弹窗
 */
function showBookDetail(bookId) {
    const books = getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) return;

    const isAvailable = book.status === 'available';

    createModal({
        title: book.title,
        content: `
            <div style="line-height: 2;">
                <p><strong>✍️ 作者：</strong>${book.author}</p>
                <p><strong>📚 分类：</strong>${book.category}</p>
                <p><strong>📊 成色：</strong>${book.condition}</p>
                <p><strong>👤 书主：</strong>${book.owner}</p>
                <p><strong>📅 上架时间：</strong>${book.date}</p>
                <hr style="margin: 16px 0; border: none; border-top: 1px dashed var(--color-cream-dark);">
                <p><strong>📖 书主留言：</strong></p>
                <p style="color: var(--text-secondary); font-style: italic;">"${book.note}"</p>
            </div>
        `,
        confirmText: isAvailable ? '我想交换' : '已交换',
        showCancel: isAvailable,
        onConfirm: () => {
            if (isAvailable) {
                const result = exchangeBook(bookId);
                if (result.success) {
                    showToast(result.message, 'success');
                    renderBookList(currentBookCategory);
                } else {
                    showToast(result.message, 'error');
                }
            }
        }
    });
}
