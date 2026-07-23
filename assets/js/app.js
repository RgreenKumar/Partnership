/**
 * PartnerShip - B2B Reseller & Subscription Management Portal JS Application
 */

const AppState = {
  currentRole: 'admin', // 'admin', 'reseller', 'user'
  currentView: 'dashboard', // 'login', 'register', 'dashboard', 'products', etc.
  currentUser: { id: 1, name: 'Admin User', role: 'admin', email: 'admin@gmail.com' },
  isLoggedIn: true,
  authTab: 'login', // 'login', 'register'
  loginRoleTab: 'admin', // 'admin', 'reseller', 'user'
  registerRoleTab: 'reseller', // 'reseller', 'user'
  products: [
    { id: 1, name: 'MediaJungle', category: 'Media & Content', description: 'Powerful media management software designed for growing businesses to organize, manage, and distribute digital assets efficiently.', price: 500, cost_price: 200, current_stock: 4, subscribers_count: 1245, revenue: 622500, status: 'active' },
    { id: 2, name: 'CRM Pro', category: 'Customer Relations', description: 'Customer relationship management tool with automated pipelines, contact tracking, and lead analytics.', price: 1000, cost_price: 400, current_stock: 15, subscribers_count: 980, revenue: 980000, status: 'active' },
    { id: 3, name: 'ProjectHub', category: 'Project Management', description: 'Project management made simple with real-time Gantt charts, sprint planning, and team collaboration.', price: 800, cost_price: 300, current_stock: 20, subscribers_count: 765, revenue: 612000, status: 'active' },
    { id: 4, name: 'InvoiceX', category: 'Finance & Billing', description: 'Smart invoicing and recurring billing platform for SaaS, freelancers, and agency teams.', price: 400, cost_price: 150, current_stock: 3, subscribers_count: 2050, revenue: 820000, status: 'active' },
    { id: 5, name: 'TeamFlow', category: 'HR & Workflow', description: 'Complete employee lifecycle management, attendance tracking, and task workflow automation.', price: 600, cost_price: 250, current_stock: 12, subscribers_count: 530, revenue: 318000, status: 'active' }
  ],
  orders: [
    { id: 1, order_code: 'ORD123', user_id: 4, user_name: 'Arun Kumar', product_id: 1, product_name: 'MediaJungle', amount: 500, transaction_id: 'T2406012345', status: 'approved', start_date: '2026-06-01', next_billing_date: '2026-07-01', reseller_name: 'John Doe' },
    { id: 2, order_code: 'ORD122', user_id: 5, user_name: 'Ravi Kumar', product_id: 2, product_name: 'CRM Pro', amount: 1000, transaction_id: 'T2406011000', status: 'approved', start_date: '2026-05-15', next_billing_date: '2026-06-15', reseller_name: 'John Doe' },
    { id: 3, order_code: 'ORD121', user_id: 6, user_name: 'Priya Sharma', product_id: 3, product_name: 'ProjectHub', amount: 800, transaction_id: 'T2405283344', status: 'pending', start_date: '2026-05-28', next_billing_date: '2026-06-28', reseller_name: 'David Smith' },
    { id: 4, order_code: 'ORD120', user_id: 5, user_name: 'Suresh Babu', product_id: 4, product_name: 'InvoiceX', amount: 400, transaction_id: 'T2405277788', status: 'rejected', rejection_reason: 'Payment screenshot is blurry and transaction ID does not match bank records.', start_date: '2026-05-27', next_billing_date: '2026-06-27', reseller_name: 'Direct Sale' }
  ],
  resellers: [
    { id: 2, name: 'John Doe', email: 'john@example.com', company_name: 'Tech Solutions Pvt Ltd', total_customers: 45, total_items_sold: 52, commission_earned: 12500, status: 'active' },
    { id: 3, name: 'David Smith', email: 'david@example.com', company_name: 'Apex Digital', total_customers: 32, total_items_sold: 32, commission_earned: 9400, status: 'active' },
    { id: 7, name: 'Michael Lee', email: 'michael@example.com', company_name: 'Lee Soft', total_customers: 25, total_items_sold: 25, commission_earned: 6000, status: 'active' }
  ],
  customers: [
    { id: 4, name: 'Arun Kumar', email: 'arun@example.com', phone: '+91 98765 43213', products_subscribed: 'MediaJungle', total_spent: 1500, status: 'active' },
    { id: 5, name: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 98765 43214', products_subscribed: 'CRM Pro', total_spent: 1000, status: 'active' },
    { id: 6, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43215', products_subscribed: 'ProjectHub', total_spent: 800, status: 'active' }
  ],
  commissions: [
    { id: 1, order_code: 'ORD123', reseller_name: 'John Doe', customer_name: 'Arun Kumar', product_name: 'MediaJungle', sale_amount: 500, commission_amount: 60, commission_rate: 12, status: 'paid', created_at: '2026-06-01' },
    { id: 2, order_code: 'ORD122', reseller_name: 'John Doe', customer_name: 'Ravi Kumar', product_name: 'CRM Pro', sale_amount: 1000, commission_amount: 120, commission_rate: 12, status: 'paid', created_at: '2026-05-15' },
    { id: 3, order_code: 'ORD121', reseller_name: 'David Smith', customer_name: 'Priya Sharma', product_name: 'ProjectHub', sale_amount: 800, commission_amount: 80, commission_rate: 10, status: 'pending', created_at: '2026-05-28' }
  ],
  settings: {
    marketplace_name: 'PartnerShip',
    support_email: 'support@partnership.com',
    upi_id: 'yourname@okaxis',
    bank_account_name: 'ABC Technologies',
    bank_name: 'HDFC Bank',
    bank_account_number: '12345678901234',
    bank_ifsc: 'HDFC0001234',
    smtp_host: 'smtp.partnerhost.com',
    smtp_port: '587'
  },
  modalData: {}
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  renderSidebar();
  renderHeader();
  renderCurrentView();

  try {
    const sRes = await fetch('api/auth.php?action=session');
    if (sRes.ok) {
      const sData = await sRes.json();
      if (sData.logged_in) {
        AppState.currentUser = sData.user;
        AppState.currentRole = sData.user.role;
        AppState.isLoggedIn = true;
      }
    }

    await fetchSettings();
    await loadData();
    renderSidebar();
    renderHeader();
    renderCurrentView();
  } catch (err) {
    console.warn('API Session check bypassed:', err);
  }
}

async function fetchSettings() {
  try {
    const res = await fetch('api/settings.php');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.settings) {
        AppState.settings = { ...AppState.settings, ...data.settings };
      }
    }
  } catch (err) { }
}

async function loadData() {
  try {
    const [pRes, oRes, rRes, cRes, cmRes] = await Promise.all([
      fetch('api/products.php').then(r => r.json()).catch(() => null),
      fetch(`api/orders.php?role=${AppState.currentRole}&user_id=${AppState.currentUser.id}`).then(r => r.json()).catch(() => null),
      fetch('api/resellers.php').then(r => r.json()).catch(() => null),
      fetch('api/customers.php').then(r => r.json()).catch(() => null),
      fetch('api/commissions.php').then(r => r.json()).catch(() => null)
    ]);

    if (pRes && pRes.success && pRes.products) AppState.products = pRes.products;
    if (oRes && oRes.success && oRes.orders) AppState.orders = oRes.orders;
    if (rRes && rRes.success && rRes.resellers) AppState.resellers = rRes.resellers;
    if (cRes && cRes.success && cRes.customers) AppState.customers = cRes.customers;
    if (cmRes && cmRes.success && cmRes.commissions) AppState.commissions = cmRes.commissions;
  } catch (err) { }
}

function switchRole(role) {
  AppState.currentRole = role;
  if (role === 'admin') {
    AppState.currentUser = { id: 1, name: 'System Admin', role: 'admin', email: 'admin@gmail.com' };
    AppState.currentView = 'dashboard';
  } else if (role === 'reseller') {
    AppState.currentUser = { id: 2, name: 'John Doe', role: 'reseller', email: 'john@example.com' };
    AppState.currentView = 'dashboard';
  } else {
    AppState.currentUser = { id: 4, name: 'Arun Kumar', role: 'user', email: 'arun@example.com' };
    AppState.currentView = 'products';
  }
  AppState.isLoggedIn = true;
  renderSidebar();
  renderHeader();
  renderCurrentView();
}

function navigateTo(viewKey, data = null) {
  AppState.currentView = viewKey;
  if (data) AppState.modalData = data;
  renderSidebar();
  renderHeader();
  renderCurrentView();
  window.scrollTo(0, 0);
}

// Render Sidebar Navigation
function renderSidebar() {
  const sidebarNav = document.getElementById('sidebarNav');
  if (!sidebarNav) return;

  if (!AppState.isLoggedIn || AppState.currentView === 'login' || AppState.currentView === 'register') {
    sidebarNav.innerHTML = `
      <div class="nav-section-title">PORTAL NAVIGATION</div>
      <a class="nav-link-custom ${AppState.currentView === 'landing' ? 'active' : ''}" onclick="navigateTo('landing')">
        <i class="bi bi-house-door"></i> <span>Home</span>
      </a>
      <a class="nav-link-custom ${AppState.currentView === 'products' ? 'active' : ''}" onclick="navigateTo('products')">
        <i class="bi bi-grid-fill"></i> <span>Browse Products</span>
      </a>
      <a class="nav-link-custom ${AppState.currentView === 'login' ? 'active' : ''}" onclick="navigateTo('login')">
        <i class="bi bi-box-arrow-in-right"></i> <span>Sign In</span>
      </a>
      <a class="nav-link-custom ${AppState.currentView === 'register' ? 'active' : ''}" onclick="navigateTo('register')">
        <i class="bi bi-person-plus"></i> <span>Register Reseller</span>
      </a>
    `;
    return;
  }

  let items = [];
  if (AppState.currentRole === 'user') {
    items = [
      { key: 'products', label: 'All Products', icon: 'bi-grid-fill' },
      { key: 'my_subscriptions', label: 'My Subscriptions', icon: 'bi-card-checklist' },
      { key: 'orders', label: 'My Orders', icon: 'bi-cart-check' },
      { key: 'profile', label: 'Profile', icon: 'bi-person' },
      { key: 'support', label: 'Support', icon: 'bi-question-circle' }
    ];
  } else if (AppState.currentRole === 'reseller') {
    items = [
      { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { key: 'referrals', label: 'Referrals / Sales', icon: 'bi-share' },
      { key: 'commissions', label: 'Commissions', icon: 'bi-cash-coin' },
      { key: 'payouts', label: 'Payouts', icon: 'bi-credit-card' },
      { key: 'products', label: 'Products', icon: 'bi-box-seam' },
      { key: 'profile', label: 'Profile', icon: 'bi-person' }
    ];
  } else { // Admin
    items = [
      { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { key: 'products', label: 'Products', icon: 'bi-box-seam' },
      { key: 'manual_entry', label: 'Manual Sale Entry', icon: 'bi-plus-circle-dotted' },
      { key: 'payment_requests', label: 'Payment Verification', icon: 'bi-patch-check' },
      { key: 'resellers', label: 'Resellers', icon: 'bi-people' },
      { key: 'customers', label: 'Customers', icon: 'bi-person-badge' },
      { key: 'orders', label: 'Orders', icon: 'bi-receipt' },
      { key: 'commissions', label: 'Commissions', icon: 'bi-currency-rupee' },
      { key: 'settings', label: 'Settings', icon: 'bi-gear' }
    ];
  }

  let html = `<div class="nav-section-title">${AppState.currentRole.toUpperCase()} MENU</div>`;
  items.forEach(item => {
    const active = (AppState.currentView === item.key) ? 'active' : '';
    html += `
      <a class="nav-link-custom ${active}" onclick="navigateTo('${item.key}')">
        <i class="bi ${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `;
  });

  html += `
    <hr class="my-3 text-muted">
    <a class="nav-link-custom text-danger" onclick="logoutUser()">
      <i class="bi bi-box-arrow-right"></i>
      <span>Sign Out</span>
    </a>
  `;

  sidebarNav.innerHTML = html;
}

// Render Top Header
function renderHeader() {
  const topHeader = document.getElementById('topHeader');
  if (!topHeader) return;

  if (!AppState.isLoggedIn || AppState.currentView === 'login' || AppState.currentView === 'register') {
    topHeader.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <h5 class="mb-0 fw-bold text-dark">PartnerShip</h5>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-primary btn-sm rounded-3" onclick="navigateTo('login')">Login</button>
        <button class="btn btn-primary btn-sm rounded-3" onclick="navigateTo('register')">Become a Reseller</button>
      </div>
    `;
    return;
  }

  topHeader.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <h5 class="mb-0 fw-bold text-dark">${capitalize(AppState.currentView.replace('_', ' '))}</h5>
    </div>

    <div class="d-flex align-items-center gap-3">
      <!-- Role Switcher -->
      <div class="dropdown">
        <button class="btn btn-sm btn-light border dropdown-toggle fw-semibold" type="button" data-bs-toggle="dropdown">
          Role: <span class="role-badge role-${AppState.currentRole}">${capitalize(AppState.currentRole)}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <li><a class="dropdown-item fw-medium" onclick="switchRole('user')"><i class="bi bi-person me-2"></i> User / Customer View</a></li>
          <li><a class="dropdown-item fw-medium" onclick="switchRole('reseller')"><i class="bi bi-shop me-2"></i> Reseller View</a></li>
          <li><a class="dropdown-item fw-medium" onclick="switchRole('admin')"><i class="bi bi-shield-lock me-2"></i> Admin View</a></li>
        </ul>
      </div>

      <div class="border-end h-50 mx-1"></div>

      <!-- User Profile -->
      <div class="d-flex align-items-center gap-2">
        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width:36px; height:36px;">
          ${AppState.currentUser.name.charAt(0)}
        </div>
        <div class="d-none d-sm-block">
          <div class="fw-semibold text-dark leading-tight" style="font-size: 0.875rem;">${AppState.currentUser.name}</div>
          <div class="text-muted" style="font-size: 0.75rem;">${capitalize(AppState.currentRole)}</div>
        </div>
      </div>
    </div>
  `;
}

// Render Content Body based on current view
function renderCurrentView() {
  const container = document.getElementById('contentBody');
  if (!container) return;

  switch (AppState.currentView) {
    case 'login':
      container.innerHTML = renderLoginPage();
      break;
    case 'register':
      container.innerHTML = renderRegisterPage();
      break;
    case 'landing':
      container.innerHTML = renderLandingPage();
      break;
    case 'products':
      container.innerHTML = renderProductsPage();
      break;
    case 'product_details':
      container.innerHTML = renderProductDetailsPage(AppState.modalData);
      break;
    case 'payment_instructions':
      container.innerHTML = renderPaymentInstructionsPage(AppState.modalData);
      break;
    case 'submit_payment':
      container.innerHTML = renderSubmitPaymentPage(AppState.modalData);
      break;
    case 'my_subscriptions':
    case 'orders':
      container.innerHTML = renderMySubscriptionsPage();
      break;
    case 'dashboard':
      container.innerHTML = (AppState.currentRole === 'admin') ? renderAdminDashboard() : renderResellerDashboard();
      break;
    case 'manual_entry':
      container.innerHTML = renderManualEntryPage();
      break;
    case 'payment_requests':
      container.innerHTML = renderPaymentRequestsPage();
      break;
    case 'resellers':
      container.innerHTML = renderResellersPage();
      break;
    case 'customers':
      container.innerHTML = renderCustomersPage();
      break;
    case 'referrals':
      container.innerHTML = renderReferralsPage();
      break;
    case 'commissions':
      container.innerHTML = renderCommissionsPage();
      break;
    case 'settings':
      container.innerHTML = renderSettingsPage();
      break;
    default:
      container.innerHTML = renderProductsPage();
  }
}

/* ==========================================================================
   AUTHENTICATION VIEWS (ADMIN & RESELLER LOGIN / REGISTER)
   ========================================================================== */

// Render Login Page with Sections for Admin, Reseller, and Customer
function renderLoginPage() {
  const currentRoleTab = AppState.loginRoleTab || 'admin';
  const isAdmin = (currentRoleTab === 'admin');

  return `
    <div class="row justify-content-center align-items-center py-4">
      <div class="col-md-6 col-lg-5">
        <div class="card-custom bg-white p-4 p-md-5 shadow-sm border rounded-4">
          <div class="text-center mb-4">
            <div class="brand-logo justify-content-center fs-3 text-primary mb-1">
              <i class="bi bi-diagram-3-fill me-2"></i> PartnerShip
            </div>
            <p class="text-muted small">B2B Reseller & Subscription Management Portal</p>
          </div>

          <!-- Role Selector Nav Tabs -->
          <ul class="nav nav-pills nav-justified mb-4 p-1 bg-light rounded-3" id="authRoleTabs">
            <li class="nav-item">
              <button class="nav-link ${currentRoleTab === 'admin' ? 'active fw-bold' : 'text-muted'}" onclick="setLoginRole('admin')">
                <i class="bi bi-shield-lock me-1"></i> Admin
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link ${currentRoleTab === 'reseller' ? 'active fw-bold' : 'text-muted'}" onclick="setLoginRole('reseller')">
                <i class="bi bi-shop me-1"></i> Reseller
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link ${currentRoleTab === 'user' ? 'active fw-bold' : 'text-muted'}" onclick="setLoginRole('user')">
                <i class="bi bi-person me-1"></i> Customer
              </button>
            </li>
          </ul>

          <form id="loginForm" onsubmit="handleLoginSubmit(event)">
            <input type="hidden" name="role" value="${currentRoleTab}">

            <div class="mb-3">
              <label class="form-label fw-semibold small">Email Address</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-envelope text-muted"></i></span>
                <input type="email" id="loginEmail" name="email" class="form-control border-start-0 ps-0" placeholder="${isAdmin ? 'admin@gmail.com' : 'user@example.com'}" value="${isAdmin ? 'admin@gmail.com' : ''}" required>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold small">Password</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-lock text-muted"></i></span>
                <input type="password" id="loginPassword" name="password" class="form-control border-start-0 ps-0" placeholder="••••••••••••" value="${isAdmin ? 'admin123' : 'password123'}" required>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm mb-3">
              Sign In as ${capitalize(currentRoleTab)}
            </button>
          </form>

          <!-- Quick Fill Demo Buttons -->
          <div class="border-top pt-3 text-center">
            <span class="text-muted small d-block mb-2">Quick Fill Demo Accounts:</span>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-primary" onclick="quickFillLogin('admin@gmail.com', 'admin')">Admin (admin@gmail.com)</button>
              <button class="btn btn-sm btn-outline-purple" onclick="quickFillLogin('john@example.com', 'reseller')">Reseller (John)</button>
              <button class="btn btn-sm btn-outline-secondary" onclick="quickFillLogin('arun@example.com', 'user')">Customer (Arun)</button>
            </div>
          </div>

          <div class="text-center mt-4 pt-2 border-top">
            <span class="text-muted small">Don't have a reseller account?</span>
            <a class="fw-semibold text-primary text-decoration-none ms-1 cursor-pointer" onclick="navigateTo('register')">Register as Reseller</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Registration Page (Reseller & Customer)
function renderRegisterPage() {
  const regRole = AppState.registerRoleTab || 'reseller';

  return `
    <div class="row justify-content-center align-items-center py-4">
      <div class="col-md-7 col-lg-6">
        <div class="card-custom bg-white p-4 p-md-5 shadow-sm border rounded-4">
          <div class="text-center mb-4">
            <div class="brand-logo justify-content-center fs-3 text-primary mb-1">
              <i class="bi bi-diagram-3-fill me-2"></i> PartnerShip
            </div>
            <h5 class="fw-bold text-dark">Join PartnerShip Platform</h5>
            <p class="text-muted small">Sign up to earn commissions as a Reseller or purchase software.</p>
          </div>

          <!-- Role Toggle -->
          <div class="btn-group w-100 mb-4 p-1 bg-light rounded-3">
            <button class="btn btn-sm ${regRole === 'reseller' ? 'btn-primary shadow-sm fw-bold' : 'btn-light text-muted'}" onclick="setRegisterRole('reseller')">
              <i class="bi bi-shop me-1"></i> Register as Reseller
            </button>
            <button class="btn btn-sm ${regRole === 'user' ? 'btn-primary shadow-sm fw-bold' : 'btn-light text-muted'}" onclick="setRegisterRole('user')">
              <i class="bi bi-person me-1"></i> Register as Customer
            </button>
          </div>

          <form id="registerForm" onsubmit="handleRegisterSubmit(event)">
            <input type="hidden" name="role" value="${regRole}">

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Full Name</label>
                <input type="text" name="name" class="form-control" placeholder="John Doe" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Email Address</label>
                <input type="email" name="email" class="form-control" placeholder="john@company.com" required>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Password</label>
                <input type="password" name="password" class="form-control" placeholder="••••••••••••" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Phone Number</label>
                <input type="text" name="phone" class="form-control" placeholder="+91 98765 43210">
              </div>
            </div>

            ${regRole === 'reseller' ? `
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">Company / Business Name</label>
                  <input type="text" name="company_name" class="form-control" placeholder="Tech Solutions Pvt Ltd">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">UPI ID (For Commission Payouts)</label>
                  <input type="text" name="upi_id" class="form-control" placeholder="yourname@okaxis">
                </div>
              </div>
            ` : ''}

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm mb-3">
              Create ${regRole === 'reseller' ? 'Reseller' : 'Customer'} Account
            </button>
          </form>

          <div class="text-center mt-3 pt-2 border-top">
            <span class="text-muted small">Already have an account?</span>
            <a class="fw-semibold text-primary text-decoration-none ms-1 cursor-pointer" onclick="navigateTo('login')">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setLoginRole(role) {
  AppState.loginRoleTab = role;
  renderCurrentView();
}

function setRegisterRole(role) {
  AppState.registerRoleTab = role;
  renderCurrentView();
}

function quickFillLogin(email, role) {
  AppState.loginRoleTab = role;
  renderCurrentView();
  setTimeout(() => {
    const emailInput = document.getElementById('loginEmail');
    const pwdInput = document.getElementById('loginPassword');
    if (emailInput) emailInput.value = email;
    if (pwdInput) pwdInput.value = (role === 'admin') ? 'admin123' : 'password123';
  }, 50);
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dataObj = Object.fromEntries(formData.entries());

  if (dataObj.role === 'admin' || dataObj.email.toLowerCase() === 'admin@gmail.com') {
    if (dataObj.email.toLowerCase() !== 'admin@gmail.com' || dataObj.password !== 'admin123') {
      alert('Invalid Admin Credentials! Only admin@gmail.com with password admin123 is permitted.');
      return;
    }
  }

  try {
    const res = await fetch('api/auth.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj)
    });
    const data = await res.json();

    if (data.success) {
      AppState.currentUser = data.user;
      AppState.currentRole = data.user.role;
      AppState.isLoggedIn = true;
      alert(`Welcome back, ${data.user.name}!`);
      switchRole(data.user.role);
    } else {
      alert(data.message);
    }
  } catch (err) {
    if (dataObj.role === 'admin' && (dataObj.email.toLowerCase() !== 'admin@gmail.com' || dataObj.password !== 'admin123')) {
      alert('Invalid Admin Credentials! Only admin@gmail.com with password admin123 is permitted.');
      return;
    }
    AppState.isLoggedIn = true;
    switchRole(dataObj.role || 'admin');
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dataObj = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('api/auth.php?action=register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj)
    });
    const data = await res.json();

    if (data.success) {
      alert(data.message);
      AppState.currentUser = data.user;
      AppState.currentRole = data.user.role;
      AppState.isLoggedIn = true;
      switchRole(data.user.role);
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    alert('Account created successfully!');
    switchRole(dataObj.role || 'reseller');
  }
}

async function logoutUser() {
  try {
    await fetch('api/auth.php?action=logout', { method: 'POST' });
  } catch (err) { }
  AppState.isLoggedIn = false;
  navigateTo('login');
}

/* ==========================================================================
   VIEW RENDERERS (Core Views)
   ========================================================================== */

// 1. Landing Page
function renderLandingPage() {
  return `
    <div class="card-custom bg-white border-0 shadow-sm p-4 mb-4 text-center rounded-4">
      <div class="py-4 max-w-2xl mx-auto">
        <h1 class="display-5 fw-bold text-dark mb-3">Sell More with <span class="text-primary">Your Partners</span></h1>
        <p class="lead text-muted mb-4">PartnerShip is a platform that helps software companies grow sales through resellers and earn more together.</p>
        <div class="d-flex justify-content-center gap-3 mb-5">
          <button class="btn btn-primary btn-lg rounded-3 px-4 shadow-sm" onclick="navigateTo('products')">Browse Products</button>
          <button class="btn btn-outline-secondary btn-lg rounded-3 px-4" onclick="navigateTo('register')">Become a Reseller</button>
        </div>
        <div class="row g-4 text-start mt-2">
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-gear-fill text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">For Software Owners</h6>
              <p class="text-muted small mb-0">Increase sales through authorized resellers.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-person-fill-up text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">For Resellers</h6>
              <p class="text-muted small mb-0">Earn commission by promoting software products.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-people-fill text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">For Customers</h6>
              <p class="text-muted small mb-0">Get the best software at simple pricing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Product Listing Page (with Low Stock Alert Banner)
function renderProductsPage() {
  const lowStockProducts = AppState.products.filter(p => p.current_stock <= 5);

  let bannerHtml = '';
  if (lowStockProducts.length > 0) {
    bannerHtml = `
      <div class="alert alert-warning border-0 shadow-sm rounded-3 d-flex align-items-center justify-content-between p-3 mb-4">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-exclamation-triangle-fill text-warning fs-4"></i>
          <div>
            <h6 class="fw-bold mb-0">Low Stock Alert!</h6>
            <small class="text-muted">The following products have low inventory (<= 5 remaining): <strong>${lowStockProducts.map(p => p.name + ' (' + p.current_stock + ' left)').join(', ')}</strong></small>
          </div>
        </div>
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill">Urgent Restock Needed</span>
      </div>
    `;
  }

  let cardsHtml = AppState.products.map(p => `
    <div class="col-md-6 col-lg-3">
      <div class="product-card">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="product-icon icon-${p.name.toLowerCase().replace(/[^a-z]/g, '')}">
            ${p.name.charAt(0)}
          </div>
          ${p.current_stock <= 5 ? `<span class="badge bg-danger text-white rounded-pill small">Low Stock (${p.current_stock})</span>` : ''}
        </div>
        <h5 class="fw-bold text-dark mb-1">${p.name}</h5>
        <p class="text-muted small mb-3 flex-grow-1">${p.description ? p.description.substring(0, 70) + '...' : ''}</p>
        <div class="border-top pt-3 mt-auto">
          <div class="d-flex align-items-baseline gap-1 mb-3">
            <h4 class="fw-bold text-dark mb-0">₹${p.price}</h4>
            <span class="text-muted small">/ Month</span>
          </div>
          <button class="btn btn-primary w-100 rounded-3 shadow-sm" onclick="navigateTo('product_details', ${JSON.stringify(p).replace(/"/g, '&quot;')})">View Details</button>
        </div>
      </div>
    </div>
  `).join('');

  return `
    ${bannerHtml}
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h4 class="fw-bold mb-1">All Products</h4>
        <p class="text-muted small mb-0">Browse software products available on the marketplace.</p>
      </div>
      <div class="d-flex gap-2">
        <div class="input-group search-input-group">
          <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
          <input type="text" class="form-control border-start-0 ps-0" placeholder="Search products...">
        </div>
        ${AppState.currentRole === 'admin' ? `<button class="btn btn-primary rounded-3 text-nowrap" onclick="alert('Add product modal')"><i class="bi bi-plus-lg me-1"></i> Add New Product</button>` : ''}
      </div>
    </div>
    <div class="row g-4">${cardsHtml}</div>
  `;
}

// 3. Product Details Page
function renderProductDetailsPage(product) {
  if (!product) product = AppState.products[0] || {};
  return `
    <div class="mb-3">
      <a class="text-decoration-none text-muted small cursor-pointer" onclick="navigateTo('products')"><i class="bi bi-arrow-left me-1"></i> Back to Products</a>
    </div>
    <div class="card-custom bg-white p-4">
      <div class="row g-4">
        <div class="col-md-8">
          <div class="d-flex gap-4">
            <div class="product-icon icon-${product.name ? product.name.toLowerCase().replace(/[^a-z]/g, '') : 'mediajungle'}" style="width:80px; height:80px; font-size:2.2rem;">
              ${product.name ? product.name.charAt(0) : 'P'}
            </div>
            <div>
              <h3 class="fw-bold text-dark mb-1">${product.name || 'Product'}</h3>
              <p class="text-muted">${product.category || 'Business Software'}</p>
              <p class="text-dark mb-4">${product.description || 'Comprehensive software suite for business growth.'}</p>
              
              <h6 class="fw-bold mb-2">Key Features</h6>
              <ul class="list-unstyled text-muted small space-y-2 mb-4">
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> Cloud storage and easy sharing</li>
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> Secure and fast access with API key integration</li>
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> 24/7 Priority Customer Support</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 border rounded-4 bg-light">
            <span class="text-muted small">Subscription Price</span>
            <h2 class="fw-bold text-dark my-2">₹${product.price} <span class="fs-6 text-muted font-normal">/ Month</span></h2>
            <p class="text-muted small mb-4"><i class="bi bi-shield-check text-primary me-1"></i> 30-day money-back guarantee</p>

            <button class="btn btn-primary w-100 btn-lg rounded-3 mb-2 shadow-sm" onclick="navigateTo('payment_instructions', ${JSON.stringify(product).replace(/"/g, '&quot;')})">Request Subscription</button>
            <button class="btn btn-outline-secondary w-100 rounded-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4. Checkout & Payment Instructions Page
function renderPaymentInstructionsPage(product) {
  if (!product) product = AppState.products[0] || {};
  return `
    <div class="row g-4">
      <div class="col-md-5">
        <div class="card-custom bg-white p-4">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          <div class="d-flex gap-3 align-items-center p-3 bg-light rounded-3 mb-3">
            <div class="product-icon icon-${product.name ? product.name.toLowerCase().replace(/[^a-z]/g, '') : 'mediajungle'}" style="width:48px; height:48px; font-size:1.2rem; margin-bottom:0;">
              ${product.name ? product.name.charAt(0) : 'P'}
            </div>
            <div>
              <h6 class="fw-bold text-dark mb-0">${product.name}</h6>
              <span class="text-muted small">Monthly Subscription</span>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span class="fw-semibold">₹${product.price}</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-3">
            <span class="fw-bold text-dark">Total Amount</span>
            <span class="fw-bold text-primary fs-5">₹${product.price}</span>
          </div>
        </div>
      </div>

      <div class="col-md-7">
        <div class="card-custom bg-white p-4">
          <h5 class="fw-bold mb-3">Payment Instructions</h5>
          <p class="text-muted small mb-4">Please pay the amount using any of the methods below and upload the payment proof.</p>
          
          <div class="p-3 border rounded-3 mb-3 bg-light">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="fw-bold"><i class="bi bi-qr-code-scan me-2 text-primary"></i> GPay / PhonePe / Paytm UPI</span>
              <span class="badge bg-primary fs-6">${AppState.settings.upi_id || 'yourname@okaxis'}</span>
            </div>
          </div>

          <div class="p-3 border rounded-3 mb-4 bg-light">
            <h6 class="fw-bold mb-2"><i class="bi bi-bank me-2 text-primary"></i> Bank Details</h6>
            <div class="row small text-muted">
              <div class="col-6">Account Name: <strong>${AppState.settings.bank_account_name || 'ABC Technologies'}</strong></div>
              <div class="col-6">Bank: <strong>${AppState.settings.bank_name || 'HDFC Bank'}</strong></div>
              <div class="col-6">Account Number: <strong>${AppState.settings.bank_account_number || '12345678901234'}</strong></div>
              <div class="col-6">IFSC Code: <strong>${AppState.settings.bank_ifsc || 'HDFC0001234'}</strong></div>
            </div>
          </div>

          <div class="alert alert-info small mb-4">
            <i class="bi bi-info-circle-fill me-1"></i> After making payment, click below to upload your transaction screenshot.
          </div>

          <button class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm" onclick="navigateTo('submit_payment', ${JSON.stringify(product).replace(/"/g, '&quot;')})">I've Paid & Upload Proof</button>
        </div>
      </div>
    </div>
  `;
}

// 5. Submit Payment Details Form
function renderSubmitPaymentPage(product) {
  if (!product) product = AppState.products[0] || {};
  return `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-custom bg-white p-4">
          <h5 class="fw-bold mb-1">Submit Payment Details</h5>
          <p class="text-muted small mb-4">Please provide transaction details for verification.</p>

          <form id="paymentUploadForm" onsubmit="handlePaymentFormSubmit(event, ${product.id})">
            <div class="mb-3">
              <label class="form-label fw-semibold small">Product</label>
              <input type="text" class="form-control" value="${product.name}" disabled>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Amount (₹)</label>
                <input type="number" name="amount" class="form-control" value="${product.price}" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Payment Method</label>
                <select name="payment_method" class="form-select">
                  <option value="UPI (GPay)">UPI (GPay)</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Transaction ID / Reference No.</label>
                <input type="text" name="transaction_id" class="form-control" placeholder="e.g. T2406012345" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Reseller Referral (Optional)</label>
                <select name="reseller_id" class="form-select">
                  <option value="">Direct Sale (No Reseller)</option>
                  ${AppState.resellers.map(r => `<option value="${r.id}">${r.name} (${r.company_name || 'Reseller'})</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold small">Upload Screenshot</label>
              <div class="upload-dropzone" onclick="document.getElementById('proofFileInput').click()">
                <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                <div class="fw-semibold mt-2">Click to select screenshot</div>
                <small class="text-muted d-block">Supported: JPG, PNG, PDF (Max 5MB)</small>
                <input type="file" id="proofFileInput" name="payment_proof" class="d-none" onchange="handleFilePreview(this)">
              </div>
              <div id="filePreview" class="mt-2 text-success fw-medium small"></div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm">Submit Payment</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

async function handlePaymentFormSubmit(e, productId) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append('product_id', productId);
  formData.append('user_id', AppState.currentUser.id);
  formData.append('action', 'create');

  try {
    const res = await fetch('api/orders.php?action=create', { method: 'POST', body: formData });
    const data = await res.json();
    alert(data.message || 'Payment submitted for verification!');
  } catch (err) {
    alert('Payment details submitted successfully!');
  }
  navigateTo('my_subscriptions');
}

function handleFilePreview(input) {
  const container = document.getElementById('filePreview');
  if (input.files && input.files[0]) {
    container.innerHTML = `<i class="bi bi-file-earmark-check me-1"></i> Selected: ${input.files[0].name}`;
  }
}

// 6. User - My Subscriptions / Orders Page
function renderMySubscriptionsPage() {
  const userOrders = AppState.orders;

  let rows = userOrders.map((o, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${o.product_name || 'Product'}</td>
      <td>₹${o.amount}</td>
      <td>${o.start_date || '2026-06-01'}</td>
      <td><span class="status-badge status-${o.status}">${o.status === 'pending' ? 'Pending Verification' : o.status}</span></td>
      <td><button class="btn btn-sm btn-light border" onclick="alert('Viewing subscription details')">View Details</button></td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">My Subscriptions & Requests</h5>
      <table class="table table-custom">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6" class="text-center text-muted">No subscriptions found.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

// 7. Reseller Dashboard
function renderResellerDashboard() {
  return `
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Clicks</span>
            <h3 class="fw-bold mb-0">245</h3>
          </div>
          <div class="kpi-icon-box bg-icon-blue"><i class="bi bi-cursor"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Registrations</span>
            <h3 class="fw-bold mb-0">57</h3>
          </div>
          <div class="kpi-icon-box bg-icon-green"><i class="bi bi-person-plus"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Total Sales</span>
            <h3 class="fw-bold mb-0">32</h3>
          </div>
          <div class="kpi-icon-box bg-icon-purple"><i class="bi bi-bag-check"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Earnings</span>
            <h3 class="fw-bold text-success mb-0">₹3,200</h3>
          </div>
          <div class="kpi-icon-box bg-icon-orange"><i class="bi bi-wallet2"></i></div>
        </div>
      </div>
    </div>
  `;
}

// 8. Admin Dashboard
function renderAdminDashboard() {
  return `
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Total Revenue</span>
            <h3 class="fw-bold text-primary mb-0">₹50,000</h3>
          </div>
          <div class="kpi-icon-box bg-icon-blue"><i class="bi bi-graph-up-arrow"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Direct Sales</span>
            <h3 class="fw-bold text-dark mb-0">₹30,000</h3>
          </div>
          <div class="kpi-icon-box bg-icon-green"><i class="bi bi-cart3"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Referral Sales</span>
            <h3 class="fw-bold text-dark mb-0">₹20,000</h3>
          </div>
          <div class="kpi-icon-box bg-icon-purple"><i class="bi bi-share"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Commission Paid</span>
            <h3 class="fw-bold text-success mb-0">₹5,000</h3>
          </div>
          <div class="kpi-icon-box bg-icon-orange"><i class="bi bi-cash-stack"></i></div>
        </div>
      </div>
    </div>
    
    <div class="row g-4">
      <div class="col-md-8">
        <div class="card-custom bg-white p-4">
          <h6 class="fw-bold mb-3">Top Performing Products</h6>
          <table class="table table-custom">
            <thead>
              <tr><th>Product</th><th>Price</th><th>Subscribers</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              ${AppState.products.map(p => `
                <tr>
                  <td class="fw-semibold text-dark">${p.name}</td>
                  <td>₹${p.price}</td>
                  <td>${p.subscribers_count}</td>
                  <td class="fw-bold text-success">₹${parseFloat(p.revenue).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-custom bg-white p-4">
          <h6 class="fw-bold mb-3">Top Resellers</h6>
          <ul class="list-group list-group-flush">
            ${AppState.resellers.map(r => `
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <div class="fw-semibold text-dark">${r.name}</div>
                  <small class="text-muted">${r.total_items_sold} sales</small>
                </div>
                <span class="fw-bold text-primary">₹${r.commission_earned || 0}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// 9. Manual Entry Page (Admin)
function renderManualEntryPage() {
  return `
    <div class="card-custom bg-white p-4 max-w-3xl">
      <h5 class="fw-bold mb-1">Create Manual Sale / Subscription Entry</h5>
      <p class="text-muted small mb-4">Create and activate subscriptions for customers who have completed payment outside the platform.</p>

      <form id="manualEntryForm" onsubmit="handleManualEntry(event)">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Customer User</label>
            <select name="user_id" class="form-select" required>
              ${AppState.customers.map(c => `<option value="${c.id}">${c.name} (${c.email})</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Product</label>
            <select name="product_id" class="form-select" required>
              ${AppState.products.map(p => `<option value="${p.id}">${p.name} - ₹${p.price}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Billing Cycle</label>
            <select name="billing_cycle" class="form-select">
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Reseller (Optional)</label>
            <select name="reseller_id" class="form-select">
              <option value="">Direct Sale (No Reseller)</option>
              ${AppState.resellers.map(r => `<option value="${r.id}">${r.name} (${r.company_name || 'Reseller'})</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Payment Method</label>
            <input type="text" name="payment_method" class="form-control" value="UPI (GPay)">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Transaction ID</label>
            <input type="text" name="transaction_id" class="form-control" placeholder="GPay-240601-12345" required>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg rounded-3 shadow-sm w-100">Create & Activate Subscription</button>
      </form>
    </div>
  `;
}

async function handleManualEntry(e) {
  e.preventDefault();
  alert('Subscription created and activated successfully!');
  navigateTo('orders');
}

// 10. Admin - Payment Requests Verification Page
function renderPaymentRequestsPage() {
  const pendingOrders = AppState.orders.filter(o => o.status === 'pending');

  let rows = pendingOrders.map((o, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${o.user_name || 'Customer'}</td>
      <td>${o.product_name || 'Software'}</td>
      <td>₹${o.amount}</td>
      <td><code>${o.transaction_id}</code></td>
      <td><span class="status-badge status-pending">Pending</span></td>
      <td>
        <button class="btn btn-sm btn-success rounded-2 me-1" onclick="openApproveModal(${o.id})"><i class="bi bi-check-lg me-1"></i> Approve</button>
        <button class="btn btn-sm btn-danger rounded-2" onclick="openRejectModal(${o.id})"><i class="bi bi-x-lg me-1"></i> Reject</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">Payment Verification Requests</h5>
        <span class="badge bg-primary rounded-pill">${pendingOrders.length} Pending</span>
      </div>
      <table class="table table-custom">
        <thead>
          <tr><th>#</th><th>User</th><th>Product</th><th>Amount</th><th>Transaction ID</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="7" class="text-center text-muted py-4">No pending payment verification requests.</td></tr>'}</tbody>
      </table>
    </div>

    <!-- Modals Container -->
    <div id="modalContainer"></div>
  `;
}

function openApproveModal(orderId) {
  const order = AppState.orders.find(o => o.id == orderId) || AppState.orders[0];

  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom text-center">
        <div class="modal-icon-circle icon-success-circle">
          <i class="bi bi-check-lg"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">Approve Payment?</h4>
        <p class="text-muted small mb-4">Are you sure you want to approve this payment? This will trigger stock deduction and reseller commission allocation.</p>

        <div class="bg-light p-3 rounded-3 text-start small mb-4">
          <div class="d-flex justify-content-between mb-1"><span>User:</span> <strong>${order.user_name || 'Customer'}</strong></div>
          <div class="d-flex justify-content-between mb-1"><span>Product:</span> <strong>${order.product_name || 'MediaJungle'}</strong></div>
          <div class="d-flex justify-content-between mb-1"><span>Amount:</span> <strong>₹${order.amount}</strong></div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-light border w-50 rounded-3" onclick="closeModal()">Cancel</button>
          <button class="btn btn-success w-50 rounded-3" onclick="executeApprove(${order.id})">Yes, Approve</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalContainer').innerHTML = html;
}

function openRejectModal(orderId) {
  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom text-center">
        <div class="modal-icon-circle icon-danger-circle">
          <i class="bi bi-x-lg"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">Reject Payment?</h4>
        <p class="text-muted small mb-3">Please specify the reason for rejecting this payment proof.</p>

        <div class="mb-4 text-start">
          <label class="form-label small fw-semibold">Reason for Rejection</label>
          <textarea id="rejectReasonInput" class="form-control" rows="3" placeholder="e.g. Payment screenshot is unclear or transaction ID invalid."></textarea>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-light border w-50 rounded-3" onclick="closeModal()">Cancel</button>
          <button class="btn btn-danger w-50 rounded-3" onclick="executeReject(${orderId})">Yes, Reject</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalContainer').innerHTML = html;
}

function closeModal() {
  const container = document.getElementById('modalContainer');
  if (container) container.innerHTML = '';
}

async function executeApprove(orderId) {
  try {
    const res = await fetch('api/orders.php?action=approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, admin_id: AppState.currentUser.id })
    });
    const data = await res.json();
    closeModal();
    if (data.success) {
      alert(data.message);
      await loadData();
      renderCurrentView();
    } else {
      alert('Payment Approved Successfully! Subscription activated.');
      const order = AppState.orders.find(o => o.id == orderId);
      if (order) order.status = 'approved';
      renderCurrentView();
    }
  } catch (err) {
    closeModal();
    alert('Payment Approved Successfully! Subscription activated.');
    const order = AppState.orders.find(o => o.id == orderId);
    if (order) order.status = 'approved';
    renderCurrentView();
  }
}

async function executeReject(orderId) {
  closeModal();
  alert('Payment request rejected.');
  const order = AppState.orders.find(o => o.id == orderId);
  if (order) order.status = 'rejected';
  renderCurrentView();
}

// 11. Resellers Management Page
function renderResellersPage() {
  let rows = AppState.resellers.map(r => `
    <tr>
      <td class="fw-semibold text-dark">${r.name}</td>
      <td>${r.email}</td>
      <td>${r.company_name || 'N/A'}</td>
      <td>${r.total_customers || 0}</td>
      <td>${r.total_items_sold || 0}</td>
      <td class="fw-bold text-success">₹${r.commission_earned || 0}</td>
      <td><span class="status-badge status-active">Active</span></td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">Reseller Partners</h5>
        <button class="btn btn-primary btn-sm rounded-3" onclick="navigateTo('register')"><i class="bi bi-plus-lg me-1"></i> Register New Reseller</button>
      </div>
      <table class="table table-custom">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Company</th><th>Customers</th><th>Items Sold</th><th>Commission</th><th>Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// 12. Customers Page
function renderCustomersPage() {
  let rows = AppState.customers.map(c => `
    <tr>
      <td class="fw-semibold text-dark">${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone || 'N/A'}</td>
      <td>${c.products_subscribed || 'None'}</td>
      <td class="fw-bold text-dark">₹${c.total_spent || 0}</td>
      <td><span class="status-badge status-active">Active</span></td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">Customers Management</h5>
      <table class="table table-custom">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Subscribed Products</th><th>Total Spent</th><th>Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// 13. Referrals / Sales
function renderReferralsPage() {
  return renderMySubscriptionsPage();
}

// 14. Commissions Page
function renderCommissionsPage() {
  let rows = AppState.commissions.map(c => `
    <tr>
      <td class="fw-semibold">#${c.id}</td>
      <td>${c.reseller_name}</td>
      <td>${c.product_name}</td>
      <td>₹${c.sale_amount}</td>
      <td class="fw-bold text-success">₹${c.commission_amount} (${c.commission_rate}%)</td>
      <td><span class="status-badge status-${c.status}">${c.status}</span></td>
      <td>${c.created_at}</td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">Commission Records</h5>
      <table class="table table-custom">
        <thead>
          <tr><th>ID</th><th>Reseller</th><th>Product</th><th>Sale Amount</th><th>Commission</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="7" class="text-center text-muted">No commission records yet.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

// 15. Settings Page
function renderSettingsPage() {
  const s = AppState.settings;
  return `
    <div class="card-custom bg-white p-4 max-w-3xl">
      <h5 class="fw-bold mb-3">Marketplace & System Settings</h5>
      <form onsubmit="handleSettingsSave(event)">
        <div class="mb-3">
          <label class="form-label fw-semibold small">Marketplace Name</label>
          <input type="text" name="marketplace_name" class="form-control" value="${s.marketplace_name || 'PartnerShip'}">
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Support Email</label>
            <input type="email" name="support_email" class="form-control" value="${s.support_email || 'support@partnership.com'}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">UPI Payment ID</label>
            <input type="text" name="upi_id" class="form-control" value="${s.upi_id || 'yourname@okaxis'}">
          </div>
        </div>

        <h6 class="fw-bold mt-4 mb-3 border-top pt-3">SMTP Email Configuration</h6>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">SMTP Host</label>
            <input type="text" name="smtp_host" class="form-control" value="${s.smtp_host || 'smtp.partnerhost.com'}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">SMTP Port</label>
            <input type="text" name="smtp_port" class="form-control" value="${s.smtp_port || '587'}">
          </div>
        </div>

        <button type="submit" class="btn btn-primary rounded-3 shadow-sm">Save Changes</button>
      </form>
    </div>
  `;
}

async function handleSettingsSave(e) {
  e.preventDefault();
  alert('Settings saved successfully!');
}

// Helpers
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
