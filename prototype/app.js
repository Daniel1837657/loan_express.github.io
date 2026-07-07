const PRODUCTS = [
  {
    id: "personal",
    name: "Credito Personal",
    min: 3000,
    max: 50000,
    rate: 1.3,
    terms: [12, 24, 36, 48, 60],
    description: "Financiacion para necesidades personales con proceso digital y seguimiento en linea."
  },
  {
    id: "libre",
    name: "Credito Libre Inversion",
    min: 60000,
    max: 200000,
    rate: 1.3,
    terms: [12, 24, 36, 48, 60],
    description: "Capital para proyectos, consolidacion o inversion con plazos flexibles."
  }
];

const STATES = ["borrador", "enviada", "documentacion_pendiente", "en_revision", "aprobada", "rechazada", "cancelada"];
const STORAGE_KEY = "loanExpressPortal";

const I18N = {
  es: {
    nav_about: "Nosotros",
    nav_services: "Servicios",
    nav_requirements: "Requisitos",
    nav_faq: "FAQ",
    nav_contact: "Contacto",
    nav_login: "Ingresar",
    nav_apply: "Solicitar credito",
    hero_eyebrow: "Credito digital serio y transparente",
    hero_title: "Loan Express",
    hero_copy: "Solicita credito personal o de libre inversion, adjunta tus documentos y consulta el estado desde un solo lugar.",
    start_request: "Iniciar solicitud",
    see_requirements: "Ver requisitos",
    amount_range: "Rango de montos",
    fixed_rate: "Tasa fija",
    terms_months: "Meses de plazo",
    services_eyebrow: "Productos financieros",
    services_title: "Dos opciones claras para tu necesidad",
    about_eyebrow: "Institucional",
    about_title: "Profesionalismo para decisiones financieras importantes",
    about_intro: "Loan Express acompana a personas que necesitan credito en linea con un proceso claro, documentado y orientado a la confianza.",
    history_title: "Historia",
    history_copy: "Loan Express nace para facilitar el acceso a soluciones de credito a clientes que necesitan una evaluacion seria, especialmente migrantes, colombianos en el exterior y personas que requieren una alternativa financiera formal.",
    mission_title: "Mision",
    mission_copy: "Facilitar acceso a credito mediante procesos digitales, claros y responsables.",
    vision_title: "Vision",
    vision_copy: "Ser una entidad reconocida por confianza, rapidez y acompanamiento serio a sus clientes.",
    values_title: "Valores",
    values_copy: "Transparencia, seguridad, cumplimiento y respeto por la informacion del cliente.",
    commitment_title: "Compromiso",
    commitment_copy: "Cada solicitud se revisa con criterios definidos, proteccion de datos y comunicacion por correo durante el proceso.",
    requirements_eyebrow: "Antes de solicitar",
    requirements_title: "Requisitos para solicitar",
    req_docs: "Documentos aceptados",
    req_docs_copy: "Identidad, pasaporte, permiso de trabajo, matricula consular, Social Security u otros habilitados.",
    req_files: "Archivos",
    req_files_copy: "PDF o imagen, maximo 10 MB por archivo.",
    req_terms: "Condiciones",
    req_terms_copy: "Monto dentro del producto elegido, plazo de 12, 24, 36, 48 o 60 meses y al menos un documento de identidad.",
    faq_title: "Preguntas frecuentes",
    contact_eyebrow: "Contacto",
    contact_title: "Habla con Loan Express",
    contact_copy: "Envianos tus datos y un asesor revisara tu mensaje.",
    name: "Nombre",
    email: "Correo",
    message: "Mensaje",
    send: "Enviar"
  },
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_requirements: "Requirements",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_login: "Login",
    nav_apply: "Apply",
    hero_eyebrow: "Serious and transparent digital credit",
    hero_title: "Loan Express",
    hero_copy: "Apply for a personal or open-purpose loan, upload documents and track your status in one place.",
    start_request: "Start application",
    see_requirements: "See requirements",
    amount_range: "Amount range",
    fixed_rate: "Fixed rate",
    terms_months: "Loan terms",
    services_eyebrow: "Financial products",
    services_title: "Two clear options for your need",
    about_eyebrow: "Institutional",
    about_title: "Professional support for important financial decisions",
    about_intro: "Loan Express supports people who need online credit through a clear, documented and trust-oriented process.",
    history_title: "History",
    history_copy: "Loan Express was created to facilitate access to credit solutions for customers who need a serious review, especially migrants, Colombians abroad and people who require a formal financial alternative.",
    mission_title: "Mission",
    mission_copy: "Enable access to credit through clear, responsible digital processes.",
    vision_title: "Vision",
    vision_copy: "Be recognized for trust, speed and serious customer support.",
    values_title: "Values",
    values_copy: "Transparency, security, compliance and respect for customer information.",
    commitment_title: "Commitment",
    commitment_copy: "Each application is reviewed under defined criteria, data protection and email communication during the process.",
    requirements_eyebrow: "Before applying",
    requirements_title: "Application requirements",
    req_docs: "Accepted documents",
    req_docs_copy: "ID, passport, work permit, consular registration, Social Security or other enabled documents.",
    req_files: "Files",
    req_files_copy: "PDF or image, maximum 10 MB per file.",
    req_terms: "Conditions",
    req_terms_copy: "Amount within the selected product range, 12, 24, 36, 48 or 60 month term and at least one identity document.",
    faq_title: "Frequently asked questions",
    contact_eyebrow: "Contact",
    contact_title: "Talk to Loan Express",
    contact_copy: "Send us your details and an advisor will review your message.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send"
  }
};

let state = loadState();
let currentUser = state.sessionEmail ? state.users.find((user) => user.email === state.sessionEmail) : null;

function seedState() {
  const now = new Date().toISOString();
  return {
    lang: "es",
    sessionEmail: "",
    users: [
      { id: "u-admin", email: "admin@loanexpress.com", password: "Admin123", role: "admin", status: "activo", createdAt: now },
      { id: "u-client", email: "cliente@loanexpress.com", password: "Cliente123", role: "cliente", status: "activo", createdAt: now }
    ],
    clients: [
      {
        id: "c-1",
        userId: "u-client",
        firstName: "Maria",
        lastName: "Gomez",
        email: "cliente@loanexpress.com",
        phone: "+1 555 0100",
        docType: "Pasaporte",
        docNumber: "P123456",
        birthDate: "1990-05-12",
        originCountry: "Colombia",
        address: "120 Main St",
        occupation: "Asistente administrativa",
        company: "Servicios Latam",
        monthlyIncome: 4200,
        createdAt: now,
        updatedAt: now
      }
    ],
    requests: [
      {
        id: "r-1",
        number: "LE-2026-000001",
        clientId: "c-1",
        productId: "personal",
        amount: 18000,
        term: 24,
        rate: 1.3,
        status: "en_revision",
        clientNotes: "Necesito consolidar gastos familiares.",
        adminNotes: "",
        createdAt: now,
        updatedAt: now,
        history: [
          { from: "borrador", to: "enviada", by: "cliente@loanexpress.com", comment: "Solicitud enviada.", date: now },
          { from: "enviada", to: "en_revision", by: "admin@loanexpress.com", comment: "Documentos recibidos.", date: now }
        ],
        documents: [
          { type: "identidad", name: "pasaporte.pdf", size: 340000, mime: "application/pdf", uploadedAt: now }
        ]
      }
    ],
    notifications: [
      { userId: "u-client", type: "bienvenida", channel: "correo", subject: "Bienvenida a Loan Express", summary: "Cuenta creada correctamente.", date: now, status: "enviado" }
    ]
  };
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedState();
  try {
    return JSON.parse(stored);
  } catch {
    return seedState();
  }
}

function saveState() {
  state.sessionEmail = currentUser ? currentUser.email : "";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function statusLabel(status) {
  const labels = {
    borrador: "Borrador",
    enviada: "Enviada",
    documentacion_pendiente: "Documentacion pendiente",
    en_revision: "En revision",
    aprobada: "Aprobada",
    rechazada: "Rechazada",
    cancelada: "Cancelada"
  };
  return labels[status] || status;
}

function statusClass(status) {
  return status.replaceAll("_", "-");
}

function productById(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function getClientByUser(userId) {
  return state.clients.find((client) => client.userId === userId);
}

function getRequestClient(request) {
  return state.clients.find((client) => client.id === request.clientId);
}

function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");
  window.setTimeout(() => element.classList.remove("show"), 3200);
}

function applyLanguage() {
  const lang = state.lang || "es";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (I18N[lang][key]) element.textContent = I18N[lang][key];
  });
  document.getElementById("langToggle").textContent = lang === "es" ? "EN" : "ES";
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = PRODUCTS.map((product) => `
    <article class="product-card">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <ul>
        <li>Monto: ${formatMoney(product.min)} - ${formatMoney(product.max)}</li>
        <li>Tasa fija: ${product.rate}%</li>
        <li>Plazos: ${product.terms.join(", ")} meses</li>
      </ul>
      <button class="primary-button" data-view="register" data-product="${product.id}" type="button">Solicitar</button>
    </article>
  `).join("");
}

function renderFaq() {
  document.getElementById("faqList").innerHTML = [
    ["Puedo solicitar si tengo reportes en centrales?", "Si. Puedes iniciar la solicitud; la evaluacion se realiza manualmente por el equipo administrativo."],
    ["Debo verificar mi correo?", "No. Despues del registro puedes completar perfil y solicitar credito."],
    ["Que documentos son minimos?", "Al menos un documento de identidad. El administrador puede pedir documentacion adicional."],
    ["Como se notifican los cambios?", "Los cambios de estado se notifican por correo electronico."]
  ].map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
}

function hideAppViews() {
  document.getElementById("authView").classList.add("hidden");
  document.getElementById("clientApp").classList.add("hidden");
  document.getElementById("adminApp").classList.add("hidden");
  document.querySelectorAll("main > section:not(.auth-screen):not(.app-shell)").forEach((section) => section.classList.remove("hidden"));
}

function showOnlyApp(id) {
  document.querySelectorAll("main > section").forEach((section) => section.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAuth(mode) {
  showOnlyApp("authView");
  const titles = { login: "Ingresar", register: "Crear cuenta", recover: "Recuperar contrasena" };
  document.getElementById("authView").innerHTML = `
    <div class="auth-card">
      <h2>${titles[mode]}</h2>
      <p class="small-note">${mode === "register" ? "El correo sera unico por cuenta." : "Usa tus credenciales de Loan Express."}</p>
      <form id="authForm">
        <label>Correo<input type="email" name="email" required autocomplete="email"></label>
        ${mode !== "recover" ? `<label>Contrasena<input type="password" name="password" required autocomplete="${mode === "login" ? "current-password" : "new-password"}"></label>` : ""}
        ${mode === "register" ? `<label>Confirmar contrasena<input type="password" name="confirm" required></label>` : ""}
        <button class="primary-button" type="submit">${titles[mode]}</button>
      </form>
      <p class="small-note">
        ${mode !== "login" ? `<button class="ghost-button" data-view="login" type="button">Ya tengo cuenta</button>` : `<button class="ghost-button" data-view="recover" type="button">Recuperar contrasena</button> <button class="ghost-button" data-view="register" type="button">Crear cuenta</button>`}
      </p>
    </div>
  `;
  document.getElementById("authForm").addEventListener("submit", (event) => handleAuthSubmit(event, mode));
}

function handleAuthSubmit(event, mode) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const email = data.email.trim().toLowerCase();
  if (mode === "recover") {
    toast("Te enviamos las instrucciones de recuperacion a " + email);
    renderAuth("login");
    return;
  }
  if (mode === "register") {
    if (state.users.some((user) => user.email === email)) return toast("Ese correo ya existe.");
    if (data.password.length < 6) return toast("La contrasena debe tener al menos 6 caracteres.");
    if (data.password !== data.confirm) return toast("Las contrasenas no coinciden.");
    const user = { id: crypto.randomUUID(), email, password: data.password, role: "cliente", status: "activo", createdAt: new Date().toISOString() };
    state.users.push(user);
    state.notifications.push({ userId: user.id, type: "bienvenida", channel: "correo", subject: "Bienvenida a Loan Express", summary: "Cuenta creada correctamente.", date: new Date().toISOString(), status: "enviado" });
    currentUser = user;
    saveState();
    toast("Cuenta creada. Te enviamos un correo de bienvenida.");
    renderClient("profile");
    return;
  }
  const user = state.users.find((candidate) => candidate.email === email && candidate.password === data.password);
  if (!user) return toast("Credenciales invalidas.");
  currentUser = user;
  saveState();
  user.role === "admin" ? renderAdmin("requests") : renderClient(getClientByUser(user.id) ? "requests" : "profile");
}

function renderClient(tab = "requests") {
  showOnlyApp("clientApp");
  const workspace = document.getElementById("clientWorkspace");
  if (tab === "profile") workspace.innerHTML = clientProfileHtml();
  if (tab === "requests") workspace.innerHTML = clientRequestsHtml();
  if (tab === "new") workspace.innerHTML = newRequestHtml();
  bindClientEvents();
}

function clientProfileHtml() {
  const client = getClientByUser(currentUser.id) || {};
  return `
    <div class="workspace-card">
      <div class="toolbar"><h2>Mi perfil</h2><span class="small-note">Fecha de nacimiento e ingresos son obligatorios.</span></div>
      <form id="profileForm" class="form-grid">
        ${input("firstName", "Nombre", client.firstName, true)}
        ${input("lastName", "Apellido", client.lastName, true)}
        ${input("phone", "Telefono", client.phone, true)}
        ${select("docType", "Tipo documento", ["Identidad", "Pasaporte", "Permiso de trabajo", "Matricula consular", "Social Security"], client.docType)}
        ${input("docNumber", "Numero documento", client.docNumber, true)}
        ${input("birthDate", "Fecha nacimiento", client.birthDate, true, "date")}
        ${input("originCountry", "Pais origen", client.originCountry, true)}
        ${input("address", "Direccion", client.address, true)}
        ${input("occupation", "Ocupacion", client.occupation, true)}
        ${input("company", "Empresa", client.company, true)}
        ${input("monthlyIncome", "Ingresos mensuales", client.monthlyIncome, true, "number")}
        <button class="primary-button full" type="submit">Guardar perfil</button>
      </form>
    </div>
  `;
}

function clientRequestsHtml() {
  const client = getClientByUser(currentUser.id);
  if (!client) return `<div class="workspace-card"><h2>Completa tu perfil</h2><p>Antes de solicitar credito debes guardar tus datos personales.</p><button class="primary-button" data-client-tab="profile" type="button">Completar perfil</button></div>`;
  const requests = state.requests.filter((request) => request.clientId === client.id);
  return `
    <div class="toolbar">
      <h2>Mis solicitudes</h2>
      <button class="primary-button" data-client-tab="new" type="button">Nueva solicitud</button>
    </div>
    ${requests.length ? requestTable(requests, false) : `<div class="workspace-card"><h3>Sin solicitudes</h3><p>Crea tu primera solicitud de credito.</p></div>`}
    ${notificationsHtml(currentUser.id)}
  `;
}

function newRequestHtml() {
  const client = getClientByUser(currentUser.id);
  if (!client) return clientRequestsHtml();
  return `
    <div class="workspace-card">
      <h2>Nueva solicitud</h2>
      <form id="requestForm" class="steps">
        <div class="step">
          <h3>Paso 1: Producto</h3>
          ${select("productId", "Producto", PRODUCTS.map((product) => product.name), "", PRODUCTS.map((product) => product.id))}
        </div>
        <div class="step form-grid">
          <h3 class="full">Paso 2: Condiciones</h3>
          ${input("amount", "Monto solicitado", "", true, "number")}
          ${select("term", "Plazo", ["12 meses", "24 meses", "36 meses", "48 meses", "60 meses"], "", ["12", "24", "36", "48", "60"])}
          <label class="full">Observaciones<textarea name="clientNotes"></textarea></label>
        </div>
        <div class="step">
          <h3>Paso 3: Documentos</h3>
          <p class="small-note">Sube al menos un documento de identidad. PDF o imagen, maximo 10 MB.</p>
          ${select("documentType", "Tipo documento", ["identidad", "pasaporte", "permiso_trabajo", "matricula_consular", "social_security", "otro"])}
          <label>Archivo<input type="file" name="documentFile" accept=".pdf,image/*" required></label>
        </div>
        <div class="step">
          <h3>Paso 4: Confirmar</h3>
          <button class="primary-button" type="submit">Enviar solicitud</button>
        </div>
      </form>
    </div>
  `;
}

function bindClientEvents() {
  document.getElementById("profileForm")?.addEventListener("submit", saveProfile);
  document.getElementById("requestForm")?.addEventListener("submit", submitRequest);
}

function saveProfile(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (state.clients.some((client) => client.docNumber === data.docNumber && client.userId !== currentUser.id)) return toast("El numero de documento ya existe.");
  const existing = getClientByUser(currentUser.id);
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: currentUser.email,
    phone: data.phone,
    docType: data.docType,
    docNumber: data.docNumber,
    birthDate: data.birthDate,
    originCountry: data.originCountry,
    address: data.address,
    occupation: data.occupation,
    company: data.company,
    monthlyIncome: Number(data.monthlyIncome),
    updatedAt: new Date().toISOString()
  };
  if (existing) Object.assign(existing, payload);
  else state.clients.push({ id: crypto.randomUUID(), userId: currentUser.id, createdAt: new Date().toISOString(), ...payload });
  saveState();
  toast("Perfil guardado.");
  renderClient("requests");
}

function submitRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const product = productById(data.productId);
  const amount = Number(data.amount);
  const term = Number(data.term);
  const file = form.documentFile.files[0];
  if (!product) return toast("Selecciona un producto.");
  if (amount < product.min || amount > product.max) return toast(`El monto debe estar entre ${formatMoney(product.min)} y ${formatMoney(product.max)}.`);
  if (!product.terms.includes(term)) return toast("Plazo no permitido.");
  if (!file) return toast("Debes subir al menos un documento.");
  if (file.size > 10 * 1024 * 1024) return toast("El archivo supera 10 MB.");
  if (!file.type.startsWith("image/") && file.type !== "application/pdf") return toast("Solo se permiten PDF o imagen.");
  const client = getClientByUser(currentUser.id);
  const now = new Date().toISOString();
  const number = `LE-2026-${String(state.requests.length + 1).padStart(6, "0")}`;
  state.requests.push({
    id: crypto.randomUUID(),
    number,
    clientId: client.id,
    productId: product.id,
    amount,
    term,
    rate: product.rate,
    status: "enviada",
    clientNotes: data.clientNotes,
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
    history: [{ from: "borrador", to: "enviada", by: currentUser.email, comment: "Solicitud enviada.", date: now }],
    documents: [{ type: data.documentType, name: file.name, size: file.size, mime: file.type, uploadedAt: now }]
  });
  saveState();
  toast("Solicitud enviada. Estado: Enviada.");
  renderClient("requests");
}

function renderAdmin(tab = "requests") {
  showOnlyApp("adminApp");
  const workspace = document.getElementById("adminWorkspace");
  workspace.innerHTML = tab === "clients" ? adminClientsHtml() : adminRequestsHtml();
  bindAdminEvents();
}

function adminRequestsHtml() {
  return `
    <div class="toolbar">
      <h2>Solicitudes</h2>
      <div class="toolbar">
        <input id="adminSearch" placeholder="Buscar cliente, correo o numero">
        <select id="statusFilter"><option value="">Todos los estados</option>${STATES.map((status) => `<option value="${status}">${statusLabel(status)}</option>`).join("")}</select>
      </div>
    </div>
    <div id="adminRequestTable">${requestTable(state.requests, true)}</div>
  `;
}

function adminClientsHtml() {
  return `
    <div class="toolbar"><h2>Clientes</h2></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Nombre</th><th>Documento</th><th>Correo</th><th>Solicitudes</th></tr></thead>
        <tbody>
          ${state.clients.map((client) => `
            <tr>
              <td>${client.firstName} ${client.lastName}</td>
              <td>${client.docType} ${client.docNumber}</td>
              <td>${client.email}</td>
              <td>${state.requests.filter((request) => request.clientId === client.id).length}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindAdminEvents() {
  document.getElementById("adminSearch")?.addEventListener("input", filterAdminRequests);
  document.getElementById("statusFilter")?.addEventListener("change", filterAdminRequests);
}

function filterAdminRequests() {
  const term = document.getElementById("adminSearch").value.trim().toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const filtered = state.requests.filter((request) => {
    const client = getRequestClient(request);
    const haystack = `${request.number} ${client?.firstName || ""} ${client?.lastName || ""} ${client?.email || ""}`.toLowerCase();
    return (!status || request.status === status) && (!term || haystack.includes(term));
  });
  document.getElementById("adminRequestTable").innerHTML = requestTable(filtered, true);
}

function requestTable(requests, admin) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Numero</th><th>Cliente</th><th>Producto</th><th>Monto</th><th>Estado</th><th>Fecha</th><th>Accion</th></tr></thead>
        <tbody>
          ${requests.map((request) => {
            const client = getRequestClient(request);
            const product = productById(request.productId);
            return `
              <tr>
                <td>${request.number}</td>
                <td>${client ? `${client.firstName} ${client.lastName}<br><span class="small-note">${client.email}</span>` : "Sin cliente"}</td>
                <td>${product?.name || ""}</td>
                <td>${formatMoney(request.amount)}</td>
                <td><span class="badge ${statusClass(request.status)}">${statusLabel(request.status)}</span></td>
                <td>${formatDate(request.createdAt)}</td>
                <td><button class="secondary-button" onclick="${admin ? `openAdminDetail('${request.id}')` : `openClientDetail('${request.id}')`}" type="button">Ver</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function openClientDetail(id) {
  const request = state.requests.find((item) => item.id === id);
  document.getElementById("clientWorkspace").innerHTML = detailHtml(request, false);
}

function openAdminDetail(id) {
  const request = state.requests.find((item) => item.id === id);
  document.getElementById("adminWorkspace").innerHTML = detailHtml(request, true);
  document.getElementById("statusForm").addEventListener("submit", (event) => changeStatus(event, request.id));
}

function detailHtml(request, admin) {
  const client = getRequestClient(request);
  const product = productById(request.productId);
  return `
    <div class="workspace-card">
      <div class="toolbar">
        <div><h2>${request.number}</h2><p class="small-note">${product.name} · ${formatMoney(request.amount)} · ${request.term} meses · tasa ${request.rate}%</p></div>
        <span class="badge ${statusClass(request.status)}">${statusLabel(request.status)}</span>
      </div>
      <h3>Cliente</h3>
      <p>${client.firstName} ${client.lastName} · ${client.email} · ${client.phone}<br>${client.docType}: ${client.docNumber}</p>
      <h3>Documentos</h3>
      <ul class="document-list">${request.documents.map((doc) => `<li>${doc.type}: ${doc.name} (${Math.round(doc.size / 1024)} KB) · ${doc.mime}</li>`).join("")}</ul>
      <h3>Historial</h3>
      <ul class="history-list">${request.history.map((item) => `<li>${formatDate(item.date)} · ${statusLabel(item.from)} → ${statusLabel(item.to)} · ${item.by}<br><span class="small-note">${item.comment || "Sin comentario"}</span></li>`).join("")}</ul>
      ${admin ? adminStatusForm(request) : ""}
    </div>
  `;
}

function adminStatusForm(request) {
  return `
    <form id="statusForm" class="panel-form">
      <h3>Cambiar estado</h3>
      ${select("status", "Nuevo estado", STATES.filter((status) => status !== "borrador").map(statusLabel), request.status, STATES.filter((status) => status !== "borrador"))}
      <label>Comentario<textarea name="comment" placeholder="Obligatorio para rechazo o documentacion pendiente"></textarea></label>
      <button class="primary-button" type="submit">Guardar cambio y notificar</button>
    </form>
  `;
}

function changeStatus(event, requestId) {
  event.preventDefault();
  const request = state.requests.find((item) => item.id === requestId);
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (["rechazada", "documentacion_pendiente"].includes(data.status) && !data.comment.trim()) return toast("El comentario es obligatorio para ese estado.");
  const previous = request.status;
  const now = new Date().toISOString();
  request.status = data.status;
  request.updatedAt = now;
  request.history.push({ from: previous, to: data.status, by: currentUser.email, comment: data.comment, date: now });
  const client = getRequestClient(request);
  const user = state.users.find((candidate) => candidate.id === client.userId);
  state.notifications.push({ userId: user.id, type: "cambio_estado", channel: "correo", subject: `Estado actualizado: ${statusLabel(data.status)}`, summary: `La solicitud ${request.number} cambio a ${statusLabel(data.status)}.`, date: now, status: "enviado" });
  saveState();
  toast("Estado actualizado. El cliente recibira una notificacion por correo.");
  openAdminDetail(requestId);
}

function notificationsHtml(userId) {
  const items = state.notifications.filter((notification) => notification.userId === userId);
  return `
    <div class="workspace-card" style="margin-top:18px">
      <h3>Notificaciones</h3>
      <ul class="notification-list">${items.map((item) => `<li>${item.subject}<br><span class="small-note">${item.channel} · ${formatDate(item.date)} · ${item.status}</span></li>`).join("")}</ul>
    </div>
  `;
}

function input(name, label, value = "", required = false, type = "text") {
  return `<label>${label}<input name="${name}" type="${type}" value="${value ?? ""}" ${required ? "required" : ""}></label>`;
}

function select(name, label, labels, selected = "", values = labels) {
  return `
    <label>${label}
      <select name="${name}" required>
        <option value="">Selecciona</option>
        ${labels.map((optionLabel, index) => {
          const value = values[index];
          return `<option value="${value}" ${String(selected) === String(value) ? "selected" : ""}>${optionLabel}</option>`;
        }).join("")}
      </select>
    </label>
  `;
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) renderAuth(viewButton.dataset.view);
  const clientTab = event.target.closest("[data-client-tab]");
  if (clientTab) renderClient(clientTab.dataset.clientTab);
  const adminTab = event.target.closest("[data-admin-tab]");
  if (adminTab) renderAdmin(adminTab.dataset.adminTab);
  if (event.target.closest("[data-action='logout']")) {
    currentUser = null;
    saveState();
    hideAppViews();
    toast("Sesion cerrada.");
  }
});

document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "es" ? "en" : "es";
  saveState();
  applyLanguage();
});
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  toast("Mensaje recibido. Un asesor revisara tu solicitud de contacto.");
});

renderProducts();
renderFaq();
applyLanguage();
saveState();
