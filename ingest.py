import time
import random
import uuid
from datetime import datetime
from feature_store import FeatureStore, extract_features

fs = FeatureStore()

ACTIONS = ['login', 'transfer', 'change_pwd', 'account_recovery']

def gen_event():
    return {
        'event_id': str(uuid.uuid4()),
        'user_id': f'user_{random.randint(1,5)}',
        'device_id': f'device_{random.randint(1,8)}',
        'ip': f'192.0.2.{random.randint(1,250)}',
        'timestamp': datetime.utcnow().isoformat(),
        'action': random.choice(ACTIONS),
        'amount': random.choice([0, 50, 100, 600, 2000])
    }

if __name__ == '__main__':
    print('Starting ingestion demo (20 events)')
    for _ in range(20):
        ev = gen_event()
        feats = extract_features(ev)
        fs.upsert(ev['user_id'], feats)
        stored = fs.get(ev['user_id'])
        print(f"Stored features for {ev['user_id']}: {stored['features']['last_action']} high_value={stored['features']['is_high_value']}")
        time.sleep(0.2)
    print('Done')
