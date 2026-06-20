import sqlite3
import json
from datetime import datetime

class FeatureStore:
    def __init__(self, db_path='feature_store.db'):
        self.db_path = db_path
        self._conn = sqlite3.connect(self.db_path, check_same_thread=False)
        self._conn.execute('''
            CREATE TABLE IF NOT EXISTS features (
                user_id TEXT PRIMARY KEY,
                features TEXT,
                last_seen TEXT
            )
        ''')
        self._conn.commit()

    def upsert(self, user_id: str, features: dict):
        now = datetime.utcnow().isoformat()
        features_json = json.dumps(features)
        with self._conn:
            self._conn.execute(
                'INSERT OR REPLACE INTO features(user_id, features, last_seen) VALUES (?, ?, ?)',
                (user_id, features_json, now)
            )

    def get(self, user_id: str) -> dict:
        cur = self._conn.cursor()
        cur.execute('SELECT features, last_seen FROM features WHERE user_id = ?', (user_id,))
        row = cur.fetchone()
        if not row:
            return None
        return {'features': json.loads(row[0]), 'last_seen': row[1]}


def extract_features(event: dict) -> dict:
    """Simple feature extraction for demo purposes."""
    ts = event.get('timestamp')
    if ts:
        try:
            hour = datetime.fromisoformat(ts).hour
        except Exception:
            hour = datetime.utcnow().hour
    else:
        hour = datetime.utcnow().hour

    features = {
        'last_action': event.get('action'),
        'device_id': event.get('device_id'),
        'ip': event.get('ip'),
        'hour_of_day': hour,
        'is_high_value': (event.get('amount') or 0) > 500,
        'raw_event': event
    }
    return features
