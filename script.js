// Sample data - you can expand this with real Twitter accounts
const twitterAccounts = [
    {
        id: 1,
        name: "Elon Musk",
        handle: "elonmusk",
        category: "business",
        bio: "Technoking of Tesla, CEO of SpaceX, and owner of X. Pushing the boundaries of technology and humanity.",
        avatar: "EM"
    },
    {
        id: 2,
        name: "Sam Altman",
        handle: "sama",
        category: "tech",
        bio: "CEO of OpenAI. Working towards ensuring that artificial general intelligence benefits all of humanity.",
        avatar: "SA"
    },
    {
        id: 3,
        name: "Naval Ravikant",
        handle: "naval",
        category: "business",
        bio: "Founder of AngelList. Sharing wisdom about wealth, happiness, and philosophy.",
        avatar: "NR"
    },
    {
        id: 4,
        name: "Dr. Katie Bouman",
        handle: "katiebouman",
        category: "science",
        bio: "Assistant professor and researcher working on computational imaging. Helped capture the first image of a black hole.",
        avatar: "KB"
    },
    {
        id: 5,
        name: "Casey Neistat",
        handle: "CaseyNeistat",
        category: "creators",
        bio: "YouTuber, filmmaker, and co-founder of Beme. Master storyteller and creative visionary.",
        avatar: "CN"
    },
    {
        id: 6,
        name: "Andrej Karpathy",
        handle: "karpathy",
        category: "tech",
        bio: "Former Director of AI at Tesla. Deep learning researcher and educator. Making AI accessible to everyone.",
        avatar: "AK"
    }
];

// DOM elements
const accountsGrid = document.getElementById('accountsGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');

let currentCategory = 'all';
let currentSearch = '';

// Initialize the page
function init() {
    displayAccounts(twitterAccounts);
    setupEventListeners();
}

// Display accounts in the grid
function displayAccounts(accounts) {
    accountsGrid.innerHTML = '';
    
    accounts.forEach(account => {
        const accountCard = document.createElement('div');
        accountCard.className = 'account-card';
        
        accountCard.innerHTML = `
            <div class="account-header">
                <div class="avatar">${account.avatar}</div>
                <div class="account-info">
                    <h3>${account.name}</h3>
                    <a href="https://twitter.com/${account.handle}" target="_blank" class="handle">@${account.handle}</a>
                </div>
            </div>
            <span class="category-tag">${account.category}</span>
            <p class="bio">${account.bio}</p>
            <button class="follow-btn" onclick="window.open('https://twitter.com/${account.handle}', '_blank')">
                Follow on X
            </button>
        `;
        
        accountsGrid.appendChild(accountCard);
    });
}

// Filter accounts based on category and search
function filterAccounts() {
    let filtered = twitterAccounts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(account => account.category === currentCategory);
    }
    
    // Filter by search term
    if (currentSearch) {
        const searchTerm = currentSearch.toLowerCase();
        filtered = filtered.filter(account => 
            account.name.toLowerCase().includes(searchTerm) ||
            account.handle.toLowerCase().includes(searchTerm) ||
            account.bio.toLowerCase().includes(searchTerm) ||
            account.category.toLowerCase().includes(searchTerm)
        );
    }
    
    displayAccounts(filtered);
}

// Set up event listeners
function setupEventListeners() {
    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            filterAccounts();
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterAccounts();
    });
}

// Initialize the application
init();
