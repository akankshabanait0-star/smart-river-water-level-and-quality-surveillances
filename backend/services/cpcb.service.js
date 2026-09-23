/**
 * Service to interact with live CPCB Data.
 * Fetches real-time water quality data from the live CPCB RTWQMS endpoint with Cache-Busting.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

class CPCBService {
  async getLiveData() {
    return new Promise((resolve) => {
      const timestamp = Date.now();
      const url = `https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${timestamp}`;
      const agent = new https.Agent({ rejectUnauthorized: false });

      const req = https.get(url, {
        agent,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        timeout: 25000
      }, (res) => {
        if (res.statusCode !== 200) {
          console.warn(`CPCB responded with status ${res.statusCode}, using fallback data`);
          return resolve(this.getFallbackData());
        }

        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(raw);
            if (Array.isArray(data) && data.length > 0) {
              return resolve({ success: true, data: data });
            }
            return resolve(this.getFallbackData());
          } catch (e) {
            console.error('CPCB JSON parse error:', e.message);
            return resolve(this.getFallbackData());
          }
        });
      });

      req.on('error', (err) => {
        console.warn('CPCB HTTPS request error, falling back:', err.message);
        return resolve(this.getFallbackData());
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('CPCB request timed out, falling back');
        return resolve(this.getFallbackData());
      });
    });
  }

  getFallbackData() {
    try {
      const paths = [
        path.join(__dirname, '../fallback-data.json'),
        path.join(__dirname, '../../frontend/fallback-data.json'),
        path.join(process.cwd(), 'frontend/fallback-data.json'),
        path.join(process.cwd(), 'backend/fallback-data.json')
      ];
      for (const p of paths) {
        if (fs.existsSync(p)) {
          const data = JSON.parse(fs.readFileSync(p, 'utf8'));
          if (Array.isArray(data) && data.length > 0) {
            return { success: true, data: data, isFallback: true };
          }
        }
      }
    } catch (e) {
      console.error('Fallback read error:', e);
    }
    return { success: false, error: 'No data available', data: [] };
  }

  getStationPhotoStream(stNo, res) {
    // 1. Check if local asset exists
    const localPaths = [
      path.join(__dirname, '../../frontend/assets/stations', `${stNo}_image.jpg`),
      path.join(process.cwd(), 'frontend/assets/stations', `${stNo}_image.jpg`),
      path.join(process.cwd(), 'assets/stations', `${stNo}_image.jpg`)
    ];
    for (const lp of localPaths) {
      if (fs.existsSync(lp)) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        return fs.createReadStream(lp).pipe(res);
      }
    }

    // 2. Fetch from live CPCB server with rejectUnauthorized: false
    const url = `https://rtwqmsdb1.cpcb.gov.in/images/stations/${stNo}_image.jpg`;
    const agent = new https.Agent({ rejectUnauthorized: false });

    const req = https.get(url, { agent, timeout: 10000 }, (remoteRes) => {
      if (remoteRes.statusCode === 200) {
        res.setHeader('Content-Type', remoteRes.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        return remoteRes.pipe(res);
      }
      res.status(remoteRes.statusCode).end();
    });

    req.on('error', (err) => {
      console.warn('CPCB photo proxy error:', err.message);
      res.status(404).end();
    });

    req.on('timeout', () => {
      req.destroy();
      res.status(504).end();
    });
  }
}

module.exports = new CPCBService();
