from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pathlib import Path
import sqlite3
from datetime import datetime, timezone
import os

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / 'webmatrix.db'
def load_dotenv(path: Path):
    # Lightweight .env loader (no extra dependency required).
    if not path.exists():
        return
    for raw in path.read_text(encoding='utf-8').splitlines():
        line = raw.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        key = key.strip()
        value = value.strip().strip('\"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value

load_dotenv(BASE_DIR / '.env')
ADMIN_KEY = os.getenv('WEBMATRIX_ADMIN_KEY', 'WebMatrix@2026Admin')

app = FastAPI(title='Web Matrix Portfolio API', version='1.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class Lead(BaseModel):
    name: str
    business: str
    email: EmailStr
    whatsapp: str = ''
    type: str = 'Business Website'
    message: str = ''


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            business TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT,
            type TEXT,
            message TEXT,
            status TEXT NOT NULL DEFAULT 'New',
            created_at TEXT NOT NULL
        )
    ''')
    try:
        conn.execute("ALTER TABLE leads ADD COLUMN status TEXT NOT NULL DEFAULT 'New'")
        conn.commit()
    except sqlite3.OperationalError:
        pass
    conn.commit()
    conn.close()

init_db()

@app.get('/')
def root():
    return {'status': 'online', 'service': 'Web Matrix Portfolio API'}

@app.get('/api/health')
def health():
    return {'status': 'healthy'}

@app.post('/api/leads', status_code=201)
def create_lead(lead: Lead):
    if not lead.name.strip() or not lead.business.strip():
        raise HTTPException(status_code=400, detail='Name and business name are required.')

    conn = get_db()
    cur = conn.execute('''
        INSERT INTO leads (name, business, email, whatsapp, type, message, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'New', ?)
    ''', (
        lead.name.strip(), lead.business.strip(), str(lead.email).strip(),
        lead.whatsapp.strip(), lead.type.strip(), lead.message.strip(),
        datetime.now(timezone.utc).isoformat()
    ))
    conn.commit()
    lead_id = cur.lastrowid
    conn.close()
    return {'success': True, 'message': 'Project enquiry received.', 'lead_id': lead_id}


def verify_admin(x_admin_key: str | None = Header(default=None)):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail='Invalid admin key.')

@app.get('/api/leads', dependencies=[Depends(verify_admin)])
def list_leads():
    conn = get_db()
    rows = conn.execute('SELECT * FROM leads ORDER BY id DESC').fetchall()
    conn.close()
    return {'success': True, 'leads': [dict(row) for row in rows]}

@app.get('/admin')
def admin_page():
    from fastapi.responses import FileResponse
    return FileResponse(BASE_DIR / 'admin.html')

class LeadStatusUpdate(BaseModel):
    status: str

@app.patch('/api/leads/{lead_id}', dependencies=[Depends(verify_admin)])
def update_lead(lead_id: int, payload: LeadStatusUpdate):
    allowed = {'New', 'Contacted', 'Completed'}
    if payload.status not in allowed:
        raise HTTPException(status_code=400, detail='Invalid status.')
    conn = get_db()
    cur = conn.execute('UPDATE leads SET status=? WHERE id=?', (payload.status, lead_id))
    conn.commit()
    conn.close()
    if cur.rowcount == 0:
        raise HTTPException(status_code=404, detail='Lead not found.')
    return {'success': True, 'message': 'Lead status updated.'}

@app.delete('/api/leads/{lead_id}', dependencies=[Depends(verify_admin)])
def delete_lead(lead_id: int):
    conn = get_db()
    cur = conn.execute('DELETE FROM leads WHERE id=?', (lead_id,))
    conn.commit()
    conn.close()
    if cur.rowcount == 0:
        raise HTTPException(status_code=404, detail='Lead not found.')
    return {'success': True, 'message': 'Lead deleted.'}
