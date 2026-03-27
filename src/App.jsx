import { useState, useRef, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => setDarkMode(prev => !prev)

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bill-generator" element={<BillGenerator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/json-fixer" element={<JSONFixer />} />
            <Route path="/json-viewer" element={<JSONViewer />} />
            <Route path="/html-viewer" element={<HTMLViewer />} />
            <Route path="/html-editor" element={<HTMLEditor />} />
            <Route path="/exam-generator" element={<ExamGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="home">
      <div className="container">
        <h2>Welcome to TOOLBOX AI</h2>
        <p>Select a tool from the navigation above to get started.</p>
        <div className="tool-grid">
          <Link to="/bill-generator" className="tool-card">
            <h3>Bill Generator</h3>
            <p>Create professional bills and invoices</p>
          </Link>
          <Link to="/password-generator" className="tool-card">
            <h3>Password Generator</h3>
            <p>Generate secure random passwords</p>
          </Link>
          <Link to="/json-fixer" className="tool-card">
            <h3>JSON Fixer</h3>
            <p>Fix and format broken JSON data</p>
          </Link>
          <Link to="/json-viewer" className="tool-card">
            <h3>JSON Viewer</h3>
            <p>Pretty-print JSON for easy reading</p>
          </Link>
          <Link to="/html-viewer" className="tool-card">
            <h3>HTML Viewer</h3>
            <p>Paste HTML and see live preview</p>
          </Link>
          <Link to="/html-editor" className="tool-card">
            <h3>HTML Editor</h3>
            <p>Paste or upload content, get HTML with CSS</p>
          </Link>
          <Link to="/exam-generator" className="tool-card">
            <h3>Exam Generator</h3>
            <p>Upload image, generate print-ready exam PDF</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Header({ toggleTheme, darkMode }) {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <h1>TOOLBOX AI</h1>
        </Link>
        <nav>
          <ul>
            <li><NavLink to="/bill-generator">Bill Generator</NavLink></li>
            <li><NavLink to="/password-generator">Password Generator</NavLink></li>
            <li><NavLink to="/json-fixer">JSON Fixer</NavLink></li>
            <li><NavLink to="/json-viewer">JSON Viewer</NavLink></li>
            {/* <li><NavLink to="/html-viewer">HTML Viewer</NavLink></li>
            <li><NavLink to="/html-editor">HTML Editor</NavLink></li>
            <li><NavLink to="/exam-generator">Exam Generator</NavLink></li> */}
            <li>
              <button onClick={toggleTheme} className="theme-toggle-btn">
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const BILL_TYPES = [
  { id: 'fuel', label: 'Fuel Bill' },
  { id: 'driver', label: 'Driver Salary' },
  { id: 'helper', label: 'Daily Helper Bill' },
  { id: 'rent', label: 'Rent Receipt' },
  { id: 'book', label: 'Book Invoice' },
  { id: 'internet', label: 'Internet Bill' },
  { id: 'restaurant', label: 'Restaurant Bill' },
  { id: 'lta', label: 'LTA Receipt' },
  { id: 'ecom', label: 'E-Com Invoice' },
  { id: 'general', label: 'General Bill' },
  { id: 'recharge', label: 'Recharge Receipt' },
  { id: 'medical', label: 'Medical Bill' },
  { id: 'stationary', label: 'Stationary Bill' },
  { id: 'cab', label: 'Cab & Travel Bill' },
  { id: 'mart', label: 'Mart Bill' },
  { id: 'gym', label: 'Gym Bill' },
  { id: 'hotel', label: 'Hotel Bill' },
  { id: 'newspaper', label: 'News Paper Bill' },
]

const BILL_FIELDS = {
  fuel: [
    { name: 'station', label: 'Fuel Station Name', type: 'text' },
    { name: 'fuelType', label: 'Fuel Type', type: 'select', options: ['Petrol', 'Diesel', 'CNG', 'EV Charging'] },
    { name: 'litres', label: 'Litres/Units', type: 'number' },
    { name: 'rate', label: 'Rate per Litre/Unit', type: 'number' },
    { name: 'vehicle', label: 'Vehicle Number', type: 'text' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  driver: [
    { name: 'driverName', label: 'Driver Name', type: 'text' },
    { name: 'employer', label: 'Employer Name', type: 'text' },
    { name: 'month', label: 'Salary Month', type: 'month' },
    { name: 'amount', label: 'Salary Amount', type: 'number' },
    { name: 'date', label: 'Payment Date', type: 'date' },
  ],
  helper: [
    { name: 'helperName', label: 'Helper Name', type: 'text' },
    { name: 'employer', label: 'Employer Name', type: 'text' },
    { name: 'month', label: 'Month', type: 'month' },
    { name: 'workDays', label: 'Working Days', type: 'number' },
    { name: 'amount', label: 'Total Amount', type: 'number' },
    { name: 'date', label: 'Payment Date', type: 'date' },
  ],
  rent: [
    { name: 'landlord', label: 'Landlord Name', type: 'text' },
    { name: 'tenant', label: 'Tenant Name', type: 'text' },
    { name: 'address', label: 'Property Address', type: 'text' },
    { name: 'month', label: 'Rent Month', type: 'month' },
    { name: 'amount', label: 'Rent Amount', type: 'number' },
    { name: 'date', label: 'Payment Date', type: 'date' },
  ],
  book: [
    { name: 'store', label: 'Book Store Name', type: 'text' },
    { name: 'buyer', label: 'Buyer Name', type: 'text' },
    { name: 'items', label: 'Books (one per line: Title, Price)', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  internet: [
    { name: 'provider', label: 'Internet Provider', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'plan', label: 'Plan Name', type: 'text' },
    { name: 'accountId', label: 'Account/ID Number', type: 'text' },
    { name: 'amount', label: 'Bill Amount', type: 'number' },
    { name: 'billingPeriod', label: 'Billing Period', type: 'month' },
    { name: 'date', label: 'Due Date', type: 'date' },
  ],
  restaurant: [
    { name: 'restaurant', label: 'Restaurant Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'items', label: 'Items (one per line: Item, Price)', type: 'textarea' },
    { name: 'tax', label: 'Tax %', type: 'number' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  lta: [
    { name: 'employee', label: 'Employee Name', type: 'text' },
    { name: 'company', label: 'Company Name', type: 'text' },
    { name: 'travelFrom', label: 'Travel From', type: 'text' },
    { name: 'travelTo', label: 'Travel To', type: 'text' },
    { name: 'mode', label: 'Mode of Travel', type: 'select', options: ['Flight', 'Train', 'Bus', 'Car'] },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'date', label: 'Travel Date', type: 'date' },
  ],
  ecom: [
    { name: 'platform', label: 'Platform Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'orderId', label: 'Order ID', type: 'text' },
    { name: 'items', label: 'Items (one per line: Item, Price)', type: 'textarea' },
    { name: 'shipping', label: 'Shipping Charge', type: 'number' },
    { name: 'date', label: 'Order Date', type: 'date' },
  ],
  general: [
    { name: 'businessName', label: 'Business Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'items', label: 'Items (one per line: Item, Price)', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  recharge: [
    { name: 'provider', label: 'Service Provider', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'mobile', label: 'Mobile Number', type: 'text' },
    { name: 'plan', label: 'Plan Details', type: 'text' },
    { name: 'amount', label: 'Recharge Amount', type: 'number' },
    { name: 'date', label: 'Recharge Date', type: 'date' },
  ],
  medical: [
    { name: 'hospital', label: 'Hospital/Clinic Name', type: 'text' },
    { name: 'patient', label: 'Patient Name', type: 'text' },
    { name: 'doctor', label: 'Doctor Name', type: 'text' },
    { name: 'items', label: 'Services/Medicines (one per line: Item, Price)', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  stationary: [
    { name: 'store', label: 'Store Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'items', label: 'Items (one per line: Item, Price)', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  cab: [
    { name: 'service', label: 'Cab Service', type: 'text' },
    { name: 'passenger', label: 'Passenger Name', type: 'text' },
    { name: 'pickup', label: 'Pickup Location', type: 'text' },
    { name: 'drop', label: 'Drop Location', type: 'text' },
    { name: 'distance', label: 'Distance (km)', type: 'number' },
    { name: 'amount', label: 'Fare Amount', type: 'number' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  mart: [
    { name: 'store', label: 'Mart/Store Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'items', label: 'Items (one per line: Item, Price)', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  gym: [
    { name: 'gym', label: 'Gym Name', type: 'text' },
    { name: 'member', label: 'Member Name', type: 'text' },
    { name: 'plan', label: 'Membership Plan', type: 'select', options: ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'] },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
  ],
  hotel: [
    { name: 'hotel', label: 'Hotel Name', type: 'text' },
    { name: 'guest', label: 'Guest Name', type: 'text' },
    { name: 'roomType', label: 'Room Type', type: 'select', options: ['Single', 'Double', 'Suite', 'Deluxe'] },
    { name: 'checkIn', label: 'Check-in Date', type: 'date' },
    { name: 'checkOut', label: 'Check-out Date', type: 'date' },
    { name: 'nights', label: 'Number of Nights', type: 'number' },
    { name: 'ratePerNight', label: 'Rate per Night', type: 'number' },
    { name: 'tax', label: 'Tax %', type: 'number' },
  ],
  newspaper: [
    { name: 'vendor', label: 'Vendor/Agency Name', type: 'text' },
    { name: 'customer', label: 'Customer Name', type: 'text' },
    { name: 'newspaper', label: 'Newspaper Name', type: 'text' },
    { name: 'month', label: 'Month', type: 'month' },
    { name: 'amount', label: 'Monthly Amount', type: 'number' },
    { name: 'date', label: 'Payment Date', type: 'date' },
  ],
}

function parseLineItems(text) {
  return text.split('\n').filter(l => l.trim()).map(line => {
    const parts = line.split(',')
    if (parts.length >= 2) {
      const name = parts[0].trim()
      const price = parseFloat(parts[parts.length - 1].trim())
      if (!isNaN(price)) return { name, price }
    }
    return null
  }).filter(Boolean)
}

function generateBillText(type, fields, formData) {
  const d = formData
  const billLabel = BILL_TYPES.find(b => b.id === type)?.label || 'Bill'
  let lines = []
  lines.push(`${'='.repeat(44)}`)
  lines.push(`${billLabel.toUpperCase()}`)
  lines.push(`${'='.repeat(44)}`)

  // Header info based on type
  fields.forEach(f => {
    if (f.type === 'textarea') return
    const val = d[f.name]
    if (val) lines.push(`${f.label}: ${val}`)
  })

  // Line items if present
  const itemsField = fields.find(f => f.type === 'textarea')
  let itemsTotal = 0
  if (itemsField && d[itemsField.name]) {
    const items = parseLineItems(d[itemsField.name])
    if (items.length) {
      lines.push(`${'-'.repeat(44)}`)
      lines.push(`${'Item'.padEnd(30)}${'Amount'.padStart(14)}`)
      lines.push(`${'-'.repeat(44)}`)
      items.forEach(item => {
        lines.push(`${item.name.padEnd(30)}${ ('$' + item.price.toFixed(2)).padStart(14)}`)
        itemsTotal += item.price
      })
    }
  }

  // Calculate total
  let total = itemsTotal
  if (!itemsField && d.amount) total = parseFloat(d.amount) || 0
  if (d.litres && d.rate) total = (parseFloat(d.litres) || 0) * (parseFloat(d.rate) || 0)
  if (d.nights && d.ratePerNight) total = (parseFloat(d.nights) || 0) * (parseFloat(d.ratePerNight) || 0)

  const shipping = parseFloat(d.shipping) || 0
  const taxPct = parseFloat(d.tax) || 0
  const taxAmt = total * (taxPct / 100)

  lines.push(`${'-'.repeat(44)}`)
  if (shipping) lines.push(`${'Shipping'.padEnd(30)}${ ('$' + shipping.toFixed(2)).padStart(14)}`)
  if (taxPct) lines.push(`${'Tax (' + taxPct + '%)'.padEnd(30)}${ ('$' + taxAmt.toFixed(2)).padStart(14)}`)
  const grandTotal = total + shipping + taxAmt
  lines.push(`${'TOTAL'.padEnd(30)}${ ('$' + grandTotal.toFixed(2)).padStart(14)}`)
  lines.push(`${'='.repeat(44)}`)

  return lines.join('\n')
}

function BillGenerator() {
  const [selectedType, setSelectedType] = useState(null)
  const [formData, setFormData] = useState({})

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId)
    setFormData({})
  }

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const fields = selectedType ? BILL_FIELDS[selectedType] : []
  const hasAnyData = selectedType && Object.values(formData).some(v => v)
  const billPreview = hasAnyData ? generateBillText(selectedType, fields, formData) : ''

  return (
    <section className="tool-section bill-section">
      <div className="container">
        <h2>Bill Generator</h2>
        <div className="bill-type-grid">
          {BILL_TYPES.map(bt => (
            <button
              key={bt.id}
              className={`bill-type-pill ${selectedType === bt.id ? 'bill-type-active' : ''}`}
              onClick={() => handleTypeSelect(bt.id)}
            >
              {bt.label}
            </button>
          ))}
        </div>

        {selectedType && (
          <div className="bill-split-panel">
            <div className="bill-left">
              <div className="bill-form">
                {fields.map(f => (
                  <div className="bill-field" key={f.name}>
                    <label htmlFor={`bill-${f.name}`}>{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={`bill-${f.name}`}
                        rows="4"
                        value={formData[f.name] || ''}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                        placeholder="e.g.&#10;Item One, 25.00&#10;Item Two, 15.50"
                      />
                    ) : f.type === 'select' ? (
                      <select
                        id={`bill-${f.name}`}
                        value={formData[f.name] || ''}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      >
                        <option value="">Select...</option>
                        {f.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`bill-${f.name}`}
                        type={f.type}
                        value={formData[f.name] || ''}
                        onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bill-right">
              <div className="bill-preview-header">Live Preview</div>
              <div className="bill-output">
                {billPreview ? (
                  <pre>{billPreview}</pre>
                ) : (
                  <p className="bill-placeholder">Start filling the form to see the bill here...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const getStrength = () => {
    let score = 0
    if (includeUppercase) score++
    if (includeLowercase) score++
    if (includeNumbers) score++
    if (includeSymbols) score++
    if (length >= 12) score++
    if (length >= 20) score++
    if (score <= 2) return { label: 'Weak', color: '#e74c3c', width: '25%' }
    if (score <= 3) return { label: 'Fair', color: '#f39c12', width: '50%' }
    if (score <= 4) return { label: 'Strong', color: '#27ae60', width: '75%' }
    return { label: 'Very Strong', color: '#2ecc71', width: '100%' }
  }

  const generatePassword = () => {
    let charset = ''
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (charset === '') {
      setPassword('')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
    setCopied(false)
  }

  const copyPassword = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strength = getStrength()

  return (
    <section className="tool-section pw-section">
      <div className="container">
        <h2>Password Generator</h2>

        <div className="pw-output-box">
          <span className={`pw-password ${password ? '' : 'pw-placeholder'}`}>
            {password || 'Click generate to create a password'}
          </span>
          <div className="pw-output-actions">
            <button onClick={copyPassword} className="pw-icon-btn" title="Copy">
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={generatePassword} className="pw-icon-btn pw-refresh-btn" title="Regenerate">
              Refresh
            </button>
          </div>
        </div>

        <div className="pw-strength-bar-wrap">
          <div className="pw-strength-bar">
            <div
              className="pw-strength-fill"
              style={{ width: strength.width, backgroundColor: strength.color }}
            />
          </div>
          <span className="pw-strength-label" style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>

        <div className="pw-controls">
          <div className="pw-slider-group">
            <div className="pw-slider-header">
              <label htmlFor="passwordLength">Password Length</label>
              <span className="pw-length-value">{length}</span>
            </div>
            <input
              type="range"
              id="passwordLength"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="4"
              max="64"
              className="pw-slider"
            />
            <div className="pw-slider-labels">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          <div className="pw-options">
            <label className={`pw-toggle ${includeUppercase ? 'pw-toggle-active' : ''}`}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span className="pw-toggle-switch" />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className={`pw-toggle ${includeLowercase ? 'pw-toggle-active' : ''}`}>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span className="pw-toggle-switch" />
              <span>Lowercase (a-z)</span>
            </label>
            <label className={`pw-toggle ${includeNumbers ? 'pw-toggle-active' : ''}`}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span className="pw-toggle-switch" />
              <span>Numbers (0-9)</span>
            </label>
            <label className={`pw-toggle ${includeSymbols ? 'pw-toggle-active' : ''}`}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span className="pw-toggle-switch" />
              <span>Symbols (!@#$%)</span>
            </label>
          </div>
        </div>

        <button onClick={generatePassword} className="pw-generate-btn">
          Generate Password
        </button>
      </div>
    </section>
  )
}

function JSONFixer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    if (!value.trim()) {
      setOutput('')
      setError('')
      return
    }
    try {
      const fixed = value
        .replace(/'/g, '"')
        .replace(/(?<!")True(?!")/g, 'true')
        .replace(/(?<!")TRUE(?!")/g, 'true')
        .replace(/(?<!")False(?!")/g, 'false')
        .replace(/(?<!")FALSE(?!")/g, 'false')
        .replace(/(?<!")None(?!")/g, 'null')
      const parsed = JSON.parse(fixed)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (err) {
      setOutput('')
      setError(err.message)
    }
  }

  const handleClear = (side) => {
    if (side === 'left') { setInput(''); setOutput(''); setError('') }
    else { setOutput(''); setError('') }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getLineNumbers = (text) => {
    if (!text) return '1'
    const lines = text.split('\n').length
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n')
  }

  return (
    <section className="tool-section json-viewer-section">
      <div className="container">
        <h2>JSON Fixer</h2>
        <div className="jv-split-panel">
          <div className="jv-editor-wrap">
            <div className="jv-editor-toolbar">
              <span>Input</span>
              <div>
                <button onClick={() => handleCopy(input)} className="jv-btn-sm" title="Copy">Copy</button>
                <button onClick={() => handleClear('left')} className="jv-btn-sm" title="Clear">Clear</button>
              </div>
            </div>
            <div className="jv-editor">
              <div className="jv-line-numbers">{getLineNumbers(input)}</div>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder={"Paste your broken JSON here...\n\n{'name': 'John', 'age': 30}"}
                spellCheck={false}
                wrap="soft"
              />
            </div>
          </div>
          <div className="jv-editor-wrap">
            <div className="jv-editor-toolbar">
              <span>Fixed Output</span>
              <div>
                <button onClick={() => handleCopy(output)} className="jv-btn-sm" title="Copy">Copy</button>
                <button onClick={() => handleClear('right')} className="jv-btn-sm" title="Clear">Clear</button>
              </div>
            </div>
            <div className="jv-editor">
              <div className="jv-line-numbers">{getLineNumbers(error ? `Error: ${error}` : output)}</div>
              <textarea
                value={error ? `Error: ${error}` : output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Fixed output will appear here..."
                spellCheck={false}
                wrap="soft"
                className={error ? 'jv-error-text' : ''}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JSONViewer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    if (!value.trim()) {
      setOutput('')
      setError('')
      return
    }
    try {
      const parsed = JSON.parse(value)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err) {
      setOutput('')
      setError(err.message)
    }
  }

  const handleClear = (side) => {
    if (side === 'left') { setInput(''); setOutput(''); setError('') }
    else { setOutput(''); setError('') }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getLineNumbers = (text) => {
    if (!text) return '1'
    const lines = text.split('\n').length
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n')
  }

  return (
    <section className="tool-section json-viewer-section">
      <div className="container">
        <h2>JSON Viewer</h2>
        <div className="jv-split-panel">
          <div className="jv-editor-wrap">
            <div className="jv-editor-toolbar">
              <span>Input</span>
              <div>
                <button onClick={() => handleCopy(input)} className="jv-btn-sm" title="Copy">Copy</button>
                <button onClick={() => handleClear('left')} className="jv-btn-sm" title="Clear">Clear</button>
              </div>
            </div>
            <div className="jv-editor">
              <div className="jv-line-numbers">{getLineNumbers(input)}</div>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Paste your JSON here..."
                spellCheck={false}
                wrap="soft"
              />
            </div>
          </div>
          <div className="jv-editor-wrap">
            <div className="jv-editor-toolbar">
              <span>Output</span>
              <div>
                <button onClick={() => handleCopy(output)} className="jv-btn-sm" title="Copy">Copy</button>
                <button onClick={() => handleClear('right')} className="jv-btn-sm" title="Clear">Clear</button>
              </div>
            </div>
            <div className="jv-editor">
              <div className="jv-line-numbers">{getLineNumbers(error ? `Error: ${error}` : output)}</div>
              <textarea
                value={error ? `Error: ${error}` : output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Formatted output will appear here..."
                spellCheck={false}
                wrap="soft"
                className={error ? 'jv-error-text' : ''}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HTMLViewer() {
  const [html, setHtml] = useState('')
  const [leftWidth, setLeftWidth] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true

    const onMouseMove = (e) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const pct = (x / rect.width) * 100
      setLeftWidth(Math.min(Math.max(pct, 15), 85))
    }

    const onMouseUp = () => {
      dragging.current = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <section className="hv-section">
      <div className="container">
        <div className="hv-split-panel" ref={containerRef}>
          <div className="hv-pane" style={{ width: `${leftWidth}%` }}>
            <textarea
              className="hv-code"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder={"Paste your HTML here...\n\n<h1>Hello World</h1>"}
              spellCheck={false}
              wrap="soft"
            />
          </div>
          <div className="hv-divider" onMouseDown={onMouseDown}>
            <div className="hv-divider-handle" />
          </div>
          <div className="hv-pane" style={{ width: `${100 - leftWidth}%` }}>
            <div className="hv-preview">
              {html ? (
                <iframe
                  title="HTML Preview"
                  srcDoc={html}
                  sandbox="allow-scripts"
                  className="hv-iframe"
                />
              ) : (
                <p className="hv-placeholder">Preview will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HTMLEditor() {
  const [content, setContent] = useState('')
  const [showSource, setShowSource] = useState(false)
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const getHtmlWithCss = () => {
    if (!editorRef.current) return ''
    const innerHtml = editorRef.current.innerHTML
    const styles = window.getComputedStyle(editorRef.current)
    const css = `
      body {
        font-family: ${styles.fontFamily};
        font-size: ${styles.fontSize};
        line-height: ${styles.lineHeight};
        color: ${styles.color};
        padding: 20px;
      }
      h1, h2, h3, h4, h5, h6 { margin: 0.5em 0; }
      p { margin: 0.5em 0; }
      ul, ol { margin: 0.5em 0; padding-left: 2em; }
      table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
      td, th { border: 1px solid #ccc; padding: 8px; }
      img { max-width: 100%; }
      b, strong { font-weight: bold; }
      i, em { font-style: italic; }
      u { text-decoration: underline; }
    `.trim()
    return `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${css}\n</style>\n</head>\n<body>\n${innerHtml}\n</body>\n</html>`
  }

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    if (file.type === 'text/html' || file.name.endsWith('.html') || file.name.endsWith('.htm')) {
      reader.onload = (ev) => {
        if (editorRef.current) editorRef.current.innerHTML = ev.target.result
      }
      reader.readAsText(file)
    } else {
      reader.onload = (ev) => {
        if (editorRef.current) editorRef.current.innerHTML = ev.target.result
      }
      reader.readAsText(file)
    }
    e.target.value = ''
  }

  const handleSourceChange = (e) => {
    setContent(e.target.value)
  }

  const toggleSource = () => {
    if (showSource) {
      if (editorRef.current) editorRef.current.innerHTML = content
    } else {
      setContent(editorRef.current?.innerHTML || '')
    }
    setShowSource(!showSource)
  }

  const handleCopyHtml = () => {
    const html = getHtmlWithCss()
    navigator.clipboard.writeText(html)
  }

  const handleDownloadHtml = () => {
    const html = getHtmlWithCss()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="tool-section he-section">
      <div className="container">
        <h2>HTML Editor</h2>
        <div className="he-toolbar">
          <button
            onClick={toggleSource}
            className={`he-btn he-source-btn ${showSource ? 'he-source-active' : ''}`}
            title="Toggle HTML source"
          >
            Source
          </button>
          <div className="he-divider-v" />
          <button onClick={() => execCmd('bold')} className="he-btn" title="Bold"><b>B</b></button>
          <button onClick={() => execCmd('italic')} className="he-btn" title="Italic"><i>I</i></button>
          <button onClick={() => execCmd('underline')} className="he-btn" title="Underline"><u>U</u></button>
          <button onClick={() => execCmd('strikeThrough')} className="he-btn" title="Strikethrough"><s>S</s></button>
          <div className="he-divider-v" />
          <button onClick={() => execCmd('justifyLeft')} className="he-btn" title="Align Left">Left</button>
          <button onClick={() => execCmd('justifyCenter')} className="he-btn" title="Align Center">Center</button>
          <button onClick={() => execCmd('justifyRight')} className="he-btn" title="Align Right">Right</button>
          <div className="he-divider-v" />
          <button onClick={() => execCmd('insertUnorderedList')} className="he-btn" title="Bullet List">UL</button>
          <button onClick={() => execCmd('insertOrderedList')} className="he-btn" title="Number List">OL</button>
          <div className="he-divider-v" />
          <select
            onChange={(e) => { if (e.target.value) execCmd('formatBlock', e.target.value); e.target.value = '' }}
            className="he-select"
            defaultValue=""
          >
            <option value="" disabled>Heading</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="p">Paragraph</option>
          </select>
          <select
            onChange={(e) => { if (e.target.value) execCmd('fontSize', e.target.value); e.target.value = '' }}
            className="he-select"
            defaultValue=""
          >
            <option value="" disabled>Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
          <div className="he-divider-v" />
          <label className="he-btn" title="Text Color">
            Color
            <input
              type="color"
              className="he-color-input"
              onChange={(e) => execCmd('foreColor', e.target.value)}
            />
          </label>
          <label className="he-btn" title="Highlight">
            Highlight
            <input
              type="color"
              className="he-color-input"
              defaultValue="#ffff00"
              onChange={(e) => execCmd('hiliteColor', e.target.value)}
            />
          </label>
          <div className="he-divider-v" />
          <button onClick={() => fileInputRef.current?.click()} className="he-btn" title="Upload file">Upload</button>
          <input ref={fileInputRef} type="file" accept=".html,.htm,.txt,.rtf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
          <button onClick={handleCopyHtml} className="he-btn" title="Copy HTML">Copy HTML</button>
          <button onClick={handleDownloadHtml} className="he-btn" title="Download HTML">Download</button>
        </div>
        <div className="he-editor-wrap">
          {showSource ? (
            <textarea
              className="he-source-editor"
              value={content}
              onChange={handleSourceChange}
              spellCheck={false}
            />
          ) : (
            <div
              ref={editorRef}
              className="he-editor"
              contentEditable
              suppressContentEditableWarning
            />
          )}
        </div>
      </div>
    </section>
  )
}

function ExamGenerator() {
  const [images, setImages] = useState([])
  const [examHtml, setExamHtml] = useState('')
  const [showSource, setShowSource] = useState(false)
  const [step, setStep] = useState('upload')
  const [ocrProgress, setOcrProgress] = useState(null)
  const [ocrStatus, setOcrStatus] = useState('')
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)
  const [examInfo, setExamInfo] = useState({
    school: '',
    exam: '',
    subject: '',
    class: '',
    date: '',
    time: '',
    maxMarks: '',
    instructions: 'All questions are compulsory.\nWrite neat and clean.\nMarks are indicated against each question.',
  })

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          setImages(prev => [...prev, { src: ev.target.result, name: file.name }])
        }
        reader.readAsDataURL(file)
      }
    })
    e.target.value = ''
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleInfoChange = (field, value) => {
    setExamInfo(prev => ({ ...prev, [field]: value }))
  }

  const textToHtml = (text) => {
    const lines = text.split('\n').filter(l => l.trim())
    let html = ''
    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) return
      // Detect question numbers like "1.", "Q1.", "Q.1", "(a)", "i)", etc
      if (/^(Q\.?\s*\d+|q\.?\s*\d+|\d+\s*[\.\)\:]|\(\s*[a-zA-Z]\s*\)|[a-zA-Z]\s*[\.\)])/.test(trimmed)) {
        // Check if it looks like a section header (all caps or short)
        if (/^(SECTION|Section|PART|Part)/i.test(trimmed)) {
          html += `<h3 style="margin:16px 0 8px 0; font-size:15px; text-decoration:underline;">${trimmed}</h3>\n`
        } else {
          html += `<p style="margin:8px 0 4px 0;"><b>${trimmed}</b></p>\n`
        }
      } else if (/^(SECTION|Section|PART|Part|NOTE|Note|OR|or)/i.test(trimmed)) {
        html += `<h3 style="margin:16px 0 8px 0; font-size:15px; text-align:center; text-decoration:underline;">${trimmed}</h3>\n`
      } else if (/^\(?\s*[a-d]\s*\)/.test(trimmed)) {
        // Multiple choice option
        html += `<p style="margin:2px 0 2px 30px;">${trimmed}</p>\n`
      } else {
        html += `<p style="margin:4px 0;">${trimmed}</p>\n`
      }
    })
    return html
  }

  const generateExamHtml = async () => {
    if (images.length === 0) {
      alert('Please upload at least one image')
      return
    }

    setOcrProgress(0)
    setOcrStatus('Loading OCR engine...')

    const Tesseract = await import('tesseract.js')

    let allExtractedHtml = ''
    for (let i = 0; i < images.length; i++) {
      setOcrStatus(`Reading image ${i + 1} of ${images.length}...`)
      setOcrProgress(Math.round(((i) / images.length) * 100))

      const result = await Tesseract.recognize(images[i].src, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const imgProgress = Math.round(m.progress * 100)
            const totalProgress = Math.round(((i + m.progress) / images.length) * 100)
            setOcrProgress(totalProgress)
            setOcrStatus(`Reading image ${i + 1} of ${images.length}... ${imgProgress}%`)
          }
        }
      })

      allExtractedHtml += textToHtml(result.data.text)
      if (i < images.length - 1) {
        allExtractedHtml += `<hr style="border:none; border-top:1px dashed #999; margin:20px 0;">\n`
      }
    }

    // Build full exam HTML
    const info = examInfo
    const instructionLines = info.instructions.split('\n').filter(l => l.trim())
    let html = ''

    html += `<div style="text-align:center; margin-bottom:20px;">\n`
    if (info.school) html += `  <h2 style="margin:0 0 4px 0; font-size:20px;">${info.school}</h2>\n`
    if (info.exam) html += `  <h3 style="margin:0 0 4px 0; font-size:16px; font-weight:normal;">${info.exam}</h3>\n`
    if (info.subject) html += `  <h3 style="margin:0; font-size:16px;">${info.subject}</h3>\n`
    html += `</div>\n`

    if (info.class || info.date || info.time || info.maxMarks) {
      html += `<div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px;">\n`
      html += `  <div>\n`
      if (info.class) html += `    <div><b>Class:</b> ${info.class}</div>\n`
      if (info.date) html += `    <div><b>Date:</b> ${info.date}</div>\n`
      html += `  </div>\n`
      html += `  <div style="text-align:right;">\n`
      if (info.time) html += `    <div><b>Time:</b> ${info.time}</div>\n`
      if (info.maxMarks) html += `    <div><b>Max Marks:</b> ${info.maxMarks}</div>\n`
      html += `  </div>\n`
      html += `</div>\n`
    }

    html += `<hr style="border:1px solid #000; margin:10px 0;">\n`

    if (instructionLines.length) {
      html += `<div style="margin-bottom:16px; font-size:13px;">\n`
      html += `  <b>General Instructions:</b>\n  <ol style="margin:4px 0; padding-left:20px;">\n`
      instructionLines.forEach(line => {
        html += `    <li>${line.trim()}</li>\n`
      })
      html += `  </ol>\n</div>\n`
      html += `<hr style="border:1px solid #000; margin:10px 0;">\n`
    }

    html += allExtractedHtml

    setExamHtml(html)
    setOcrProgress(null)
    setOcrStatus('')
    setStep('edit')
  }

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const toggleSource = () => {
    if (showSource) {
      if (editorRef.current) editorRef.current.innerHTML = examHtml
    } else {
      setExamHtml(editorRef.current?.innerHTML || '')
    }
    setShowSource(!showSource)
  }

  const getFullHtml = () => {
    const body = showSource ? examHtml : (editorRef.current?.innerHTML || '')
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @page { size: A4; margin: 15mm; }
  body { font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.6; color: #000; padding: 0; margin: 0; }
  h2, h3 { font-family: 'Arial', sans-serif; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border: 1px solid #000; padding: 6px 10px; }
</style>
</head>
<body>
${body}
</body>
</html>`
  }

  const handleDownloadPdf = () => {
    const html = getFullHtml()
    const printWindow = window.open('', '_blank')
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  const handleDownloadHtml = () => {
    const html = getFullHtml()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'exam.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="tool-section eg-section">
      <div className="container">
        <h2>Exam Generator</h2>

        {step === 'upload' && (
          <div className="eg-upload-step">
            <div className="eg-split">
              <div className="eg-info-panel">
                <h3>Exam Details</h3>
                <div className="eg-field">
                  <label>School / Institution Name</label>
                  <input type="text" value={examInfo.school} onChange={(e) => handleInfoChange('school', e.target.value)} placeholder="e.g. Delhi Public School" />
                </div>
                <div className="eg-field">
                  <label>Exam Name</label>
                  <input type="text" value={examInfo.exam} onChange={(e) => handleInfoChange('exam', e.target.value)} placeholder="e.g. Half Yearly Examination 2026" />
                </div>
                <div className="eg-field">
                  <label>Subject</label>
                  <input type="text" value={examInfo.subject} onChange={(e) => handleInfoChange('subject', e.target.value)} placeholder="e.g. Mathematics" />
                </div>
                <div className="eg-row">
                  <div className="eg-field">
                    <label>Class</label>
                    <input type="text" value={examInfo.class} onChange={(e) => handleInfoChange('class', e.target.value)} placeholder="e.g. X-A" />
                  </div>
                  <div className="eg-field">
                    <label>Date</label>
                    <input type="text" value={examInfo.date} onChange={(e) => handleInfoChange('date', e.target.value)} placeholder="e.g. 15-04-2026" />
                  </div>
                </div>
                <div className="eg-row">
                  <div className="eg-field">
                    <label>Time Allowed</label>
                    <input type="text" value={examInfo.time} onChange={(e) => handleInfoChange('time', e.target.value)} placeholder="e.g. 3 Hours" />
                  </div>
                  <div className="eg-field">
                    <label>Max Marks</label>
                    <input type="text" value={examInfo.maxMarks} onChange={(e) => handleInfoChange('maxMarks', e.target.value)} placeholder="e.g. 80" />
                  </div>
                </div>
                <div className="eg-field">
                  <label>Instructions (one per line)</label>
                  <textarea rows="4" value={examInfo.instructions} onChange={(e) => handleInfoChange('instructions', e.target.value)} />
                </div>
              </div>

              <div className="eg-image-panel">
                <h3>Upload Question Images</h3>
                <div
                  className="eg-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const files = Array.from(e.dataTransfer.files)
                    files.forEach(file => {
                      if (file.type.startsWith('image/')) {
                        const reader = new FileReader()
                        reader.onload = (ev) => setImages(prev => [...prev, { src: ev.target.result, name: file.name }])
                        reader.readAsDataURL(file)
                      }
                    })
                  }}
                >
                  <p>Click or drag & drop images here</p>
                  <p className="eg-dropzone-sub">PNG, JPG, JPEG — photos of question papers</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageUpload} />

                {images.length > 0 && (
                  <div className="eg-image-list">
                    {images.map((img, i) => (
                      <div key={i} className="eg-image-thumb">
                        <img src={img.src} alt={img.name} />
                        <span className="eg-thumb-label">Page {i + 1}</span>
                        <button className="eg-remove-btn" onClick={() => removeImage(i)}>X</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {ocrProgress !== null ? (
              <div className="eg-progress-wrap">
                <div className="eg-progress-bar">
                  <div className="eg-progress-fill" style={{ width: `${ocrProgress}%` }} />
                </div>
                <p className="eg-progress-text">{ocrStatus}</p>
              </div>
            ) : (
              <button className="eg-generate-btn" onClick={generateExamHtml} disabled={images.length === 0}>
                Extract Text & Generate Exam Paper
              </button>
            )}
          </div>
        )}

        {step === 'edit' && (
          <div className="wd">
            {/* Menu bar */}
            <div className="wd-menu">
              <button onClick={() => { setStep('upload'); setShowSource(false) }} className="wd-menu-item">File</button>
              <span className="wd-menu-item wd-menu-active">Home</span>
              <button onClick={toggleSource} className={`wd-menu-item ${showSource ? 'wd-menu-active' : ''}`}>Source</button>
              <div className="wd-menu-right">
                <button onClick={handleDownloadHtml} className="wd-action-btn">Download HTML</button>
                <button onClick={handleDownloadPdf} className="wd-action-btn wd-print-btn">Print / Save PDF</button>
              </div>
            </div>

            {/* Ribbon toolbar */}
            <div className="wd-ribbon">
              {/* Clipboard group */}
              <div className="wd-group">
                <div className="wd-group-btns">
                  <button onClick={() => execCmd('undo')} className="wd-btn" title="Undo">&#8630;</button>
                  <button onClick={() => execCmd('redo')} className="wd-btn" title="Redo">&#8631;</button>
                </div>
                <span className="wd-group-label">Clipboard</span>
              </div>

              <div className="wd-sep" />

              {/* Font group */}
              <div className="wd-group">
                <div className="wd-group-btns">
                  <select onChange={(e) => { if (e.target.value) execCmd('fontName', e.target.value) }} className="wd-select wd-font-select" defaultValue="Times New Roman">
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                  </select>
                  <select onChange={(e) => { if (e.target.value) execCmd('fontSize', e.target.value) }} className="wd-select wd-size-select" defaultValue="">
                    <option value="" disabled>--</option>
                    <option value="1">8</option>
                    <option value="2">10</option>
                    <option value="3">12</option>
                    <option value="4">14</option>
                    <option value="5">18</option>
                    <option value="6">24</option>
                    <option value="7">36</option>
                  </select>
                </div>
                <div className="wd-group-btns">
                  <button onClick={() => execCmd('bold')} className="wd-btn wd-fmt" title="Bold"><b>B</b></button>
                  <button onClick={() => execCmd('italic')} className="wd-btn wd-fmt" title="Italic"><i>I</i></button>
                  <button onClick={() => execCmd('underline')} className="wd-btn wd-fmt" title="Underline"><u>U</u></button>
                  <button onClick={() => execCmd('strikeThrough')} className="wd-btn wd-fmt" title="Strikethrough"><s>ab</s></button>
                  <button onClick={() => execCmd('subscript')} className="wd-btn wd-fmt" title="Subscript">x<sub>2</sub></button>
                  <button onClick={() => execCmd('superscript')} className="wd-btn wd-fmt" title="Superscript">x<sup>2</sup></button>
                  <label className="wd-btn wd-fmt wd-clr-btn" title="Font Color">
                    <span className="wd-clr-a">A</span>
                    <span className="wd-clr-strip" id="egFontColor" />
                    <input type="color" className="wd-clr-input" onChange={(e) => { execCmd('foreColor', e.target.value); document.getElementById('egFontColor').style.backgroundColor = e.target.value }} />
                  </label>
                  <label className="wd-btn wd-fmt wd-clr-btn" title="Highlight Color">
                    <span className="wd-clr-a" style={{fontSize:'0.7rem'}}>ab</span>
                    <span className="wd-clr-strip" id="egHlColor" style={{backgroundColor:'#ffff00'}} />
                    <input type="color" className="wd-clr-input" defaultValue="#ffff00" onChange={(e) => { execCmd('hiliteColor', e.target.value); document.getElementById('egHlColor').style.backgroundColor = e.target.value }} />
                  </label>
                  <button onClick={() => execCmd('removeFormat')} className="wd-btn wd-fmt" title="Clear Formatting">&#8709;</button>
                </div>
                <span className="wd-group-label">Font</span>
              </div>

              <div className="wd-sep" />

              {/* Paragraph group */}
              <div className="wd-group">
                <div className="wd-group-btns">
                  <select onChange={(e) => { if (e.target.value) execCmd('formatBlock', e.target.value); e.target.selectedIndex = 0 }} className="wd-select wd-style-select" defaultValue="">
                    <option value="" disabled>Styles</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="p">Normal</option>
                    <option value="blockquote">Quote</option>
                  </select>
                </div>
                <div className="wd-group-btns">
                  <button onClick={() => execCmd('justifyLeft')} className="wd-btn wd-fmt" title="Align Left">&#8676;</button>
                  <button onClick={() => execCmd('justifyCenter')} className="wd-btn wd-fmt" title="Center">&#8596;</button>
                  <button onClick={() => execCmd('justifyRight')} className="wd-btn wd-fmt" title="Right">&#8677;</button>
                  <button onClick={() => execCmd('justifyFull')} className="wd-btn wd-fmt" title="Justify">&#9776;</button>
                  <div className="wd-btn-gap" />
                  <button onClick={() => execCmd('insertUnorderedList')} className="wd-btn wd-fmt" title="Bullets">&#8226;</button>
                  <button onClick={() => execCmd('insertOrderedList')} className="wd-btn wd-fmt" title="Numbering">1.</button>
                  <button onClick={() => execCmd('outdent')} className="wd-btn wd-fmt" title="Decrease Indent">&#8612;</button>
                  <button onClick={() => execCmd('indent')} className="wd-btn wd-fmt" title="Increase Indent">&#8614;</button>
                </div>
                <span className="wd-group-label">Paragraph</span>
              </div>

              <div className="wd-sep" />

              {/* Insert group */}
              <div className="wd-group">
                <div className="wd-group-btns">
                  <button onClick={() => {
                    const rows = prompt('Rows:', '3')
                    const cols = prompt('Columns:', '3')
                    if (rows && cols) {
                      let t = '<table style="border-collapse:collapse;width:100%;margin:10px 0;">'
                      for (let r = 0; r < parseInt(rows); r++) {
                        t += '<tr>'
                        for (let c = 0; c < parseInt(cols); c++) t += '<td style="border:1px solid #000;padding:6px 10px;">&nbsp;</td>'
                        t += '</tr>'
                      }
                      t += '</table>'
                      execCmd('insertHTML', t)
                    }
                  }} className="wd-btn wd-insert-btn" title="Insert Table">Table</button>
                  <button onClick={() => execCmd('insertHorizontalRule')} className="wd-btn wd-insert-btn" title="Horizontal Line">Line</button>
                </div>
                <span className="wd-group-label">Insert</span>
              </div>
            </div>

            {/* Paper area */}
            <div className="wd-canvas">
              <div className="wd-page">
                {showSource ? (
                  <textarea
                    className="wd-source"
                    value={examHtml}
                    onChange={(e) => setExamHtml(e.target.value)}
                    spellCheck={false}
                  />
                ) : (
                  <div
                    ref={editorRef}
                    className="wd-content"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: examHtml }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2026 TOOLBOX AI. All rights reserved.</p>
        <p>Professional tools for your needs.</p>
      </div>
    </footer>
  )
}

export default App