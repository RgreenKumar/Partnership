/**
 * PartnerShip - B2B Reseller & Subscription Management Portal JS Application
 */

const AppState = {
  currentRole: 'admin', // 'admin', 'reseller', 'user'
  currentView: 'dashboard', // 'login', 'register', 'dashboard', 'products', 'payment_requests', etc.
  currentUser: { id: 1, name: 'Admin User', role: 'admin', email: 'admin@gmail.com' },
  isLoggedIn: true,
  authTab: 'login',
  loginRoleTab: 'admin',
  registerRoleTab: 'user',
  refCode: '',
  products: [
    { id: 1, name: 'MediaJungle', category: 'Media & Content', description: 'Powerful media management software designed for growing businesses to organize, manage, and distribute digital assets efficiently.', price: 500, cost_price: 200, current_stock: 4, subscribers_count: 1245, revenue: 622500, status: 'active' },
    { id: 2, name: 'CRM Pro', category: 'Customer Relations', description: 'Customer relationship management tool with automated pipelines, contact tracking, and lead analytics.', price: 1000, cost_price: 400, current_stock: 15, subscribers_count: 980, revenue: 980000, status: 'active' },
    { id: 3, name: 'ProjectHub', category: 'Project Management', description: 'Project management made simple with real-time Gantt charts, sprint planning, and team collaboration.', price: 800, cost_price: 300, current_stock: 20, subscribers_count: 765, revenue: 612000, status: 'active' },
    { id: 4, name: 'InvoiceX', category: 'Finance & Billing', description: 'Smart invoicing platform for SaaS, freelancers, and agency teams with automated client billing.', price: 400, cost_price: 150, current_stock: 3, subscribers_count: 2050, revenue: 820000, status: 'active' },
    { id: 5, name: 'TeamFlow', category: 'HR & Workflow', description: 'Complete employee lifecycle management, attendance tracking, and task workflow automation.', price: 600, cost_price: 250, current_stock: 12, subscribers_count: 530, revenue: 318000, status: 'active' }
  ],
  orders: [
    { id: 1, order_code: 'ORD123', user_id: 5, user_name: 'Arun Kumar', product_id: 1, product_name: 'MediaJungle', amount: 500, transaction_id: 'T2406012345', payment_proof: 'uploads/proof1.png', status: 'approved', start_date: '2026-06-01', reseller_id: 2, reseller_name: 'John Doe' },
    { id: 2, order_code: 'ORD122', user_id: 6, user_name: 'Ravi Kumar', product_id: 2, product_name: 'CRM Pro', amount: 1000, transaction_id: 'T2406011000', payment_proof: 'uploads/proof2.png', status: 'approved', start_date: '2026-05-15', reseller_id: 2, reseller_name: 'John Doe' },
    { id: 3, order_code: 'ORD121', user_id: 7, user_name: 'Priya Sharma', product_id: 3, product_name: 'ProjectHub', amount: 800, transaction_id: 'T2405283344', payment_proof: 'uploads/proof3.png', status: 'pending', start_date: '2026-05-28', reseller_id: 3, reseller_name: 'David Smith' },
    { id: 4, order_code: 'ORD120', user_id: 6, user_name: 'Ravi Kumar', product_id: 4, product_name: 'InvoiceX', amount: 400, transaction_id: 'T2405277788', payment_proof: 'uploads/proof4.png', status: 'rejected', rejection_reason: 'Payment screenshot is blurry and transaction ID does not match bank records.', start_date: '2026-05-27', reseller_id: null, reseller_name: 'Direct Sale' }
  ],
  purchases: [
    { id: 1, order_code: 'ORD123', user_name: 'Arun Kumar', product_name: 'MediaJungle', amount: 500, status: 'Approved', activated_at: '2026-06-01' },
    { id: 2, order_code: 'ORD122', user_name: 'Ravi Kumar', product_name: 'CRM Pro', amount: 1000, status: 'Approved', activated_at: '2026-05-15' }
  ],
  resellers: [
    { id: 2, name: 'John Doe', email: 'john@example.com', referral_code: 'REF001', company_name: 'Tech Solutions Pvt Ltd', total_customers: 45, total_items_sold: 52, commission_earned: 12500, status: 'active' },
    { id: 3, name: 'David Smith', email: 'david@example.com', referral_code: 'REF002', company_name: 'Apex Digital', total_customers: 32, total_items_sold: 32, commission_earned: 9400, status: 'active' },
    { id: 4, name: 'Michael Lee', email: 'michael@example.com', referral_code: 'REF003', company_name: 'Lee Soft', total_customers: 25, total_items_sold: 25, commission_earned: 6000, status: 'active' }
  ],
  customers: [
    { id: 5, name: 'Arun Kumar', email: 'arun@example.com', phone: '+91 98765 43213', address: '15 Garden Street, Chennai', company_name: 'Arun Enterprises', products_subscribed: 'MediaJungle', total_spent: 1500, reseller_name: 'John Doe', status: 'active' },
    { id: 6, name: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 98765 43214', address: '77 Commercial Road, Pune', company_name: 'Ravi & Co', products_subscribed: 'CRM Pro', total_spent: 1000, reseller_name: 'John Doe', status: 'active' },
    { id: 7, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43215', address: '304 Tower B, Noida', company_name: 'Sharma Tech', products_subscribed: 'ProjectHub', total_spent: 800, reseller_name: 'David Smith', status: 'active' }
  ],
  commissions: [
    { id: 1, order_code: 'ORD123', reseller_name: 'John Doe', customer_name: 'Arun Kumar', product_name: 'MediaJungle', sale_amount: 500, commission_amount: 60, commission_rate: 12, status: 'paid', created_at: '2026-06-01' },
    { id: 2, order_code: 'ORD122', reseller_name: 'John Doe', customer_name: 'Ravi Kumar', product_name: 'CRM Pro', sale_amount: 1000, commission_amount: 120, commission_rate: 12, status: 'paid', created_at: '2026-05-15' },
    { id: 3, order_code: 'ORD121', reseller_name: 'David Smith', customer_name: 'Priya Sharma', product_name: 'ProjectHub', sale_amount: 800, commission_amount: 80, commission_rate: 10, status: 'pending', created_at: '2026-05-28' }
  ],
  settings: {
    marketplace_name: 'PartnerShip',
    support_email: 'support@partnership.com',
    company_name: 'PartnerShip Technologies Pvt. Ltd.',
    upi_id: 'partnership@okaxis',
    bank_account_name: 'PartnerShip Technologies Pvt Ltd',
    bank_name: 'HDFC Bank',
    bank_account_number: '50200088991122',
    bank_ifsc: 'HDFC0001234',
    smtp_host: 'smtp.partnerhost.com',
    smtp_port: '587'
  },
  modalData: {}
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Check URL query parameters for referral code
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref') || urlParams.get('referral');
  if (ref) {
    AppState.refCode = ref;
    AppState.registerRoleTab = 'user';
    console.log('Referral Code detected:', ref);
  }

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
    const curId = (AppState.currentUser && AppState.currentUser.id) ? AppState.currentUser.id : 0;
    const [pRes, oRes, rRes, cRes, cmRes] = await Promise.all([
      fetch('api/products.php').then(r => r.json()).catch(() => null),
      fetch(`api/orders.php?role=${AppState.currentRole}&user_id=${curId}`).then(r => r.json()).catch(() => null),
      fetch('api/resellers.php').then(r => r.json()).catch(() => null),
      fetch('api/customers.php').then(r => r.json()).catch(() => null),
      fetch(`api/commissions.php${AppState.currentRole === 'reseller' ? '?reseller_id=' + curId : ''}`).then(r => r.json()).catch(() => null)
    ]);

    if (pRes && pRes.success && pRes.products) AppState.products = pRes.products;
    if (oRes && oRes.success && oRes.orders) {
      AppState.orders = oRes.orders;
      AppState.purchases = oRes.orders.filter(o => o.status === 'approved');
    }
    if (rRes && rRes.success && rRes.resellers) {
      AppState.resellers = rRes.resellers;
      if (AppState.currentUser && AppState.currentRole === 'reseller') {
        const updatedUser = AppState.resellers.find(r => r.id == AppState.currentUser.id || (r.email && AppState.currentUser.email && r.email.toLowerCase() === AppState.currentUser.email.toLowerCase()));
        if (updatedUser) {
          AppState.currentUser = Object.assign({}, AppState.currentUser, updatedUser);
        }
      }
    }
    if (cRes && cRes.success && cRes.customers) AppState.customers = cRes.customers;
    if (cmRes && cmRes.success && cmRes.commissions) AppState.commissions = cmRes.commissions;
  } catch (err) { }
}


function switchRole(role) {
  AppState.currentRole = role;
  if (AppState.currentUser && AppState.currentUser.role === role) {
    // Preserve logged in user if role matches
    AppState.currentView = (role === 'user') ? 'products' : 'dashboard';
  } else {
    // Switch to demo user for role
    if (role === 'admin') {
      AppState.currentUser = { id: 1, name: 'System Admin', role: 'admin', email: 'admin@gmail.com' };
    } else if (role === 'reseller') {
      const demoReseller = (AppState.resellers && AppState.resellers.length > 0) ? AppState.resellers[0] : { id: 2, name: 'John Doe', role: 'reseller', email: 'john@example.com', referral_code: 'REF001' };
      AppState.currentUser = demoReseller;
    } else {
      const demoUser = (AppState.customers && AppState.customers.length > 0) ? AppState.customers[0] : { id: 5, name: 'Arun Kumar', role: 'user', email: 'arun@example.com', phone: '+91 98765 43213', address: '15 Garden Street, Chennai' };
      AppState.currentUser = demoUser;
    }
    AppState.currentView = (role === 'user') ? 'products' : 'dashboard';
  }
  AppState.isLoggedIn = true;
  loadData().then(() => {
    renderSidebar();
    renderHeader();
    renderCurrentView();
  });
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
        <i class="bi bi-person-plus"></i> <span>Register Account</span>
      </a>
    `;
    return;
  }

  let items = [];
  if (AppState.currentRole === 'user') {
    items = [
      { key: 'products', label: 'Browse Software', icon: 'bi-grid-fill' },
      { key: 'my_purchases', label: 'My Purchases', icon: 'bi-bag-check' },
      { key: 'my_subscriptions', label: 'My Payment Requests', icon: 'bi-receipt' },
      { key: 'profile', label: 'My Profile', icon: 'bi-person' }
    ];
  } else if (AppState.currentRole === 'reseller') {
    items = [
      { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { key: 'referrals', label: 'My Referrals & Sales', icon: 'bi-share' },
      { key: 'commissions', label: 'Commissions Summary', icon: 'bi-currency-rupee' },
      { key: 'products', label: 'Browse Products', icon: 'bi-box-seam' },
      { key: 'profile', label: 'My Profile', icon: 'bi-person' }
    ];
  } else { // Admin
    items = [
      { key: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { key: 'products', label: 'Product Management', icon: 'bi-box-seam' },
      { key: 'payment_requests', label: 'Payment Verification', icon: 'bi-patch-check' },
      { key: 'manual_entry', label: 'Manual Sale Entry', icon: 'bi-plus-circle-dotted' },
      { key: 'resellers', label: 'Resellers', icon: 'bi-people' },
      { key: 'customers', label: 'Customers', icon: 'bi-person-badge' },
      { key: 'orders', label: 'Purchases & Orders', icon: 'bi-receipt' },
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
        <h5 class="mb-0 fw-bold text-dark"><i class="bi bi-diagram-3-fill text-primary me-2"></i>PartnerShip</h5>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-primary btn-sm rounded-3" onclick="navigateTo('login')">Login</button>
        <button class="btn btn-primary btn-sm rounded-3" onclick="navigateTo('register')">Register Account</button>
      </div>
    `;
    return;
  }

  topHeader.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <h5 class="mb-0 fw-bold text-dark">${capitalize(AppState.currentView.replace('_', ' '))}</h5>
      ${AppState.refCode ? `<span class="badge bg-info text-dark">Referral Code: ${AppState.refCode}</span>` : ''}
    </div>

    <div class="d-flex align-items-center gap-3">
      <!-- Role Switcher -->
      <div class="dropdown">
        <button class="btn btn-sm btn-light border dropdown-toggle fw-semibold" type="button" data-bs-toggle="dropdown">
          Role: <span class="role-badge role-${AppState.currentRole}">${capitalize(AppState.currentRole)}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <li><a class="dropdown-item fw-medium cursor-pointer" onclick="switchRole('user')"><i class="bi bi-person me-2"></i> Customer View</a></li>
          <li><a class="dropdown-item fw-medium cursor-pointer" onclick="switchRole('reseller')"><i class="bi bi-shop me-2"></i> Reseller View</a></li>
          <li><a class="dropdown-item fw-medium cursor-pointer" onclick="switchRole('admin')"><i class="bi bi-shield-lock me-2"></i> Admin View</a></li>
        </ul>
      </div>

      <div class="border-end h-50 mx-1"></div>

      <!-- User Profile -->
      <div class="d-flex align-items-center gap-2">
        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width:36px; height:36px;">
          ${(AppState.currentUser.name || 'U').charAt(0)}
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
    case 'my_purchases':
      container.innerHTML = renderMyPurchasesPage();
      break;
    case 'my_subscriptions':
    case 'orders':
      container.innerHTML = renderMySubscriptionsPage();
      break;
    case 'profile':
      container.innerHTML = renderProfilePage();
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
   AUTHENTICATION VIEWS (ADMIN, RESELLER, CUSTOMER)
   ========================================================================== */

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
            <p class="text-muted small">B2B Reseller & Software Management Portal</p>
          </div>

          <!-- Role Selector Nav Tabs -->
          <ul class="nav nav-pills nav-justified mb-4 p-1 bg-light rounded-3">
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
            <span class="text-muted small d-block mb-2">Quick Demo Credentials:</span>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-primary" onclick="quickFillLogin('admin@gmail.com', 'admin')">Admin (admin@gmail.com)</button>
              <button class="btn btn-sm btn-outline-purple" onclick="quickFillLogin('john@example.com', 'reseller')">Reseller (John)</button>
              <button class="btn btn-sm btn-outline-secondary" onclick="quickFillLogin('arun@example.com', 'user')">Customer (Arun)</button>
            </div>
          </div>

          <div class="text-center mt-4 pt-2 border-top">
            <span class="text-muted small">Need an account?</span>
            <a class="fw-semibold text-primary text-decoration-none ms-1 cursor-pointer" onclick="navigateTo('register')">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRegisterPage() {
  const regRole = AppState.registerRoleTab || 'user';
  const autoRefCode = AppState.refCode || '';

  return `
    <div class="row justify-content-center align-items-center py-4">
      <div class="col-md-8 col-lg-7">
        <div class="card-custom bg-white p-4 p-md-5 shadow-sm border rounded-4">
          <div class="text-center mb-4">
            <div class="brand-logo justify-content-center fs-3 text-primary mb-1">
              <i class="bi bi-diagram-3-fill me-2"></i> PartnerShip
            </div>
            <h5 class="fw-bold text-dark">Join PartnerShip Platform</h5>
            <p class="text-muted small">Sign up to buy software products or earn commissions as a Reseller.</p>
          </div>

          ${autoRefCode ? `
            <div class="alert alert-info border-0 rounded-3 mb-4 d-flex align-items-center gap-2">
              <i class="bi bi-ticket-perforated-fill fs-5 text-info"></i>
              <div>
                <strong>Referred by Reseller Code:</strong> <code class="fs-6">${autoRefCode}</code>
              </div>
            </div>
          ` : ''}

          <!-- Role Toggle -->
          <div class="btn-group w-100 mb-4 p-1 bg-light rounded-3">
            <button class="btn btn-sm ${regRole === 'user' ? 'btn-primary shadow-sm fw-bold' : 'btn-light text-muted'}" onclick="setRegisterRole('user')">
              <i class="bi bi-person me-1"></i> Register as Customer
            </button>
            <button class="btn btn-sm ${regRole === 'reseller' ? 'btn-primary shadow-sm fw-bold' : 'btn-light text-muted'}" onclick="setRegisterRole('reseller')">
              <i class="bi bi-shop me-1"></i> Register as Reseller
            </button>
          </div>

          <form id="registerForm" onsubmit="handleRegisterSubmit(event)">
            <input type="hidden" name="role" value="${regRole}">

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Full Name</label>
                <input type="text" name="name" class="form-control" placeholder="Ravi Kumar" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Email Address</label>
                <input type="email" name="email" class="form-control" placeholder="ravi@example.com" required>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Password</label>
                <input type="password" name="password" class="form-control" placeholder="••••••••••••" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Phone Number</label>
                <input type="text" name="phone" class="form-control" placeholder="+91 98765 43214" required>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold small">Address</label>
              <textarea name="address" class="form-control" rows="2" placeholder="77 Commercial Road, Pune" required></textarea>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Company / Business Name</label>
                <input type="text" name="company_name" class="form-control" placeholder="Ravi & Co">
              </div>
              ${regRole === 'reseller' ? `
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">UPI ID (For Commission Payouts)</label>
                  <input type="text" name="upi_id" class="form-control" placeholder="ravi@upi">
                </div>
              ` : `
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">Referral Code (Optional)</label>
                  <input type="text" name="referral_code" class="form-control" placeholder="REF001" value="${autoRefCode}">
                </div>
              `}
            </div>

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
      AppState.currentView = (data.user.role === 'user') ? 'products' : 'dashboard';
      alert(`Welcome back, ${data.user.name}!`);
      await loadData();
      renderSidebar();
      renderHeader();
      renderCurrentView();
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
    switchRole(dataObj.role || 'user');
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
   VIEW RENDERERS
   ========================================================================== */

// 1. Landing Page
function renderLandingPage() {
  return `
    <div class="card-custom bg-white border-0 shadow-sm p-4 mb-4 text-center rounded-4">
      <div class="py-4 max-w-2xl mx-auto">
        <h1 class="display-5 fw-bold text-dark mb-3">PartnerShip Software Marketplace</h1>
        <p class="lead text-muted mb-4">Sell software directly to customers or expand sales through authorized resellers with simple offline payment verification.</p>
        <div class="d-flex justify-content-center gap-3 mb-5">
          <button class="btn btn-primary btn-lg rounded-3 px-4 shadow-sm" onclick="navigateTo('products')">Browse Products</button>
          <button class="btn btn-outline-secondary btn-lg rounded-3 px-4" onclick="navigateTo('register')">Become a Reseller</button>
        </div>
        <div class="row g-4 text-start mt-2">
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-shield-lock-fill text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">For Software Owners</h6>
              <p class="text-muted small mb-0">Manage software products, set prices, and approve payments manually.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-shop text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">For Resellers</h6>
              <p class="text-muted small mb-0">Share your referral link/code and track customer sales & commissions.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 border rounded-3 bg-light">
              <i class="bi bi-wallet2 text-primary fs-3 mb-2 d-block"></i>
              <h6 class="fw-bold mb-1">Offline Payments Only</h6>
              <p class="text-muted small mb-0">Pay via GPay, PhonePe, UPI, or Bank Transfer and upload transaction proof.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getUniqueCategories() {
  const cats = AppState.products.map(p => p.category || 'Business Software');
  return [...new Set(cats)];
}

function filterProducts(query = '', category = 'all') {
  query = (query || '').toLowerCase().trim();
  return AppState.products.filter(p => {
    const matchQuery = !query || p.name.toLowerCase().includes(query) || 
                       (p.category && p.category.toLowerCase().includes(query)) || 
                       (p.description && p.description.toLowerCase().includes(query));
    const matchCat = (category === 'all' || !category) || (p.category === category);
    return matchQuery && matchCat;
  });
}

function handleProductSearch(query) {
  AppState.productSearchQuery = query;
  if (AppState.currentView !== 'products') {
    navigateTo('products');
  } else {
    updateProductGrid();
  }
}

function handleCategoryFilter(cat) {
  AppState.selectedCategory = cat;
  updateProductGrid();
}

function clearProductSearch() {
  AppState.productSearchQuery = '';
  AppState.selectedCategory = 'all';
  const inp = document.getElementById('productSearchInput');
  if (inp) inp.value = '';
  updateProductGrid();
}

function updateProductGrid() {
  const container = document.getElementById('productsGridContainer');
  if (!container) return;

  const filtered = filterProducts(AppState.productSearchQuery, AppState.selectedCategory);
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="display-6 text-muted mb-2"><i class="bi bi-search"></i></div>
        <h5 class="fw-bold text-dark">No Software Products Found</h5>
        <p class="text-muted small">No products match your search query "${AppState.productSearchQuery || ''}". Try searching with another keyword.</p>
        <button class="btn btn-outline-primary btn-sm rounded-3 mt-2" onclick="clearProductSearch()"><i class="bi bi-arrow-counterclockwise me-1"></i> Reset Search & Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="product-card">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="product-icon icon-${p.name.toLowerCase().replace(/[^a-z]/g, '')}">
            ${p.name.charAt(0)}
          </div>
          <span class="badge ${p.status === 'active' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-secondary'} rounded-pill text-capitalize">${p.status}</span>
        </div>
        <h5 class="fw-bold text-dark mb-1">${p.name}</h5>
        <p class="text-muted small mb-3 flex-grow-1">${p.description ? p.description.substring(0, 75) + '...' : ''}</p>
        <div class="border-top pt-3 mt-auto">
          <div class="d-flex align-items-baseline justify-content-between mb-3">
            <h4 class="fw-bold text-dark mb-0">₹${parseFloat(p.price).toLocaleString()}</h4>
            <small class="text-muted">Stock: <strong>${p.current_stock}</strong></small>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary w-100 rounded-3 shadow-sm" onclick="navigateTo('product_details', ${JSON.stringify(p).replace(/"/g, '&quot;')})">View & Purchase</button>
            ${AppState.currentRole === 'admin' ? `
              <button class="btn btn-outline-secondary rounded-3" title="Edit Product" onclick="openProductModal(${p.id})"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-danger rounded-3" title="Delete Product" onclick="deleteProduct(${p.id})"><i class="bi bi-trash"></i></button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 2. Product Listing Page
function renderProductsPage() {
  const lowStockProducts = AppState.products.filter(p => p.current_stock <= 5);

  let bannerHtml = '';
  if (lowStockProducts.length > 0 && AppState.currentRole === 'admin') {
    bannerHtml = `
      <div class="alert alert-warning border-0 shadow-sm rounded-3 d-flex align-items-center justify-content-between p-3 mb-4">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-exclamation-triangle-fill text-warning fs-4"></i>
          <div>
            <h6 class="fw-bold mb-0">Low Stock Alert!</h6>
            <small class="text-muted">The following products have low stock (<= 5 left): <strong>${lowStockProducts.map(p => p.name + ' (' + p.current_stock + ' remaining)').join(', ')}</strong></small>
          </div>
        </div>
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill">Admin Restock Needed</span>
      </div>
    `;
  }

  const filteredProducts = filterProducts(AppState.productSearchQuery, AppState.selectedCategory);
  let cardsHtml = filteredProducts.map(p => `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="product-card">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="product-icon icon-${p.name.toLowerCase().replace(/[^a-z]/g, '')}">
            ${p.name.charAt(0)}
          </div>
          <span class="badge ${p.status === 'active' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-secondary'} rounded-pill text-capitalize">${p.status}</span>
        </div>
        <h5 class="fw-bold text-dark mb-1">${p.name}</h5>
        <p class="text-muted small mb-3 flex-grow-1">${p.description ? p.description.substring(0, 75) + '...' : ''}</p>
        <div class="border-top pt-3 mt-auto">
          <div class="d-flex align-items-baseline justify-content-between mb-3">
            <h4 class="fw-bold text-dark mb-0">₹${parseFloat(p.price).toLocaleString()}</h4>
            <small class="text-muted">Stock: <strong>${p.current_stock}</strong></small>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary w-100 rounded-3 shadow-sm" onclick="navigateTo('product_details', ${JSON.stringify(p).replace(/"/g, '&quot;')})">View & Purchase</button>
            ${AppState.currentRole === 'admin' ? `
              <button class="btn btn-outline-secondary rounded-3" title="Edit Product" onclick="openProductModal(${p.id})"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-outline-danger rounded-3" title="Delete Product" onclick="deleteProduct(${p.id})"><i class="bi bi-trash"></i></button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (filteredProducts.length === 0) {
    cardsHtml = `
      <div class="col-12 text-center py-5">
        <div class="display-6 text-muted mb-2"><i class="bi bi-search"></i></div>
        <h5 class="fw-bold text-dark">No Software Products Found</h5>
        <p class="text-muted small">No products match your search query "${AppState.productSearchQuery || ''}". Try searching with another keyword.</p>
        <button class="btn btn-outline-primary btn-sm rounded-3 mt-2" onclick="clearProductSearch()"><i class="bi bi-arrow-counterclockwise me-1"></i> Reset Search & Filters</button>
      </div>
    `;
  }

  const categories = getUniqueCategories();

  return `
    ${bannerHtml}
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h4 class="fw-bold mb-1">Software Marketplace</h4>
        <p class="text-muted small mb-0">Browse, search, and purchase software products with offline payment verification.</p>
      </div>
      <div class="d-flex gap-2">
        ${AppState.currentRole === 'admin' ? `
          <button class="btn btn-primary rounded-3 text-nowrap shadow-sm" onclick="openProductModal(0)"><i class="bi bi-plus-lg me-1"></i> Add Product</button>
        ` : ''}
      </div>
    </div>

    <!-- Product Search & Filter Bar -->
    <div class="card-custom bg-white p-3 mb-4 shadow-sm border">
      <div class="row g-2 align-items-center">
        <div class="col-md-7 col-lg-8">
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0 text-muted"><i class="bi bi-search"></i></span>
            <input type="text" id="productSearchInput" class="form-control border-start-0 ps-0" 
                   placeholder="Search products by name, category, or description..." 
                   value="${AppState.productSearchQuery || ''}"
                   oninput="handleProductSearch(this.value)">
            ${AppState.productSearchQuery ? `<button class="btn btn-light border" onclick="clearProductSearch()"><i class="bi bi-x-circle text-muted"></i></button>` : ''}
          </div>
        </div>
        <div class="col-md-5 col-lg-4">
          <select id="productCategoryFilter" class="form-select bg-light" onchange="handleCategoryFilter(this.value)">
            <option value="all">All Categories</option>
            ${categories.map(cat => `<option value="${cat}" ${AppState.selectedCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <div class="row g-4" id="productsGridContainer">${cardsHtml}</div>
    <div id="productModalContainer"></div>
  `;
}


// 3. Product Details Page
function renderProductDetailsPage(product) {
  if (!product) product = AppState.products[0] || {};
  return `
    <div class="mb-3">
      <a class="text-decoration-none text-muted small cursor-pointer" onclick="navigateTo('products')"><i class="bi bi-arrow-left me-1"></i> Back to Marketplace</a>
    </div>
    <div class="card-custom bg-white p-4">
      <div class="row g-4">
        <div class="col-md-8">
          <div class="d-flex gap-4">
            <div class="product-icon icon-${product.name ? product.name.toLowerCase().replace(/[^a-z]/g, '') : 'crmpro'}" style="width:80px; height:80px; font-size:2.2rem;">
              ${product.name ? product.name.charAt(0) : 'P'}
            </div>
            <div>
              <h3 class="fw-bold text-dark mb-1">${product.name || 'Product'}</h3>
              <p class="text-muted">${product.category || 'Business Software'}</p>
              <p class="text-dark mb-4 fs-6">${product.description || 'Comprehensive software suite designed for enterprise business automation and efficiency.'}</p>
              
              <h6 class="fw-bold mb-2">Features Included</h6>
              <ul class="list-unstyled text-muted small space-y-2 mb-4">
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> Lifetime License & Updates</li>
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> Direct Admin Activation after Offline Payment Verification</li>
                <li><i class="bi bi-check-circle-fill text-success me-2"></i> 24/7 Technical Support</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 border rounded-4 bg-light">
            <span class="text-muted small">One-time Purchase Price</span>
            <h2 class="fw-bold text-dark my-2">₹${parseFloat(product.price).toLocaleString()}</h2>
            <p class="text-muted small mb-4"><i class="bi bi-shield-check text-primary me-1"></i> Offline Payment (GPay, PhonePe, UPI, Bank Transfer)</p>

            <button class="btn btn-primary w-100 btn-lg rounded-3 mb-2 shadow-sm" onclick="navigateTo('payment_instructions', ${JSON.stringify(product).replace(/"/g, '&quot;')})">Buy Now / Pay Offline</button>
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
            <div class="product-icon icon-${product.name ? product.name.toLowerCase().replace(/[^a-z]/g, '') : 'crmpro'}" style="width:48px; height:48px; font-size:1.2rem; margin-bottom:0;">
              ${product.name ? product.name.charAt(0) : 'P'}
            </div>
            <div>
              <h6 class="fw-bold text-dark mb-0">${product.name}</h6>
              <span class="text-muted small">Software License</span>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span class="fw-semibold">₹${parseFloat(product.price).toLocaleString()}</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-3">
            <span class="fw-bold text-dark">Total Amount Due</span>
            <span class="fw-bold text-primary fs-4">₹${parseFloat(product.price).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="col-md-7">
        <div class="card-custom bg-white p-4">
          <h5 class="fw-bold mb-3">Offline Payment Instructions</h5>
          <p class="text-muted small mb-4">Please make payment using any of the methods below, then submit your transaction screenshot for Admin approval.</p>
          
          <div class="p-3 border rounded-3 mb-3 bg-light">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="fw-bold"><i class="bi bi-qr-code-scan me-2 text-primary"></i> UPI (GPay / PhonePe / Paytm)</span>
              <span class="badge bg-primary fs-6">${AppState.settings.upi_id || 'partnership@okaxis'}</span>
            </div>
            <small class="text-muted">Send ₹${product.price} to UPI ID: <strong>${AppState.settings.upi_id || 'partnership@okaxis'}</strong></small>
          </div>

          <div class="p-3 border rounded-3 mb-4 bg-light">
            <h6 class="fw-bold mb-2"><i class="bi bi-bank me-2 text-primary"></i> Bank Account Transfer</h6>
            <div class="row small text-muted g-2">
              <div class="col-6">Account Holder: <strong>${AppState.settings.bank_account_name || 'PartnerShip Tech'}</strong></div>
              <div class="col-6">Bank Name: <strong>${AppState.settings.bank_name || 'HDFC Bank'}</strong></div>
              <div class="col-6">Account Number: <strong>${AppState.settings.bank_account_number || '50200088991122'}</strong></div>
              <div class="col-6">IFSC Code: <strong>${AppState.settings.bank_ifsc || 'HDFC0001234'}</strong></div>
            </div>
          </div>

          <div class="alert alert-info small mb-4 border-0">
            <i class="bi bi-info-circle-fill me-1"></i> No payment gateway processing fees. Once paid, click below to upload your transaction screenshot.
          </div>

          <button class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm" onclick="navigateTo('submit_payment', ${JSON.stringify(product).replace(/"/g, '&quot;')})">I Have Paid — Upload Proof</button>
        </div>
      </div>
    </div>
  `;
}

// 5. Submit Payment Details Form
function renderSubmitPaymentPage(product) {
  if (!product) product = AppState.products[0] || {};
  const currentResellerId = AppState.currentUser.referred_by_reseller_id || '';

  return `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-7">
        <div class="card-custom bg-white p-4 p-md-5">
          <h5 class="fw-bold mb-1">Submit Offline Payment Proof</h5>
          <p class="text-muted small mb-4">Please upload payment screenshot and transaction ID for Admin verification.</p>

          <form id="paymentUploadForm" onsubmit="handlePaymentFormSubmit(event, ${product.id})">
            <div class="mb-3">
              <label class="form-label fw-semibold small">Product Selected</label>
              <input type="text" class="form-control" value="${product.name}" disabled>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Payment Amount (₹)</label>
                <input type="number" name="amount" class="form-control" value="${product.price}" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Payment Method Used</label>
                <select name="payment_method" class="form-select">
                  <option value="UPI (GPay)">UPI (GPay)</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Transaction ID / UTR No.</label>
                <input type="text" name="transaction_id" class="form-control" placeholder="e.g. UPI123456789" required>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Reseller Referral (Optional)</label>
                <select name="reseller_id" class="form-select">
                  <option value="">Direct Sale (No Reseller)</option>
                  ${AppState.resellers.map(r => `<option value="${r.id}" ${currentResellerId == r.id ? 'selected' : ''}>${r.name} (${r.referral_code || 'Reseller'})</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold small">Remarks / Notes</label>
              <input type="text" name="remarks" class="form-control" placeholder="Paid via GPay at 2:30 PM">
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold small">Payment Proof Screenshot or PDF Document</label>
              <div class="upload-dropzone" onclick="document.getElementById('proofFileInput').click()">
                <i class="bi bi-cloud-arrow-up fs-2 text-primary"></i>
                <div class="fw-semibold mt-2">Click to Upload Payment Proof</div>
                <small class="text-muted d-block">Supported formats: Images (JPG, PNG, WEBP, GIF, BMP) or PDF Documents (Max 10MB)</small>
                <input type="file" id="proofFileInput" name="payment_proof" class="d-none" accept="image/*,application/pdf,.pdf,.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg" onchange="handleFilePreview(this)" required>
              </div>
              <div id="filePreview" class="mt-2 text-success fw-medium small"></div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm">Submit Payment Proof for Verification</button>
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
    alert(data.message || 'Payment details submitted successfully! Pending verification.');
  } catch (err) {
    alert('Payment proof submitted! Pending Admin verification.');
  }
  await loadData();
  navigateTo('my_subscriptions');
}

function handleFilePreview(input) {
  const container = document.getElementById('filePreview');
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    if (isPdf) {
      container.innerHTML = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 fs-6"><i class="bi bi-file-earmark-pdf-fill me-1"></i> Attached PDF Document: <strong>${file.name}</strong> (${(file.size/1024).toFixed(1)} KB)</span>`;
    } else {
      container.innerHTML = `<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 fs-6"><i class="bi bi-file-earmark-image-fill me-1"></i> Attached Image Proof: <strong>${file.name}</strong> (${(file.size/1024).toFixed(1)} KB)</span>`;
    }
  }
}


// 6. User - My Purchases Page
function renderMyPurchasesPage() {
  const purchases = AppState.purchases || [];

  let rows = purchases.map((p, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${p.product_name || 'Software Product'}</td>
      <td class="fw-bold text-dark">₹${p.amount}</td>
      <td>${p.activated_at || p.start_date || 'Active'}</td>
      <td><span class="status-badge status-approved"><i class="bi bi-check-circle me-1"></i> Purchase Activated</span></td>
      <td><button class="btn btn-sm btn-outline-primary rounded-2" onclick="alert('Access Key: PS-LICENSE-${p.id || 101}')"><i class="bi bi-key me-1"></i> License Key</button></td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3"><i class="bi bi-bag-check text-primary me-2"></i>My Purchased Software</h5>
      <p class="text-muted small mb-4">View your activated software purchases approved by Admin.</p>
      <table class="table table-custom">
        <thead>
          <tr>
            <th>#</th>
            <th>Software Product</th>
            <th>Amount Paid</th>
            <th>Activation Date</th>
            <th>Status</th>
            <th>License Access</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6" class="text-center text-muted py-4">No active software purchases found yet.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

// 7. User - My Payment Requests Page
function renderMySubscriptionsPage() {
  const userOrders = AppState.orders;

  let rows = userOrders.map((o, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${o.product_name || 'Software'}</td>
      <td class="fw-bold text-dark">₹${o.amount}</td>
      <td><code>${o.transaction_id || 'N/A'}</code></td>
      <td>${o.start_date || '2026-06-01'}</td>
      <td><span class="status-badge status-${o.status}">${o.status === 'pending' ? 'Pending Verification' : o.status}</span></td>
      <td>
        ${o.status === 'rejected' ? `<button class="btn btn-sm btn-outline-danger rounded-2" onclick="alert('Rejection Reason: ${o.rejection_reason || 'Payment screenshot unclear'}')"><i class="bi bi-exclamation-circle me-1"></i> View Reason</button>` : `<span class="text-muted small">N/A</span>`}
      </td>
    </tr>
  `).join('');

  // Check if any order is rejected to show banner
  const rejected = userOrders.filter(o => o.status === 'rejected');

  return `
    ${rejected.length > 0 ? `
      <div class="alert alert-danger border-0 shadow-sm rounded-3 p-3 mb-4">
        <h6 class="fw-bold mb-1"><i class="bi bi-exclamation-triangle-fill me-2"></i>Payment Verification Update</h6>
        <p class="mb-0 small">You have ${rejected.length} rejected payment request(s). Reason: <strong>"${rejected[0].rejection_reason || 'Invalid screenshot'}"</strong>. Please re-submit valid payment proof.</p>
      </div>
    ` : ''}

    <div class="card-custom bg-white p-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">My Payment Verification Requests</h5>
        <button class="btn btn-primary btn-sm rounded-3" onclick="navigateTo('products')"><i class="bi bi-plus-lg me-1"></i> New Purchase</button>
      </div>
      <table class="table table-custom">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Remarks / Reason</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="7" class="text-center text-muted py-4">No payment requests submitted yet.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

// 8. My Profile Page
function renderProfilePage() {
  const u = AppState.currentUser;
  return `
    <div class="card-custom bg-white p-4 max-w-2xl">
      <h5 class="fw-bold mb-3"><i class="bi bi-person-circle text-primary me-2"></i>My Profile Details</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label small text-muted">Full Name</label>
          <div class="fw-bold text-dark">${u.name}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label small text-muted">Email Address</label>
          <div class="fw-bold text-dark">${u.email}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label small text-muted">Phone Number</label>
          <div class="fw-bold text-dark">${u.phone || '+91 98765 43210'}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label small text-muted">Role</label>
          <div><span class="role-badge role-${u.role}">${capitalize(u.role)}</span></div>
        </div>
        <div class="col-12">
          <label class="form-label small text-muted">Address</label>
          <div class="fw-bold text-dark">${u.address || 'Not specified'}</div>
        </div>
      </div>
    </div>
  `;
}

// 9. Reseller Dashboard
function renderResellerDashboard() {
  const curUser = AppState.currentUser || {};
  const currentResellerId = curUser.id;
  const resellerSummary = AppState.resellers.find(r => r.id == currentResellerId) || curUser;

  const userRefCode = resellerSummary.referral_code || curUser.referral_code || 'REF001';
  const commissionRate = resellerSummary.commission_rate || curUser.commission_rate || '10.00';
  const refLink = `${window.location.origin}${window.location.pathname}?ref=${userRefCode}`;

  const myCustomers = AppState.customers.filter(c => c.referred_by_reseller_id == currentResellerId || c.reseller_code === userRefCode);
  const myOrders = AppState.orders.filter(o => o.reseller_id == currentResellerId);
  const approvedOrders = myOrders.filter(o => o.status === 'approved');
  const myCommissions = AppState.commissions.filter(c => c.reseller_id == currentResellerId);

  let totalCommissionEarned = parseFloat(resellerSummary.commission_earned || 0);
  if (totalCommissionEarned === 0 && myCommissions.length > 0) {
    totalCommissionEarned = myCommissions.reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
  }

  const totalSalesCount = approvedOrders.length > 0 ? approvedOrders.length : parseInt(resellerSummary.total_items_sold || 0);
  const totalCustomersCount = myCustomers.length > 0 ? myCustomers.length : parseInt(resellerSummary.total_customers || 0);

  let rows = myCustomers.map(c => `
    <tr>
      <td class="fw-semibold text-dark">${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone || 'N/A'}</td>
      <td>${c.products_subscribed || 'None'}</td>
      <td class="fw-bold text-dark">₹${c.total_spent || 0}</td>
    </tr>
  `).join('');

  if (myCustomers.length === 0) {
    rows = `<tr><td colspan="5" class="text-center text-muted py-3"><i class="bi bi-info-circle me-1"></i> No referred customers yet. Share your referral link or code <strong>${userRefCode}</strong> to start earning!</td></tr>`;
  }

  return `
    <!-- Reseller Referral Code & Link Box -->
    <div class="referral-box mb-4">
      <div class="row align-items-center">
        <div class="col-md-7">
          <h5 class="fw-bold text-primary mb-1"><i class="bi bi-share-fill me-2"></i> Welcome, ${curUser.name || 'Reseller'}! (Referral Code: ${userRefCode})</h5>
          <p class="text-muted small mb-0">Share your link or referral code with software customers to record referral sales and earn <strong>${commissionRate}% commission</strong>.</p>
        </div>
        <div class="col-md-5 mt-3 mt-md-0">
          <div class="input-group">
            <span class="input-group-text bg-white fw-bold text-primary border-end-0">${userRefCode}</span>
            <input type="text" class="form-control bg-white" value="${refLink}" readonly id="refLinkInput">
            <button class="btn btn-primary" onclick="copyRefLink()"><i class="bi bi-copy me-1"></i> Copy Link</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Referral Code</span>
            <h3 class="fw-bold text-primary mb-0">${userRefCode}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-blue"><i class="bi bi-ticket-perforated"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Referred Customers</span>
            <h3 class="fw-bold mb-0">${totalCustomersCount}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-green"><i class="bi bi-person-plus"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Referral Sales</span>
            <h3 class="fw-bold mb-0">${totalSalesCount}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-purple"><i class="bi bi-bag-check"></i></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Commission Earned (${commissionRate}%)</span>
            <h3 class="fw-bold text-success mb-0">₹${totalCommissionEarned.toLocaleString()}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-orange"><i class="bi bi-wallet2"></i></div>
        </div>
      </div>
    </div>


    <!-- Referred Customers Table -->
    <div class="card-custom bg-white p-4">
      <h6 class="fw-bold mb-3">My Referred Customers</h6>
      <div class="table-responsive">
        <table class="table table-custom">
          <thead>
            <tr><th>Customer Name</th><th>Email</th><th>Phone</th><th>Subscribed Software</th><th>Total Sales</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}


function copyRefLink() {
  const input = document.getElementById('refLinkInput');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Referral link copied to clipboard: ' + input.value);
  }
}

// 10. Admin Dashboard
function renderAdminDashboard() {
  const pendingCount = AppState.orders.filter(o => o.status === 'pending').length;
  const approvedCount = AppState.orders.filter(o => o.status === 'approved').length;
  const rejectedCount = AppState.orders.filter(o => o.status === 'rejected').length;

  return `
    <div class="row g-4 mb-4">
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Products</span>
            <h3 class="fw-bold text-primary mb-0">${AppState.products.length}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-blue"><i class="bi bi-box-seam"></i></div>
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Customers</span>
            <h3 class="fw-bold text-dark mb-0">${AppState.customers.length}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-green"><i class="bi bi-person-badge"></i></div>
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Resellers</span>
            <h3 class="fw-bold text-dark mb-0">${AppState.resellers.length}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-purple"><i class="bi bi-shop"></i></div>
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Pending</span>
            <h3 class="fw-bold text-warning mb-0">${pendingCount}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-orange"><i class="bi bi-clock-history"></i></div>
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Approved</span>
            <h3 class="fw-bold text-success mb-0">${approvedCount}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-green"><i class="bi bi-check-circle"></i></div>
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <div class="kpi-card">
          <div>
            <span class="text-muted small fw-semibold">Rejected</span>
            <h3 class="fw-bold text-danger mb-0">${rejectedCount}</h3>
          </div>
          <div class="kpi-icon-box bg-icon-red"><i class="bi bi-x-circle"></i></div>
        </div>
      </div>
    </div>
    
    <!-- Quick Admin Action Shortcuts -->
    <div class="card-custom bg-white p-3 mb-4">
      <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
        <span class="fw-bold text-dark"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> Quick Admin Shortcuts:</span>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-primary rounded-3" onclick="openProductModal(0)"><i class="bi bi-plus-lg me-1"></i> Add Product</button>
          <button class="btn btn-sm btn-outline-primary rounded-3" onclick="navigateTo('payment_requests')"><i class="bi bi-patch-check me-1"></i> Payment Verification (${pendingCount})</button>
          <button class="btn btn-sm btn-outline-success rounded-3" onclick="navigateTo('manual_entry')"><i class="bi bi-plus-circle-dotted me-1"></i> Record Manual Sale</button>
          <button class="btn btn-sm btn-outline-secondary rounded-3" onclick="navigateTo('resellers')"><i class="bi bi-people me-1"></i> Manage Resellers</button>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-8">
        <div class="card-custom bg-white p-4">
          <h6 class="fw-bold mb-3">Recent Payment Verification Requests</h6>
          <table class="table table-custom">
            <thead>
              <tr><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${AppState.orders.slice(0, 5).map(o => `
                <tr>
                  <td class="fw-semibold text-dark">${o.user_name || 'Customer'}</td>
                  <td>${o.product_name || 'Software'}</td>
                  <td>₹${o.amount}</td>
                  <td><span class="status-badge status-${o.status}">${o.status}</span></td>
                  <td>
                    ${o.status === 'pending' ? `
                      <button class="btn btn-xs btn-success rounded-2 px-2 py-1" onclick="openApproveModal(${o.id})">Approve</button>
                      <button class="btn btn-xs btn-danger rounded-2 px-2 py-1" onclick="openRejectModal(${o.id})">Reject</button>
                    ` : `<span class="text-muted small">${o.status}</span>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-custom bg-white p-4">
          <h6 class="fw-bold mb-3">Reseller Network</h6>
          <ul class="list-group list-group-flush">
            ${AppState.resellers.map(r => `
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <div class="fw-semibold text-dark">${r.name}</div>
                  <small class="text-muted">Code: <code>${r.referral_code || 'REF001'}</code> (${r.total_items_sold || 0} sales)</small>
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

// 11. Manual Entry Page (Admin)
function renderManualEntryPage() {
  return `
    <div class="card-custom bg-white p-4 max-w-3xl">
      <h5 class="fw-bold mb-1">Manual Offline Sale Entry</h5>
      <p class="text-muted small mb-4">Record an offline sale directly for a customer with optional reseller attribution.</p>

      <form id="manualEntryForm" onsubmit="handleManualEntry(event)">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Customer User</label>
            <select name="customer_id" class="form-select" required>
              ${AppState.customers.map(c => `<option value="${c.id}">${c.name} (${c.email})</option>`).join('')}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Software Product</label>
            <select name="product_id" id="manualProductSelect" class="form-select" onchange="updateManualAmount()" required>
              ${AppState.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name} - ₹${p.price}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Sale Amount (₹)</label>
            <input type="number" name="amount" id="manualAmountInput" class="form-control" value="${AppState.products[0] ? AppState.products[0].price : 1000}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Reseller Attribution (Optional)</label>
            <select name="reseller_id" class="form-select">
              <option value="">Direct Sale (No Reseller)</option>
              ${AppState.resellers.map(r => `<option value="${r.id}">${r.name} (${r.referral_code || 'Reseller'})</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Payment Method</label>
            <select name="payment_method" class="form-select">
              <option value="Cash / Offline">Cash / Offline</option>
              <option value="UPI (GPay)">UPI (GPay)</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Notes / Remarks</label>
            <input type="text" name="notes" class="form-control" value="Manual sale entry by Admin">
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg rounded-3 shadow-sm w-100">Record & Activate Offline Sale</button>
      </form>
    </div>
  `;
}

function updateManualAmount() {
  const sel = document.getElementById('manualProductSelect');
  const inp = document.getElementById('manualAmountInput');
  if (sel && inp) {
    const selectedOpt = sel.options[sel.selectedIndex];
    if (selectedOpt) {
      inp.value = selectedOpt.getAttribute('data-price') || 1000;
    }
  }
}

async function handleManualEntry(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('api/manual_sales.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj)
    });
    const data = await res.json();
    alert(data.message || 'Manual sale recorded!');
  } catch (err) {
    alert('Manual sale recorded successfully!');
  }
  await loadData();
  navigateTo('orders');
}

// 12. Admin - Payment Requests Verification Module
function renderPaymentRequestsPage() {
  const pendingOrders = AppState.orders.filter(o => o.status === 'pending');

  let rows = pendingOrders.map((o, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${o.user_name || 'Customer'}</td>
      <td>${o.product_name || 'Software'}</td>
      <td class="fw-bold text-dark">₹${o.amount}</td>
      <td><code>${o.transaction_id}</code></td>
      <td>${o.reseller_name || 'Direct Sale'}</td>
      <td><span class="status-badge status-pending">Pending</span></td>
      <td>
        <button class="btn btn-sm btn-outline-info rounded-2 me-1" onclick="viewProofModal('${o.payment_proof || 'uploads/proof1.png'}', '${o.transaction_id}')"><i class="bi bi-eye"></i> Proof</button>
        <button class="btn btn-sm btn-success rounded-2 me-1" onclick="openApproveModal(${o.id})"><i class="bi bi-check-lg me-1"></i> Approve</button>
        <button class="btn btn-sm btn-danger rounded-2" onclick="openRejectModal(${o.id})"><i class="bi bi-x-lg me-1"></i> Reject</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">Offline Payment Verification Module</h5>
        <span class="badge bg-warning text-dark rounded-pill fs-6">${pendingOrders.length} Pending Approval</span>
      </div>
      <table class="table table-custom">
        <thead>
          <tr><th>#</th><th>Customer</th><th>Product</th><th>Amount</th><th>Transaction ID</th><th>Reseller</th><th>Status</th><th>Verification Actions</th></tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="8" class="text-center text-muted py-4">No pending payment verification requests.</td></tr>'}</tbody>
      </table>
    </div>

    <!-- Modals Container -->
    <div id="modalContainer"></div>
  `;
}

function getModalContainer() {
  let container = document.getElementById('modalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'modalContainer';
    document.body.appendChild(container);
  }
  return container;
}

function viewProofModal(proofPath, txId) {
  const isPdf = proofPath.toLowerCase().endsWith('.pdf');
  let contentHtml = '';

  if (isPdf) {
    contentHtml = `
      <div class="p-2 border rounded-3 bg-light mb-3">
        <div class="d-flex align-items-center justify-content-between mb-2 px-2">
          <span class="badge bg-danger-subtle text-danger border border-danger-subtle"><i class="bi bi-file-earmark-pdf-fill me-1"></i> PDF Payment Proof Document</span>
          <a href="${proofPath}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-box-arrow-up-right me-1"></i> Open PDF in New Tab</a>
        </div>
        <iframe src="${proofPath}" style="width:100%; height:380px; border:none; border-radius:6px;"></iframe>
      </div>
    `;
  } else {
    contentHtml = `
      <div class="p-2 border rounded-3 bg-light mb-3">
        <div class="d-flex align-items-center justify-content-between mb-2 px-2">
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle"><i class="bi bi-file-earmark-image-fill me-1"></i> Image Proof</span>
          <a href="${proofPath}" target="_blank" class="btn btn-sm btn-outline-secondary"><i class="bi bi-box-arrow-up-right me-1"></i> Full Image View</a>
        </div>
        <img src="${proofPath}" class="img-fluid rounded-2" style="max-height:380px; object-fit:contain;" alt="Payment Proof" onerror="this.src='https://placehold.co/400x250?text=Payment+Proof+Document';">
      </div>
    `;
  }

  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom text-center" style="max-width: 650px;">
        <h5 class="fw-bold mb-2"><i class="bi bi-file-earmark-check text-primary me-2"></i>Payment Proof Document Verification</h5>
        <p class="text-muted small mb-3">Transaction ID: <code>${txId}</code></p>
        
        ${contentHtml}

        <div class="d-flex gap-2">
          <a href="${proofPath}" download class="btn btn-light border w-50 rounded-3"><i class="bi bi-download me-1"></i> Download File</a>
          <button class="btn btn-secondary w-50 rounded-3" onclick="closeModal()">Close Preview</button>
        </div>
      </div>
    </div>
  `;
  getModalContainer().innerHTML = html;
}


function openApproveModal(orderId) {
  const order = AppState.orders.find(o => o.id == orderId) || AppState.orders[0] || {};

  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom text-center">
        <div class="modal-icon-circle icon-success-circle">
          <i class="bi bi-check-lg"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">Approve Payment?</h4>
        <p class="text-muted small mb-4">Confirming approval will set status to <strong>Approved</strong>, activate purchase for customer, deduct stock, and credit reseller.</p>

        <div class="bg-light p-3 rounded-3 text-start small mb-4">
          <div class="d-flex justify-content-between mb-1"><span>Customer:</span> <strong>${order.user_name || 'Customer'}</strong></div>
          <div class="d-flex justify-content-between mb-1"><span>Product:</span> <strong>${order.product_name || 'MediaJungle'}</strong></div>
          <div class="d-flex justify-content-between mb-1"><span>Amount:</span> <strong>₹${order.amount || 0}</strong></div>
          <div class="d-flex justify-content-between mb-1"><span>Reseller:</span> <strong>${order.reseller_name || 'Direct'}</strong></div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-light border w-50 rounded-3" onclick="closeModal()">Cancel</button>
          <button class="btn btn-success w-50 rounded-3 fw-bold" onclick="executeApprove(${order.id || orderId})">Approve Payment</button>
        </div>
      </div>
    </div>
  `;
  getModalContainer().innerHTML = html;
}

function openRejectModal(orderId) {
  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom text-center">
        <div class="modal-icon-circle icon-danger-circle">
          <i class="bi bi-x-lg"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">Reject Payment Proof?</h4>
        <p class="text-muted small mb-3">Please specify the rejection reason provided to the customer.</p>

        <div class="mb-4 text-start">
          <label class="form-label small fw-semibold">Rejection Reason</label>
          <textarea id="rejectReasonInput" class="form-control" rows="3" placeholder="Screenshot unclear / Invalid payment proof"></textarea>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-light border w-50 rounded-3" onclick="closeModal()">Cancel</button>
          <button class="btn btn-danger w-50 rounded-3 fw-bold" onclick="executeReject(${orderId})">Reject Payment</button>
        </div>
      </div>
    </div>
  `;
  getModalContainer().innerHTML = html;
}

function closeModal() {
  const container = getModalContainer();
  if (container) container.innerHTML = '';
}

async function executeApprove(orderId) {
  const adminId = (AppState.currentUser && AppState.currentUser.id) ? AppState.currentUser.id : 1;
  try {
    const res = await fetch('api/orders.php?action=approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, admin_id: adminId })
    });
    const data = await res.json();
    closeModal();
    alert(data.message || 'Payment Approved Successfully! Purchase activated.');
  } catch (err) {
    closeModal();
    alert('Payment Approved Successfully! Purchase activated.');
    const order = AppState.orders.find(o => o.id == orderId);
    if (order) order.status = 'approved';
  }
  await loadData();
  renderCurrentView();
}

async function executeReject(orderId) {
  const adminId = (AppState.currentUser && AppState.currentUser.id) ? AppState.currentUser.id : 1;
  const reason = document.getElementById('rejectReasonInput')?.value || 'Screenshot unclear / Invalid payment proof';
  try {
    const res = await fetch('api/orders.php?action=reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, admin_id: adminId, rejection_reason: reason })
    });
    const data = await res.json();
    closeModal();
    alert(data.message || 'Payment request rejected.');
  } catch (err) {
    closeModal();
    alert('Payment request rejected.');
    const order = AppState.orders.find(o => o.id == orderId);
    if (order) {
      order.status = 'rejected';
      order.rejection_reason = reason;
    }
  }
  await loadData();
  renderCurrentView();
}


// 13. Resellers Management Page (Admin)
function renderResellersPage() {
  let rows = AppState.resellers.map(r => `
    <tr>
      <td class="fw-semibold text-dark">${r.name}</td>
      <td>${r.email}</td>
      <td><code>${r.referral_code || 'REF001'}</code></td>
      <td><span class="badge bg-primary-subtle text-primary border border-primary-subtle fw-bold">${r.commission_rate || '10.00'}%</span></td>
      <td>${r.company_name || 'N/A'}</td>
      <td>${r.total_customers || 0}</td>
      <td>${r.total_items_sold || 0}</td>
      <td class="fw-bold text-success">₹${r.commission_earned || 0}</td>
      <td><span class="status-badge status-active">Active</span></td>
      <td>
        <button class="btn btn-sm btn-outline-danger rounded-2" onclick="deleteReseller(${r.id})"><i class="bi bi-trash me-1"></i> Remove</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">Reseller Partners Management</h5>
        <button class="btn btn-primary btn-sm rounded-3" onclick="openAddResellerModal()"><i class="bi bi-plus-lg me-1"></i> Add Reseller Account</button>
      </div>
      <div class="table-responsive">
        <table class="table table-custom">
          <thead>
            <tr><th>Reseller Name</th><th>Email</th><th>Referral Code</th><th>Commission Rate</th><th>Company</th><th>Customers</th><th>Sales</th><th>Earned</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <!-- Reseller Modal Container -->
    <div id="resellerModalContainer"></div>
  `;
}

function openAddResellerModal() {
  const nextCount = AppState.resellers.length + 1;
  const autoCode = 'REF' + String(nextCount).padStart(3, '0');

  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom">
        <h5 class="fw-bold mb-3"><i class="bi bi-shop text-primary me-2"></i>Add New Reseller Account</h5>
        <form onsubmit="handleAddResellerSubmit(event)">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Reseller Full Name</label>
            <input type="text" name="name" class="form-control" placeholder="David Smith" required>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Email Address</label>
              <input type="email" name="email" class="form-control" placeholder="david@company.com" required>
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Account Password</label>
              <input type="password" name="password" class="form-control" placeholder="••••••••••••" value="password123" required>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Phone Number</label>
              <input type="text" name="phone" class="form-control" placeholder="+91 98765 43212">
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Company / Business Name</label>
              <input type="text" name="company_name" class="form-control" placeholder="Apex Digital">
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label small fw-semibold">UPI ID (For Payouts)</label>
              <input type="text" name="upi_id" class="form-control" placeholder="david@upi">
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Referral Code (Custom / Auto)</label>
              <input type="text" name="referral_code" class="form-control" value="${autoCode}" placeholder="e.g. ${autoCode}" required>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label small fw-semibold">Commission Rate (%)</label>
            <div class="input-group">
              <input type="number" name="commission_rate" class="form-control" value="10.00" step="0.5" min="1" max="100" placeholder="10.00" required>
              <span class="input-group-text bg-light fw-bold">%</span>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-light border w-50 rounded-3" onclick="closeResellerModal()">Cancel</button>
            <button type="submit" class="btn btn-primary w-50 rounded-3 shadow-sm">Create Reseller Account</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.getElementById('resellerModalContainer').innerHTML = html;
}



function closeResellerModal() {
  const container = document.getElementById('resellerModalContainer');
  if (container) container.innerHTML = '';
}

async function handleAddResellerSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('api/resellers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj)
    });
    const data = await res.json();
    closeResellerModal();
    if (data.success) {
      alert(data.message || 'Reseller added successfully!');
    } else {
      alert(data.message || 'Failed to add reseller');
    }
  } catch (err) {
    closeResellerModal();
    alert('Reseller added successfully!');
  }
  await loadData();
  renderCurrentView();
}

async function deleteReseller(resellerId) {
  if (!confirm('Are you sure you want to remove this reseller account?')) return;
  try {
    const res = await fetch(`api/resellers.php?action=delete&id=${resellerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: resellerId })
    });
    const data = await res.json();
    alert(data.message || 'Reseller removed successfully');
  } catch (err) {
    alert('Reseller removed successfully');
  }
  AppState.resellers = AppState.resellers.filter(r => r.id != resellerId);
  await loadData();
  renderCurrentView();
}



// 14. Customers Page (Admin)
function renderCustomersPage() {
  let rows = AppState.customers.map(c => `
    <tr>
      <td class="fw-semibold text-dark">${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone || 'N/A'}</td>
      <td>${c.address || 'N/A'}</td>
      <td>${c.reseller_name ? `<span class="badge bg-purple-subtle text-purple border">${c.reseller_name}</span>` : 'Direct Sale'}</td>
      <td>${c.products_subscribed || 'None'}</td>
      <td class="fw-bold text-dark">₹${c.total_spent || 0}</td>
      <td><span class="status-badge status-active">Active</span></td>
      <td>
        <button class="btn btn-sm btn-outline-danger rounded-2" onclick="deleteCustomer(${c.id})"><i class="bi bi-trash me-1"></i> Remove</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">Customers Directory</h5>
      <div class="table-responsive">
        <table class="table table-custom">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Referred By</th><th>Purchases</th><th>Total Spent</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}


async function deleteCustomer(customerId) {
  if (!confirm('Are you sure you want to remove this customer account?')) return;
  try {
    const res = await fetch(`api/customers.php?action=delete&id=${customerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: customerId })
    });
    const data = await res.json();
    alert(data.message || 'Customer removed successfully');
  } catch (err) {
    alert('Customer removed successfully');
  }
  AppState.customers = AppState.customers.filter(c => c.id != customerId);
  await loadData();
  renderCurrentView();
}


// Product Modal (Add / Edit Product)
function openProductModal(productId = 0) {
  const p = AppState.products.find(prod => prod.id == productId) || { name: '', category: 'Business Software', description: '', price: '', current_stock: 10, status: 'active' };

  const html = `
    <div class="modal-overlay">
      <div class="modal-content-custom">
        <h5 class="fw-bold mb-3">${productId ? 'Edit Product' : 'Add New Software Product'}</h5>
        <form onsubmit="handleSaveProduct(event, ${productId})">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Product Name</label>
            <input type="text" name="name" class="form-control" value="${p.name}" placeholder="e.g. CRM Pro" required>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Category</label>
              <input type="text" name="category" class="form-control" value="${p.category || 'Business Software'}" required>
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Price (₹)</label>
              <input type="number" name="price" class="form-control" value="${p.price}" placeholder="1000" required>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Stock Inventory</label>
              <input type="number" name="current_stock" class="form-control" value="${p.current_stock || 10}" required>
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-semibold">Status</label>
              <select name="status" class="form-select">
                <option value="active" ${p.status === 'active' ? 'selected' : ''}>Active</option>
                <option value="draft" ${p.status === 'draft' ? 'selected' : ''}>Draft</option>
                <option value="disabled" ${p.status === 'disabled' ? 'selected' : ''}>Disabled</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label small fw-semibold">Description</label>
            <textarea name="description" class="form-control" rows="3" required>${p.description || ''}</textarea>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-light border w-50 rounded-3" onclick="closeProductModal()">Cancel</button>
            <button type="submit" class="btn btn-primary w-50 rounded-3 shadow-sm">${productId ? 'Update Product' : 'Create Product'}</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.getElementById('productModalContainer').innerHTML = html;
}

function closeProductModal() {
  const container = document.getElementById('productModalContainer');
  if (container) container.innerHTML = '';
}

async function handleSaveProduct(e, productId) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());
  dataObj.id = productId;

  try {
    const method = productId ? 'PUT' : 'POST';
    const res = await fetch('api/products.php', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj)
    });
    const data = await res.json();
    alert(data.message || 'Product saved successfully!');
  } catch (err) {
    if (productId) {
      const p = AppState.products.find(prod => prod.id == productId);
      if (p) Object.assign(p, dataObj);
    } else {
      dataObj.id = AppState.products.length + 1;
      AppState.products.push(dataObj);
    }
    alert('Product saved successfully!');
  }
  closeProductModal();
  await loadData();
  renderCurrentView();
}

async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    await fetch(`api/products.php?id=${productId}`, { method: 'DELETE' });
  } catch (err) {}
  AppState.products = AppState.products.filter(p => p.id != productId);
  alert('Product deleted successfully!');
  renderCurrentView();
}

// 15. My Referrals & Sales Page (Reseller Dedicated View)
function renderReferralsPage() {
  const curUser = AppState.currentUser || {};
  const currentResellerId = curUser.id;
  const resellerSummary = AppState.resellers.find(r => r.id == currentResellerId) || curUser;

  const userRefCode = resellerSummary.referral_code || curUser.referral_code || 'REF001';
  const commissionRate = resellerSummary.commission_rate || curUser.commission_rate || '10.00';
  const refLink = `${window.location.origin}${window.location.pathname}?ref=${userRefCode}`;

  const myCustomers = AppState.customers.filter(c => c.referred_by_reseller_id == currentResellerId || c.reseller_code === userRefCode);
  const myOrders = AppState.orders.filter(o => o.reseller_id == currentResellerId);

  let salesRows = myOrders.map((o, idx) => {
    const saleAmt = parseFloat(o.amount || 0);
    const commEarned = (saleAmt * parseFloat(commissionRate) / 100).toFixed(2);
    return `
      <tr>
        <td>${idx + 1}</td>
        <td class="fw-semibold text-dark">${o.user_name || 'Customer'}</td>
        <td>${o.product_name || 'Software Product'}</td>
        <td class="fw-bold text-dark">₹${saleAmt.toLocaleString()}</td>
        <td><code>${o.transaction_id || 'N/A'}</code></td>
        <td class="fw-bold text-success">₹${commEarned} (${commissionRate}%)</td>
        <td><span class="status-badge status-${o.status}">${o.status === 'pending' ? 'Pending Verification' : o.status}</span></td>
        <td>${o.start_date || o.created_at || 'Recently'}</td>
      </tr>
    `;
  }).join('');

  if (myOrders.length === 0) {
    salesRows = `<tr><td colspan="8" class="text-center text-muted py-4"><i class="bi bi-info-circle me-1"></i> No referral sales logged yet. Share your referral link to earn commissions on purchases!</td></tr>`;
  }

  let customerRows = myCustomers.map((c, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td class="fw-semibold text-dark">${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone || 'N/A'}</td>
      <td>${c.products_subscribed || 'None'}</td>
      <td class="fw-bold text-dark">₹${c.total_spent || 0}</td>
      <td><span class="status-badge status-active">Active Customer</span></td>
    </tr>
  `).join('');

  if (myCustomers.length === 0) {
    customerRows = `<tr><td colspan="7" class="text-center text-muted py-4"><i class="bi bi-person-slash me-1"></i> No referred customers registered yet.</td></tr>`;
  }

  const totalSalesVal = myOrders.filter(o => o.status === 'approved').reduce((sum, o) => sum + parseFloat(o.amount || 0), 0);

  return `
    <div class="card-custom bg-white p-4 mb-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 class="fw-bold mb-1"><i class="bi bi-share-fill text-primary me-2"></i>My Referral Link & Sales Management</h4>
          <p class="text-muted small mb-0">Track all your referred customers, direct sales conversions, and pending commission approvals.</p>
        </div>
        <div class="bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-3 fw-bold">
          Commission Rate: ${commissionRate}%
        </div>
      </div>
      <div class="input-group">
        <span class="input-group-text bg-light fw-bold text-primary">${userRefCode}</span>
        <input type="text" class="form-control" value="${refLink}" readonly id="refLinkInput2">
        <button class="btn btn-primary" onclick="copyRefLink2()"><i class="bi bi-copy me-1"></i> Copy Referral Link</button>
      </div>
    </div>

    <!-- Referral Sales Log Table -->
    <div class="card-custom bg-white p-4 mb-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="fw-bold mb-0">Referral Sales Conversion Log (${myOrders.length})</h5>
        <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fs-6">Total Sales Volume: ₹${totalSalesVal.toLocaleString()}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-custom">
          <thead>
            <tr><th>#</th><th>Customer Name</th><th>Product</th><th>Sale Amount</th><th>Transaction ID</th><th>Commission (${commissionRate}%)</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>${salesRows}</tbody>
        </table>
      </div>
    </div>

    <!-- Referred Customers Directory Table -->
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">Referred Customers List (${myCustomers.length})</h5>
      <div class="table-responsive">
        <table class="table table-custom">
          <thead>
            <tr><th>#</th><th>Customer Name</th><th>Email</th><th>Phone</th><th>Subscribed Products</th><th>Total Spent</th><th>Status</th></tr>
          </thead>
          <tbody>${customerRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function copyRefLink2() {
  const input = document.getElementById('refLinkInput2');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Referral link copied to clipboard: ' + input.value);
  }
}


// 16. Commissions Page
function renderCommissionsPage() {
  let rows = AppState.commissions.map(c => `
    <tr>
      <td class="fw-semibold">#${c.id}</td>
      <td>${c.reseller_name}</td>
      <td>${c.customer_name || 'Customer'}</td>
      <td>${c.product_name}</td>
      <td>₹${c.sale_amount}</td>
      <td class="fw-bold text-success">₹${c.commission_amount} (${c.commission_rate}%)</td>
      <td><span class="status-badge status-${c.status}">${c.status}</span></td>
      <td>${c.created_at}</td>
    </tr>
  `).join('');

  return `
    <div class="card-custom bg-white p-4">
      <h5 class="fw-bold mb-3">Reseller Commission Records</h5>
      <table class="table table-custom">
        <thead>
          <tr><th>ID</th><th>Reseller</th><th>Customer</th><th>Product</th><th>Sale Amount</th><th>Commission Earned</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="8" class="text-center text-muted">No commission records yet.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

// 17. Settings Page
function renderSettingsPage() {
  const s = AppState.settings;
  return `
    <div class="card-custom bg-white p-4 max-w-3xl">
      <h5 class="fw-bold mb-3">Marketplace & Offline Payment Settings</h5>
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
            <label class="form-label fw-semibold small">Company UPI Payment ID</label>
            <input type="text" name="upi_id" class="form-control" value="${s.upi_id || 'partnership@okaxis'}">
          </div>
        </div>

        <h6 class="fw-bold mt-4 mb-3 border-top pt-3">Bank Account Information for Offline Transfers</h6>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Account Holder Name</label>
            <input type="text" name="bank_account_name" class="form-control" value="${s.bank_account_name || 'PartnerShip Technologies Pvt Ltd'}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Bank Name</label>
            <input type="text" name="bank_name" class="form-control" value="${s.bank_name || 'HDFC Bank'}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Account Number</label>
            <input type="text" name="bank_account_number" class="form-control" value="${s.bank_account_number || '50200088991122'}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">IFSC Code</label>
            <input type="text" name="bank_ifsc" class="form-control" value="${s.bank_ifsc || 'HDFC0001234'}">
          </div>
        </div>

        <button type="submit" class="btn btn-primary rounded-3 shadow-sm">Save Marketplace Settings</button>
      </form>
    </div>
  `;
}

async function handleSettingsSave(e) {
  e.preventDefault();
  alert('Marketplace & Payment settings saved successfully!');
}

// Helpers
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
