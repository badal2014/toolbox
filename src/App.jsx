import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bill-generator" element={<BillGenerator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/json-fixer" element={<JSONFixer />} />
            <Route path="/json-viewer" element={<JSONViewer />} />
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
            <p>Format and validate JSON data</p>
          </Link>
          <Link to="/json-viewer" className="tool-card">
            <h3>JSON Viewer</h3>
            <p>Pretty-print JSON for easy reading</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <h1>TOOLBOX AI</h1>
        </Link>
        <nav>
          <ul>
            <li><Link to="/bill-generator">Bill Generator</Link></li>
            <li><Link to="/password-generator">Password Generator</Link></li>
            <li><Link to="/json-fixer">JSON Fixer</Link></li>
            <li><Link to="/json-viewer">JSON Viewer</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function BillGenerator() {
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState('')
  const [bill, setBill] = useState('')

  const generateBill = (e) => {
    e.preventDefault()
    const itemLines = items.split('\n').filter(item => item.trim() !== '')
    let total = 0
    let billText = `Bill for ${customerName}\n\n`
    billText += 'Items:\n'
    
    itemLines.forEach(item => {
      const parts = item.split(',')
      if (parts.length === 2) {
        const name = parts[0].trim()
        const price = parseFloat(parts[1].trim())
        if (!isNaN(price)) {
          billText += `${name}: $${price.toFixed(2)}\n`
          total += price
        }
      }
    })
    
    billText += `\nTotal: $${total.toFixed(2)}`
    setBill(billText)
  }

  return (
    <section className="tool-section">
      <div className="container">
        <h2>Bill Generator</h2>
        <form onSubmit={generateBill}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="items">Items (one per line, format: Item Name, Price):</label>
            <textarea
              id="items"
              rows="5"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="e.g.&#10;Apple, 2.50&#10;Banana, 1.20"
            />
          </div>
          <button type="submit">Generate Bill</button>
        </form>
        {bill && <div className="output"><pre>{bill}</pre></div>}
      </div>
    </section>
  )
}

function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let charset = ''
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (charset === '') {
      setPassword('Please select at least one character type.')
      return
    }
    
    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(`Generated Password: ${newPassword}`)
  }

  return (
    <section className="tool-section">
      <div className="container">
        <h2>Random Password Generator</h2>
        <div className="form-group">
          <label htmlFor="passwordLength">Password Length:</label>
          <input
            type="number"
            id="passwordLength"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="4"
            max="50"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            /> Include Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            /> Include Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            /> Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            /> Include Symbols
          </label>
        </div>
        <button onClick={generatePassword}>Generate Password</button>
        {password && <div className="output"><pre>{password}</pre></div>}
      </div>
    </section>
  )
}

function JSONFixer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const fixJSON = () => {
    try {
      // Convert single quotes to double quotes for valid JSON parsing
      const doubleQuoteInput = input.replace(/'/g, '"')
      const parsed = JSON.parse(doubleQuoteInput)
      const fixed = JSON.stringify(parsed, null, 2)
      setOutput(fixed)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  return (
    <section className="tool-section">
      <div className="container">
        <h2>JSON Fixer</h2>
        <div className="form-group">
          <label htmlFor="jsonInput">Enter JSON:</label>
          <textarea
            id="jsonInput"
            rows="10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
          />
        </div>
        <button onClick={fixJSON}>Fix JSON</button>
        {output && <div className="output"><pre>{output}</pre></div>}
      </div>
    </section>
  )
}

function JSONViewer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const viewJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const viewed = JSON.stringify(parsed, null, 2)
      setOutput(viewed)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  return (
    <section className="tool-section">
      <div className="container">
        <h2>JSON Viewer</h2>
        <div className="form-group">
          <label htmlFor="jsonViewerInput">Enter JSON:</label>
          <textarea
            id="jsonViewerInput"
            rows="10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
          />
        </div>
        <button onClick={viewJSON}>View JSON</button>
        {output && <div className="output"><pre>{output}</pre></div>}
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