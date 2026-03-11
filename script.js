(function() {
    // ==================== CONSTANTS ====================
    const XP_LVL = [0, 100, 250, 500, 900, 1500, 2400, 3800, 6000, 10000, 15000, 22000, 32000, 45000, 62000];
    const RANKS = ['Rookie', 'Grinder', 'Hustler', 'Builder', 'Stacker', 'Achiever', 'Warrior', 'Champion', 'Elite', 'Legend', 'Master', 'Grandmaster', 'Titan', 'Mythic', 'Supreme'];
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const MFULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const MCATS = {
        income: ['Freelance', 'Part-time', 'Side Hustle', 'Allowance', 'Gift', 'Bonus', 'Salary', 'Other'],
        expense: ['Food', 'Transport', 'Rent', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Subscriptions', 'Other'],
        saving: ['Emergency Fund', 'Goal Savings', 'Investment Prep', 'Other'],
        investment: ['Stocks', 'Crypto', 'Mutual Fund', 'UITF', 'Business', 'Other']
    };

    const TC = {
        income: 'var(--income-l)',
        expense: 'var(--expense-l)',
        saving: 'var(--saving-l)',
        investment: 'var(--invest-l)'
    };
    const TCL = {
        income: 'var(--income-ll)',
        expense: 'var(--expense-ll)',
        saving: 'var(--saving-ll)',
        investment: 'var(--invest-l)'
    };

    const MSVG = {
        income: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 5 5 12"/></svg>',
        expense: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/></svg>',
        saving: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',
        investment: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>'
    };

    const FSVG = {
        strength: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="var(--fit-ll)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/></svg>',
        cardio: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="var(--fit-ll)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        hiit: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="var(--fit-ll)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        flexibility: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="var(--fit-ll)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>',
        sports: '<svg width="16" height="16" viewBox="0 0 24 24" stroke="var(--fit-ll)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>'
    };

    const DSVG = '<svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>';

    const BADGES = [
        { id: 'first_money', n: 'First Log', d: 'Log your first transaction', xp: 50, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' },
        { id: 'first_workout', n: 'First Sweat', d: 'Log your first workout', xp: 50, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/></svg>' },
        { id: 'week_streak', n: '7-Day Streak', d: 'Log for 7 days straight', xp: 200, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
        { id: 'saver', n: 'Super Saver', d: 'Save over ₱1,000 total', xp: 150, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>' },
        { id: 'investor', n: 'Market Mover', d: 'Make your first investment', xp: 100, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>' },
        { id: 'hustler', n: 'Side Hustler', d: 'Log 3+ income sources', xp: 120, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
        { id: 'iron_will', n: 'Iron Will', d: 'Log 10 workouts', xp: 180, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
        { id: 'cardio_king', n: 'Cardio King', d: 'Log 5 cardio sessions', xp: 130, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
        { id: 'balanced', n: 'Balanced Life', d: 'Log money + fitness same day', xp: 160, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
        { id: 'budget_king', n: 'Budget King', d: 'Log 50 transactions', xp: 500, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
        { id: 'gym_rat', n: 'Gym Rat', d: 'Log 30 workouts total', xp: 400, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' },
        { id: 'legend', n: 'Legend', d: 'Reach Level 10', xp: 1000, svg: '<svg width="18" height="18" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' }
    ];

    // ==================== STATE ====================
    let currentUser = null;
    let selectedMonth = new Date().getMonth();
    let moneyType = 'income';
    let fitnessType = 'strength';
    let moneyFilter = 'all';

    // DOM element shortcuts (will be populated after DOM ready)
    let el = {};

    // ==================== HELPERS ====================
    const formatPeso = (num = 0) => '₱' + Number(num).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const getLevel = (xp) => {
        let level = 1;
        XP_LVL.forEach((threshold, idx) => {
            if (xp >= threshold) level = idx + 1;
        });
        return Math.min(level, 15);
    };

    const getRank = (level) => RANKS[Math.min(level - 1, RANKS.length - 1)];

    const getLevelProgress = (xp) => {
        const level = getLevel(xp);
        if (level >= 15) return 100;
        const current = XP_LVL[level - 1] || 0;
        const next = XP_LVL[level] || current;
        return Math.round(((xp - current) / (next - current)) * 100);
    };

    const getAllUsers = () => JSON.parse(localStorage.getItem('su_users') || '{}');

    const saveUser = () => {
        if (!currentUser) return;
        const users = getAllUsers();
        users[currentUser.email] = currentUser;
        localStorage.setItem('su_users', JSON.stringify(users));
        localStorage.setItem('su_sess', currentUser.email);
        updateUI();
    };

    const sumByType = (arr, type) => (arr || []).filter(x => x.type === type).reduce((s, x) => s + x.amount, 0);

    const thisMonthTransactions = () => {
        const now = new Date();
        const m = now.getMonth(), y = now.getFullYear();
        return (currentUser.transactions || []).filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === m && d.getFullYear() === y;
        });
    };

    const thisWeekWorkouts = () => {
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay()); // Sunday as start of week
        start.setHours(0, 0, 0, 0);
        return (currentUser.workouts || []).filter(w => new Date(w.date) >= start);
    };

    const calculateDisciplineScore = () => {
        const txs = currentUser.transactions || [];
        const wos = currentUser.workouts || [];
        const streak = currentUser.streak || 0;
        return Math.min(Math.min(txs.length * 2, 40) + Math.min(wos.length * 3, 40) + Math.min(streak * 2, 20), 100);
    };

    // ==================== DEMO DATA GENERATOR ====================
    function generateDemoData() {
        const transactions = [];
        const workouts = [];
        const now = new Date();
        const categories = {
            income: ['Freelance', 'Salary', 'Gift', 'Bonus'],
            expense: ['Food', 'Transport', 'Shopping', 'Bills'],
            saving: ['Emergency Fund', 'Goal Savings'],
            investment: ['Stocks', 'Crypto']
        };

        // Generate 10 random transactions over the last 30 days
        for (let i = 0; i < 10; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() - Math.floor(Math.random() * 30));
            const dateStr = date.toISOString().split('T')[0];
            const type = ['income', 'expense', 'saving', 'investment'][Math.floor(Math.random() * 4)];
            const catArray = categories[type];
            const transaction = {
                id: Date.now() + i,
                type: type,
                amount: Math.floor(Math.random() * 5000) + 100,
                category: catArray[Math.floor(Math.random() * catArray.length)],
                note: '',
                date: dateStr
            };
            transactions.push(transaction);
        }

        // Generate 5 random workouts over the last 14 days
        const workoutTypes = ['strength', 'cardio', 'hiit', 'flexibility', 'sports'];
        for (let i = 0; i < 5; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() - Math.floor(Math.random() * 14));
            const dateStr = date.toISOString().split('T')[0];
            const type = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
            const workout = {
                id: Date.now() + i + 1000,
                type: type,
                name: type.charAt(0).toUpperCase() + type.slice(1) + ' Session',
                duration: Math.floor(Math.random() * 60) + 20,
                sets: type === 'strength' || type === 'hiit' ? Math.floor(Math.random() * 4) + 3 : 0,
                reps: type === 'strength' || type === 'hiit' ? Math.floor(Math.random() * 10) + 8 : 0,
                weight: type === 'strength' ? Math.floor(Math.random() * 80) + 20 : 0,
                note: '',
                date: dateStr
            };
            workouts.push(workout);
        }

        return { transactions, workouts };
    }

    // ==================== AUTH ====================
    function switchAuthMode(mode) {
        document.querySelectorAll('.a-tab').forEach((btn, idx) => {
            btn.classList.toggle('on', (mode === 'login' && idx === 0) || (mode === 'register' && idx === 1));
        });
        el.fnField.style.display = mode === 'register' ? 'block' : 'none';
        el.authAction.textContent = mode === 'login' ? 'Sign In →' : 'Start Your Journey →';
        el.authError.style.display = 'none';
    }

    function doAuth() {
        const email = el.authEmail.value.trim();
        const pass = el.authPassword.value;
        const name = el.authName.value.trim();
        const mode = document.querySelector('.a-tab.on')?.textContent.includes('Sign In') ? 'login' : 'register';

        el.authError.style.display = 'none';
        if (!email || !pass) {
            el.authError.textContent = 'Please fill all fields.';
            el.authError.style.display = 'block';
            return;
        }

        const users = getAllUsers();
        if (mode === 'login') {
            const user = users[email];
            if (!user || user.password !== pass) {
                el.authError.textContent = 'Invalid email or password.';
                el.authError.style.display = 'block';
                return;
            }
            loginUser(user);
        } else {
            if (!name) {
                el.authError.textContent = 'Name is required.';
                el.authError.style.display = 'block';
                return;
            }
            if (users[email]) {
                el.authError.textContent = 'Email already registered.';
                el.authError.style.display = 'block';
                return;
            }

            // Generate demo data for new users
            const demo = generateDemoData();

            const newUser = {
                id: Date.now(),
                name,
                email,
                password: pass,
                xp: 350, // Give some starting XP
                streak: 3,
                lastLog: new Date().toISOString().split('T')[0],
                badges: [],
                transactions: demo.transactions,
                workouts: demo.workouts,
                dailyQ: {},
                claimedMs: {},
                createdAt: new Date().toISOString()
            };
            users[email] = newUser;
            localStorage.setItem('su_users', JSON.stringify(users));
            loginUser(newUser);
        }
    }

    function loginUser(user) {
        currentUser = user;
        // Ensure required properties exist
        if (!currentUser.dailyQ) currentUser.dailyQ = {};
        if (!currentUser.claimedMs) currentUser.claimedMs = {};
        localStorage.setItem('su_sess', user.email);
        el.auth.style.display = 'none';
        el.app.classList.add('on');
        buildMonthStrip();
        initDates();
        updateUI();
        renderDashboard();
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('su_sess');
        el.auth.style.display = 'flex';
        el.app.classList.remove('on');
        el.authEmail.value = '';
        el.authPassword.value = '';
    }

    // ==================== NAVIGATION ====================
    function navigateTo(pageId) {
        if (!currentUser) {
            logout();
            return;
        }
        ['dash', 'money', 'fitness', 'quests', 'prof'].forEach(p => {
            const page = document.getElementById('p-' + p);
            const mobBtn = document.getElementById('mn-' + p);
            const deskBtn = document.getElementById('sn-' + p);
            if (page) page.classList.toggle('on', p === pageId);
            if (mobBtn) mobBtn.classList.toggle('on', p === pageId);
            if (deskBtn) deskBtn.classList.toggle('on', p === pageId);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger page-specific rendering
        if (pageId === 'dash') renderDashboard();
        else if (pageId === 'money') renderMoney();
        else if (pageId === 'fitness') renderFitness();
        else if (pageId === 'quests') renderQuests();
        else if (pageId === 'prof') renderProfile();
    }

    // ==================== MONTH STRIP ====================
    function buildMonthStrip() {
        const html = MONTHS.map((m, i) => `<button class="mon-btn${i === selectedMonth ? ' on' : ''}" data-month="${i}">${m}</button>`).join('');
        if (el.monthStrip) el.monthStrip.innerHTML = html;
        if (el.deskMon) {
            el.deskMon.innerHTML = html;
            el.deskMon.style.display = 'flex';
        }
    }

    function selectMonth(monthIndex) {
        selectedMonth = monthIndex;
        document.querySelectorAll('.mon-btn').forEach((btn, i) => btn.classList.toggle('on', i === monthIndex));
        renderDashboard();
    }

    // ==================== UI UPDATE ====================
    function updateUI() {
        if (!currentUser) return;
        const level = getLevel(currentUser.xp);
        const progress = getLevelProgress(currentUser.xp);
        const discScore = calculateDisciplineScore();

        // Update all UI elements that show XP/level
        if (el.mLv) el.mLv.textContent = level;
        if (el.mLvT) el.mLvT.textContent = 'Lv ' + level;
        if (el.mXp) el.mXp.textContent = currentUser.xp + ' XP';
        if (el.sbLv) el.sbLv.textContent = level;
        if (el.sbLvN) el.sbLvN.textContent = 'Level ' + level;
        if (el.sbXp) el.sbXp.textContent = currentUser.xp + ' XP';
        if (el.sbDisc) el.sbDisc.textContent = discScore;
        if (el.sbFill) el.sbFill.style.width = progress + '%';
    }

    function initDates() {
        const today = new Date().toISOString().split('T')[0];
        if (el.mDate) el.mDate.value = today;
        if (el.fDate) el.fDate.value = today;
    }

    // ==================== CANVAS CHART ====================
    function drawBarChart() {
        const canvas = el.barChart;
        if (!canvas || !currentUser) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth || 300;
        const height = 140;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        const now = new Date();
        const year = now.getFullYear();
        const txs = currentUser.transactions || [];
        const monthlyInc = [];
        const monthlyExp = [];

        for (let m = 0; m < 12; m++) {
            const monthTxs = txs.filter(t => {
                const d = new Date(t.date);
                return d.getMonth() === m && d.getFullYear() === year;
            });
            monthlyInc.push(sumByType(monthTxs, 'income'));
            monthlyExp.push(sumByType(monthTxs, 'expense'));
        }

        const maxVal = Math.max(...monthlyInc, ...monthlyExp, 1);
        const padding = { left: 6, right: 6, top: 8, bottom: 26 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        const barWidth = (chartWidth / 12) * 0.32;
        const gap = chartWidth / 12;

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + chartHeight * (1 - i / 4);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }

        for (let m = 0; m < 12; m++) {
            const x = padding.left + m * gap + gap / 2;
            const isSelected = m === selectedMonth;
            const incHeight = (monthlyInc[m] / maxVal) * chartHeight;
            const expHeight = (monthlyExp[m] / maxVal) * chartHeight;

            // Highlight selected month background
            if (isSelected) {
                ctx.fillStyle = 'rgba(252,211,77,0.05)';
                ctx.fillRect(x - gap / 2, padding.top, gap, chartHeight);
            }

            // Income bar
            const incGradient = ctx.createLinearGradient(0, padding.top + chartHeight - incHeight, 0, padding.top + chartHeight);
            incGradient.addColorStop(0, isSelected ? 'rgba(16,185,129,0.95)' : 'rgba(16,185,129,0.5)');
            incGradient.addColorStop(1, 'rgba(16,185,129,0.05)');
            ctx.fillStyle = incGradient;
            roundedRect(ctx, x - barWidth - 1, padding.top + chartHeight - incHeight, barWidth, incHeight, 3);
            ctx.fill();

            // Expense bar
            const expGradient = ctx.createLinearGradient(0, padding.top + chartHeight - expHeight, 0, padding.top + chartHeight);
            expGradient.addColorStop(0, isSelected ? 'rgba(244,63,94,0.95)' : 'rgba(244,63,94,0.5)');
            expGradient.addColorStop(1, 'rgba(244,63,94,0.05)');
            ctx.fillStyle = expGradient;
            roundedRect(ctx, x + 1, padding.top + chartHeight - expHeight, barWidth, expHeight, 3);
            ctx.fill();

            // Month label
            ctx.fillStyle = isSelected ? 'rgba(252,211,77,0.9)' : 'rgba(200,200,255,0.3)';
            ctx.font = (isSelected ? 'bold ' : '') + '7.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(MONTHS[m], x, height - padding.bottom + 9);
        }

        // Update chart subtitle
        if (el.chartSub) {
            el.chartSub.innerHTML = `<span style="color:var(--income-ll)">${formatPeso(monthlyInc[selectedMonth])}</span> income · <span style="color:var(--expense-ll)">${formatPeso(monthlyExp[selectedMonth])}</span> expenses — ${MFULL[selectedMonth]}`;
        }
    }

    function roundedRect(ctx, x, y, w, h, r) {
        if (h <= 0) return;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    }

    // ==================== DONUT HELPERS ====================
    const CIRC36 = 2 * Math.PI * 36; // ~226.2
    const CIRC38 = 2 * Math.PI * 38; // ~238.8

    function updateDonut4(ids, values) {
        const total = values.reduce((a, b) => a + b, 0) || 1;
        let offset = 0;
        ids.forEach((id, i) => {
            const el = document.getElementById(id);
            if (!el) return;
            const dash = (values[i] / total) * CIRC36;
            const gap = CIRC36 - dash;
            el.setAttribute('stroke-dasharray', dash + ' ' + gap);
            el.setAttribute('stroke-dashoffset', -offset);
            offset += dash;
        });
    }

    function updateDonut1(id, percent) {
        const el = document.getElementById(id);
        if (!el) return;
        const dash = (percent / 100) * CIRC36;
        const gap = CIRC36 - dash;
        el.setAttribute('stroke-dasharray', dash + ' ' + gap);
        el.setAttribute('stroke-dashoffset', '0');
    }

    // ==================== DASHBOARD ====================
    function renderDashboard() {
        if (!currentUser) return;
        updateUI();

        const txs = currentUser.transactions || [];
        const wos = currentUser.workouts || [];
        const level = getLevel(currentUser.xp);
        const progress = getLevelProgress(currentUser.xp);
        const discScore = calculateDisciplineScore();

        // Player card
        if (el.dName) el.dName.textContent = currentUser.name.split(' ')[0];
        if (el.dRank) el.dRank.textContent = getRank(level);
        if (el.dDisc) el.dDisc.textContent = discScore;
        if (el.dLvT) el.dLvT.textContent = 'Level ' + level + ' — ' + getRank(level);
        const nextXP = XP_LVL[level] || XP_LVL[XP_LVL.length - 1];
        if (el.dXpT) el.dXpT.textContent = currentUser.xp + '/' + nextXP + ' XP';
        if (el.dXpBar) el.dXpBar.style.width = progress + '%';
        if (el.discArc) {
            const dash = (discScore / 100) * CIRC38;
            const gap = CIRC38 - dash;
            el.discArc.setAttribute('stroke-dasharray', dash + ' ' + gap);
        }

        // Month transactions
        const monthTxs = txs.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === selectedMonth && d.getFullYear() === new Date().getFullYear();
        });
        const inc = sumByType(monthTxs, 'income');
        const exp = sumByType(monthTxs, 'expense');
        const sav = sumByType(monthTxs, 'saving');
        const inv = sumByType(monthTxs, 'investment');
        const net = inc - exp;

        if (el.dNet) el.dNet.textContent = formatPeso(net);
        if (el.mbNet) {
            el.mbNet.style.width = Math.min(Math.abs(net) / Math.max(inc, 1) * 100, 100) + '%';
            el.mbNet.style.background = net >= 0 ? 'var(--income-l)' : 'var(--expense-l)';
        }

        // Week workouts
        const weekWos = thisWeekWorkouts();
        const woCount = weekWos.length;
        if (el.dWoc) el.dWoc.textContent = woCount + ' session' + (woCount !== 1 ? 's' : '');
        if (el.mbWo) el.mbWo.style.width = Math.min(woCount / 7 * 100, 100) + '%';

        const streak = currentUser.streak || 0;
        if (el.dStr) el.dStr.textContent = streak + ' day' + (streak !== 1 ? 's' : '');
        if (el.mbStr) el.mbStr.style.width = Math.min(streak / 30 * 100, 100) + '%';

        // Money donut
        updateDonut4(['mr-inc', 'mr-exp', 'mr-sav', 'mr-inv'], [inc, exp, sav, inv]);
        const savePercent = inc > 0 ? Math.round((sav / inc) * 100) : 0;
        if (el.mrPct) el.mrPct.textContent = savePercent + '%';
        ['dl-inc', 'dl-exp', 'dl-sav', 'dl-inv'].forEach((id, i) => {
            const e = document.getElementById(id);
            if (e) e.textContent = formatPeso([inc, exp, sav, inv][i]);
        });
        if (el.ratioSub) {
            el.ratioSub.innerHTML = net >= 0 ? `<span style="color:var(--income-ll)">+${formatPeso(net)}</span> net positive` : `<span style="color:var(--expense-ll)">${formatPeso(net)}</span> net negative`;
        }

        // Fitness donut
        const woMins = weekWos.reduce((s, w) => s + (w.duration || 0), 0);
        const woXP = weekWos.length * 30;
        const woGoal = 7;
        const woPercent = Math.min(Math.round((woCount / woGoal) * 100), 100);
        updateDonut1('wo-arc', woPercent);
        if (el.woPct) el.woPct.textContent = woPercent + '%';
        if (el.woSess) el.woSess.textContent = woCount;
        if (el.woMins) el.woMins.textContent = woMins;
        if (el.woXpe) el.woXpe.textContent = woXP;
        if (el.woSub) el.woSub.textContent = woCount + '/' + woGoal + ' sessions goal this week';

        // Quick stats
        if (el.qsInc) el.qsInc.textContent = formatPeso(inc);
        if (el.qsExp) el.qsExp.textContent = formatPeso(exp);
        if (el.qsSav) el.qsSav.textContent = formatPeso(sav);
        if (el.qsWo) el.qsWo.textContent = woCount;

        // Bar chart
        requestAnimationFrame(drawBarChart);

        // Heatmap
        renderHeatmap();

        // Today's quests
        renderTodayQuests();

        // Recent activity
        const recent = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        if (el.dRecent) {
            if (!recent.length) {
                el.dRecent.innerHTML = `<div class="empty"><div class="empty-ico"><svg width="24" height="24" viewBox="0 0 24 24" stroke="var(--muted)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><p>No transactions yet.<br>Log your first money move!</p></div>`;
            } else {
                el.dRecent.innerHTML = recent.map(t => transactionRow(t, false)).join('');
            }
        }
    }

    // ==================== HEATMAP ====================
    function renderHeatmap() {
        if (!el.heatmap || !currentUser) return;
        const txs = currentUser.transactions || [];
        const wos = currentUser.workouts || [];
        const days = 14;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let html = '';
        let hasAny = false;
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const ds = d.toISOString().split('T')[0];
            const hasMoney = txs.some(t => t.date === ds);
            const hasFit = wos.some(w => w.date === ds);
            if (hasMoney || hasFit) hasAny = true;
            const isToday = i === 0;
            let cls = 'hm-cell';
            if (hasMoney && hasFit) cls += ' has-both';
            else if (hasMoney) cls += ' has-money';
            else if (hasFit) cls += ' has-fit';
            if (isToday) cls += ' today';
            html += `<div class="${cls}" title="${ds}">${d.getDate()}</div>`;
        }
        // If no activity at all, show a message
        if (!hasAny) {
            el.heatmap.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--muted);">No activity in the last 14 days. Log a transaction or workout to see your heatmap!</div>';
        } else {
            el.heatmap.innerHTML = html;
        }
    }

    // ==================== TODAY'S QUESTS ====================
    function renderTodayQuests() {
        if (!el.todayQuests || !currentUser) return;
        const today = new Date().toDateString();
        const dq = currentUser.dailyQ || {};
        const quests = [
            { id: 'dq_money', name: 'Log a Transaction', desc: 'Track any money move today', xp: 50, ico: 'var(--income-l)', bg: 'rgba(16,185,129,0.1)', svg: '<svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
            { id: 'dq_workout', name: 'Complete a Workout', desc: 'Log any fitness session today', xp: 75, ico: 'var(--fit-ll)', bg: 'rgba(124,58,237,0.1)', svg: '<svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/></svg>' },
            { id: 'dq_both', name: 'Balanced Day', desc: 'Log both money + fitness today', xp: 100, ico: 'var(--gold-l)', bg: 'rgba(217,119,6,0.1)', svg: '<svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' }
        ];

        el.todayQuests.innerHTML = quests.map(q => {
            const done = !!dq[q.id + '_' + today];
            return `<div class="quest-item${done ? ' done' : ''}">
                <div class="q-ico" style="background:${q.bg};color:${q.ico}">${q.svg}</div>
                <div class="q-body"><div class="q-name">${q.name}</div><div class="q-desc">${q.desc}</div></div>
                <span class="q-xp">+${q.xp} XP</span>
                <div class="q-chk${done ? ' done' : ''}" data-daily-quest="${q.id}" data-xp="${q.xp}">
                    ${done ? '<svg width="12" height="12" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                </div>
            </div>`;
        }).join('');
    }

    function claimDailyQuest(questId, xp, checkElement) {
        if (!currentUser) return;
        const today = new Date().toDateString();
        const key = questId + '_' + today;
        if (currentUser.dailyQ[key]) return;
        currentUser.dailyQ[key] = true;
        currentUser.xp = (currentUser.xp || 0) + xp;
        saveUser();
        showXP(xp);
        checkElement.classList.add('done');
        checkElement.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
        checkElement.closest('.quest-item').classList.add('done');
    }

    // ==================== TRANSACTION ROW ====================
    function transactionRow(tx, showDelete) {
        const color = TC[tx.type];
        const lightColor = TCL[tx.type];
        const icon = MSVG[tx.type];
        const sign = tx.type === 'expense' ? '-' : '+';
        const date = new Date(tx.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
        const deleteBtn = showDelete ? `<button class="tx-del" data-delete-tx="${tx.id}">${DSVG}</button>` : '';
        return `<div class="tx-c" data-tx-id="${tx.id}">
            <div class="tx-ico" style="background:${color}18; color:${color};">${icon}</div>
            <div class="tx-body"><div class="tx-nm">${tx.category}</div><div class="tx-mt">${tx.note ? tx.note + ' · ' : ''}${date}</div></div>
            <div class="tx-rt">
                <div class="tx-amt" style="color:${lightColor};">${sign}${formatPeso(tx.amount)}</div>
                <div style="display:flex; align-items:center; gap:5px; justify-content:flex-end;">
                    <span class="tx-tag" style="background:${color}14; color:${lightColor};">${tx.type}</span>${deleteBtn}
                </div>
            </div>
        </div>`;
    }

    // ==================== MONEY ====================
    function setMoneyType(type) {
        moneyType = type;
        document.querySelectorAll('.type-btn').forEach(btn => btn.removeAttribute('data-a'));
        const activeBtn = document.querySelector(`.type-btn[data-money-type="${type}"]`);
        if (activeBtn) activeBtn.setAttribute('data-a', type);
        if (el.mCat) {
            el.mCat.innerHTML = MCATS[type].map(c => `<option>${c}</option>`).join('');
        }
    }

    function doMoneyLog() {
        if (!currentUser) return;
        const amount = parseFloat(el.mAmt.value);
        if (!amount || amount <= 0) {
            el.mAmt.focus();
            return;
        }
        const category = el.mCat.value;
        const note = el.mNote.value.trim();
        const date = el.mDate.value || new Date().toISOString().split('T')[0];

        const newTx = {
            id: Date.now(),
            type: moneyType,
            amount,
            category,
            note,
            date
        };

        const txs = [...(currentUser.transactions || []), newTx];
        let xpGain = 20;
        const newBadges = [...(currentUser.badges || [])];

        const tryAddBadge = (badgeId) => {
            if (!newBadges.includes(badgeId)) {
                const badge = BADGES.find(b => b.id === badgeId);
                if (badge) {
                    newBadges.push(badgeId);
                    xpGain += badge.xp;
                    showBadgeToast(badge);
                }
            }
        };

        if (txs.length === 1) tryAddBadge('first_money');
        if (txs.length >= 50) tryAddBadge('budget_king');
        if (moneyType === 'investment') tryAddBadge('investor');
        if (txs.filter(t => t.type === 'income').length >= 3) tryAddBadge('hustler');
        if (txs.filter(t => t.type === 'saving').reduce((s, t) => s + t.amount, 0) >= 1000) tryAddBadge('saver');

        // Balanced badge check
        const todayWorkouts = (currentUser.workouts || []).filter(w => w.date === date);
        if (todayWorkouts.length > 0) tryAddBadge('balanced');

        // Streak
        const todayStr = new Date().toDateString();
        const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
        let streak = currentUser.streak || 0;
        if (currentUser.lastLog !== todayStr) {
            streak = currentUser.lastLog === yesterdayStr ? streak + 1 : 1;
            if (streak >= 7) tryAddBadge('week_streak');
        }

        if (getLevel((currentUser.xp || 0) + xpGain) >= 10) tryAddBadge('legend');

        currentUser = {
            ...currentUser,
            transactions: txs,
            xp: (currentUser.xp || 0) + xpGain,
            badges: newBadges,
            streak,
            lastLog: todayStr
        };
        saveUser();

        showXP(xpGain);
        el.mAmt.value = '';
        el.mNote.value = '';
        if (el.mSuc) {
            el.mSuc.classList.add('show');
            setTimeout(() => el.mSuc.classList.remove('show'), 2600);
        }
        renderMoney();
        renderDashboard();
    }

    function deleteTransaction(txId) {
        if (!currentUser) return;
        currentUser.transactions = (currentUser.transactions || []).filter(t => t.id !== txId);
        saveUser();
        renderMoney();
        renderDashboard();
    }

    function setMoneyFilter(filter, btnElement) {
        moneyFilter = filter;
        document.querySelectorAll('#p-money .sh button').forEach(b => b.style.color = 'var(--muted)');
        if (btnElement) btnElement.style.color = 'var(--white)';
        renderMoney();
    }

    function renderMoney() {
        if (!currentUser) return;
        const txs = currentUser.transactions || [];
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const monthTxs = txs.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });

        if (el.msInc) el.msInc.textContent = formatPeso(sumByType(monthTxs, 'income'));
        if (el.msExp) el.msExp.textContent = formatPeso(sumByType(monthTxs, 'expense'));
        if (el.msSav) el.msSav.textContent = formatPeso(sumByType(txs, 'saving'));
        if (el.msInv) el.msInv.textContent = formatPeso(sumByType(txs, 'investment'));

        let filtered = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (moneyFilter !== 'all') filtered = filtered.filter(t => t.type === moneyFilter);

        if (!el.mHist) return;
        if (!filtered.length) {
            el.mHist.innerHTML = `<div class="empty"><div class="empty-ico"><svg width="22" height="22" viewBox="0 0 24 24" stroke="var(--muted)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><p>No transactions yet.</p></div>`;
        } else {
            el.mHist.innerHTML = filtered.map(t => transactionRow(t, true)).join('');
        }
    }

    // ==================== FITNESS ====================
    const FITNESS_TYPES = ['strength', 'cardio', 'hiit', 'flexibility', 'sports'];

    function setFitnessType(type) {
        fitnessType = type;
        document.querySelectorAll('.ft-btn').forEach(btn => btn.removeAttribute('data-a'));
        const activeBtn = document.querySelector(`.ft-btn[data-fitness-type="${type}"]`);
        if (activeBtn) activeBtn.setAttribute('data-a', type);
        if (el.strengthFields) {
            el.strengthFields.style.display = (type === 'strength' || type === 'hiit') ? 'grid' : 'none';
        }
    }

    function doFitnessLog() {
        if (!currentUser) return;
        const name = el.fName.value.trim() || fitnessType + ' session';
        const duration = parseInt(el.fDur.value) || 0;
        if (!duration) {
            el.fDur.focus();
            return;
        }
        const sets = parseInt(el.fSets.value) || 0;
        const reps = parseInt(el.fReps.value) || 0;
        const weight = parseFloat(el.fWeight.value) || 0;
        const date = el.fDate.value || new Date().toISOString().split('T')[0];
        const note = el.fNote.value.trim();

        const newWorkout = {
            id: Date.now(),
            type: fitnessType,
            name,
            duration,
            sets,
            reps,
            weight,
            note,
            date
        };

        const wos = [...(currentUser.workouts || []), newWorkout];
        let xpGain = 30;
        const newBadges = [...(currentUser.badges || [])];

        const tryAddBadge = (badgeId) => {
            if (!newBadges.includes(badgeId)) {
                const badge = BADGES.find(b => b.id === badgeId);
                if (badge) {
                    newBadges.push(badgeId);
                    xpGain += badge.xp;
                    showBadgeToast(badge);
                }
            }
        };

        if (wos.length === 1) tryAddBadge('first_workout');
        if (wos.length >= 10) tryAddBadge('iron_will');
        if (wos.length >= 30) tryAddBadge('gym_rat');
        if (wos.filter(w => w.type === 'cardio').length >= 5) tryAddBadge('cardio_king');

        const todayTxs = (currentUser.transactions || []).filter(t => t.date === date);
        if (todayTxs.length > 0) tryAddBadge('balanced');

        const todayStr = new Date().toDateString();
        const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
        let streak = currentUser.streak || 0;
        if (currentUser.lastLog !== todayStr) {
            streak = currentUser.lastLog === yesterdayStr ? streak + 1 : 1;
            if (streak >= 7) tryAddBadge('week_streak');
        }

        if (getLevel((currentUser.xp || 0) + xpGain) >= 10) tryAddBadge('legend');

        currentUser = {
            ...currentUser,
            workouts: wos,
            xp: (currentUser.xp || 0) + xpGain,
            badges: newBadges,
            streak,
            lastLog: todayStr
        };
        saveUser();

        showXP(xpGain);
        el.fName.value = '';
        el.fDur.value = '';
        el.fSets.value = '';
        el.fReps.value = '';
        el.fWeight.value = '';
        el.fNote.value = '';
        if (el.fSuc) {
            el.fSuc.classList.add('show');
            setTimeout(() => el.fSuc.classList.remove('show'), 2600);
        }
        renderFitness();
        renderDashboard();
    }

    function deleteWorkout(woId) {
        if (!currentUser) return;
        currentUser.workouts = (currentUser.workouts || []).filter(w => w.id !== woId);
        saveUser();
        renderFitness();
        renderDashboard();
    }

    function renderFitness() {
        if (!currentUser) return;
        const weekWos = thisWeekWorkouts();
        const allWos = currentUser.workouts || [];

        if (el.fwSess) el.fwSess.textContent = weekWos.length + ' session' + (weekWos.length !== 1 ? 's' : '');
        if (el.fwMins) el.fwMins.textContent = weekWos.reduce((s, w) => s + (w.duration || 0), 0);
        if (el.fwXp) el.fwXp.textContent = weekWos.length * 30;

        const sorted = [...allWos].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (!el.fHist) return;
        if (!sorted.length) {
            el.fHist.innerHTML = `<div class="empty"><div class="empty-ico"><svg width="22" height="22" viewBox="0 0 24 24" stroke="var(--muted)" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/></svg></div><p>No workouts yet.<br>Start your first session!</p></div>`;
        } else {
            el.fHist.innerHTML = sorted.map(w => {
                const date = new Date(w.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
                const meta = [w.duration + 'min', w.sets ? w.sets + '×' + w.reps + (w.weight ? ' @ ' + w.weight + 'kg' : '') : ''].filter(Boolean).join(' · ');
                return `<div class="wo-c" data-wo-id="${w.id}">
                    <div class="wo-ico">${FSVG[w.type] || FSVG.strength}</div>
                    <div class="wo-body"><div class="wo-nm">${w.name}</div><div class="wo-mt">${w.note ? w.note + ' · ' : ''}${meta} · ${date}</div></div>
                    <div class="wo-rt"><div class="wo-dur">${w.duration}min</div><div class="wo-xp">+30 XP</div></div>
                    <button class="wo-del" data-delete-wo="${w.id}">${DSVG}</button>
                </div>`;
            }).join('');
        }
    }

    // ==================== QUESTS ====================
    function renderQuests() {
        if (!currentUser) return;
        const txs = currentUser.transactions || [];
        const wos = currentUser.workouts || [];
        const today = new Date().toDateString();
        const dq = currentUser.dailyQ || {};

        // Daily quests
        const dailyDefs = [
            { id: 'dq_money', name: 'Log a Transaction', desc: 'Track any money move today', xp: 50, bg: 'rgba(16,185,129,0.1)', color: 'var(--income-l)', svg: '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
            { id: 'dq_workout', name: 'Complete a Workout', desc: 'Log any fitness session today', xp: 75, bg: 'rgba(124,58,237,0.1)', color: 'var(--fit-ll)', svg: '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/></svg>' },
            { id: 'dq_both', name: 'Balanced Warrior', desc: 'Log both money and fitness today', xp: 100, bg: 'rgba(217,119,6,0.1)', color: 'var(--gold-l)', svg: '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
            { id: 'dq_saving', name: 'Save Something', desc: 'Log a saving transaction today', xp: 60, bg: 'rgba(6,182,212,0.1)', color: 'var(--saving-l)', svg: '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>' }
        ];

        if (el.qDaily) {
            el.qDaily.innerHTML = dailyDefs.map(q => {
                const done = !!dq[q.id + '_' + today];
                return `<div class="quest-item${done ? ' done' : ''}">
                    <div class="q-ico" style="background:${q.bg}; color:${q.color};">${q.svg}</div>
                    <div class="q-body"><div class="q-name">${q.name}</div><div class="q-desc">${q.desc}</div></div>
                    <span class="q-xp">+${q.xp} XP</span>
                    <div class="q-chk${done ? ' done' : ''}" data-daily-quest="${q.id}" data-xp="${q.xp}">
                        ${done ? '<svg width="12" height="12" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                    </div>
                </div>`;
            }).join('');
        }

        // Milestone quests
        const milestones = [
            { id: 'ms_5tx', name: 'First 5 Logs', desc: 'Log 5 money transactions', xp: 80, cur: txs.length, goal: 5, bg: 'rgba(16,185,129,0.1)', color: 'var(--income-l)' },
            { id: 'ms_10tx', name: 'Money Momentum', desc: 'Log 10 money transactions', xp: 150, cur: txs.length, goal: 10, bg: 'rgba(16,185,129,0.1)', color: 'var(--income-l)' },
            { id: 'ms_50tx', name: 'Budget King', desc: 'Log 50 money transactions', xp: 500, cur: txs.length, goal: 50, bg: 'rgba(217,119,6,0.1)', color: 'var(--gold-l)' },
            { id: 'ms_5wo', name: '5 Workouts', desc: 'Complete 5 fitness sessions', xp: 100, cur: wos.length, goal: 5, bg: 'rgba(124,58,237,0.1)', color: 'var(--fit-ll)' },
            { id: 'ms_20wo', name: 'Fitness Fanatic', desc: 'Complete 20 workouts', xp: 300, cur: wos.length, goal: 20, bg: 'rgba(124,58,237,0.1)', color: 'var(--fit-ll)' },
            { id: 'ms_7str', name: 'Week Warrior', desc: 'Maintain a 7-day streak', xp: 200, cur: currentUser.streak || 0, goal: 7, bg: 'rgba(252,211,77,0.08)', color: 'var(--gold-ll)' },
            { id: 'ms_30str', name: 'Unstoppable', desc: 'Maintain a 30-day streak', xp: 1000, cur: currentUser.streak || 0, goal: 30, bg: 'rgba(252,211,77,0.08)', color: 'var(--gold-ll)' },
            { id: 'ms_1000sav', name: 'Savings Rookie', desc: 'Save a total of ₱1,000', xp: 150, cur: sumByType(txs, 'saving'), goal: 1000, bg: 'rgba(6,182,212,0.1)', color: 'var(--saving-l)' }
        ];

        const claimedMs = currentUser.claimedMs || {};
        if (el.qMilestones) {
            el.qMilestones.innerHTML = milestones.map(ms => {
                const percent = Math.min(Math.round((ms.cur / ms.goal) * 100), 100);
                const completed = percent >= 100;
                const claimed = !!claimedMs[ms.id];
                return `<div class="mq${claimed ? ' done-mq' : ''}">
                    <div class="mq-top">
                        <div class="mq-ico" style="background:${ms.bg}; color:${ms.color};"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                        <div class="mq-info"><div class="mq-name">${ms.name}</div><div class="mq-desc">${ms.desc}</div></div>
                        <span class="mq-xp">+${ms.xp} XP</span>
                    </div>
                    <div class="mq-prog"><div class="mq-fill" style="width:${percent}%;"></div></div>
                    <div class="mq-meta">
                        <span class="mq-status">${ms.cur.toLocaleString()} / ${ms.goal.toLocaleString()} (${percent}%)</span>
                        ${completed && !claimed ? `<button class="mq-claim" data-milestone="${ms.id}" data-xp="${ms.xp}">Claim +${ms.xp} XP</button>` : ''}
                        ${claimed ? `<button class="mq-claimed">Claimed ✓</button>` : ''}
                    </div>
                </div>`;
            }).join('');
        }

        // Badges
        if (el.qBadges) {
            el.qBadges.innerHTML = BADGES.map(b => {
                const owned = (currentUser.badges || []).includes(b.id);
                return `<div class="bdg-card${owned ? ' unlocked' : ' locked'}">
                    <div class="bdg-ico${owned ? ' u' : ' l'}">${b.svg}</div>
                    <div class="bdg-nm">${b.n}</div>
                    <div class="bdg-xp">+${b.xp} XP</div>
                </div>`;
            }).join('');
        }
    }

    function claimMilestone(id, xp, btn) {
        if (!currentUser) return;
        if (!currentUser.claimedMs) currentUser.claimedMs = {};
        if (currentUser.claimedMs[id]) return;
        currentUser.claimedMs[id] = true;
        currentUser.xp = (currentUser.xp || 0) + xp;
        saveUser();
        showXP(xp);
        btn.className = 'mq-claimed';
        btn.textContent = 'Claimed ✓';
    }

    // ==================== PROFILE ====================
    function renderProfile() {
        if (!currentUser) return;
        const level = getLevel(currentUser.xp);
        const disc = calculateDisciplineScore();

        if (el.pfAv) el.pfAv.textContent = currentUser.name.charAt(0).toUpperCase();
        if (el.pfName) el.pfName.textContent = currentUser.name;
        if (el.pfEmail) el.pfEmail.textContent = currentUser.email;
        if (el.pfLv) el.pfLv.textContent = 'Level ' + level + ' ' + getRank(level);
        if (el.pfXp) el.pfXp.textContent = currentUser.xp;
        if (el.pfStreak) el.pfStreak.textContent = currentUser.streak || 0;
        if (el.pfDisc) el.pfDisc.textContent = disc;
        if (el.pfTxs) el.pfTxs.textContent = (currentUser.transactions || []).length;
        if (el.pfWos) el.pfWos.textContent = (currentUser.workouts || []).length;
        if (el.pfBdgc) el.pfBdgc.textContent = (currentUser.badges || []).length;
        if (el.pfSince) {
            el.pfSince.textContent = new Date(currentUser.createdAt).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
        }
    }

    // ==================== XP FLOAT ====================
    function showXP(amount) {
        const el = document.createElement('div');
        el.className = 'xp-float';
        el.textContent = '+' + amount + ' XP';
        el.style.left = (Math.random() * 100 + window.innerWidth / 2 - 60) + 'px';
        el.style.top = (window.innerHeight * 0.42) + 'px';
        document.getElementById('xp-root').appendChild(el);
        setTimeout(() => el.remove(), 1700);
    }

    // ==================== BADGE TOAST ====================
    let badgeToastTimer = null;
    function showBadgeToast(badge) {
        if (badgeToastTimer) clearTimeout(badgeToastTimer);
        const toast = el.badgeToast;
        if (!toast) return;
        toast.style.display = 'flex';
        toast.classList.remove('hide');
        toast.innerHTML = `<div class="bt-ico">${badge.svg}</div><div><div class="bt-tag">Badge Unlocked</div><div class="bt-name">${badge.n}</div><div class="bt-desc">${badge.d}</div></div>`;
        badgeToastTimer = setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.style.display = 'none', 320);
        }, 4000);
    }

    // ==================== PWA ====================
    function setupPWA() {
        const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="#06060f"/><rect width="512" height="512" rx="100" fill="url(#g)"/><defs><radialGradient id="g" cx="50%" cy="0%" r="100%"><stop offset="0%" stop-color="#3d1a7a"/><stop offset="100%" stop-color="#06060f"/></radialGradient></defs><polyline points="380,145 260,265 195,200 120,275" stroke="#c084fc" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/><polyline points="320,145 380,145 380,205" stroke="#fcd34d" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/><text x="256" y="420" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="68" font-weight="900" fill="#c084fc" letter-spacing="-2">StackUp</text></svg>`;
        const iconURI = 'data:image/svg+xml;base64,' + btoa(iconSVG);
        const manifest = {
            name: 'StackUp — Discipline App',
            short_name: 'StackUp',
            description: 'Money. Fitness. Discipline.',
            start_url: './',
            display: 'standalone',
            orientation: 'portrait-primary',
            background_color: '#06060f',
            theme_color: '#06060f',
            icons: [{ src: iconURI, sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }]
        };
        const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = URL.createObjectURL(manifestBlob);
        document.head.appendChild(manifestLink);

        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/svg+xml';
        favicon.href = iconURI;
        document.head.appendChild(favicon);

        if ('serviceWorker' in navigator) {
            const swCode = `const C='su-v5';self.addEventListener('install',e=>{self.skipWaiting();});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res&&res.status===200){const c=res.clone();caches.open(C).then(cache=>cache.put(e.request,c));}return res;})));});`;
            navigator.serviceWorker.register(URL.createObjectURL(new Blob([swCode], { type: 'application/javascript' })), { scope: './' });
        }

        let deferredPrompt = null;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setTimeout(() => {
                if (el.pwaB) el.pwaB.style.display = 'flex';
            }, 3500);
        });

        window.triggerInstall = () => {
            if (!deferredPrompt) return;
            if (el.pwaB) {
                el.pwaB.style.opacity = '0';
                setTimeout(() => el.pwaB.style.display = 'none', 300);
            }
            deferredPrompt.prompt();
            deferredPrompt = null;
        };

        window.dismissPWA = () => {
            if (el.pwaB) {
                el.pwaB.style.opacity = '0';
                setTimeout(() => el.pwaB.style.display = 'none', 300);
            }
        };
    }

    // ==================== INITIALIZATION ====================
    function initDOMReferences() {
        // Auth
        el.auth = document.getElementById('auth');
        el.app = document.getElementById('app');
        el.authName = document.getElementById('auth-name');
        el.authEmail = document.getElementById('auth-email');
        el.authPassword = document.getElementById('auth-password');
        el.authError = document.getElementById('auth-error');
        el.authAction = document.getElementById('auth-action');
        el.fnField = document.getElementById('fn-field');

        // Top bar / sidebar
        el.mLv = document.getElementById('m-lv');
        el.mLvT = document.getElementById('m-lv-t');
        el.mXp = document.getElementById('m-xp');
        el.sbLv = document.getElementById('sb-lv');
        el.sbLvN = document.getElementById('sb-lv-n');
        el.sbXp = document.getElementById('sb-xp');
        el.sbDisc = document.getElementById('sb-disc');
        el.sbFill = document.getElementById('sb-fill');

        // Month strip
        el.monthStrip = document.getElementById('month-strip');
        el.deskMon = document.getElementById('desk-mon');

        // Dashboard
        el.dName = document.getElementById('d-name');
        el.dRank = document.getElementById('d-rank');
        el.dDisc = document.getElementById('d-disc');
        el.dLvT = document.getElementById('d-lv-t');
        el.dXpT = document.getElementById('d-xp-t');
        el.dXpBar = document.getElementById('d-xp-bar');
        el.discArc = document.getElementById('disc-arc');
        el.dNet = document.getElementById('d-net');
        el.mbNet = document.getElementById('mb-net');
        el.dWoc = document.getElementById('d-woc');
        el.mbWo = document.getElementById('mb-wo');
        el.dStr = document.getElementById('d-str');
        el.mbStr = document.getElementById('mb-str');
        el.mrPct = document.getElementById('mr-pct');
        el.ratioSub = document.getElementById('ratio-sub');
        el.woPct = document.getElementById('wo-pct');
        el.woSess = document.getElementById('wo-sess');
        el.woMins = document.getElementById('wo-mins');
        el.woXpe = document.getElementById('wo-xpe');
        el.woSub = document.getElementById('wo-sub');
        el.qsInc = document.getElementById('qs-inc');
        el.qsExp = document.getElementById('qs-exp');
        el.qsSav = document.getElementById('qs-sav');
        el.qsWo = document.getElementById('qs-wo');
        el.barChart = document.getElementById('bar-chart');
        el.chartSub = document.getElementById('chart-sub');
        el.heatmap = document.getElementById('heatmap');
        el.todayQuests = document.getElementById('today-quests');
        el.dRecent = document.getElementById('d-recent');

        // Money
        el.mAmt = document.getElementById('m-amt');
        el.mCat = document.getElementById('m-cat');
        el.mNote = document.getElementById('m-note');
        el.mDate = document.getElementById('m-date');
        el.mSuc = document.getElementById('m-suc');
        el.msInc = document.getElementById('ms-inc');
        el.msExp = document.getElementById('ms-exp');
        el.msSav = document.getElementById('ms-sav');
        el.msInv = document.getElementById('ms-inv');
        el.mHist = document.getElementById('m-hist');
        el.moneyLogBtn = document.getElementById('money-log-btn');

        // Fitness
        el.fName = document.getElementById('f-name');
        el.fDur = document.getElementById('f-dur');
        el.fSets = document.getElementById('f-sets');
        el.fReps = document.getElementById('f-reps');
        el.fWeight = document.getElementById('f-weight');
        el.fDate = document.getElementById('f-date');
        el.fNote = document.getElementById('f-note');
        el.fSuc = document.getElementById('f-suc');
        el.strengthFields = document.getElementById('strength-fields');
        el.fwSess = document.getElementById('fw-sess');
        el.fwMins = document.getElementById('fw-mins');
        el.fwXp = document.getElementById('fw-xp');
        el.fHist = document.getElementById('f-hist');
        el.fitnessLogBtn = document.getElementById('fitness-log-btn');

        // Quests
        el.qDaily = document.getElementById('q-daily');
        el.qMilestones = document.getElementById('q-milestones');
        el.qBadges = document.getElementById('q-badges');

        // Profile
        el.pfAv = document.getElementById('pf-av');
        el.pfName = document.getElementById('pf-name');
        el.pfEmail = document.getElementById('pf-email');
        el.pfLv = document.getElementById('pf-lv');
        el.pfXp = document.getElementById('pf-xp');
        el.pfStreak = document.getElementById('pf-streak');
        el.pfDisc = document.getElementById('pf-disc');
        el.pfTxs = document.getElementById('pf-txs');
        el.pfWos = document.getElementById('pf-wos');
        el.pfBdgc = document.getElementById('pf-bdgc');
        el.pfSince = document.getElementById('pf-since');
        el.logoutBtn = document.getElementById('logout-btn');

        // Misc
        el.badgeToast = document.getElementById('badge-toast');
        el.pwaB = document.getElementById('pwa-b');
        el.pwaInstallBtn = document.getElementById('pwa-install-btn');
        el.pwaDismissBtn = document.getElementById('pwa-dismiss-btn');
    }

    function bindEvents() {
        // Auth tabs
        document.querySelectorAll('.a-tab').forEach(btn => {
            btn.addEventListener('click', () => switchAuthMode(btn.dataset.authMode));
        });

        // Auth action
        if (el.authAction) el.authAction.addEventListener('click', doAuth);

        // Auth enter key
        el.authPassword.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doAuth();
        });

        // Navigation: sidebar & bottom nav
        document.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', () => navigateTo(btn.dataset.page));
        });

        // Month strip (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mon-btn') && e.target.dataset.month !== undefined) {
                selectMonth(parseInt(e.target.dataset.month));
            }
        });

        // Money type selection
        document.querySelectorAll('[data-money-type]').forEach(btn => {
            btn.addEventListener('click', () => setMoneyType(btn.dataset.moneyType));
        });

        // Money log button
        if (el.moneyLogBtn) el.moneyLogBtn.addEventListener('click', doMoneyLog);

        // Money filter
        document.querySelectorAll('.money-filter').forEach(btn => {
            btn.addEventListener('click', () => setMoneyFilter(btn.dataset.filter, btn));
        });

        // Fitness type selection
        document.querySelectorAll('[data-fitness-type]').forEach(btn => {
            btn.addEventListener('click', () => setFitnessType(btn.dataset.fitnessType));
        });

        // Fitness log button
        if (el.fitnessLogBtn) el.fitnessLogBtn.addEventListener('click', doFitnessLog);

        // Logout
        if (el.logoutBtn) el.logoutBtn.addEventListener('click', logout);

        // Event delegation for delete buttons and quest claims
        document.addEventListener('click', (e) => {
            // Delete transaction
            if (e.target.closest('[data-delete-tx]')) {
                const btn = e.target.closest('[data-delete-tx]');
                const txId = parseInt(btn.dataset.deleteTx);
                deleteTransaction(txId);
            }
            // Delete workout
            if (e.target.closest('[data-delete-wo]')) {
                const btn = e.target.closest('[data-delete-wo]');
                const woId = parseInt(btn.dataset.deleteWo);
                deleteWorkout(woId);
            }
            // Daily quest claim
            if (e.target.closest('[data-daily-quest]')) {
                const chk = e.target.closest('[data-daily-quest]');
                if (chk.classList.contains('done')) return;
                const questId = chk.dataset.dailyQuest;
                const xp = parseInt(chk.dataset.xp);
                claimDailyQuest(questId, xp, chk);
            }
            // Milestone claim
            if (e.target.closest('[data-milestone]')) {
                const btn = e.target.closest('[data-milestone]');
                const id = btn.dataset.milestone;
                const xp = parseInt(btn.dataset.xp);
                claimMilestone(id, xp, btn);
            }
        });

        // PWA install/dismiss
        if (el.pwaInstallBtn) el.pwaInstallBtn.addEventListener('click', window.triggerInstall);
        if (el.pwaDismissBtn) el.pwaDismissBtn.addEventListener('click', window.dismissPWA);
    }

    // Auto-login if session exists
    function autoLogin() {
        const sessEmail = localStorage.getItem('su_sess');
        if (sessEmail) {
            const users = getAllUsers();
            if (users[sessEmail]) {
                loginUser(users[sessEmail]);
            }
        }
    }

    // Main init
    document.addEventListener('DOMContentLoaded', () => {
        initDOMReferences();
        bindEvents();
        setupPWA();
        autoLogin();
    });
})();
