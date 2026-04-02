/**
 * 栖读社区书屋 - 数据文件
 * 包含所有预置数据：活动、漂流书、打卡记录、互动墙内容
 */

// ========== 活动数据 ==========
const defaultEvents = [
    {
        id: 1,
        name: "春日共读会《瓦尔登湖》",
        category: "共读会",
        date: "2026-04-05",
        time: "14:00-16:30",
        location: "安静阅读区",
        capacity: 15,
        registered: 12,
        description: "在春日的午后，一起品读梭罗的经典之作《瓦尔登湖》。我们将在领读人的引导下，探讨简朴生活的哲学，感受自然与心灵的对话。",
        status: "open"
    },
    {
        id: 2,
        name: "儿童绘本故事会",
        category: "儿童绘本",
        date: "2026-04-06",
        time: "10:00-11:30",
        location: "儿童共读角",
        capacity: 20,
        registered: 18,
        description: "本期故事会将为孩子们带来《好饿的毛毛虫》《猜猜我有多爱你》等经典绘本。通过互动讲述，让孩子们爱上阅读。",
        status: "open"
    },
    {
        id: 3,
        name: "《认知觉醒》新书分享会",
        category: "新书分享",
        date: "2026-04-07",
        time: "19:00-21:00",
        location: "交流讨论区",
        capacity: 25,
        registered: 25,
        description: "特邀嘉宾分享《认知觉醒》一书的核心理念，探讨如何通过认知升级实现自我成长。现场还有作者签名本抽取环节。",
        status: "full"
    },
    {
        id: 4,
        name: "周五夜读：诗歌朗诵之夜",
        category: "夜读活动",
        date: "2026-04-08",
        time: "20:00-22:00",
        location: "咖啡休闲区",
        capacity: 12,
        registered: 8,
        description: "在温暖的灯光下，朗诵你喜爱的诗歌。可以是经典名作，也可以是自己创作的诗篇。让诗歌点亮夜晚，温暖心灵。",
        status: "open"
    },
    {
        id: 5,
        name: "手账工作坊：记录美好生活",
        category: "手账工作坊",
        date: "2026-04-09",
        time: "15:00-17:30",
        location: "交流讨论区",
        capacity: 16,
        registered: 14,
        description: "学习手账制作技巧，从排版到插画，从字体到装饰。让我们一起用纸笔记录生活中的小确幸，创造属于自己的美好时光。",
        status: "open"
    },
    {
        id: 6,
        name: "设计思维读书沙龙",
        category: "共读会",
        date: "2026-04-10",
        time: "14:00-16:00",
        location: "交流讨论区",
        capacity: 20,
        registered: 9,
        description: "本期沙龙聚焦《设计思维》一书，探讨如何运用设计思维解决生活和工作中的问题。欢迎设计师和对创新感兴趣的朋友参加。",
        status: "open"
    },
    {
        id: 7,
        name: "亲子共读时光",
        category: "儿童绘本",
        date: "2026-04-11",
        time: "10:30-12:00",
        location: "儿童共读角",
        capacity: 15,
        registered: 11,
        description: "家长与孩子一起阅读，共同完成绘本延伸活动。本期主题是'春天'，将带领孩子们走进绘本中的春天世界。",
        status: "open"
    },
    {
        id: 8,
        name: "深夜书话：推理小说之夜",
        category: "夜读活动",
        date: "2026-04-12",
        time: "21:00-23:00",
        location: "安静阅读区",
        capacity: 10,
        registered: 10,
        description: "推理迷的盛宴！分享你最爱的推理小说，讨论诡计设计与叙事技巧。今夜，让我们一起走进谜题的世界。",
        status: "full"
    }
];

// ========== 漂流书数据 ==========
const defaultBooks = [
    {
        id: 1,
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        category: "文学",
        owner: "林小北",
        condition: "九成新",
        status: "available",
        note: "这本书陪我度过了很多个夜晚，现在让它继续旅行，遇见下一个读者。",
        date: "2026-03-25"
    },
    {
        id: 2,
        title: "设计心理学",
        author: "唐纳德·诺曼",
        category: "设计",
        owner: "设计师阿凯",
        condition: "八成新",
        status: "available",
        note: "设计入门必读，书中有很多有趣的设计案例，适合对设计感兴趣的朋友。",
        date: "2026-03-26"
    },
    {
        id: 3,
        title: "被讨厌的勇气",
        author: "岸见一郎 / 古贺史健",
        category: "心理",
        owner: "向阳花",
        condition: "全新",
        status: "available",
        note: "读完收获很大，希望也能帮助到你。书中有很多关于人际关系的思考。",
        date: "2026-03-27"
    },
    {
        id: 4,
        title: "小王子",
        author: "圣埃克苏佩里",
        category: "儿童",
        owner: "月亮船",
        condition: "八成新",
        status: "exchanged",
        note: "这本书适合所有大人小孩一起阅读，满满的治愈感。",
        date: "2026-03-20"
    },
    {
        id: 5,
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        category: "历史",
        owner: "历史迷小王",
        condition: "七成新",
        status: "available",
        note: "视野很开阔的一本书，读完会对人类历史有全新的认识。",
        date: "2026-03-28"
    },
    {
        id: 6,
        title: "断舍离",
        author: "山下英子",
        category: "生活方式",
        owner: "极简主义者",
        condition: "九成新",
        status: "available",
        note: "读完这本书，我整理了整个房间。希望它也能给你带来改变。",
        date: "2026-03-29"
    },
    {
        id: 7,
        title: "活着",
        author: "余华",
        category: "文学",
        owner: "阅读者小陈",
        condition: "八成新",
        status: "available",
        note: "一本读完会让人深思的书，余华的文字朴实却有力。",
        date: "2026-03-30"
    },
    {
        id: 8,
        title: "儿童艺术百科全书",
        author: "英国DK公司",
        category: "儿童",
        owner: "小画家妈妈",
        condition: "全新",
        status: "available",
        note: "精装大开本，非常适合亲子共读，里面有丰富的艺术知识。",
        date: "2026-03-31"
    },
    {
        id: 9,
        title: "思考，快与慢",
        author: "丹尼尔·卡尼曼",
        category: "心理",
        owner: "学心理的阿杰",
        condition: "九成新",
        status: "exchanged",
        note: "诺贝尔奖得主的经典之作，关于思维方式的深刻洞察。",
        date: "2026-03-18"
    },
    {
        id: 10,
        title: "设计中的设计",
        author: "原研哉",
        category: "设计",
        owner: "设计爱好者",
        condition: "八成新",
        status: "available",
        note: "日本设计大师的经典之作，探讨设计的本质与生活的美学。",
        date: "2026-04-01"
    }
];

// ========== 打卡记录数据 ==========
const defaultCheckins = [
    {
        id: 1,
        book: "《瓦尔登湖》",
        duration: 45,
        note: "今天读了关于湖畔生活的章节，梭罗对自然的描写让人心静。在喧嚣的城市里，我们或许也需要这样一片心灵的湖泊。",
        date: "2026-04-01"
    },
    {
        id: 2,
        book: "《设计心理学》",
        duration: 60,
        note: "门把手的设计案例很有启发，原来生活中的小设计背后有这么多学问。开始关注身边的设计细节了。",
        date: "2026-04-01"
    },
    {
        id: 3,
        book: "《小王子》",
        duration: 30,
        note: "今天和孩子一起读了小王子，孩子问我什么是'驯养'。借这个机会，和他聊了聊关于爱与责任的话题。",
        date: "2026-03-31"
    },
    {
        id: 4,
        book: "《认知觉醒》",
        duration: 50,
        note: "关于元认知的概念很有意思，开始尝试观察自己的思考过程。这本书值得反复阅读。",
        date: "2026-03-31"
    },
    {
        id: 5,
        book: "《活着》",
        duration: 90,
        note: "一口气读完了后半部分，余华笔下的福贵让我多次落泪。活着本身就是最大的勇气。",
        date: "2026-03-30"
    },
    {
        id: 6,
        book: "《人类简史》",
        duration: 40,
        note: "关于农业革命的部分颠覆了我的认知，原来农业革命可能是'史上最大的骗局'。",
        date: "2026-03-30"
    }
];

// ========== 互动墙数据 ==========
const defaultPosts = [
    {
        id: 1,
        nickname: "午后阳光",
        type: "留言",
        tags: ["日常感受"],
        content: "今天在窗边的位置读了两个小时的书，阳光透过玻璃洒在书页上，那一刻觉得时间都慢了下来。栖读真的是一个很适合安静读书的地方。",
        likes: 12,
        date: "2026-04-01 15:30"
    },
    {
        id: 2,
        nickname: "书虫小李",
        type: "书评",
        tags: ["书籍推荐", "文学"],
        content: "最近在读《百年孤独》，布恩迪亚家族七代人的故事让我着迷。马尔克斯的魔幻现实主义手法太厉害了，推荐给喜欢深度阅读的朋友。",
        likes: 18,
        date: "2026-04-01 14:20"
    },
    {
        id: 3,
        nickname: "寻找好书",
        type: "求书",
        tags: ["求书互助", "设计"],
        content: "想求一本适合入门的设计类书籍，最好是有实际案例的那种。最近对UI设计很感兴趣，希望有朋友能推荐一下～",
        likes: 5,
        date: "2026-04-01 12:15"
    },
    {
        id: 4,
        nickname: "参加者小王",
        type: "活动反馈",
        tags: ["空间体验", "活动感受"],
        content: "上周参加了共读会，认识了很多志同道合的朋友。领读人的分享很有深度，讨论环节也很有收获。期待下一期活动！",
        likes: 9,
        date: "2026-03-31 20:45"
    },
    {
        id: 5,
        nickname: "绘本妈妈",
        type: "留言",
        tags: ["日常感受", "儿童阅读"],
        content: "带孩子来儿童共读角参加绘本故事会，老师讲得太好了，孩子全程都很投入。这里真是一个宝藏发现！",
        likes: 15,
        date: "2026-03-31 17:00"
    },
    {
        id: 6,
        nickname: "深夜读者",
        type: "书评",
        tags: ["书籍推荐"],
        content: "推荐一本适合夜晚阅读的书——《夜航西飞》。作者在非洲独自驾机的描写，有一种独特的宁静与勇气。",
        likes: 11,
        date: "2026-03-31 23:30"
    },
    {
        id: 7,
        nickname: "设计新人",
        type: "留言",
        tags: ["空间体验"],
        content: "第一次来栖读，被这里的设计风格深深吸引。原木色调配上柔和的灯光，还有随处可见的绿植，让人觉得特别放松。",
        likes: 8,
        date: "2026-03-30 16:20"
    },
    {
        id: 8,
        nickname: "老读者",
        type: "活动反馈",
        tags: ["活动感受", "共读会"],
        content: "栖读的共读会是我参加过最有质量的读书活动。每次都有新的收获，感谢这里让我们相遇。",
        likes: 22,
        date: "2026-03-30 21:15"
    },
    {
        id: 9,
        nickname: "极简主义者",
        type: "书评",
        tags: ["书籍推荐", "生活方式"],
        content: "《断舍离》这本书改变了我对物品的态度。最近整理了书架，把一些书放到了漂流书架上，希望它们能找到新的主人。",
        likes: 14,
        date: "2026-03-29 19:30"
    },
    {
        id: 10,
        nickname: "春天来了",
        type: "留言",
        tags: ["日常感受"],
        content: "春天最适合读诗了。今天在栖读的窗边读完了海子的诗选，'面朝大海，春暖花开'，心里充满了温暖。",
        likes: 20,
        date: "2026-03-29 15:45"
    }
];

// ========== 数据管理函数 ==========

/**
 * 从 localStorage 获取数据，如果不存在则返回默认数据
 */
function getData(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultValue;
        }
    }
    return defaultValue;
}

/**
 * 保存数据到 localStorage
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 获取活动数据
 */
function getEvents() {
    return getData('qidu_events', defaultEvents);
}

/**
 * 保存活动数据
 */
function saveEvents(events) {
    saveData('qidu_events', events);
}

/**
 * 获取漂流书数据
 */
function getBooks() {
    return getData('qidu_books', defaultBooks);
}

/**
 * 保存漂流书数据
 */
function saveBooks(books) {
    saveData('qidu_books', books);
}

/**
 * 获取打卡记录数据
 */
function getCheckins() {
    return getData('qidu_checkins', defaultCheckins);
}

/**
 * 保存打卡记录数据
 */
function saveCheckins(checkins) {
    saveData('qidu_checkins', checkins);
}

/**
 * 获取互动墙数据
 */
function getPosts() {
    return getData('qidu_posts', defaultPosts);
}

/**
 * 保存互动墙数据
 */
function savePosts(posts) {
    saveData('qidu_posts', posts);
}

/**
 * 活动报名
 */
function registerEvent(eventId) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);
    if (event && event.registered < event.capacity) {
        event.registered++;
        if (event.registered >= event.capacity) {
            event.status = 'full';
        }
        saveEvents(events);
        return { success: true, message: '报名成功！期待您的参与。' };
    }
    return { success: false, message: '报名失败，活动已满员或不存在。' };
}

/**
 * 添加漂流书
 */
function addBook(book) {
    const books = getBooks();
    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        ...book,
        status: 'available',
        date: new Date().toISOString().split('T')[0]
    };
    books.unshift(newBook);
    saveBooks(books);
    return newBook;
}

/**
 * 交换漂流书
 */
function exchangeBook(bookId) {
    const books = getBooks();
    const book = books.find(b => b.id === bookId);
    if (book && book.status === 'available') {
        book.status = 'exchanged';
        saveBooks(books);
        return { success: true, message: '交换申请已提交，请联系书主完成交换。' };
    }
    return { success: false, message: '交换失败，该书已被交换或不存在。' };
}

/**
 * 添加打卡记录
 */
function addCheckin(checkin) {
    const checkins = getCheckins();
    const newCheckin = {
        id: checkins.length > 0 ? Math.max(...checkins.map(c => c.id)) + 1 : 1,
        ...checkin,
        date: new Date().toISOString().split('T')[0]
    };
    checkins.unshift(newCheckin);
    saveCheckins(checkins);
    return newCheckin;
}

/**
 * 添加互动墙帖子
 */
function addPost(post) {
    const posts = getPosts();
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        ...post,
        likes: 0,
        date: formatDateTime(new Date())
    };
    posts.unshift(newPost);
    savePosts(posts);
    return newPost;
}

/**
 * 点赞帖子
 */
function likePost(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        savePosts(posts);
        return post.likes;
    }
    return 0;
}

/**
 * 格式化日期时间
 */
function formatDateTime(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 格式化日期显示
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[date.getDay()];
    return `${month}月${day}日 ${weekDay}`;
}

/**
 * 计算本周阅读总时长
 */
function getWeeklyReadingTime() {
    const checkins = getCheckins();
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    return checkins
        .filter(c => new Date(c.date) >= weekStart)
        .reduce((sum, c) => sum + c.duration, 0);
}

/**
 * 获取连续打卡天数
 */
function getStreakDays() {
    const checkins = getCheckins();
    if (checkins.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates = [...new Set(checkins.map(c => c.date))].sort().reverse();

    let streak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < dates.length; i++) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (dates.includes(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (i === 0) {
            // 今天还没打卡，检查昨天
            checkDate.setDate(checkDate.getDate() - 1);
            const yesterdayStr = checkDate.toISOString().split('T')[0];
            if (dates.includes(yesterdayStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        } else {
            break;
        }
    }

    return streak;
}

/**
 * 检查今天是否已打卡
 */
function hasCheckedToday() {
    const checkins = getCheckins();
    const today = new Date().toISOString().split('T')[0];
    return checkins.some(c => c.date === today);
}

/**
 * 获取今日打卡次数
 */
function getTodayCheckinCount() {
    const checkins = getCheckins();
    const today = new Date().toISOString().split('T')[0];
    return checkins.filter(c => c.date === today).length;
}
