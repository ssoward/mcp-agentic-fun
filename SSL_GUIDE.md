# SSL Certificate Installation Guide

## Enhanced SSL Implementation

Your MCP Agentic Platform now runs with enhanced SSL/TLS security using a self-signed certificate with Subject Alternative Names (SAN) support.

### Certificate Details
- **Algorithm**: RSA 4096-bit
- **Validity**: 365 days
- **Hash**: SHA-256
- **Subject Alternative Names**:
  - `ec2-3-92-147-210.compute-1.amazonaws.com`
  - `3.92.147.210`
  - `localhost`

### Access URLs
- **HTTP**: http://3.92.147.210/ui-advanced.html
- **HTTPS**: https://3.92.147.210/ui-advanced.html
- **HTTPS (Full DNS)**: https://ec2-3-92-147-210.compute-1.amazonaws.com/ui-advanced.html

### Browser Trust Installation

#### Chrome/Chromium:
1. Visit https://3.92.147.210/ui-advanced.html
2. Click the "Not secure" or lock icon in the address bar
3. Click "Certificate" → "Details"
4. Click "Export" and save as `mcp-platform.crt`
5. Go to Chrome Settings → Privacy and Security → Security → Manage Certificates
6. Import the certificate into "Trusted Root Certification Authorities"

#### Firefox:
1. Visit https://3.92.147.210/ui-advanced.html
2. Click "Advanced" → "Accept the Risk and Continue"
3. Or: Settings → Privacy & Security → Certificates → View Certificates → Import

#### Safari (macOS):
1. Download the certificate: `openssl s_client -connect 3.92.147.210:443 < /dev/null | openssl x509 -outform PEM > mcp-platform.crt`
2. Double-click the .crt file to import into Keychain Access
3. Find the certificate and mark as "Always Trust"

### Command Line Access
```bash
# Test HTTPS (ignore certificate warnings)
curl -k https://3.92.147.210/ui-advanced.html

# Download and trust certificate locally
openssl s_client -connect 3.92.147.210:443 -servername ec2-3-92-147-210.compute-1.amazonaws.com < /dev/null | openssl x509 -outform PEM > mcp-platform.crt
```

### Production SSL Options
For production use, consider:
1. **Custom Domain**: Register a domain and use Let's Encrypt
2. **AWS Certificate Manager**: Use ACM with Application Load Balancer
3. **CloudFlare**: Free SSL termination with CloudFlare proxy

### Certificate Renewal
To regenerate the certificate:
```bash
cd ~/mcp-agentic-fun
./generate-ssl.sh
sudo ./start-server.sh
```

### Security Features
- ✅ 4096-bit RSA encryption
- ✅ SHA-256 signature algorithm
- ✅ Subject Alternative Names (SAN)
- ✅ Modern TLS protocols
- ✅ Secure cipher suites
- ✅ HTTP/HTTPS dual support
