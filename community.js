/**
 * 栖读社区书屋 - 互动墙页面JS
 * 功能：帖子列表展示、分类筛选、发布帖子、点赞
 */

document.addEventListener('DOMContentLoaded', function() {
    initCommunityPage();
});

// 当前筛选类型
let currentPostType = '全部';

/**
 * 初始化互动墙页面
 */
function initCommunityPage() {
    renderPostList();
    initTypeFilter();
    initLikeButtons();
    initPostForm();
}

/**
 * 渲染帖子列表
 */
function renderPostList(type = '全部') {
    const postsContainer = document.getElementById('posts-list');
    if (!postsContainer) return;

    let posts = getPosts();

    // 按类型筛选
    if (type !== '全部') {
        posts = posts.filter(post => post.type === type);
    }

    // 按时间排序（最新的在前）
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💬</div>
                <p class="empty-state-text">暂无该类型的内容，快来发布第一条吧！</p>
            </div>
        `;
        return;
    }

    postsContainer.innerHTML = posts.map(post => createPostCard(post)).join('');

    // 重新绑定点赞按钮事件
    initLikeButtons();
}

/**
 * 初始化类型筛选
 */
function initTypeFilter() {
    const filterContainer = document.querySelector('.filter-tabs');
    if (!filterContainer) return;

    const types = ['全部', '留言', '书评', '求书', '活动反馈'];

    filterContainer.innerHTML = types.map(type => `
        <button class="filter-tab ${type === '全部' ? 'active' : ''}" data-type="${type}">
            ${type}
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
            currentPostType = e.target.dataset.type;
            renderPostList(currentPostType);
        }
    });
}

/**
 * 初始化点赞按钮
 */
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = parseInt(this.dataset.id);
            handleLike(postId, this);
        });
    });
}

/**
 * 处理点赞
 */
function handleLike(postId, button) {
    const newLikes = likePost(postId);

    // 更新点赞数显示
    const countEl = button.querySelector('.like-count');
    if (countEl) {
        countEl.textContent = newLikes;
    }

    // 添加点赞动画
    button.classList.add('liked');
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

/**
 * 初始化发布帖子表单
 */
function initPostForm() {
    const form = document.getElementById('post-form');
    if (!form) return;

    // 标签选择交互
    const tagCheckboxes = form.querySelectorAll('.tag-checkbox');
    const selectedTagsInput = form.querySelector('[name="tags"]');

    tagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedTags();
        });
    });

    function updateSelectedTags() {
        const selectedTags = [];
        tagCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedTags.push(checkbox.value);
            }
        });
        selectedTagsInput.value = selectedTags.join(',');
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据
        const formData = {
            nickname: form.querySelector('[name="nickname"]').value.trim(),
            type: form.querySelector('[name="type"]').value,
            tags: selectedTagsInput.value.split(',').filter(t => t),
            content: form.querySelector('[name="content"]').value.trim()
        };

        // 验证
        if (!formData.nickname) {
            showToast('请输入你的昵称', 'error');
            form.querySelector('[name="nickname"]').focus();
            return;
        }
        if (!formData.type) {
            showToast('请选择发布类型', 'error');
            form.querySelector('[name="type"]').focus();
            return;
        }
        if (formData.tags.length === 0) {
            showToast('请至少选择一个标签', 'error');
            return;
        }
        if (!formData.content) {
            showToast('请输入内容', 'error');
            form.querySelector('[name="content"]').focus();
            return;
        }
        if (formData.content.length < 10) {
            showToast('内容太短了，多说一点吧', 'error');
            form.querySelector('[name="content"]').focus();
            return;
        }

        // 添加帖子
        const newPost = addPost(formData);

        // 清空表单
        form.querySelector('[name="nickname"]').value = '';
        form.querySelector('[name="type"]').value = '';
        form.querySelector('[name="content"]').value = '';
        tagCheckboxes.forEach(checkbox => checkbox.checked = false);
        selectedTagsInput.value = '';

        // 显示成功提示
        showToast('发布成功！感谢你的分享', 'success');

        // 重新渲染列表
        renderPostList(currentPostType);

        // 滚动到列表顶部
        document.getElementById('posts-list').scrollIntoView({ behavior: 'smooth' });
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
 * 创建标签选择器
 */
function createTagSelector() {
    const tags = [
        { value: '日常感受', label: '日常感受' },
        { value: '书籍推荐', label: '书籍推荐' },
        { value: '空间体验', label: '空间体验' },
        { value: '求书互助', label: '求书互助' },
        { value: '活动感受', label: '活动感受' },
        { value: '阅读心得', label: '阅读心得' }
    ];

    return tags.map(tag => `
        <label class="tag-select">
            <input type="checkbox" class="tag-checkbox" value="${tag.value}">
            <span class="tag">${tag.label}</span>
        </label>
    `).join('');
}
